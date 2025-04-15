import React, { useEffect, useState } from "react";
import AxiosInstance from "../apis/AxiosInstance";
import { Link } from "react-router-dom";
import { useDropzone } from "react-dropzone";
import { handleSuccess } from "../utils/Toast";

const AllFiles = () => {
  const [imageList, setImageList] = useState([]);
  const [loading, setLoading] = useState(false);

  const onDrop = async (acceptedFiles) => {
    const formData = new FormData();
    acceptedFiles.forEach((file) => {
      formData.append("files", file);
    });

    try {
      setLoading(true);
      const response = await AxiosInstance.post("/uploads", formData);
      console.log(response);
      handleSuccess("file uploaded successfully")
      await fetchImg();
      setLoading(false);
    } catch (error) {
      console.log(error);
      setLoading(false);
    }
  };

  const { getRootProps, getInputProps } = useDropzone({ onDrop });

  const fetchImg = async () => {
    try {
      setLoading(true);
      const response = await AxiosInstance.get("/all-files");
      setImageList(response.data.allFiles);
      setLoading(false);
    } catch (error) {
      console.log(error);
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchImg();
  }, []);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Dropzone */}
      <div
        {...getRootProps()}
        className="border-2 border-dashed border-blue-400 rounded-xl p-8 mb-12 flex flex-col items-center justify-center hover:border-blue-600 transition-all duration-300 cursor-pointer bg-blue-50 hover:bg-blue-100"
      >
        <input {...getInputProps()} />
        <p className="text-lg text-gray-700 font-medium text-center">
          Drag and drop files here, or click to select files
        </p>
      </div>

      {/* Loading */}
      {loading ? (
        <p className="text-center font-semibold text-blue-600 text-lg animate-pulse">
          Loading...
        </p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          {imageList.map((img) => (
            <div
              key={img._id}
              className="bg-white rounded-xl shadow-md hover:shadow-xl transition-shadow duration-300 p-4"
            >
              <Link to={`/${img._id}`}>
                <img
                  src={img.imageURL}
                  alt={img.originalName}
                  className="w-full h-48 object-cover rounded-lg mb-3"
                />
              </Link>
              <p className="text-center text-gray-800 font-medium truncate">
                {img.originalName}
              </p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default AllFiles;
