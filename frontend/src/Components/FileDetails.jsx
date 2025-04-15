import React, { useEffect, useState } from 'react';
import AxiosInstance from '../apis/AxiosInstance';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { handleSuccess } from '../utils/Toast';

const FileDetails = () => {
  const navigate = useNavigate();
  const [idImg, setIdImg] = useState(null);
  const [loading, setLoading] = useState(false);
  const { id } = useParams();

  const fetchById = async () => {
    try {
      const response = await AxiosInstance.get(`/single-file/${id}`);
      setIdImg(response.data.single);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchById();
  }, [id]);

  const handleDelete = async (public_id) => {
    try {
      setLoading(true);
      const newId = public_id.split('/')[1];
      await AxiosInstance.delete(`/delete-file/${newId}`);
      setLoading(false);
      handleSuccess("File deleted successfully",
        setTimeout(()=>{
          navigate('/');
        },2000)
      )
    } catch (error) {
      console.log(error);
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <h3 className="text-lg font-semibold text-red-600 animate-pulse">
          Deleting... Please wait
        </h3>
      </div>
    );
  }

  return (
    <div className="max-w-3xl mx-auto p-6 mt-10 bg-white shadow-lg rounded-2xl">
      {idImg && (
        <>
          <div className="flex justify-center mb-6">
            <img
              src={idImg.imageURL}
              alt={idImg.originalName}
              className="w-[300px] h-[200px] object-cover rounded-lg shadow-md"
            />
          </div>

          <div className="text-center space-y-2">
            <h4 className="text-xl font-bold text-gray-800">{idImg.originalName}</h4>
            <h4 className="text-md text-gray-500">Size: {idImg.size}</h4>
            <p className="text-sm text-gray-400">
              Uploaded at: {idImg.createdAt.split('G')[0]}
            </p>

            <button
              onClick={() => handleDelete(idImg.public_id)}
              className="mt-4 bg-red-600 hover:bg-red-700 text-white px-6 py-2 rounded-xl shadow-md transition-all duration-300"
            >
              Delete
            </button>
          </div>
        </>
      )}

      <div className="mt-8 text-center">
        <Link
          to="/"
          className="inline-block text-blue-600 hover:text-blue-800 font-medium transition-all duration-200"
        >
          ← Back to all files
        </Link>
      </div>
    </div>
  );
};

export default FileDetails;
