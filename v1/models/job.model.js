const mongoose = require("mongoose");

const jobSchema = new mongoose.Schema({
    recruiterId: String,
    title: String,                 // Tiêu đề công việc
    description: String,           // Mô tả công việc
    requirements: String,          // Yêu cầu công việc
    location: String,              // Địa điểm làm việc
    salary: String,                // Mức lương
    status: String,
    jobType: String,
    postedDate: {
        type: Date,
        default: Date.now        
    },          
    resumes: Array,
}, {
    timestamps: true              // Tự động thêm các trường createdAt và updatedAt
});

const Job = mongoose.model("Job", jobSchema, "jobs");

module.exports = Job;
