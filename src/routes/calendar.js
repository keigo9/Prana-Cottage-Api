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

    const formattedEvents = response.data.items.map((event) => ({
      id: event.id,
      start: event.start.date || event.start.dateTime,
      end: event.end.date
        ? // endDateは+1日されて取得されるのでAPIとして返すときに-1してあげる
          new Date(
            new Date(event.end.date).setDate(
              new Date(event.end.date).getDate() - 1
            )
          )
            .toISOString()
            .split("T")[0]
        : event.end.dateTime,
    }));

    res.json(formattedEvents);
  } catch (error) {
    console.error("Error fetching calendar events:", error);
    res.status(500).json({ error: "Failed to fetch calendar events" });
  }
});

module.exports = router;
