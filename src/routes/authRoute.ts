import express from "express";

const router = express.Router()

router.get("/signup", (req, res) => {
 res.render("signup")
})
router.post("/signup", (req, res) => {
 res.send("you posted succesfully")
})

export default router