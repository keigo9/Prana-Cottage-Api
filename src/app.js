const express = require("express");
const cors = require("cors");
const calendarRoutes = require("./routes/calendar");

const app = express();
const PORT = process.env.PORT || 4000;

// CORSの詳細設定
const corsOptions = {
  origin:
    process.env.NODE_ENV === "production"
      ? process.env.ALLOWED_ORIGINS?.split(",")
      : ["http://localhost:3000"],
  methods: ["GET"], // カレンダー読み取りのみの場合
  allowedHeaders: ["Content-Type"],
  credentials: true,
  maxAge: 86400,
};

// corsOptionsを適用
app.use(cors(corsOptions));
app.use(express.json());
app.use("/api/calendar", calendarRoutes);

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
