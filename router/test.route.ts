
import { Router } from "express";


const route = Router();


route.get("/test", (req, res) => {
  res.send("Hello World!");
});


export default route;