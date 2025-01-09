const API_URL = "https://jsonplaceholder.typicode.com/posts";

export const fetchItems = async () => {
  const response = await fetch(API_URL);
  if (!response.ok) {
    throw new Error("Failed to fetch items");
  }
  return response.json();
};
