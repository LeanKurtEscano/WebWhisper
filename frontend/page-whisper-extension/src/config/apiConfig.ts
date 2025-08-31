import { createApi } from "../services/api_client/api";
import { createApiClient } from "../services/api_client/axiosInstance";

const scraperApi = createApi("http://127.0.0.1:8000/api/scraper/v1");
export const scraperApiClient = createApiClient(scraperApi);