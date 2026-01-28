import { defineMiddleware } from "astro:middleware";

export const onRequest = defineMiddleware(async (context, next) => {
  const maintenanceMode =
    import.meta.env.MAINTENANCE_MODE === "true" ||
    process.env.MAINTENANCE_MODE === "true";
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
