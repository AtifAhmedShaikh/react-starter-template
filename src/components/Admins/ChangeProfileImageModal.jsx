import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "sonner";
import { Upload, X, User } from "lucide-react";

import { Button } from "@/components/ui/button";
import { DialogFooter } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";

import {
  closeModal,
  MODAL_TYPES,
  selectIsModalOpenByType,
  selectModalData,
} from "@/stores/slices/modalSlice";
import {
  changeProfileImageAsync,
  selectAdminsLoading,
} from "@/stores/slices/adminSlice";

import ModalWrapper from "../reuseable/ModalWrapper";

const ChangeProfileImageModal = () => {
  const dispatch = useDispatch();
  const isOpen = useSelector(selectIsModalOpenByType(MODAL_TYPES.CHANGE_ADMIN_PROFILE_IMAGE));
  const admin = useSelector(selectModalData);
  const isChanging = useSelector((state) => selectAdminsLoading(state).changeProfileImage);
  const [selectedFile, setSelectedFile] = useState(null);
  const [preview, setPreview] = useState(null);

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      // Validate file type
      if (!file.type.startsWith('image/')) {
        toast.error('Please select a valid image file');
        return;
      }

      // Validate file size (5MB max)
      if (file.size > 5 * 1024 * 1024) {
        toast.error('File size must be less than 5MB');
        return;
      }

      setSelectedFile(file);
      
      // Create preview
      const reader = new FileReader();
      reader.onload = (e) => {
        setPreview(e.target.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleRemoveFile = () => {
    setSelectedFile(null);
    setPreview(null);
  };

  const handleSubmit = () => {
    if (!selectedFile) {
      toast.error('Please select an image file');
      return;
    }

    const formData = new FormData();
    formData.append('profileImage', selectedFile);

    const id = admin?.id;
    
    dispatch(changeProfileImageAsync({ id, data: formData }))
      .unwrap()
      .then((response) => {
        toast.success(response.message || "Profile image updated successfully");
        dispatch(closeModal());
        setSelectedFile(null);
        setPreview(null);
      })
      .catch((error) => {
        toast.error(error || "Failed to update profile image");
      });
  };

  const handleClose = () => {
    dispatch(closeModal());
    setSelectedFile(null);
    setPreview(null);
  };

  return (
    <ModalWrapper isOpen={isOpen} title={`Change Profile Image - ${admin?.fullName || "Admin"}`}>
      <div className="space-y-4">
        <div className="bg-blue-50 p-4 rounded-lg">
          <p className="text-sm text-blue-800">
            <strong>Admin:</strong> {admin?.fullName} ({admin?.email})
          </p>
        </div>

        {/* Current Profile Image */}
        <div className="flex items-center space-x-4">
          <div className="w-16 h-16 rounded-full bg-gray-200 flex items-center justify-center overflow-hidden">
            {admin?.profileImage ? (
              <img
                src={admin.profileImage}
                alt="Current profile"
                className="w-full h-full object-cover"
              />
            ) : (
              <User className="w-8 h-8 text-gray-400" />
            )}
          </div>
          <div>
            <p className="text-sm font-medium">Current Profile Image</p>
            <p className="text-xs text-gray-500">Click below to select a new image</p>
          </div>
        </div>

        {/* File Upload */}
        <div className="space-y-2">
          <label className="block text-sm font-medium text-gray-700">
            Select New Profile Image
          </label>
          <Input
            type="file"
            accept="image/*"
            onChange={handleFileChange}
            className="file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100"
          />
          <p className="text-xs text-gray-500">
            Supported formats: JPG, PNG, GIF. Max size: 5MB
          </p>
        </div>

        {/* Preview */}
        {preview && (
          <div className="space-y-2">
            <label className="block text-sm font-medium text-gray-700">
              Preview
            </label>
            <div className="relative inline-block">
              <img
                src={preview}
                alt="Preview"
                className="w-32 h-32 rounded-full object-cover border-2 border-gray-200"
              />
              <button
                type="button"
                onClick={handleRemoveFile}
                className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full p-1 hover:bg-red-600"
              >
                <X className="w-4 h-4" />
              </button>
            </div>
          </div>
        )}

        <div className="bg-yellow-50 p-4 rounded-lg">
          <p className="text-sm text-yellow-800">
            <strong>Note:</strong> The new profile image will be visible to all users and will replace the current image immediately.
          </p>
        </div>

        <DialogFooter>
          <Button type="button" variant="outline" onClick={handleClose}>
            Cancel
          </Button>
          <Button 
            onClick={handleSubmit} 
            loading={isChanging} 
            loadingLabel="Updating Image..."
            disabled={!selectedFile}
          >
            <Upload className="w-4 h-4 mr-2" />
            Update Image
          </Button>
        </DialogFooter>
      </div>
    </ModalWrapper>
  );
};

export default ChangeProfileImageModal;
