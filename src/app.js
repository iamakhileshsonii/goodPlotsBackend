import express from "express";
import cookieParser from "cookie-parser";
import cors from "cors";

const app = express();

// CROSS ORIGIN : Allow the data to fetch from origin
app.use(
  cors({
    origin: process.env.CORS_ORIGIN,
    optionsSuccessStatus: 200, //
  })
);

// Get data from URL
app.use(
  express.urlencoded({
    limit: "16kb",
    extended: true,
  })
);

// Get data in JSON format
app.use(
  express.json({
    limit: "16kb",
  })
);

app.use(express.static("public"));

// Cookie Parser
app.use(cookieParser());

export { app };
