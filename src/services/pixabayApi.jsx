const API_KEY = "33027161-d89bfd7878d1ab614bd7e969e";
const BASE_URL = "https://pixabay.com/api/";

export const fetchImages = async (query, page) => {
  const response = await fetch(
    `${BASE_URL}?q=${query}&page=${page}&key=${API_KEY}&image_type=photo&orientation=horizontal&per_page=12`
  );

  if (!response.ok) {
    throw new Error("Помилка запиту");
  }

  const data = await response.json();

  return data.hits.map(({ id, webformatURL, largeImageURL }) => ({
    id,
    webformatURL,
    largeImageURL,
  }));
};
