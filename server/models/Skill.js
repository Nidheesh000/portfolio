const mongoose = require('mongoose');

const skillSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, 'Please add a skill name'],
      trim: true,
    },
    category: {
      type: String,
      required: [true, 'Please select a skill category'],
      enum: ['Frontend', 'Backend', 'Database', 'Tools', 'Other'],
    },
    proficiency: {
      type: Number,
      required: [true, 'Please add proficiency level (0-100)'],
      min: [0, 'Proficiency cannot be less than 0'],
      max: [100, 'Proficiency cannot be more than 100'],
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model('Skill', skillSchema);
