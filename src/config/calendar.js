require("dotenv").config();
const { google } = require("googleapis");

const SCOPES = "https://www.googleapis.com/auth/calendar.readonly";
const calendar = google.calendar("v3");

const auth = new google.auth.JWT(
  process.env.GOOGLE_CLIENT_EMAIL,
  null,
  process.env.GOOGLE_PRIVATE_KEY,
  SCOPES
);

const googleCalendar = {
  auth,
  calendar,
};

module.exports = googleCalendar;
