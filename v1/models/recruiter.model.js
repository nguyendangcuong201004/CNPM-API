const mongoose = require("mongoose");

const recruiterSchema = new mongoose.Schema({
    fullName: String,
    age: Number,
    gender: String,
    email: String,
    phone: String,
    company: String,
    password: String,
    token: String,
    addressOfCompany: String,
}, {
    timestamps: true
})

const Recruiter = mongoose.model("Recruiter", recruiterSchema, "recruiters");

module.exports = Recruiter;