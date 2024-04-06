import { Express } from "express";
import { setup } from "./app";

import config from "./config";

export default async function startServer(app: Express) {
  const { port } = await setup(); // Setup app and get port
  app
    .listen(port, async () => {
        console.log(`Server listening on port ${port}`);
      
    })
    .setTimeout(config!.timeout);
}
