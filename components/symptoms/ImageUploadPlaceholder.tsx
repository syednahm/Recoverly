"use client";

import { useRef, useState } from "react";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Camera, Upload, X, Image as ImageIcon } from "lucide-react";
import { cn } from "@/lib/utils";

interface ImageUploadPlaceholderProps {
  file: File | null;
  onChange: (file: File | null) => void;
}

export function ImageUploadPlaceholder({
  file,
  onChange,
}: ImageUploadPlaceholderProps) {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [preview, setPreview] = useState<string | null>(null);

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = e.target.files?.[0];
    if (selectedFile) {
      onChange(selectedFile);
      
      // Create preview
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreview(reader.result as string);
      };
      reader.readAsDataURL(selectedFile);
    }
  };

  const handleRemove = () => {
    onChange(null);
    setPreview(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  const handleClick = () => {
    fileInputRef.current?.click();
  };

  return (
    <div>
      <div className="flex items-center gap-2 mb-3">
        <Camera className="w-4 h-4 text-slate-500" />
        <Label className="text-base font-semibold text-slate-900">
          Wound Photo
          <span className="text-slate-400 font-normal ml-1">(Optional)</span>
        </Label>
      </div>

      <p className="text-sm text-slate-500 mb-3">
        Upload a photo of your surgical site or wound for visual monitoring.
      </p>

      {!file ? (
        <div
          onClick={handleClick}
          className={cn(
            "relative rounded-xl border-2 border-dashed border-slate-300 bg-slate-50",
            "hover:border-sky-400 hover:bg-sky-50/50 transition-all duration-200 cursor-pointer",
            "p-8 flex flex-col items-center justify-center text-center"
          )}
        >
          <div className="flex items-center justify-center w-12 h-12 rounded-full bg-sky-100 mb-3">
            <ImageIcon className="w-6 h-6 text-sky-600" />
          </div>
          <p className="text-sm font-semibold text-slate-900 mb-1">
            Click to upload or drag and drop
          </p>
          <p className="text-xs text-slate-500">
            PNG, JPG or HEIC up to 10MB
          </p>
          <input
            ref={fileInputRef}
            type="file"
            accept="image/*"
            onChange={handleFileSelect}
            className="hidden"
          />
        </div>
      ) : (
        <div className="relative rounded-xl border-2 border-slate-200 bg-white overflow-hidden">
          {preview && (
            <div className="relative">
              <img
                src={preview}
                alt="Wound preview"
                className="w-full h-48 object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
            </div>
          )}
          
          <div className="p-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="flex items-center justify-center w-10 h-10 rounded-lg bg-emerald-100">
                  <Upload className="w-5 h-5 text-emerald-600" />
                </div>
                <div>
                  <p className="text-sm font-semibold text-slate-900">
                    {file.name}
                  </p>
                  <p className="text-xs text-slate-500">
                    {(file.size / 1024 / 1024).toFixed(2)} MB
                  </p>
                </div>
              </div>
              <Button
                onClick={handleRemove}
                variant="ghost"
                size="sm"
                className="text-slate-500 hover:text-red-600 hover:bg-red-50"
              >
                <X className="w-4 h-4" />
              </Button>
            </div>
          </div>
        </div>
      )}

      {/* Privacy Note */}
      <div className="mt-3 p-3 rounded-lg bg-blue-50 border border-blue-200">
        <p className="text-xs text-blue-900">
          <span className="font-semibold">Protected Health Information:</span> Images
          are securely encrypted and only accessible to your care team.
        </p>
      </div>
    </div>
  );
}
