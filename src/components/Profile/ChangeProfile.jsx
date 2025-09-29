import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { changeProfileImageAsync, selectUser } from "@/stores/slices/authSlice";
import { Edit } from "lucide-react";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "sonner";

export default function ChangeProfileImage() {
  const user = useSelector(selectUser);
  const dispatch = useDispatch()
  const [image, setImage] = useState(null);
  const [preview, setPreview] = useState(null);
  const [loading, setLoading] = useState(false);
  const [open, setOpen] = useState(false);

  const handleFileChange = (e) => {
    const file = e.target.files?.[0] || null;
    setImage(file);
    setPreview(file ? URL.createObjectURL(file) : null);
  };
  const handleUpload = async () => {
    try {
  
      setLoading(true);
  
      const formData = new FormData();
      formData.append("file", image);
  
      const result = await dispatch(changeProfileImageAsync(formData));
  
      if (result?.payload?.success) {
        toast.success(result.payload.message || "Profile image updated successfully");
        setImage(null);
        setPreview(null);
        setOpen(false);
      } else {
        toast.error(result?.payload?.message || "Failed to update profile image");
      }
    } catch (error) {
      toast.error(error?.message || "Something went wrong");
    } finally {
      setLoading(false);
    }
  };
  

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button>Change Profile Image</Button>
      </DialogTrigger>

      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Update Profile Picture</DialogTitle>
        </DialogHeader>

        <div className="flex flex-col items-center gap-4 py-4">
          <div className="relative">
            <img
              src={preview || user?.profileImage || "/profile.jpg"}
              alt="Profile"
              className="w-42 h-42 rounded-full border object-cover"
              onError={(e) => {
                e.currentTarget.src = "/profile.jpg"; // fallback if broken
              }}
            />
            <label
              htmlFor="profileInput"
              className="absolute bottom-0 right-0 bg-primary text-white px-2 py-1 rounded-full text-xs aspect-square items-center justify-center flex cursor-pointer hover:bg-primary/90"
            >
              <Edit size={16} />
            </label>
            <Input
              id="profileInput"
              type="file"
              accept="image/*"
              onChange={handleFileChange}
              className="hidden"
            />
          </div>
        </div>

        <DialogFooter className="flex justify-between">
          <Button
            variant="secondary"
            onClick={() => {
              setImage(null);
              setPreview(null);
              setOpen(false);
            }}
          >
            Cancel
          </Button>
          <Button onClick={handleUpload} disabled={
            loading ||
            !image ||
            (!preview && !image) ||
            preview === user?.profileImage
          } loading={loading}>
            Save
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
