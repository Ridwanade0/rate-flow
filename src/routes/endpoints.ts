import { Request, Response, Router } from "express";

const router = Router();

router.get("/currencies-json", (req: Request, res: Response) => {
 res.render("currencies")
})

export default router;