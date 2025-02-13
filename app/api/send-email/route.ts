import { NextRequest } from "next/server";
import nodemailer from 'nodemailer'
import Mail from 'nodemailer/lib/mailer'

export async function POST(request: NextRequest) {
  // Validate and sanitize input data
  const { name, email, phone, message } = await request.json();

  if (!name || !email || !phone || !message) {
    return new Response("All fields are required", { status: 400 });
  }

  const transport = nodemailer.createTransport({
    host: 'mail.isianpadu.com',
    port: 587,
    secure: false,
    auth: {
        user: "hasan.hubaishi@isianpadu.com",
        pass: "8HeQH!o8XHc7ye9y",
    },
    logger: true, // Enable logging
    debug: true,  // Enable debug output
});

  // Mail to the company
  const mailOptionsToCompany: Mail.Options = {
    from: "hasan.hubaishi@isianpadu.com",
    to: "hasan.hubaishi@isianpadu.com", // Email address of the company
    subject: `New Message from ${name}`,
    html: `
    <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; border: 1px solid #ddd; padding: 20px; background-color: #f9f9f9;">
        <h2 style="text-align: center; color: #ff5a5f; font-size: 24px; font-weight: bold;">New Contact Form Submission</h2>
        <p style="font-size: 16px; color: #333; text-align: left;">Hello,</p>
        <p style="font-size: 16px; color: #333; text-align: left;">You have received a new message from your website's contact form. Here are the details:</p>
        
        <div style="margin-top: 20px;">
            <h3 style="font-size: 18px; color: #ff5a5f;">Contact Details</h3>
            <ul style="list-style-type: none; padding: 0;">
                <li style="margin-bottom: 10px;"><strong>Name:</strong> ${name}</li>
                <li style="margin-bottom: 10px;"><strong>Email:</strong> <a href="mailto:${email}" style="color: #1e90ff;">${email}</a></li>
                <li style="margin-bottom: 10px;"><strong>Phone:</strong> ${phone}</li>
            </ul>
        </div>
        
        <div style="margin-top: 20px;">
            <h3 style="font-size: 18px; color: #ff5a5f;">Message</h3>
            <p style="font-size: 16px; color: #333; background-color: #fff; padding: 15px; border-left: 5px solid #ff5a5f;">${message}</p>
        </div>
        
        <div style="margin-top: 30px; text-align: center;">
            <p style="font-size: 14px; color: #999;">This email was generated from the contact form on your website. If you no longer wish to receive these emails, please contact the web administrator.</p>
        </div>
    </div>
    `
  };

  // Mail to the user (Thank You Email)
  const mailOptionsToUser: Mail.Options = {
    from: "hasan.hubaishi@isianpadu.com",
    to: email, // Send to the user's email
    subject: `Thank You for Contacting Us, ${name}!`,
    html: `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; border: 1px solid #ddd; padding: 20px; background-color: #f9f9f9;">
          <h2 style="text-align: center; color: #ff5a5f; font-size: 24px; font-weight: bold;">Thank You for Getting in Touch!</h2>
          <p style="font-size: 16px; color: #333; text-align: left;">Dear ${name},</p>
          <p style="font-size: 16px; color: #333; text-align: left;">We have received your message and appreciate you reaching out to us. One of our team members will get back to you as soon as possible.</p>
          
          <div style="margin-top: 20px;">
              <h3 style="font-size: 18px; color: #ff5a5f;">Your Message</h3>
              <p style="font-size: 16px; color: #333; background-color: #fff; padding: 15px; border-left: 5px solid #ff5a5f;">${message}</p>
          </div>
  
          <div style="margin-top: 20px;">
              <p style="font-size: 16px; color: #333;">In the meantime, feel free to browse our website or contact us for any further questions.</p>
          </div>
  
          <div style="margin-top: 30px; text-align: center;">
              <p style="font-size: 14px; color: #999;">Thank you again for contacting us. We look forward to assisting you!</p>
              <p style="font-size: 14px; color: #999;">Best regards, <br> Isianpadu Team</p>
          </div>
  
          <div style="margin-top: 30px; padding: 10px; border-top: 1px solid #ddd;">
              <p style="font-size: 12px; color: #999; text-align: center;">This is an automatically generated email, please do not reply to this email.</p>
              <p style="font-size: 14px; color: #333; text-align: center;">
                If you have any further questions, feel free to contact us at:
              </p>
              <p style="font-size: 14px; color: #333; text-align: center;">
                <strong>ISIANPADU SYSTEMS SDN BHD</strong><br>
                <strong>Email:</strong> general@isianpadu.com</a><br>
                <strong>Phone:</strong> +603-55191010<br>
                <strong>Website:</strong> <a href="https://www.isianpadu.com/" style="color: #1e90ff;">https://www.isianpadu.com/</a>
              </p>
          </div>
      </div>
    `
  };
  

  try {
    // Send both emails
    await transport.sendMail(mailOptionsToCompany);
    await transport.sendMail(mailOptionsToUser);
    
    return new Response("Messages sent successfully", { status: 200 });
  } catch (error) {
    console.error("Error sending emails:", error);
    return new Response("Failed to send messages", { status: 500 });
  }
}