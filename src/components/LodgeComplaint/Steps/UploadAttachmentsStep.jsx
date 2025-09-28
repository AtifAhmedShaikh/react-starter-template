import FileUploaderWithPreview from "@/components/reuseable/FileUploaderWithPreview";

const AttachmentUploadStep = ({ files, setFiles }) => {
  return (
    <div className="mt-2 sm:min-h-96">
      <FileUploaderWithPreview files={files} setFiles={setFiles} heading="Attach Files (Optional)" />
    </div>
  );
};

export default AttachmentUploadStep;
