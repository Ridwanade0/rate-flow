// importing neccessary modules
import { Router } from "express"; // imported the express router
import signupController from "../controller/signupController"; //imported the signup controller to control the signup process

const router = Router(); // initialized the express router instance

router.post("/signup", signupController); // created and initailzed a post request route handler

export default router; // exported teh express router instance for the authRoute middleware
