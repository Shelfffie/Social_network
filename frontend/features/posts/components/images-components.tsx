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

  if (isCreating) {
    return (
      <div className="relative w-24 h-24">
        <img
          className="w-full h-full rounded-lg object-cover"
          src={preview}
          alt="post image"
        />
      </div>
    );
  }

  return (
    <div
      className={`relative ${
        isSingle ? "aspect-video max-w-[900px]" : "aspect-square"
      }`}
    >
      <img
        className={`w-full h-full rounded-lg ${
          isSingle ? "max-h-[1000px] object-contain" : "object-cover"
        }`}
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
    <div className="flex justify-center w-full">
      <div
        className={
          isCreating
            ? "flex items-center justify-center gap-3 overflow-x-auto p-5 w-full"
            : `grid ${
                photos.length === 1
                  ? "grid-cols-1"
                  : "grid-cols-[repeat(auto-fill,minmax(200px,1fr))]"
              } justify-items-center gap-5 p-5 w-full max-w-[800px]`
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
