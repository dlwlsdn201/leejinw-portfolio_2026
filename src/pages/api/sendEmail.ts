export const prerender = false; // Important for Vercel Serverless

import type { APIRoute } from 'astro';
import nodemailer from 'nodemailer';

export const POST: APIRoute = async ({ request }) => {
  try {
    const data = await request.json();
    const { name, email, phone, message } = data;

    if (!name || !email || !message) {
      return new Response(JSON.stringify({ error: '필수 항목을 입력해주세요.' }), { status: 400 });
    }

    // In a real deployed app setting you should manage env keys at build time
    const transporter = nodemailer.createTransport({
      host: 'smtp.gmail.com',
      port: 465,
      secure: true,
      auth: {
        user: process.env.EMAIL_USER || 'dummy@gmail.com',
        pass: process.env.EMAIL_PASS || 'dummy-pass',
      },
    });

    const mailOptions = {
      from: `"${name}" <${email}>`,
      to: 'dev.leejinw@gmail.com',
      subject: `[포트폴리오 문의] ${name} 님으로부터 연락이 왔습니다.`,
      text: `이름/회사: ${name}\n이메일: ${email}\n연락처: ${phone || '없음'}\n\n메시지:\n${message}`,
    };

    await transporter.sendMail(mailOptions);

    return new Response(JSON.stringify({ success: true, message: '이메일이 성공적으로 전송되었습니다.' }), { status: 200 });
  } catch (error) {
    console.error('Email send error:', error);
    // For local dev without env variables it will fail but we fake success for UI testing
    return new Response(JSON.stringify({ error: '서버 오류로 이메일 전송에 실패했습니다.' }), { status: 500 });
  }
};
