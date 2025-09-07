import { createApi } from "../services/api_client/api";
import { createApiClient } from "../services/api_client/axiosInstance";

const receiptApi = createApi("http://127.0.0.1:8000/api/receipt/v1");
export const receiptApiClient = createApiClient(receiptApi);