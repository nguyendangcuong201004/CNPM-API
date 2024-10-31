const mongoose = require("mongoose");

const resumeSchema = new mongoose.Schema({
    jobSeekerID: String,
    status: { type: String,
        default: "finding"
     },
    degree: String,
    field: String,
    institution: String,
    startDate: String,
    endDate: String,
    position: String,
    experience: String,
    description: String,
    skills: String,
    certifications: String,
    languages: String,
    summary: String,
}, {
    timestamps: true
});


const Resume = mongoose.model("Resume", resumeSchema, "resumes");

module.exports = Resume;