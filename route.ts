import { Request, Response, Express } from "express";


import  testRoute  from "./router/test.route";


export default function setupRoutes(app: Express) {
  app.use("/", testRoute);
}
