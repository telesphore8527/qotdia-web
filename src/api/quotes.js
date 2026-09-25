import request from "./client";
import { ENDPOINTS } from "./endpoints";

export async function getQuotes({
  page = 1,
  perPage = 10,
  search = "",
  category = "",
} = {}) {
  const params = new URLSearchParams({
    page: String(page),
    per_page: String(perPage),
  });

  if (search) {
    params.set("search", search);
  }
  if (category) {
    params.set("category", category);
  }

  return request(`${ENDPOINTS.QUOTES}?${params.toString()}`);
}
