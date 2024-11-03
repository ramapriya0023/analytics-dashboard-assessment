export const apiUrl =
  process.env.NODE_ENV === "production"
    ? "https://analytics-dashboard-assessment-brown.vercel.app/api"
    : "http://localhost:8000/api";
