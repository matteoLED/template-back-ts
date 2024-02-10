require("dotenv").config();

import express, { Response, Request } from "express";
import cors from "cors";

const PORT = process.env.PORT || 3000;

const api = express();
api.use(express.json());
api.use(cors());

const ads = [{ Message: `Api is running on Port: ${PORT}` }];

api.get("/", (req: Request, res: Response) => {
  res.json(ads);
});

api.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

module.exports = api;
