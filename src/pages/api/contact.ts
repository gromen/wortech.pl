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

    const { data, error } = await resend.emails.send({
      from: 'WORTECH Formularz <formularz@wortech.pl>',
      to: contactEmail,
      replyTo: email,
      subject: `Formularz kontaktowy: ${name}`,
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <h2 style="color: #e67e22; border-bottom: 2px solid #e67e22; padding-bottom: 10px;">
            Nowa wiadomość z formularza kontaktowego
          </h2>
          <p><strong>Imię i nazwisko:</strong> ${name}</p>
          <p><strong>Email:</strong> <a href="mailto:${email}" style="color: #e67e22;">${email}</a></p>
          <p><strong>Telefon:</strong> ${phone || 'Nie podano'}</p>
          <p><strong>Wiadomość:</strong></p>
          <div style="background: #f5f5f5; padding: 15px; border-left: 3px solid #e67e22;">
            ${message.replace(/\n/g, '<br />')}
          </div>
          <hr style="margin-top: 30px; border: none; border-top: 1px solid #ddd;">
          <p style="color: #888; font-size: 12px;">
            Wiadomość wysłana przez formularz na stronie wortech.pl
          </p>
        </div>
      `,
    });

    if (error) {
      console.error('Resend error:', error);
      return new Response(JSON.stringify({ error: 'Błąd wysyłania wiadomości.' }), {
        status: 500,
        headers: { 'Content-Type': 'application/json' },
      });
    }

    console.log('Email sent successfully:', data?.id);
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
