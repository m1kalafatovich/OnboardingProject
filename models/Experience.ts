import mongoose from 'mongoose';
const { Schema } = mongoose;

const ExperienceSchema = new mongoose.Schema({
    company: String,
    title: String,
    location: String,
    startDate: Date,
    endDate: Date,
    description: String
});

export const Experience = mongoose.model('Experience', ExperienceSchema);