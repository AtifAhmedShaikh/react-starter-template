

"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent } from "@/components/ui/card";
import { Upload, FileText, ImageIcon, X } from "lucide-react";
import { MAX_FILE_LIMIT, ACCEPT_FILES, MAX_FILE_SIZE } from "@/constants";

export const FileUploadArea = ({ 
  field, 
  error, 
  maxFiles = MAX_FILE_LIMIT, 
  maxFileSize = MAX_FILE_SIZE,
  acceptedTypes = ACCEPT_FILES
}) => {
  const [isDragOver, setIsDragOver] = useState(false);
  const [fileError, setFileError] = useState("");

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

  const handleFiles = (files) => {
    try {
      setFileError("");
      
      // Check if adding these files would exceed the maximum
      const currentFiles = field.value || [];
      if (currentFiles.length + files.length > maxFiles) {
        throw new Error(`You can only upload a maximum of ${maxFiles} files.`);
      }

      // Validate each file
      files.forEach(validateFile);

      // If all validations pass, add the files
      field.onChange([...currentFiles, ...files]);
    } catch (err) {
      setFileError(err.message);
    }
  };

  const handleDragOver = (e) => {
    e.preventDefault();
    setIsDragOver(true);
  };

  const handleDragLeave = (e) => {
    e.preventDefault();
    setIsDragOver(false);
  };

  const handleDrop = (e) => {
    e.preventDefault();
    setIsDragOver(false);
    const files = Array.from(e.dataTransfer.files);
    if (files.length > 0) {
      handleFiles(files);
    }
  };

  const handleFileSelect = (e) => {
    const files = Array.from(e.target.files || []);
    if (files.length > 0) {
      handleFiles(files);
      // Reset the input to allow selecting the same file again
      e.target.value = "";
    }
  };

  const handleRemoveFile = (index) => {
    const updatedFiles = field.value.filter((_, i) => i !== index);
    field.onChange(updatedFiles);
  };

  const getFileIcon = (file) => {
    if (file.type === "application/pdf") {
      return <FileText className="w-8 h-8 text-red-500" />;
    }
    if (file.type.startsWith("image/")) {
      return <ImageIcon className="w-8 h-8 text-blue-500" />;
    }
    return <FileText className="w-8 h-8 text-gray-500" />;
  };

  // Format file size for display
  const formatFileSize = (bytes) => {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
  };

  // Format accepted types for display
  const formatAcceptedTypes = () => {
    return acceptedTypes
      .split(',')
      .map(type => {
        if (type === 'image/*') return 'Images';
        if (type === 'application/pdf') return 'PDF';
        return type;
      })
      .join(', ');
  };

  return (
    <div className="space-y-4">
      {/* Drag and Drop Area */}
      <div
        className={`
          border-2 border-dashed rounded-lg p-8 text-center transition-all duration-200
          ${
            isDragOver
              ? "border-primary bg-primary/5"
              : error || fileError
              ? "border-destructive bg-destructive/5"
              : "border-muted-foreground/25 hover:border-muted-foreground/50"
          }
        `}
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onDrop={handleDrop}
      >
        <Upload className="w-12 h-12 mx-auto mb-4 text-muted-foreground" />
        <div className="space-y-2">
          <p className="text-sm font-medium">
            Drop your files here, or{" "}
            <label className="text-primary cursor-pointer hover:underline">
              browse
              <Input
                type="file"
                multiple
                accept={acceptedTypes}
                onChange={handleFileSelect}
                className="hidden"
              />
            </label>
          </p>
          <p className="text-xs text-muted-foreground">
            Supports: {formatAcceptedTypes()} 
            (Max {formatFileSize(maxFileSize)} each, up to {maxFiles} files)
          </p>
          {(error || fileError) && (
            <p className="text-xs text-destructive">{error || fileError}</p>
          )}
        </div>
      </div>

      {/* File Count Indicator */}
      {Array.isArray(field.value) && field.value.length > 0 && (
        <div className="text-sm text-muted-foreground">
          {field.value.length} of {maxFiles} files selected
        </div>
      )}

      {/* File Previews */}
      {Array.isArray(field.value) && field.value.length > 0 && (
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {field.value.map((file, index) => (
            <Card key={index} className="overflow-hidden">
              <CardContent className="p-4">
                <div className="flex items-start gap-4">
                  <div className="flex-shrink-0">{getFileIcon(file)}</div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium truncate">{file.name}</p>
                    <p className="text-xs text-muted-foreground">
                      {formatFileSize(file.size)}
                    </p>
                  </div>
                  <Button
                    type="button"
                    variant="ghost"
                    size="sm"
                    onClick={() => handleRemoveFile(index)}
                    className="flex-shrink-0"
                  >
                    <X className="w-4 h-4" />
                  </Button>
                </div>

                {/* File Preview */}
                {file.type === "application/pdf" ? (
                  <div className="bg-muted rounded-lg p-4 text-center mt-4">
                    <FileText className="w-16 h-16 mx-auto mb-2 text-red-500" />
                    <p className="text-sm text-muted-foreground">PDF Preview</p>
                  </div>
                ) : file.type.startsWith("image/") ? (
                  <img
                    src={URL.createObjectURL(file)}
                    alt="Preview"
                    className="w-full h-48 object-cover rounded-lg border mt-4"
                  />
                ) : (
                  <div className="bg-muted rounded-lg p-4 text-center mt-4">
                    <FileText className="w-16 h-16 mx-auto mb-2 text-gray-500" />
                    <p className="text-sm text-muted-foreground">File Preview</p>
                  </div>
                )}
              </CardContent>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
};