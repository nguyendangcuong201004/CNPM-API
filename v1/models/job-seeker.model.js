const mongoose = require("mongoose");

const jobSeekerSchema = new mongoose.Schema({
    fullName: String,
    age: Number,
    gender: String,
    email: String,
    phone: String,
    address: String,
    status: String,
    password: String,
    token: String
}, {
    timestamps: true
})

const JobSeeker = mongoose.model("JobSeeker", jobSeekerSchema, "jobseekers");

module.exports = JobSeeker;