# Arkahub-Assignment: EnergyGrid Data Aggregator

This repository contains the solution for the EnergyGrid Data Aggregator coding assignment. It includes both the provided Mock API and the developed Client Aggregator.

## Prerequisites

-   Node.js (v14 or higher)
-   npm (Node Package Manager)

## Project Components

1.  **Mock API**: A simulated server that enforces strict rate limits (1 req/sec) and requires signature headers.
2.  **Energy Aggregator**: A Node.js client that handles data fetching, batching, rate limiting, and aggregation.

---

## 1. Setting up the Mock API

The mock server simulates the grid data endpoints.

1.  **Navigate to the root directory** (if not already there):
    ```bash
    # Root of the repo
    cd Arkahub_Software\ Engineering\ Internship_Assignment
    ```

2.  **Install Dependencies**:
    ```bash
    npm install
    ```

3.  **Start the Server**:
    ```bash
    node server.js
    ```
    ✅ **Success**: You should see:
    ```
    ⚡ EnergyGrid Mock API running on port 3000
       Constraints: 1 req/sec, Max 10 items/batch
    ```

---

## 2. Running the Energy Aggregator Solution

The solution logic stays in the `energy-aggregator` folder.

1.  **Open a New Terminal** and navigate to the aggregator directory:
    ```bash
    cd energy-aggregator
    ```

2.  **Install Dependencies**:
    ```bash
    npm install
    ```

3.  **Start the Aggregator Service**:
    ```bash
    npm start
    ```
    ✅ **Success**: You should see:
    ```
    🚀 Energy Aggregator Service running on http://localhost:3001
    ```

4.  **Trigger Data Aggregation**:
    Send a request to the aggregator to start the process:
    ```bash
    curl http://localhost:3001/api/aggregate
    ```
    *The process will run for approximately 55 seconds (due to rate limiting), logging progress to the terminal.*

---

## Approach & Design

### Rate Limiting & Concurrency
The Mock API strictly enforces a **1 request per second** limit. To ensure compliance and robustness:

*   **Batching**: We utilize the maximum allowed batch size of **10 devices** per request. For 500 devices, this results in exactly 50 API calls.
*   **Sequential Processing**: Instead of concurrent requests (which would immediately hit the rate limit), we process batches **sequentially**.
*   **Controlled Delay**: After each request, the application waits for **1050ms** (1 sec + 50ms buffer). This slight buffer accounts for network jitter and execution time, ensuring we never hit the `429 Too Many Requests` error.
*   **Error Handling**: if a `429` (Rare) or network error occurs, it is logged, and the loop proceeds to the next batch.

### Code Structure
The solution uses **ES6 Modules** and follows a clean separation of concerns:
-   `controllers/`: Handles business logic (orchestration of batches).
-   `utils/`: Contains helper functions for API requests (Axios) and Mock Data generation.
-   `routes/`: Defines the API endpoints.
-   `middleware/`: Request logging.

### Assumptions
*   **Mock Server Port**: Assumed to be running on default port `3000`.
*   **Environment**: The code runs in a trusted environment where the `SECRET_TOKEN` can be stored in code (for this assignment).
*   **Data Consistency**: We assume the 500 dummy Serial Numbers generated on the client side match the format expected by the server.

---

## API Details (Reference)

-   **Mock API URL**: `http://localhost:3000/device/real/query`
-   **Method**: `POST`
-   **Auth Token**: `interview_token_123`
-   **Security**: Requires formatted `timestamp` and MD5 `signature` headers.
