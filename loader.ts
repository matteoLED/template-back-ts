import setupRoutes from "./route";
import startServer from "./server";

async function main() {
  const { app } = await import("./app");

  await startServer(app);

  setupRoutes(app);
}

main().catch((error) => {
  console.error("Error starting server:", error);
  process.exit(1);
});
