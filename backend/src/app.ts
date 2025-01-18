import dotenv from "dotenv";
import express from "express";
import connectToDatabase from "./dbConnect";
import userRoute from "./routes/userRoutes";
import cors from "cors";

dotenv.config();
const app = express();
const port = process.env.PORT || 8000;

connectToDatabase();
app.use(
  cors({
    origin: process.env.FRONTEND_URI,
    credentials: true,
  })
);

app.use(express.json());
app.use("/api/users", userRoute);

app.listen(port, () => {
  console.log(`Server is running on ${port}`);
});
