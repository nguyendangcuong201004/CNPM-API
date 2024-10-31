const resumeRoutes = require("./resume.route.js")
const jobSeekerRoutes = require("./job-seeker.route.js")
const recruiterRoutes = require("./recruiter.route.js")
const jobRoutes = require("./job.route.js")
const applyRoutes = require("./apply.route.js")

const requireAuth = require("../../middlewares/auth.middleware");

module.exports = (app) => {
    const version = "/api/v1";

    app.use(`${version}/resumes`, requireAuth.requireAuth, resumeRoutes)

    app.use(`${version}/jobs`, requireAuth.requireAuth, jobRoutes)

    app.use(`${version}/job-seeker`, jobSeekerRoutes)

    app.use(`${version}/recruiter`, recruiterRoutes)

    app.use(`${version}/apply`, requireAuth.requireAuth, applyRoutes)

}