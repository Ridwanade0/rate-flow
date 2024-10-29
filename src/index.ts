import "dotenv/config";
import express from "express";
import authRoutes from "./routes/authRoutes";
import connectMongoDB from "./lib/connectMongoDB";
import path from "path";

(async () => {
  const app = express();
  const PORT = process.env.PORT || 3000;
  app.use(express.json());
  app.use(express.static(path.join(__dirname, "..", "public")));
  await connectMongoDB();
  app.use("/auth", authRoutes);
  app.listen(PORT, () => {
    console.log(`Server running at: http://localhost:${PORT}`);
  });
})();
