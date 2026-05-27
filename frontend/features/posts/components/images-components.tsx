import useImagePreview from "@/features/common/hooks/use-image-preview";

function ImageItem({
  img,
  isSingle,
}: {
  img: File | string;
  isSingle: boolean;
}) {
  const preview = useImagePreview(img);

  if (!preview) return null;

  return (
    <div className={`relative ${isSingle ? "aspect-video" : "aspect-square"}`}>
      <img
        className={`w-full h-full rounded-lg ${
          isSingle ? "h-auto max-h-[500px] object-contain" : "object-cover"
        }`}
        src={preview}
        alt="post image"
      />
    </div>
  );
}

export default function ImagesComponent({
  photos,
}: {
  photos: File[] | string[];
}) {
  return (
    <div className="flex justify-center w-full">
      <div
        className={`grid ${
          photos.length === 1
            ? "grid-cols-1"
            : "grid-cols-[repeat(auto-fill,minmax(200px,1fr))]"
        } justify-items-center gap-5 p-5 w-full max-w-[800px]`}
      >
        {photos.map((img, index) => (
          <ImageItem key={index} img={img} isSingle={photos.length === 1} />
        ))}
      </div>
    </div>
  );
}
