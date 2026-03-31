export function getHealthStatus() {
  return {
    status: "ok",
    message: "TaskFlow API is running",
    timestamp: new Date().toISOString(),
  };
}
