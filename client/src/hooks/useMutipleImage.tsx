/* eslint-disable @typescript-eslint/no-explicit-any */
import { ChangeEvent, useRef, useState } from "react";
import { toast } from "react-toastify";

const useMutipleImage = () => {
  const [selectedImages, setSelectedImages] = useState<FileList[] | null>([]);
  const ref = useRef<HTMLInputElement | null>(null);
  const [cover, setCover] = useState<any>(null);

  // Clear Images
  const handleImageClear = () => {
    if (ref.current) {
      ref.current.value = "";
    }
    setCover(null);
    setSelectedImages(null);
  };

  // Select Images
  const handleFileSelect = (event: ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files;

    if (!files || files.length <= 0) {
      toast.error("Invalid Action, Please Try again");
      return;
    }

    const currentImage: File[] = selectedImages as any;
    const selectedFiles: File[] = Array.from(files);

    if (files && files.length > 5) {
      toast.error("Please Select only 5 Images");
      if (ref.current) {
        ref.current.value = "";
      }
      return;
    }

    // Check if there is dupplicated Items
    if (selectedImages && selectedImages.length > 0) {
      for (let i = 0; i < currentImage.length; i++) {
        for (let j = 0; j < selectedFiles.length; j++) {
          if (currentImage[i]?.name === selectedFiles[j]?.name) {
            toast.error("Invalid, Duplicated Image");
            return;
          }
        }
      }
    }

    setCover(files![0] as any);
    setSelectedImages(files as any);
  };

  // Remove selected Images
  const handleRemoveSelectedImage = (targetImage: File) => {
    setSelectedImages((prev) => {
      if (!prev) {
        return prev;
      }

      const filterImages = Array.from(selectedImages || []).filter(
        (item: any) => item.name !== targetImage.name
      );

      return filterImages;
    });
  };

  const handleChangeCover = (target: FileList) => {
    setCover(target);
  };

  const renderImages = () => {
    if (!selectedImages) {
      return new Array(5).fill(undefined);
    }

    const emptySlots = new Array(Math.max(5 - selectedImages.length, 0)).fill(
      undefined
    );

    return [...selectedImages, ...emptySlots];
  };

  renderImages();
  // open file
  const toggleFileSelect = () => {
    ref.current?.click();
  };

  const handleAddImage = (event: ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files;

    if (!files || files.length <= 0) {
      toast.error("Invalid Action, Please Try again");
      return;
    }

    const currentImage: File[] = selectedImages as any;
    const selectedFiles: File[] = Array.from(files);

    if (selectedImages && selectedImages.length > 0) {
      for (let i = 0; i < currentImage.length; i++) {
        for (let j = 0; j < selectedFiles.length; j++) {
          if (currentImage[i]?.name === selectedFiles[j]?.name) {
            toast.error("Invalid, Duplicated Image");
            return;
          }
        }
      }
    }

    const totalSlots = currentImage.length + selectedFiles.length;
    if (totalSlots > 5) {
      toast.error("Cannot exceed maximum allowed slots (5).");
      return;
    }

    setSelectedImages((prev: any) => [...prev, ...files]);
  };

  return {
    ref,
    cover,
    selectedImages,
    handleFileSelect,
    handleImageClear,
    handleRemoveSelectedImage,
    toggleFileSelect,
    handleChangeCover,
    renderImages,
    handleAddImage,
  };
};

export default useMutipleImage;
