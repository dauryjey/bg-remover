"use client";

import { ChangeEvent, useState } from "react";
import { CiImageOn } from "react-icons/ci";

export default function Home() {
  const [selectedFile, setSelectedFile] = useState<FileList | null>();

  const handleInputFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    const target = e.target;

    const file = target.files;

    setSelectedFile(file);
  };

  return (
    <main className="flex flex-col justify-center items-center h-screen gap-4">
      <div className="flex items-center space-x-4 border-2 border-gray-200 rounded-full">
        <label
          htmlFor="image"
          className="px-4 py-2 bg-sky-500 hover:bg-sky-600 transition-all  cursor-pointer rounded-l-full text-white"
        >
          Upload image
        </label>
        <input
          id="image"
          className="hidden"
          type="file"
          name="image"
          accept="image/png, image/jpeg"
          onChange={handleInputFileChange}
        />
        <div>
          <span className="pr-6">
            {selectedFile ? selectedFile[0].name : "No file choosen."}
          </span>
        </div>
      </div>
      <div>
        <button className="flex items-center  gap-2 font-semibold bg-sky-400 hover:bg-sky-500 transition-all text-white px-4 py-2 rounded-full">
          <span>
            <CiImageOn />
          </span>
          Remove background
        </button>
      </div>
    </main>
  );
}
