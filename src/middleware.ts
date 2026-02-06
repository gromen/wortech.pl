import { defineMiddleware } from "astro:middleware";

function isMaintenanceEnabled(): boolean {
  // Deno runtime (Netlify Edge Functions) — most reliable for edge
  try {
    // @ts-ignore - Deno global
    if (typeof Deno !== "undefined") {
      // @ts-ignore
      return Deno.env.get("MAINTENANCE_MODE") === "true";
    }
  } catch {}
  // Node.js runtime fallback
  try {
    if (typeof process !== "undefined" && process.env) {
      return process.env.MAINTENANCE_MODE === "true";
    }
  } catch {}
  return false;
}

export const onRequest = defineMiddleware(async (context, next) => {
  const maintenanceMode = isMaintenanceEnabled();
  const { pathname, searchParams } = context.url;

  // Check if bypass query param is present
  // Example: ?access=true
  if (searchParams.get("access") === "true") {
    context.cookies.set("maintenance_bypass", "true", {
      path: "/",
      maxAge: 60 * 60 * 24,
    });
  }

  const hasBypassCookie =
    context.cookies.get("maintenance_bypass")?.value === "true";

  // Allow access if:
  // 1. Maintenance mode is OFF
  // 2. User has bypass cookie/param
  // 3. Request is for assets, images, or admin area
  // 4. Request is ALREADY for the maintenance page (avoid loops)
  if (
    !maintenanceMode ||
    hasBypassCookie ||
    pathname.startsWith("/_image") ||
    pathname.startsWith("/api") ||
    pathname.includes(".") ||
    pathname.startsWith("/maintenance")
  ) {
    return next();
  }

  // Otherwise, redirect to maintenance page
  return context.redirect("/maintenance", 307);
});
