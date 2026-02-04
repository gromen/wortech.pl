import type { APIRoute } from 'astro';
import { Resend } from 'resend';

export const POST: APIRoute = async ({ request }) => {
  try {
    const { name, email, phone, message } = await request.json();

    if (!name || !email || !message) {
      return new Response(JSON.stringify({ error: 'Wymagane pola: imię, email, wiadomość.' }), {
        status: 400,
        headers: { 'Content-Type': 'application/json' },
      });
    }

    const apiKey = import.meta.env.RESEND_API_KEY;
    const contactEmail = import.meta.env.CONTACT_EMAIL || 'biuro@wortech.pl';

    if (!apiKey) {
      console.error('RESEND_API_KEY is not set');
      return new Response(JSON.stringify({ error: 'Konfiguracja serwera niekompletna.' }), {
        status: 500,
        headers: { 'Content-Type': 'application/json' },
      });
    }

    const resend = new Resend(apiKey);

    await resend.emails.send({
      from: 'WORTECH Formularz <onboarding@resend.dev>',
      to: contactEmail,
      replyTo: email,
      subject: `Formularz kontaktowy: ${name}`,
      html: `
        <h2>Nowa wiadomość z formularza kontaktowego</h2>
        <p><strong>Imię i nazwisko:</strong> ${name}</p>
        <p><strong>Email:</strong> ${email}</p>
        <p><strong>Telefon:</strong> ${phone || 'Nie podano'}</p>
        <hr />
        <p><strong>Wiadomość:</strong></p>
        <p>${message.replace(/\n/g, '<br />')}</p>
      `,
    });

    return new Response(JSON.stringify({ success: true }), {
      status: 200,
      headers: { 'Content-Type': 'application/json' },
    });
  } catch (error) {
    console.error('Contact form error:', error);
    return new Response(JSON.stringify({ error: 'Wystąpił błąd serwera.' }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' },
    });
  }
};
