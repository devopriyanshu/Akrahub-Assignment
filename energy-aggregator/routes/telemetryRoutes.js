import express from "express";
import { getAggregatedData } from "../controllers/telemetryController.js";

const router = express.Router();

router.get("/aggregate", getAggregatedData);

export default router;
