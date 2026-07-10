import { Resend } from 'resend';

const resend = new Resend(process.env.RESEND_API_KEY);

export async function sendPasswordResetEmail(to: string, url: string) {
  await resend.emails.send({
    from: process.env.RESEND_FROM_EMAIL ?? 'Ping Log <onboarding@resend.dev>',
    to,
    subject: 'Reset your Ping Log password',
    html: `
      <p>Someone requested a password reset for this account.</p>
      <p><a href="${url}">Click here to reset your password</a></p>
      <p>If you didn't request this, you can safely ignore this email. This link expires in 1 hour.</p>
    `,
  });
}
