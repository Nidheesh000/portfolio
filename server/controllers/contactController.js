const ContactMessage = require('../models/ContactMessage');
const Project = require('../models/Project');
const Skill = require('../models/Skill');
const nodemailer = require('nodemailer');

// @desc    Submit a contact message
// @route   POST /api/contact
// @access  Public
const submitMessage = async (req, res) => {
  try {
    const { name, email, subject, message } = req.body;

    const newMessage = new ContactMessage({
      name,
      email,
      subject,
      message,
    });

    const savedMessage = await newMessage.save();

    // Send email notification (optional/configured)
    if (
      process.env.EMAIL_USER &&
      process.env.EMAIL_PASS &&
      process.env.CONTACT_RECEIVER_EMAIL &&
      process.env.EMAIL_USER !== 'your-email@gmail.com'
    ) {
      try {
        const transporter = nodemailer.createTransport({
          service: process.env.EMAIL_SERVICE || 'gmail',
          auth: {
            user: process.env.EMAIL_USER,
            pass: process.env.EMAIL_PASS,
          },
        });

        const mailOptions = {
          from: process.env.EMAIL_USER,
          to: process.env.CONTACT_RECEIVER_EMAIL,
          subject: `Portfolio Contact: ${subject}`,
          html: `
            <h3>New Contact Message</h3>
            <p><strong>Name:</strong> ${name}</p>
            <p><strong>Email:</strong> ${email}</p>
            <p><strong>Subject:</strong> ${subject}</p>
            <p><strong>Message:</strong></p>
            <p>${message}</p>
          `,
        };

        await transporter.sendMail(mailOptions);
        console.log('Notification email sent successfully');
      } catch (emailErr) {
        console.error('Email sending failed: ', emailErr.message);
        // We do not fail the request if only the email notification failed
      }
    }

    res.status(201).json({
      success: true,
      message: 'Message sent successfully!',
      data: savedMessage,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Get all contact messages
// @route   GET /api/contact
// @access  Private
const getMessages = async (req, res) => {
  try {
    const messages = await ContactMessage.find({}).sort({ createdAt: -1 });
    res.json(messages);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Mark a message as read / unread
// @route   PUT /api/contact/:id
// @access  Private
const updateMessageStatus = async (req, res) => {
  try {
    const message = await ContactMessage.findById(req.params.id);

    if (!message) {
      return res.status(404).json({ message: 'Message not found' });
    }

    message.isRead = req.body.isRead !== undefined ? req.body.isRead : !message.isRead;

    const updatedMessage = await message.save();
    res.json(updatedMessage);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Delete a message
// @route   DELETE /api/contact/:id
// @access  Private
const deleteMessage = async (req, res) => {
  try {
    const message = await ContactMessage.findById(req.params.id);

    if (!message) {
      return res.status(404).json({ message: 'Message not found' });
    }

    await message.deleteOne();
    res.json({ message: 'Message removed' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Get Admin Dashboard Stats
// @route   GET /api/contact/stats
// @access  Private
const getDashboardStats = async (req, res) => {
  try {
    const projectsCount = await Project.countDocuments();
    const skillsCount = await Skill.countDocuments();
    const totalMessages = await ContactMessage.countDocuments();
    const unreadMessages = await ContactMessage.countDocuments({ isRead: false });

    // Latest activity log or lists could also be sent
    res.json({
      projects: projectsCount,
      skills: skillsCount,
      messages: {
        total: totalMessages,
        unread: unreadMessages,
      },
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = {
  submitMessage,
  getMessages,
  updateMessageStatus,
  deleteMessage,
  getDashboardStats,
};
