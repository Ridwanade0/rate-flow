import "dotenv/config";
import express from "express";
import path from "path";

const app = express();
const PORT = process.env.PORT

app.use(express.static("public"))
app.set("views", path.join(__dirname, "../public/views"));
app.set("view engine", "ejs")

app.get("/", (req, res) => {
 res.render('index', { title: 'Rate Flow', message: 'Welcome to Rate Flow API' });
})

app.listen(PORT, ()=> {
 console.log(`Server is running at http://localhost:${PORT}`)
})