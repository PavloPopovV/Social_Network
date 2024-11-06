import express from "express";
import path from "path";
import dotenv from "dotenv";
import cors from "cors";
import cookieParser from "cookie-parser";
import connectToDB from "./db/connectToDB.js";
import router from "./routes/index.js";
import { app, server } from "./socket/socket.js";

const __dirname = path.resolve();
dotenv.config();

const corsOptions = {
  origin: ['http://localhost:5173'], // Ваш клієнт
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'], // Дозволені методи
  allowedHeaders: ['Content-Type', 'Authorization'], // Дозволені заголовки
  credentials: true, // Якщо потрібно передавати куки
};

const PORT = process.env.PORT || 5000;

app.use(express.urlencoded({ extended: true }));
app.use(express.json()); 
app.use(cookieParser());
app.use(cors(corsOptions));

app.use("/api", router); 

app.use(express.static(path.join(__dirname, "/frontend/dist")));
app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "frontend", "dist", "index.html"));
});

server.listen(PORT, () => {
  connectToDB();
  console.log(`Server work on port ${PORT}`);
});
