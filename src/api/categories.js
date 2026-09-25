import request from "./client";
import { ENDPOINTS } from "./endpoints";

export async function getCategories() {
  return request(ENDPOINTS.CATEGORIES);
}
