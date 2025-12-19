import mongoose from 'mongoose';
const { Schema } = mongoose;

const ProjectSchema = new mongoose.Schema({
    projectName: String,
    startDate: Date,
    endDate: Date,
    description: String,
    deploymentLink: String,
    githubLink: String
});

export const Project = mongoose.model('Project', ProjectSchema);