import useImagePreview from "@/features/common/hooks/use-image-preview";

function ImageItem({
  img,
  isSingle,
  isCreating = false,
}: {
  img: File | string;
  isSingle: boolean;
  isCreating: boolean;
}) {
  const preview = useImagePreview(img);

  if (!preview) return null;

  return (
    <div className={`relative aspect-square ${isCreating && " w-24 h-24"}`}>
      <img
        className="w-full h-full rounded-lg object-cover"
        src={preview}
        alt="post image"
      />
    </div>
  );
}

export default function ImagesComponent({
  photos,
  isCreating = false,
}: {
  photos: File[] | string[];
  isCreating?: boolean;
}) {
  return (
    <div className="flex justify-center">
      <div
        className={
          isCreating
            ? "flex justify-items-center gap-1 overflow-x-auto p-5"
            : `grid ${
                photos.length === 1
                  ? "grid-cols-1"
                  : "grid-cols-[repeat(auto-fill,minmax(100px,1fr))]"
              } justify-items-center gap-2 p-5`
        }
      >
        {photos.map((img, index) => (
          <ImageItem
            key={index}
            img={img}
            isSingle={photos.length === 1}
            isCreating={isCreating}
          />
        ))}
      </div>
    </div>
  );
}
