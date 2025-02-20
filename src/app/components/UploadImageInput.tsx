interface UploadImageInputProps {
  loading: boolean;
  onChange: React.ChangeEventHandler<HTMLInputElement>;
  selectedFile?: FileList;
}

export default function UploadImageInput({
  loading,
  onChange,
  selectedFile,
}: UploadImageInputProps) {
  return ( 
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
        disabled={loading}
        onChange={onChange}
      />
      <div>
        <span className="pr-6">
          {selectedFile ? selectedFile[0].name : "No file choosen."}
        </span>
      </div>
    </div>
  );
}
