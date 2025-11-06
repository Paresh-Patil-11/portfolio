// server.js - Backend for Portfolio (No Database)
const express = require("express");
const cors = require("cors");
const nodemailer = require("nodemailer");
require("dotenv").config();

const app = express();
const PORT = process.env.PORT || 5000;

// CORS Configuration - Allow frontend to connect
app.use(
  cors({
    origin: process.env.FRONTEND_URL || "http://localhost:5173",
    credentials: true,
    methods: ["GET", "POST", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization"],
  })
);

app.use(express.json());

// Email Transporter Configuration
const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
});

// Verify email configuration on startup
transporter.verify((error, success) => {
  if (error) {
    console.error("❌ Email configuration error:", error);
    console.log("⚠️  Please check your EMAIL_USER and EMAIL_PASS in .env file");
  } else {
    console.log("✅ Email server is ready to send messages");
  }
});

// Health check endpoint
app.get("/", (req, res) => {
  res.json({
    success: true,
    message: "Portfolio Backend API is running",
    timestamp: new Date().toISOString(),
  });
});

app.get("/api/health", (req, res) => {
  res.json({
    success: true,
    message: "Server is running",
    timestamp: new Date().toISOString(),
  });
});

// Contact Form Endpoint
app.post("/api/contact", async (req, res) => {
  const { name, email, phone, message } = req.body;

  // Validation
  if (!name || !email || !phone || !message) {
    return res.status(400).json({
      success: false,
      message: "All fields are required",
    });
  }

  // Email validation
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(email)) {
    return res.status(400).json({
      success: false,
      message: "Please provide a valid email address",
    });
  }

  // Phone validation (basic)
  const phoneRegex = /^[0-9+\-\s()]{10,}$/;
  if (!phoneRegex.test(phone)) {
    return res.status(400).json({
      success: false,
      message: "Please provide a valid phone number",
    });
  }

  try {
    // Prepare email content
    const mailOptions = {
      from: process.env.EMAIL_USER,
      to: process.env.EMAIL_USER, // Send to yourself
      replyTo: email, // User's email for easy reply
      subject: `🎯 New Portfolio Contact: ${name}`,
      html: `
        <!DOCTYPE html>
        <html>
        <head>
          <style>
            * {
              margin: 0;
              padding: 0;
              box-sizing: border-box;
            }
            body {
              font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
              line-height: 1.6;
              color: #333;
              background-color: #f4f4f4;
            }
            .email-container {
              max-width: 650px;
              margin: 20px auto;
              background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
              border-radius: 20px;
              overflow: hidden;
              box-shadow: 0 10px 40px rgba(0,0,0,0.2);
            }
            .header {
              background: linear-gradient(135deg, #000000 0%, #1a1a1a 100%);
              color: white;
              padding: 40px 30px;
              text-align: center;
              position: relative;
            }
            .header::before {
              content: '✉️';
              font-size: 60px;
              display: block;
              margin-bottom: 15px;
              animation: bounce 2s infinite;
            }
            @keyframes bounce {
              0%, 100% { transform: translateY(0); }
              50% { transform: translateY(-10px); }
            }
            .header h1 {
              font-size: 28px;
              margin: 0;
              font-weight: 700;
              letter-spacing: 1px;
            }
            .header p {
              margin: 10px 0 0 0;
              opacity: 0.9;
              font-size: 14px;
            }
            .content {
              background: white;
              padding: 40px 30px;
            }
            .badge {
              display: inline-block;
              background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
              color: white;
              padding: 8px 20px;
              border-radius: 50px;
              font-size: 12px;
              font-weight: 600;
              text-transform: uppercase;
              letter-spacing: 1px;
              margin-bottom: 25px;
            }
            .info-card {
              background: linear-gradient(135deg, #f5f7fa 0%, #c3cfe2 100%);
              border-radius: 15px;
              padding: 25px;
              margin-bottom: 20px;
              border-left: 5px solid #667eea;
            }
            .info-row {
              display: flex;
              align-items: center;
              margin-bottom: 18px;
              padding-bottom: 18px;
              border-bottom: 1px solid rgba(0,0,0,0.1);
            }
            .info-row:last-child {
              margin-bottom: 0;
              padding-bottom: 0;
              border-bottom: none;
            }
            .icon {
              width: 45px;
              height: 45px;
              background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
              border-radius: 50%;
              display: flex;
              align-items: center;
              justify-content: center;
              font-size: 20px;
              margin-right: 15px;
              flex-shrink: 0;
            }
            .info-content {
              flex: 1;
            }
            .label {
              font-size: 11px;
              text-transform: uppercase;
              color: #666;
              font-weight: 600;
              letter-spacing: 0.5px;
              margin-bottom: 5px;
            }
            .value {
              font-size: 16px;
              color: #000;
              font-weight: 500;
              word-break: break-word;
            }
            .value a {
              color: #667eea;
              text-decoration: none;
              transition: all 0.3s;
            }
            .value a:hover {
              color: #764ba2;
              text-decoration: underline;
            }
            .message-box {
              background: linear-gradient(135deg, #ffecd2 0%, #fcb69f 100%);
              border-radius: 15px;
              padding: 25px;
              margin-top: 20px;
              border-left: 5px solid #ff6b6b;
            }
            .message-box .label {
              color: #d63031;
              display: flex;
              align-items: center;
              gap: 8px;
              font-size: 12px;
              margin-bottom: 15px;
            }
            .message-content {
              background: white;
              padding: 20px;
              border-radius: 10px;
              font-size: 15px;
              line-height: 1.8;
              color: #333;
              white-space: pre-wrap;
              word-wrap: break-word;
              box-shadow: 0 2px 10px rgba(0,0,0,0.05);
            }
            .footer {
              background: #f8f9fa;
              padding: 30px;
              text-align: center;
              color: #666;
            }
            .timestamp {
              background: white;
              display: inline-block;
              padding: 10px 20px;
              border-radius: 50px;
              font-size: 13px;
              color: #555;
              margin-bottom: 15px;
              box-shadow: 0 2px 10px rgba(0,0,0,0.05);
            }
            .timestamp strong {
              color: #667eea;
            }
            .footer-text {
              font-size: 13px;
              line-height: 1.6;
              margin: 10px 0;
            }
            .action-button {
              display: inline-block;
              background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
              color: white;
              padding: 12px 30px;
              border-radius: 50px;
              text-decoration: none;
              font-weight: 600;
              margin-top: 15px;
              transition: transform 0.3s, box-shadow 0.3s;
              box-shadow: 0 4px 15px rgba(102, 126, 234, 0.4);
            }
            .action-button:hover {
              transform: translateY(-2px);
              box-shadow: 0 6px 20px rgba(102, 126, 234, 0.6);
            }
          </style>
        </head>
        <body>
          <div class="email-container">
            <div class="header">
              <h1>New Contact Request</h1>
              <p>Someone wants to connect with you!</p>
            </div>
            
            <div class="content">
              <span class="badge">📬 Portfolio Contact Form</span>
              
              <div class="info-card">
                <div class="info-row">
                  <div class="icon">👤</div>
                  <div class="info-content">
                    <div class="label">Full Name</div>
                    <div class="value">${name}</div>
                  </div>
                </div>
                
                <div class="info-row">
                  <div class="icon">📧</div>
                  <div class="info-content">
                    <div class="label">Email Address</div>
                    <div class="value"><a href="mailto:${email}">${email}</a></div>
                  </div>
                </div>
                
                <div class="info-row">
                  <div class="icon">📱</div>
                  <div class="info-content">
                    <div class="label">Phone Number</div>
                    <div class="value"><a href="tel:${phone}">${phone}</a></div>
                  </div>
                </div>
              </div>
              
              <div class="message-box">
                <div class="label">
                  💬 MESSAGE
                </div>
                <div class="message-content">${message}</div>
              </div>
            </div>
            
            <div class="footer">
              <div class="timestamp">
                📅 <strong>Received:</strong> ${new Date().toLocaleString(
                  "en-IN",
                  {
                    timeZone: "Asia/Kolkata",
                    dateStyle: "full",
                    timeStyle: "long",
                  }
                )}
              </div>
              <div class="footer-text">
                <strong>Quick Reply:</strong> Just hit reply to respond directly to ${name}
              </div>
              <div class="footer-text">
                This message was sent from your portfolio contact form
              </div>
              <a href="mailto:${email}" class="action-button">Reply Now</a>
            </div>
          </div>
        </body>
        </html>
      `,
    };

    const autoReplyOptions = {
      from: process.env.EMAIL_USER,
      to: email,
      subject: "Thanks for reaching out!",
      html: `
    <html>
      <head>
        <style>
          body {
            font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
            background: #f7f8fa;
            padding: 0;
            margin: 0;
          }
          .wrapper {
            max-width: 600px;
            margin: 30px auto;
            background: #ffffff;
            border-radius: 12px;
            box-shadow: 0 5px 25px rgba(0,0,0,0.08);
            overflow: hidden;
          }
          .header {
            background: linear-gradient(135deg, #667eea, #764ba2);
            color: #fff;
            text-align: center;
            padding: 40px 25px;
          }
          .header h1 { margin: 0; font-size: 26px; font-weight: 700; }
          .content { padding: 35px 25px; color: #333; line-height: 1.7; }
          .content p { margin: 15px 0; font-size: 15px; }
          .footer {
            background: #f1f3f5;
            text-align: center;
            padding: 20px;
            color: #555;
            font-size: 13px;
          }
        </style>
      </head>
      <body>
        <div class="wrapper">
          <div class="header">
            <h1>Hi ${name}, your message has been received!</h1>
          </div>
          <div class="content">
            <p>Thank you for getting in touch — I really appreciate you taking the time to write.</p>
            <p>I’ve received your message and will personally get back to you as soon as I can. 
               Usually I reply within one business day.</p>
            <p>If your request is urgent, feel free to reply to this email directly, and I’ll do my best to prioritize it.</p>
            <p>Warm regards,<br><strong>Paresh Patil</strong></p>
          </div>
          <div class="footer">
            <p>This is an automatic confirmation just to let you know your message went through successfully.</p>
          </div>
        </div>
      </body>
    </html>
  `,
    };

    // Send both emails
    await transporter.sendMail(mailOptions);
    await transporter.sendMail(autoReplyOptions);

    console.log(`✅ Email sent successfully from: ${name} (${email})`);

    res.status(200).json({
      success: true,
      message:
        "Thank you for reaching out! Your message has been sent successfully.",
      data: {
        name,
        email,
        phone,
        timestamp: new Date().toISOString(),
      },
    });
  } catch (error) {
    console.error("❌ Error sending email:", error);

    // Provide more specific error messages
    let errorMessage = "Failed to send message. Please try again later.";

    if (error.code === "EAUTH") {
      errorMessage =
        "Email configuration error. Please contact the administrator.";
      console.error("⚠️  Check your EMAIL_USER and EMAIL_PASS in .env file");
    } else if (error.code === "ECONNECTION") {
      errorMessage =
        "Could not connect to email server. Please try again later.";
    }

    res.status(500).json({
      success: false,
      message: errorMessage,
      error: process.env.NODE_ENV === "development" ? error.message : undefined,
    });
  }
});

// 404 handler
app.use((req, res) => {
  res.status(404).json({
    success: false,
    message: "Endpoint not found",
  });
});

// Error handler
app.use((error, req, res, next) => {
  console.error("❌ Server error:", error);
  res.status(500).json({
    success: false,
    message: "Internal server error",
    error: process.env.NODE_ENV === "development" ? error.message : undefined,
  });
});

app.listen(PORT, () => {
  console.log(`🚀 Server is running on port ${PORT}`);
  console.log(`📍 API URL: http://localhost:${PORT}`);
  console.log(`🌐 Environment: ${process.env.NODE_ENV || "development"}`);
  console.log(`📧 Email configured: ${process.env.EMAIL_USER || "Not set"}`);
});
