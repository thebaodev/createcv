import React from "react";
import { Button } from "~/components/ui/button";
import { Label } from "~/components/ui/label";

interface AvatarUploadProps {
  onImageChange: (image: string) => void;
}

export function AvatarUpload({ onImageChange }: AvatarUploadProps) {
  const onSelectFile = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      const reader = new FileReader();
      reader.addEventListener("load", () => {
        const result = reader.result;
        if (typeof result === "string") {
          onImageChange(result);
        }
      });
      if (e.target.files[0]) {
        reader.readAsDataURL(e.target.files[0]);
      }
    }
  };

  return (
    <div className="space-y-4">
      <div className="flex items-center gap-4">
        <Label htmlFor="avatar-upload" className="text-sm font-medium">
          Upload Avatar
        </Label>
        <input
          id="avatar-upload"
          type="file"
          accept="image/*"
          onChange={onSelectFile}
          className="hidden"
        />
        <Button
          variant="outline"
          onClick={() => document.getElementById("avatar-upload")?.click()}
        >
          Select Image
        </Button>
      </div>
    </div>
  );
}
