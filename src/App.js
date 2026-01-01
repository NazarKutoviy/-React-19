import { useCallback, useEffect, useMemo, useState } from "react";
import Button from "./components/Button";
import ImageGallery from "./components/ImageGallery";
import Loader from "./components/Loader";
import Modal from "./components/Modal";
import Searchbar from "./components/Searchbar";
import { fetchImages } from "./services/pixabayApi";

export default function App() {
  const [query, setQuery] = useState("");
  const [images, setImages] = useState([]);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const [selectedImage, setSelectedImage] = useState(null);

  const handleSearch = useCallback((newQuery) => {
    setQuery(newQuery);
    setImages([]);
    setPage(1);
  }, []);

  const loadImages = useCallback(async () => {
    if (!query) return;

    setLoading(true);
    try {
      const newImages = await fetchImages(query, page);
      setImages((prev) => [...prev, ...newImages]);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  }, [query, page]);

  useEffect(() => {
    loadImages();
  }, [loadImages]);

  const memoizedImages = useMemo(() => images, [images]);

  return (
    <>
      <Searchbar onSubmit={handleSearch} />

      <ImageGallery images={memoizedImages} onImageClick={setSelectedImage} />

      {loading && <Loader />}

      {images.length > 0 && !loading && (
        <Button onClick={() => setPage((prev) => prev + 1)} />
      )}

      {selectedImage && (
        <Modal image={selectedImage} onClose={() => setSelectedImage(null)} />
      )}
    </>
  );
}
