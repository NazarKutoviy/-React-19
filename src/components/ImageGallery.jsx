import ImageGalleryItem from "./ImageGalleryItem";


export default function ImageGallery({ images, onImageClick }) {
  return (
    <ul className="gallery">
      {images.map((img) => (
        <ImageGalleryItem key={img.id} image={img} onClick={onImageClick} />
      ))}
    </ul>
  );
}
