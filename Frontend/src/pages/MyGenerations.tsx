import { useState, useEffect } from 'react';
import SoftBackdrop from '../components/SoftBackdrop'
import { dummyThumbnails, type IThumbnailPreview } from '../assets 2/assets';
import { div, img } from 'motion/react-client';
import { useNavigate } from 'react-router-dom';
// import { div, tr } from 'motion/react-client';
import { motion } from 'framer-motion';


const MyGenerations = () => {

  const navigate = useNavigate();

 const aspectRatioMap: Record<string, string> = {
  '16:9': 'aspect-video',
  '1:1': 'aspect-square',
  '9:16': 'aspect-[9/16]'  
};

  const [thumbnails, setThumbnails] = useState<IThumbnailPreview[]>([]);
  const [loading, setLoading] = useState(false);

 const fetchTHumbnails = async () => {
  setLoading(true);
  setThumbnails(dummyThumbnails as IThumbnailPreview[]);
  setLoading(false);
};

  const handleDownload = (image_url: string) => {
    window.open(image_url, '_blank');
  };

  const handleDelete = async (id: string) => {
    console.log(id);
  };

  useEffect(() => {
    fetchTHumbnails();
  }, []);

  return (
    <>
      <SoftBackdrop />
      <div className='mt-32 min-h-screen px-6 md:px-16 lg:px-24 x1:px-32'>

        {/* Header */}
        <div className='mb-8'>
          <h1 className='text-3xl font-bold'>My Generations</h1>
          <p className='text-gray-500 mt-1'>
            View and manage all your AI-generated thumbnails
          </p>
        </div>

        {/* loading */}
        {loading && (
          <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6'>
            {Array.from({ length: 6 }).map((_, index) => (
              <div
                key={index}
                className='h-48 bg-gray-300 animate-pulse rounded-lg'
              ></div>
            ))}
          </div>
        )}

        {/* empty state */}
        {!loading && thumbnails.length === 0 && (
          <div className='text-center mt-20'>
            <h3 className='text-xl font-semibold'>No Generations Found</h3>
            <p className='text-gray-500'>Click and Start creating!</p>
          </div>
        )}

        {/* grid */}
        {!loading && thumbnails.length > 0 && (
          <div className='columns-1 sm:columns-2 lg:columns-3 2xl:columns-4 gap-8'>
            {thumbnails.map((thumb: IThumbnailPreview) => {
              const aspectClass =
                aspectRatioMap[thumb.aspect_ratio || '16:9'];

              return (
               <div
  key={thumb._id}
  className="group relative mb-8 cursor-pointer transition-transform duration-300 hover:-translate-y-2"
>

  {/* Image Container */}
  <div
    onClick={() => navigate(`/generate/${thumb._id}`)}
    className={`relative w-full overflow-hidden rounded-xl shadow-lg ${aspectClass}`}
  >
    {thumb.image_url && (
      <img
        src={thumb.image_url}
        alt={thumb.title}
        className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
      />
    )}
    <div className="absolute bottom-0 left-0 w-full bg-gradient-to-t from-black/70 to-transparent px-4 py-3 rounded-b-xl">
  <h3 className="text-white text-sm font-semibold truncate">
    {thumb.title || "Untitled"}
  </h3>
</div>

    {thumb.isGenerating && (
      <div className="absolute inset-0 bg-black/60 flex items-center justify-center text-white font-semibold text-lg">
        Generating...
      </div>
    )}

    {/* Aspect Ratio Badge */}
    <div className="absolute top-3 left-3 bg-black/70 text-white text-xs px-2 py-1 rounded-md">
      {thumb.aspect_ratio || "16:9"}
    </div>

    {/* Color Scheme Badge */}
    <div className="absolute top-3 right-3 bg-indigo-600 text-white text-xs px-2 py-1 rounded-md capitalize">
      {thumb.color_scheme || "Default"}
    </div>
  </div>

  {/* Buttons */}
 {/* Top Center Action Buttons */}
<div className="absolute top-3 left-1/2 -translate-x-1/2 flex gap-2 opacity-0 group-hover:opacity-100 transition duration-300">

  <button
    onClick={(e) => {
      e.stopPropagation();
      handleDownload(thumb.image_url || '');
    }}
    className="bg-pink-500/80 hover:bg-pink-600 text-white text-xs px-3 py-1 rounded-full shadow-sm backdrop-blur-sm transition"
  >
    Download
  </button>

  <button
    onClick={(e) => {
      e.stopPropagation();
      handleDelete(thumb._id);
    }}
    className="bg-pink-300/80 hover:bg-pink-400 text-white text-xs px-3 py-1 rounded-full shadow-sm backdrop-blur-sm transition"
  >
    Delete
  </button>

</div>
</div>
              );
            })}
          </div>
        )}

      </div>
    </>
  );
};

export default MyGenerations;
