import { useCallback, useMemo, useState } from "react";
import { X } from "lucide-react";
import { toast } from "sonner";
import { ACCEPT_FILES, MAX_FILE_LIMIT, MAX_FILE_SIZE } from "@/constants/index";
import Image from "@/components/ui/image";

const FileUploaderWithPreview = ({ 
  files, 
  setFiles, 
  wrapperWidth="", 
  heading="Attach Files", 
  maxFiles=MAX_FILE_LIMIT, 
  maxFileSize=MAX_FILE_SIZE,
  acceptedTypes=ACCEPT_FILES 
}) => {
  const [isDragging, setIsDragging] = useState(false);

  const validateFile = (file) => {
    if (file.size > maxFileSize) {
      throw new Error(`File "${file.name}" exceeds the maximum size of ${maxFileSize / 1024 / 1024}MB`);
    }
    
    const acceptedTypesArray = acceptedTypes.split(',').map(type => type.trim());
    const isAccepted = acceptedTypesArray.some(type => {
      // Handle wildcard types like "image/*"
      if (type.endsWith('/*')) {
        const category = type.replace('/*', '');
        return file.type.startsWith(category);
      }
      // Handle exact MIME type matching
      return file.type === type;
    });
    
    if (!isAccepted) {
      throw new Error(`File "${file.name}" is not a supported type. Accepted types: ${acceptedTypes}`);
    }
  };

  const handleFiles = useCallback(
    (selectedFiles) => {
      const fileArray = Array.from(selectedFiles);

      if (files.length + fileArray.length > maxFiles) {
        return toast.error(`You can only upload a maximum of ${maxFiles} files.`);
      }

      try {
        // Validate each file before adding to state
        fileArray.forEach(validateFile);
        
        // Only add files if validation passes
        setFiles([...files, ...fileArray]);
      } catch (error) {
        return toast.error(error.message);
      }
    },
    [files, setFiles, maxFiles, maxFileSize, acceptedTypes]
  );

  const handleInputChange = (e) => {
    const selected = e.target.files;
    if (selected) handleFiles(selected);
  };

  const handleDrop = (e) => {
    e.preventDefault();
    setIsDragging(false);
    if (e.dataTransfer.files) {
      handleFiles(e.dataTransfer.files);
    }
  };

  const removeFile = useCallback(
    (index) => {
      setFiles(files.filter((_, i) => i !== index));
    },
    [files, setFiles]
  );

  const previews = useMemo(() => {
    return files.map((file) => ({
      url: URL.createObjectURL(file),
      name: file.name,
      type: file.type,
    }));
  }, [files]);

  return (
    <div className="space-y-3">
      <label className="block font-medium text-sm">{heading}</label>

      {/* Drag & Drop Area */}
      <div
        onDragOver={(e) => {
          e.preventDefault();
          setIsDragging(true);
        }}
        onDragLeave={() => setIsDragging(false)}
        onDrop={handleDrop}
        className={`border-2 border-dashed rounded-md p-6 text-center transition-colors ${
          isDragging ? "border-blue-500 bg-blue-50" : "border-gray-300"
        }`}
      >
        <p className="text-sm text-gray-600">Drag & drop files here or click to select</p>
        <input
          type="file"
          multiple
          accept={acceptedTypes}
          onChange={handleInputChange}
          className="mt-2 block w-full text-sm text-gray-500
            file:mr-4 file:py-2 file:px-4
            file:rounded-lg file:border-0
            file:text-sm file:font-semibold
            file:bg-blue-50 file:text-blue-700
            hover:file:bg-blue-100
          "
          style={{ color: 'transparent' }}
        />
      </div>

      {/* Previews */}
      <div className="flex flex-wrap gap-2 mt-2">
        {previews.map((file, index) => (
          <div key={index} className={`relative w-32 h-32 rounded overflow-hidden border bg-gray-50 ${wrapperWidth}`}>  
            {file.type.startsWith("image/") ? (
              <Image
                src={file.url}
                alt="preview"
                className="object-cover w-full h-full"
                showSkeleton={false}
              />
            ) : file.type === "application/pdf" ? (
              <iframe
                src={file.url}
                title="pdf-preview"
                className="w-full h-full"
              />
            ) : (
              <div className="flex items-center justify-center w-full h-full text-xs text-gray-500 p-2 text-center">
                {file.name}
              </div>
            )}
            <button
              type="button"
              onClick={() => removeFile(index)}
              className="absolute top-1 right-1 bg-white rounded-full p-1 shadow"
            >
              <X size={14} />
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default FileUploaderWithPreview;