// Import necessary modules
import "dotenv/config"; // Load environment variables from .env file
import express, { Request, Response } from "express"; // Import express and necessary types
import authRoutes from "./routes/authRoute"; // Import authentication routes
import connectMongoDB from "./lib/connectMongoDB"; // Import MongoDB connection function

// Initialize the express application
const app = express();
const PORT: string | undefined = process.env.PORT; // Define the port from environment variables

// Middleware setup
app.use(express.json()); // Parse JSON request bodies
app.use(express.static("public")); // Serve static files from the 'public' directory
app.set("view engine", "ejs"); // Set the template engine to EJS

// Connect to MongoDB
connectMongoDB();

// Route for the home page
app.get("/", (req: Request, res: Response): void => {
  res.render("index", { title: "Rate Flow" }); // Render the index page with a title
});

// Use authentication routes
app.use("/auth", authRoutes);

// Start the server
app.listen(PORT, (): void => {
  console.log(`Server is running at http://localhost:${PORT}`); // Log server status
});
