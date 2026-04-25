import dotenv from 'dotenv';
dotenv.config();

import express from 'express';
import nodemailer from 'nodemailer';
import cors from 'cors';

const app = express();
const port = process.env.PORT || 5000;

// ─── CORS ──────────────────────────────────────────────────────────────────
app.use(cors({
  origin: [
    'http://localhost:5173',
    'https://vishnu-kesharwani.onrender.com',
    'https://shivam-kumar.onrender.com',
    'https://shivam-kumar-kesharwani.vercel.app',
    'https://new-portfolio-6ove.onrender.com',
    'https://vishnu-portfolio.onrender.com' 
  ],
  credentials: true
}));
app.use(express.json());

// ─── ENV CHECK ─────────────────────────────────────────────────────────────
console.log('=== Server Environment Check ===');
console.log('NODE_ENV    :', process.env.NODE_ENV || 'development');
console.log('PORT        :', port);
console.log('GMAIL_USER  :', process.env.GMAIL_USER || '❌ MISSING');
console.log('GMAIL_PASS  :', process.env.GMAIL_PASS ? `✅ SET (${process.env.GMAIL_PASS.length} chars)` : '❌ MISSING');
console.log('RECV_EMAIL  :', process.env.RECEIVER_EMAIL || '❌ MISSING');
console.log('================================');

if (!process.env.GMAIL_USER || !process.env.GMAIL_PASS || !process.env.RECEIVER_EMAIL) {
  console.error('CRITICAL: Missing required environment variables. Email sending will fail.');
}

// ─── NODEMAILER TRANSPORTER ────────────────────────────────────────────────
const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.GMAIL_USER,
    pass: process.env.GMAIL_PASS,
  },
});

// Verify transporter connection on startup
transporter.verify((error) => {
  if (error) {
    console.error('❌ Transporter verify FAILED:', error.message);
    console.error('   Code:', error.code);
  } else {
    console.log('✅ Nodemailer transporter ready — SMTP connection verified.');
  }
});

// ─── HEALTH CHECK ──────────────────────────────────────────────────────────
app.get('/', (req, res) => {
  res.json({
    status: 'ok',
    message: 'Vishnu Portfolio email server is running.',
    gmail_user_set: !!process.env.GMAIL_USER,
    receiver_set: !!process.env.RECEIVER_EMAIL,
  });
});

// ─── SEND EMAIL ────────────────────────────────────────────────────────────
app.post('/api/send', async (req, res) => {
  const { name, email, subject, message } = req.body;

  if (!name || !email || !message) {
    return res.status(400).json({ error: 'Please provide name, email, and message.' });
  }

  const mailOptions = {
    from: `"Vishnu Portfolio Contact" <${process.env.GMAIL_USER}>`,
    to: process.env.RECEIVER_EMAIL,
    subject: subject || `New Message from ${name} (Vishnu Portfolio)`,
    text: `Name: ${name}\nEmail: ${email}\nSubject: ${subject}\n\nMessage:\n${message}`,
    html: `
      <div style="font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; max-width: 600px; margin: 0 auto; background-color: #111; color: #fff; border-radius: 16px; overflow: hidden; border: 1px solid #333;">
        <div style="background: linear-gradient(135deg, #4361ee 0%, #3f37c9 100%); padding: 30px; text-align: center;">
          <h1 style="margin: 0; font-size: 24px; letter-spacing: 2px;">VISHNU PORTFOLIO MESSAGE</h1>
        </div>
        <div style="padding: 40px; line-height: 1.6;">
          <div style="margin-bottom: 30px;">
            <p style="color: #888; text-transform: uppercase; font-size: 12px; letter-spacing: 1px; margin-bottom: 5px;">From</p>
            <h2 style="margin: 0; font-size: 20px; color: #fff;">${name}</h2>
            <p style="margin: 0; color: #4361ee;">${email}</p>
          </div>
          <div style="background-color: #1a1a1a; padding: 25px; border-radius: 12px; border-left: 4px solid #4361ee;">
            <p style="color: #888; text-transform: uppercase; font-size: 12px; letter-spacing: 1px; margin-bottom: 10px;">Message</p>
            <p style="margin: 0; color: #ddd; font-style: italic;">"${message}"</p>
          </div>
          <div style="margin-top: 40px; text-align: center;">
            <a href="mailto:${email}" style="display: inline-block; padding: 14px 30px; background-color: #4361ee; color: #fff; text-decoration: none; border-radius: 8px; font-weight: bold; text-transform: uppercase; letter-spacing: 1px;">Reply to ${name}</a>
          </div>
        </div>
        <div style="background-color: #0c0c0c; padding: 20px; text-align: center; color: #555; font-size: 12px; border-top: 1px solid #222;">
          Sent from Vishnu Portfolio Contact Form
        </div>
      </div>
    `,
    replyTo: email
  };

  try {
    const info = await transporter.sendMail(mailOptions);
    console.log('✅ Email sent successfully. MessageID:', info.messageId);
    res.status(200).json({ status: 'success', message: 'Message sent successfully!' });
  } catch (error) {
    console.error('❌ Email send FAILED:');
    console.error('   Message:', error.message);
    console.error('   Code   :', error.code);
    console.error('   Command:', error.command);
    res.status(500).json({ error: 'Failed to send message. Please try again later.' });
  }
});

// ─── KEEP-ALIVE PINGER ─────────────────────────────────────────────────────
// Free Render instances spin down after 15 mins. This pings the server every 14 mins.
const LIVE_URL = process.env.VITE_API_URL || 'http://localhost:5000';
setInterval(() => {
  console.log(`[Keep-Alive] Pinging self to prevent sleep...`);
  fetch(LIVE_URL)
    .then(res => console.log(`[Keep-Alive] Status: ${res.status}`))
    .catch(err => console.error(`[Keep-Alive] Error:`, err.message));
}, 14 * 60 * 1000); // 14 minutes

// ─── START ─────────────────────────────────────────────────────────────────
app.listen(port, () => {
  console.log(`🚀 Server running on port ${port}`);
});
