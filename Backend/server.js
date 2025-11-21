// server.js - Backend for Portfolio (Fixed Email Configuration)
const express = require("express");
const cors = require("cors");
const nodemailer = require("nodemailer");
require("dotenv").config();

const app = express();
const PORT = process.env.PORT || 5000;

// CORS Configuration - Allow frontend to connect
app.use(
  cors({
    origin: [
      process.env.FRONTEND_URL,
      "https://paresh-dev.onrender.com",
      "http://localhost:5173"
    ],
    credentials: true,
    methods: ["GET", "POST", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization"],
  })
);

app.use(express.json());

// In-memory view counter (resets when server restarts)
let viewCount = 0;

// Email Transporter Configuration with better settings
const transporter = nodemailer.createTransport({
  service: "gmail",
  host: "smtp.gmail.com",
  port: 587,
  secure: false, // Use TLS
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
  tls: {
    rejectUnauthorized: false
  }
});

// Verify email configuration on startup
transporter.verify((error, success) => {
  if (error) {
    console.error("❌ Email configuration error:", error);
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

// Get view count endpoint
app.get("/api/views", (req, res) => {
  res.json({
    success: true,
    views: viewCount,
  });
});

// Increment view count endpoint
app.post("/api/views/increment", (req, res) => {
  viewCount++;
  res.json({
    success: true,
    views: viewCount,
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
    // Respond to user immediately
    res.status(200).json({
      success: true,
      message: "Thank you for reaching out! Your message has been sent successfully.",
      data: {
        name,
        email,
        phone,
        timestamp: new Date().toISOString(),
      },
    });

    // Send emails in background (non-blocking)
    setImmediate(async () => {
      try {
        // Email to yourself (notification)
        const mailOptions = {
          from: `"Portfolio Contact Form" <${process.env.EMAIL_USER}>`,
          to: process.env.EMAIL_USER,
          replyTo: email,
          subject: `New Contact Form Submission from ${name}`,
          html: `
            <!DOCTYPE html>
            <html>
            <head>
              <style>
                body {
                  font-family: Arial, sans-serif;
                  line-height: 1.6;
                  color: #333;
                  max-width: 600px;
                  margin: 0 auto;
                  padding: 20px;
                }
                .container {
                  background: #f9f9f9;
                  border-radius: 10px;
                  padding: 30px;
                  box-shadow: 0 2px 10px rgba(0,0,0,0.1);
                }
                .header {
                  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
                  color: white;
                  padding: 20px;
                  border-radius: 10px 10px 0 0;
                  margin: -30px -30px 20px -30px;
                }
                .header h2 {
                  margin: 0;
                  font-size: 24px;
                }
                .info-row {
                  background: white;
                  padding: 15px;
                  margin: 10px 0;
                  border-radius: 5px;
                  border-left: 4px solid #667eea;
                }
                .label {
                  font-weight: bold;
                  color: #667eea;
                  display: block;
                  margin-bottom: 5px;
                }
                .message-box {
                  background: white;
                  padding: 20px;
                  margin: 20px 0;
                  border-radius: 5px;
                  border: 1px solid #ddd;
                }
                .footer {
                  text-align: center;
                  margin-top: 30px;
                  padding-top: 20px;
                  border-top: 1px solid #ddd;
                  color: #666;
                  font-size: 12px;
                }
              </style>
            </head>
            <body>
              <div class="container">
                <div class="header">
                  <h2>🎉 New Contact Form Submission</h2>
                </div>
                
                <div class="info-row">
                  <span class="label">👤 Name:</span>
                  ${name}
                </div>
                
                <div class="info-row">
                  <span class="label">📧 Email:</span>
                  <a href="mailto:${email}">${email}</a>
                </div>
                
                <div class="info-row">
                  <span class="label">📱 Phone:</span>
                  <a href="tel:${phone}">${phone}</a>
                </div>
                
                <div class="message-box">
                  <span class="label">💬 Message:</span>
                  <p>${message.replace(/\n/g, '<br>')}</p>
                </div>
                
                <div class="footer">
                  <p>This email was sent from your portfolio contact form</p>
                  <p>Received at: ${new Date().toLocaleString('en-IN', { 
                    dateStyle: 'full', 
                    timeStyle: 'long' 
                  })}</p>
                </div>
              </div>
            </body>
            </html>
          `,
          text: `
            New Contact Form Submission
            
            Name: ${name}
            Email: ${email}
            Phone: ${phone}
            
            Message:
            ${message}
            
            Received at: ${new Date().toISOString()}
          `
        };

        // Auto-reply to sender
        const autoReplyOptions = {
          from: `"Paresh Patil" <${process.env.EMAIL_USER}>`,
          to: email,
          subject: "Thank you for contacting me! 🙏",
          html: `
            <!DOCTYPE html>
            <html>
            <head>
              <style>
                body {
                  font-family: Arial, sans-serif;
                  line-height: 1.6;
                  color: #333;
                  max-width: 600px;
                  margin: 0 auto;
                  padding: 20px;
                }
                .container {
                  background: #f9f9f9;
                  border-radius: 10px;
                  padding: 30px;
                  box-shadow: 0 2px 10px rgba(0,0,0,0.1);
                }
                .header {
                  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
                  color: white;
                  padding: 30px 20px;
                  border-radius: 10px 10px 0 0;
                  margin: -30px -30px 20px -30px;
                  text-align: center;
                }
                .header h2 {
                  margin: 0;
                  font-size: 28px;
                }
                .content {
                  background: white;
                  padding: 25px;
                  border-radius: 5px;
                  margin: 20px 0;
                }
                .highlight {
                  background: #fff3cd;
                  padding: 15px;
                  border-radius: 5px;
                  border-left: 4px solid #ffc107;
                  margin: 20px 0;
                }
                .details-box {
                  background: #f8f9fa;
                  padding: 15px;
                  border-radius: 5px;
                  margin: 15px 0;
                }
                .footer {
                  text-align: center;
                  margin-top: 30px;
                  padding-top: 20px;
                  border-top: 1px solid #ddd;
                  color: #666;
                }
                .social-links {
                  margin: 20px 0;
                  text-align: center;
                }
                .social-links a {
                  display: inline-block;
                  margin: 0 10px;
                  color: #667eea;
                  text-decoration: none;
                  font-weight: bold;
                }
              </style>
            </head>
            <body>
              <div class="container">
                <div class="header">
                  <h2>✨ Thank You for Reaching Out!</h2>
                </div>
                
                <div class="content">
                  <p>Hi <strong>${name}</strong>,</p>
                  
                  <p>Thank you for contacting me through my portfolio website! I've successfully received your message and I'm excited to connect with you.</p>
                  
                  <div class="highlight">
                    <strong>⏰ Expected Response Time:</strong> Within 24-48 hours
                  </div>
                  
                  <p>Here's a summary of your submission:</p>
                  
                  <div class="details-box">
                    <strong>Your Details:</strong><br>
                    📧 Email: ${email}<br>
                    📱 Phone: ${phone}<br>
                    📅 Submitted: ${new Date().toLocaleString('en-IN', { 
                      dateStyle: 'full', 
                      timeStyle: 'short' 
                    })}
                  </div>
                  
                  <div class="details-box">
                    <strong>Your Message:</strong><br>
                    <p>${message.replace(/\n/g, '<br>')}</p>
                  </div>
                  
                  <p>I'll review your message carefully and get back to you as soon as possible. If your inquiry is urgent, feel free to reach out to me directly at <a href="mailto:${process.env.EMAIL_USER}">${process.env.EMAIL_USER}</a>.</p>
                  
                  <div class="social-links">
                    <p>Connect with me:</p>
                    <a href="https://github.com/Paresh-Patil-11">GitHub</a> |
                    <a href="https://www.linkedin.com/in/pareshpatil11/">LinkedIn</a>
                  </div>
                </div>
                
                <div class="footer">
                  <p><strong>Paresh Patil</strong></p>
                  <p>Full-Stack Web Developer</p>
                  <p style="font-size: 12px; color: #999;">
                    This is an automated response. Please do not reply to this email.
                  </p>
                </div>
              </div>
            </body>
            </html>
          `,
          text: `
            Hi ${name},
            
            Thank you for contacting me through my portfolio website! I've successfully received your message and I'm excited to connect with you.
            
            Expected Response Time: Within 24-48 hours
            
            Your Details:
            Email: ${email}
            Phone: ${phone}
            Submitted: ${new Date().toLocaleString()}
            
            Your Message:
            ${message}
            
            I'll review your message carefully and get back to you as soon as possible.
            
            Best regards,
            Paresh Patil
            Full-Stack Web Developer
          `
        };

        // Send both emails in parallel
        console.log("📧 Sending emails in background...");
        
        await Promise.all([
          transporter.sendMail(mailOptions),
          transporter.sendMail(autoReplyOptions)
        ]);
        
        console.log("✅ Both emails sent successfully!");
        
      } catch (emailError) {
        console.error("❌ Error sending emails in background:", emailError);
      }
    });

  } catch (error) {
    console.error("❌ Error sending emails:", error);

    let errorMessage = "Failed to send message. Please try again later.";

    if (error.code === "EAUTH") {
      errorMessage = "Email authentication failed. Please contact the administrator.";
      console.error("Authentication Error: Check your EMAIL_USER and EMAIL_PASS in .env");
    } else if (error.code === "ECONNECTION" || error.code === "ETIMEDOUT") {
      errorMessage = "Could not connect to email server. Please try again later.";
      console.error("Connection Error: Check your internet connection and Gmail settings");
    } else if (error.responseCode === 550) {
      errorMessage = "Email delivery failed. Please contact support.";
      console.error("Delivery Error: Recipient email may be invalid");
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
  console.log(`📧 Email configured for: ${process.env.EMAIL_USER}`);
});
