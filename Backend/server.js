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
    origin: process.env.FRONTEND_URL || "https://paresh-dev.onrender.com/",
    credentials: true,
    methods: ["GET", "POST", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization"],
  })
);

app.use(express.json());

// In-memory view counter (resets when server restarts)
let viewCount = 0;

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
    const mailOptions = {
      from: process.env.EMAIL_USER,
      to: process.env.EMAIL_USER,
      replyTo: email,
      subject: `New Contact Form Submission - ${name}`,
      html: `...`, // unchanged HTML (omitted for brevity)
    };

    const autoReplyOptions = {
      from: process.env.EMAIL_USER,
      to: email,
      subject: "Thank you for contacting me",
      html: `...`, // unchanged HTML (omitted for brevity)
    };

    // Respond immediately
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

    // Send emails silently (no console.log)
    Promise.all([
      transporter.sendMail(mailOptions),
      transporter.sendMail(autoReplyOptions)
    ]).catch(error => {
      console.error("❌ Error sending emails:", error);
    });

  } catch (error) {
    console.error("❌ Error processing contact form:", error);

    let errorMessage = "Failed to send message. Please try again later.";

    if (error.code === "EAUTH") {
      errorMessage = "Email configuration error. Please contact the administrator.";
    } else if (error.code === "ECONNECTION") {
      errorMessage = "Could not connect to email server. Please try again later.";
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

app.listen(PORT);
