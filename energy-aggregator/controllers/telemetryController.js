import { generateSerialNumbers } from "../utils/mockDb.js";
import { fetchDeviceData } from "../utils/apiClient.js";

const sleep = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

export const getAggregatedData = async (req, res) => {
  console.log("Starting Aggregation Process...");
  const startTime = Date.now();

  try {
    const allSerialNumbers = generateSerialNumbers();
    const totalDevices = allSerialNumbers.length;
    const batchSize = 10;
    const aggregatedResults = [];

    console.log(
      `Generated ${totalDevices} Serial Numbers. Batching size: ${batchSize}.`
    );

    for (let i = 0; i < totalDevices; i += batchSize) {
      const batch = allSerialNumbers.slice(i, i + batchSize);
      console.log(
        `Processing Batch ${Math.floor(i / batchSize) + 1}/${Math.ceil(
          totalDevices / batchSize
        )}`
      );

      try {
        const responseData = await fetchDeviceData(batch);
        if (responseData && responseData.data) {
          aggregatedResults.push(...responseData.data);
        }
      } catch (error) {
        console.error(
          `Failed to fetch batch starting at index ${i}:`,
          error.message
        );
      }

      if (i + batchSize < totalDevices) {
        await sleep(1050);
      }
    }

    const duration = ((Date.now() - startTime) / 1000).toFixed(2);
    console.log(`Aggregation Complete in ${duration}s.`);

    res.json({
      meta: {
        total_devices: totalDevices,
        devices_processed: aggregatedResults.length,
        duration_seconds: duration,
        timestamp: new Date().toISOString(),
      },
      data: aggregatedResults,
    });
  } catch (error) {
    console.error("Aggregation Controller Error:", error);
    res.status(500).json({ error: "Internal Server Error during aggregation" });
  }
};
