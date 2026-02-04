# EnergyGrid Mock API

This is the mock backend server for the EnergyGrid Data Aggregator coding assignment.

## Prerequisites

- Node.js (v14 or higher)
- npm (Node Package Manager)

## Setup and Run

1.  **Navigate to the project directory:**
    ```bash
    cd mock-api
    ```

2.  **Install dependencies:**
    ```bash
    npm install
    ```

3.  **Start the server:**
    ```bash
    npm start
    ```
    Or directly:
    ```bash
    node server.js
    ```

4.  **Verify:**
    You should see the following output:
    ```
    ⚡ EnergyGrid Mock API running on port 3000
       Constraints: 1 req/sec, Max 10 items/batch
    ```
    The server is now listening at `http://localhost:3000`.

## API Details

-   **Base URL:** `http://localhost:3000`
-   **Endpoint:** `POST /device/real/query`
-   **Auth Token:** `interview_token_123`

### Security Headers Required
Every request must include:
- `timestamp`: Current time in milliseconds.
- `signature`: `MD5( URL + Token + timestamp )`

### Constraints
- **Rate Limit:** 1 request per second.
- **Batch Size:** Max 10 serial numbers per request.

See `instructions.md` for full details.

## Energy Aggregator Client Solution

The solution code is located in the `energy-aggregator` directory.

### Setup and Running

1.  **Start the Mock Server** (Terminal 1)
    ```bash
    node server.js
    ```
    *Runs on `http://localhost:3000`*

2.  **Start the Aggregator Client** (Terminal 2)
    ```bash
    cd energy-aggregator
    npm install
    npm start
    ```
    *Runs on `http://localhost:3001`*

3.  **Trigger Data Aggregation**
    ```bash
    curl http://localhost:3001/api/aggregate
    ```
    *The process will run for approximately 55 seconds. Progress is logged to the console.*

### Approach

#### Rate Limiting & Concurrency
The Mock API strictly enforces a **1 request per second** limit. To ensure compliance and robustness:

*   **Batching**: We utilize the maximum allowed batch size of **10 devices** per request. For 500 devices, this results in exactly 50 API calls.
*   **Sequential Processing**: Instead of concurrent requests (which would immediately hit the rate limit), we process batches **sequentially**.
*   **Controlled Delay**: After each request, the application waits for **1050ms** (1 sec + 50ms buffer). This slight buffer accounts for network jitter and execution time, ensuring we never hit the `429 Too Many Requests` error.
*   **Error Handling**: If a `429` or other network error occurs, it is logged, and the process continues to the next batch (in a production scenario, a retry mechanism with exponential backoff would be added here).

### Assumptions
*   **Mock Server Port**: Assumed to be running on default port `3000`.
*   **Environment**: The code runs in a trusted environment where the `SECRET_TOKEN` can be stored in code (for this assignment).
*   **Data Consistency**: We assume the 500 dummy Serial Numbers generated on the client side match the format expected by the server.
# Akrahub-Assignment
