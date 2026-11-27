/** Entry point that starts the HTTP server and handles fatal listener errors. */
import app from "./app.js";

const PORT = process.env.PORT || 3000;

const server = app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});

/** Logs fatal server errors (for example a busy port) and exits the process. */
server.on("error", (error) => {
  console.error("Server error:", error);
  process.exit(1);
});
