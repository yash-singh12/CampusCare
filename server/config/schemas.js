import mongoose from 'mongoose';

// Issue Schema
const issueSchema = new mongoose.Schema({
  issue_type: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    default: null,
  },
  facility_id: {
    type: String,
    required: true,
  },
  status: {
    type: String,
    default: 'Reported',
    enum: ['Reported', 'In Progress', 'Resolved', 'On Hold'],
  },
  priority: {
    type: String,
    default: 'Low',
    enum: ['Critical', 'High', 'Medium', 'Low'],
  },
  image_url: {
    type: String,
    default: null,
  },
  action_remarks: {
    type: String,
    default: null,
  },
  created_at: {
    type: Date,
    default: Date.now,
  },
  updated_at: {
    type: Date,
    default: Date.now,
  },
});

// Facility Schema
const facilitySchema = new mongoose.Schema({
  facility_id: {
    type: String,
    required: true,
    unique: true,
  },
  name: {
    type: String,
    required: true,
  },
  building: {
    type: String,
    required: true,
  },
  floor: {
    type: String,
    required: true,
  },
  room_number: {
    type: String,
    default: null,
  },
  created_at: {
    type: Date,
    default: Date.now,
  },
});

export const Issue = mongoose.model('Issue', issueSchema);
export const Facility = mongoose.model('Facility', facilitySchema);
