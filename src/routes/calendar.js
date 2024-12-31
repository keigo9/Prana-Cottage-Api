const express = require("express");
const router = express.Router();
const { auth, calendar } = require("../config/calendar");

router.get("/events", async (req, res) => {
  try {
    const response = await calendar.events.list({
      auth: auth,
      calendarId: process.env.GOOGLE_CALENDAR_ID,
      timeMin: new Date().toISOString(),
      singleEvents: true,
      orderBy: "startTime",
    });

    res.json(response.data.items);
  } catch (error) {
    console.error("Error fetching calendar events:", error);
    res.status(500).json({ error: "Failed to fetch calendar events" });
  }
});

module.exports = router;
