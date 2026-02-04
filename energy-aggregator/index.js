import express from "express";
import dotenv from "dotenv";
import telemetryRoutes from "./routes/telemetryRoutes.js";
import { requestLogger } from "./middleware/requestLogger.js";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3001;

app.use(express.json());
app.use(requestLogger);

app.use("/api", telemetryRoutes);

app.get("/", (req, res) => {
  res.send("Energy Aggregator Client is Running. Use /api/aggregate to fetch data.");
});

app.listen(PORT, () => {
  console.log(`🚀 Energy Aggregator Service running on http://localhost:${PORT}`);
  console.log(`📡 Mock API expected at http://localhost:3000`);
});
