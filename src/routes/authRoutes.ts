// importing neccessary modules
import { Request, Response, Router } from "express"; // imported the express router
import signupController from "../controller/signupController"; //imported the signup controller to control the signup process
import loginController from "../controller/loginController"; // imported the loginController to authenticate users

const router = Router(); // initialized the express router instance

router.post("/signup", signupController); // created and initailzed a post request route handler
router.get("/signup", (req: Request, res: Response)=> {
 res.render("auth/signup")
}); // created and initialzed a get request route handler to render the signup form
router.post("/login", loginController); // created login controller for authentcating the user
router.get("/login", (req: Request, res: Response)=> {
 res.render("auth/login")
})

export default router; // exported teh express router instance for the authRoute middleware
