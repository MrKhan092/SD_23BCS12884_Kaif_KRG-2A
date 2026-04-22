import express from "express";
import path from "path";
import dotenv from "dotenv"
import { ENV } from "./lib/env.js";
import { connectDB } from "./lib/db.js";
import {serve} from "inngest/express"
import cors from "cors"
import { inngest,functions } from "./lib/inngest.js";
import { clerkMiddleware } from "@clerk/express";

import chatRoutes from"./routes/chatRoutes.js"
import sessionRoutes from "./routes/sessionRoute.js"
dotenv.config();
const app=express();

const __dirname=path.resolve()

app.use(express.json())
app.use(
  cors({
    origin: [
      "http://localhost:5173",
      "https://code-sphere-beta.vercel.app",
    ],
    credentials: true,
  })
);
app.use(clerkMiddleware())

app.use("/api/inngest",serve({client:inngest,functions}))
app.use("/api/chat",chatRoutes)
app.use("/api/sessions",sessionRoutes)
app.get("/", (req, res) => {
  res.json({
    message: "CodeSphere API running successfully 🚀"
  });
});
const startServer=async ()=>{
    try{
        await connectDB()
        app.listen(ENV.PORT, () => {
        console.log("server is runnig on port:", ENV.PORT);
        });
    }catch(error){
        console.error("Error starting the server",error);
    }
}

startServer();