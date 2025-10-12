import Image from "@/components/ui/image";

const FilePreviewOnly = ({ files = [] }) => {
  if (!files.length) return <p className="text-sm text-gray-500">No files attached.</p>;

  return (
    <div className="flex flex-wrap gap-2 mt-2">
      {files.map((file, index) => {
        const isAttachment = file.url && file.fileName;
        const isImage = isAttachment
          ? /\.(jpg|jpeg|png|gif|webp)$/i.test(file.fileName)
          : file.type?.startsWith("image/");

        const src = isAttachment
          ? file.url
          : isImage
          ? URL.createObjectURL(file)
          : null;

        const name = isAttachment ? file.fileName : file.name;

        return (
          <div key={index} className="relative w-24 h-24 rounded overflow-hidden border bg-gray-50">
            {isImage && src ? (
              <Image
                src={src}
                alt="preview"
                className="object-cover w-full h-full"
                showSkeleton={false}
              />
            ) : (
              <div className="flex items-center justify-center w-full h-full text-xs text-gray-500 p-2 text-center">
                {name}
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
};

export default FilePreviewOnly;
