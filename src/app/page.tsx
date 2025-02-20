"use client";

import { ChangeEvent, FormEvent, useState } from "react";
import { CiImageOn } from "react-icons/ci";
import UploadImageInput from "./components/UploadImageInput";
import { Triangle } from "react-loader-spinner";

export default function Home() {
  const [selectedFile, setSelectedFile] = useState<FileList | undefined>();
  const [processingImage, setProcessingImage] = useState(false);

  const handleInputFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    const target = e.target;

    const file = target.files;

    if (file) {
      setSelectedFile(file);
    }
  };

  const onSubmitFile = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setProcessingImage(true);

    const formData = new FormData(e.currentTarget);

    try {
      const response = await fetch("/api/background", {
        method: "POST",
        body: formData,
      });

      const imageResult = await response.blob();
      const imageUrl = URL.createObjectURL(imageResult);
      const newWindow = window.open();
      newWindow!.document.write(`<img src="${imageUrl}" />`);
    } catch (error) {
      console.log(error);
    } finally {
      setProcessingImage(false);
    }
  };

  return (
    <main className="flex flex-col justify-center items-center h-screen gap-4">
      {processingImage ? (
        <Triangle
          visible={true}
          height="40"
          width="40"
          color="#cacaca"
          ariaLabel="triangle-loading"
          wrapperStyle={{}}
          wrapperClass=""
        />
      ) : (
        <form onSubmit={onSubmitFile}>
          <UploadImageInput
            selectedFile={selectedFile}
            onChange={handleInputFileChange}
            loading={processingImage}
          />
          <div className="flex justify-center items-center mt-2">
            <button
              className="flex items-center  gap-2 font-semibold bg-sky-400 hover:bg-sky-500 transition-all text-white px-4 py-2 rounded-full"
              disabled={processingImage}
            >
              <span>
                <CiImageOn />
              </span>
              Remove background
            </button>
          </div>
        </form>
      )}
    </main>
  );
}
