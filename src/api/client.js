const BASE_URL = import.meta.env.VITE_API_BASE_URL;

async function request(endpoint, options = {}) {
  const response = await fetch(`${BASE_URL}${endpoint}`, {
    headers: {
      "Content-Type": "Application/json",
      ...options.headers,
    },
    ...options,
  });

  if (!response.ok) {
    let body = null;
    try {
      body = response.json();
    } catch {}
    const error = new Error(body?.message || `Api error ${response.status}`);

    error.status = response.status;
    error.body = body;
    throw error;
  }

  return response.json();
}

export default request;
