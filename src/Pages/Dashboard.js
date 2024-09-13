import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Upload, X, Plus } from 'lucide-react';
import { db } from '../firebaseConfig';
import { collection, addDoc, updateDoc, doc } from 'firebase/firestore';
import { getStorage, ref, uploadBytes, getDownloadURL } from 'firebase/storage';

const ProjectCreationForm = () => {
    const [name, setName] = useState('');
    const [description, setDescription] = useState('');
    const [client, setClient] = useState('');
    const [images, setImages] = useState([]);
    const [videoUrls, setVideoUrls] = useState(['']);
    const [featureType, setFeatureType] = useState('image');
    const [featureImage, setFeatureImage] = useState(null);
    const [featureVideo, setFeatureVideo] = useState('');
    const [thumbnail, setThumbnail] = useState(null);
    const [loading, setLoading] = useState(false);
    const [submitMessage, setSubmitMessage] = useState('');

  const handleImageUpload = (e) => {
    const newImages = Array.from(e.target.files);
    setImages([...images, ...newImages]);
  };

  const removeImage = (index) => {
    const newImages = [...images];
    newImages.splice(index, 1);
    setImages(newImages);
  };

  const addVideoUrl = () => {
    setVideoUrls([...videoUrls, '']);
  };

  const updateVideoUrl = (index, value) => {
    const newVideoUrls = [...videoUrls];
    newVideoUrls[index] = value;
    setVideoUrls(newVideoUrls);
  };

  const removeVideoUrl = (index) => {
    const newVideoUrls = [...videoUrls];
    newVideoUrls.splice(index, 1);
    setVideoUrls(newVideoUrls);
  };

  const uploadImage = async (image, projectId, subfolder = 'images') => {
    const storage = getStorage();
    
    // Create a reference to the file path with the projectId and subfolder
    const storageRef = ref(storage, `${projectId}/${subfolder}/${image.name}`);
    
    // Upload the file
    await uploadBytes(storageRef, image);
    
    // Get and return the file's download URL
    return getDownloadURL(storageRef);
  };
  
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setSubmitMessage('');
  
    try {
      // Create a new document in Firestore with initial data
      const docRef = await addDoc(collection(db, 'projects'), {
        name,
        description,
        client,
        featureType,
        createdAt: new Date(),
      });
      const projectId = docRef.id;
  
      // Upload images and other media files
      const imageUrls = await Promise.all(images.map((image) => uploadImage(image, projectId)));
      
      let featureImageUrl = '';
      let thumbnailUrl = '';
  
      if (featureType === 'image' && featureImage) {
        featureImageUrl = await uploadImage(featureImage, projectId, 'featureImage');
      }
  
      if (thumbnail) {
        thumbnailUrl = await uploadImage(thumbnail, projectId, 'thumbnail');
      }
  
      // Update the existing Firestore document with file URLs
      await updateDoc(doc(db, 'projects', projectId), {
        imageUrls,
        featureImageUrl,
        featureVideo: featureType === 'video' ? featureVideo : '',
        thumbnailUrl,
        videoUrls: videoUrls.filter(url => url !== ''), // Remove empty video URLs
      });
  
      // Reset form
      setName('');
      setDescription('');
      setClient('');
      setImages([]);
      setVideoUrls(['']);
      setFeatureType('image');
      setFeatureImage(null);
      setFeatureVideo('');
      setThumbnail(null);
  
      setSubmitMessage('Project created successfully!');
      setTimeout(() => {
        setSubmitMessage('');
      }, 10000); // Dismiss after 10 seconds
    } catch (error) {
      console.error('Error creating project:', error);
      setSubmitMessage('An error occurred while creating the project. Please try again.');
      setTimeout(() => {
        setSubmitMessage('');
      }, 10000); // Dismiss after 10 seconds
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-3xl mx-auto">
        <motion.h1
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-3xl font-semibold text-center mb-8"
        >
          Create New Project
        </motion.h1>
        {submitMessage && (
          <div className={`mb-4 p-2 text-center ${submitMessage.includes('successfully') ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'}`}>
            {submitMessage}
          </div>
        )}
        <motion.form
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          onSubmit={handleSubmit}
          className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4"
        >
          {/* Project Name Input */}
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="name">
              Project Name
            </label>
            <input
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              id="name"
              type="text"
              placeholder="Enter project name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />
          </div>
          {/* Description Input */}
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="description">
              Description
            </label>
            <textarea
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              id="description"
              placeholder="Enter project description"
              rows="4"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              required
            ></textarea>
          </div>
          {/* Client Input */}
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="client">
              Client
            </label>
            <input
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              id="client"
              type="text"
              placeholder="Enter client name"
              value={client}
              onChange={(e) => setClient(e.target.value)}
            />
          </div>
          {/* Image Upload */}
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2">
              Upload Images
            </label>
            <div className="flex items-center justify-center w-full">
              <label className="flex flex-col w-full h-32 border-4 border-dashed hover:bg-gray-100 hover:border-gray-300">
                <div className="flex flex-col items-center justify-center pt-7">
                  <Upload className="w-8 h-8 text-gray-400 group-hover:text-gray-600" />
                  <p className="pt-1 text-sm tracking-wider text-gray-400 group-hover:text-gray-600">
                    Select images
                  </p>
                </div>
                <input type="file" className="opacity-0" multiple onChange={handleImageUpload} accept="image/*" />
              </label>
            </div>
            <div className="mt-4 grid grid-cols-3 gap-4">
              {images.map((image, index) => (
                <div key={index} className="relative">
                  <img
                    src={URL.createObjectURL(image)}
                    alt={`Uploaded ${index + 1}`}
                    className="w-full h-24 object-cover rounded"
                  />
                  <button
                    type="button"
                    onClick={() => removeImage(index)}
                    className="absolute top-0 right-0 bg-red-500 text-white rounded-full p-1"
                  >
                    <X className="w-4 h-4" />
                  </button>
                </div>
              ))}
            </div>
          </div>
          {/* Video URLs */}
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2">
              Video URLs
            </label>
            {videoUrls.map((url, index) => (
              <div key={index} className="flex mb-2">
                <input
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                  type="url"
                  placeholder="Enter video URL"
                  value={url}
                  onChange={(e) => updateVideoUrl(index, e.target.value)}
                />
                <button
                  type="button"
                  onClick={() => removeVideoUrl(index)}
                  className="ml-2 bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>
            ))}
            <button
              type="button"
              onClick={addVideoUrl}
              className="mt-2 bg-gray-700 hover:bg-gray-900 text-white font-bold py-2 px-4 rounded"
            >
              <Plus className="w-4 h-4 inline-block mr-2" /> Add Video URL
            </button>
          </div>
          {/* Feature Type */}
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2">
              Feature Type
            </label>
            <div className="mt-2">
              <label className="inline-flex items-center">
                <input
                  type="radio"
                  className="form-radio"
                  name="featureType"
                  value="image"
                  checked={featureType === 'image'}
                  onChange={() => setFeatureType('image')}
                />
                <span className="ml-2">Image</span>
              </label>
              <label className="inline-flex items-center ml-6">
                <input
                  type="radio"
                  className="form-radio"
                  name="featureType"
                  value="video"
                  checked={featureType === 'video'}
                  onChange={() => setFeatureType('video')}
                />
                <span className="ml-2">Video</span>
              </label>
            </div>
          </div>
          {/* Feature Image/Video Input */}
          {featureType === 'image' ? (
            <div className="mb-4">
              <label className="block text-gray-700 text-sm font-bold mb-2">
                Feature Image
              </label>
              <input
                type="file"
                onChange={(e) => setFeatureImage(e.target.files[0] || null)}
                accept="image/*"
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              />
            </div>
          ) : (
            <div className="mb-4">
              <label className="block text-gray-700 text-sm font-bold mb-2">
                Feature Video URL
              </label>
              <input
                type="url"
                value={featureVideo}
                onChange={(e) => setFeatureVideo(e.target.value)}
                placeholder="Enter feature video URL"
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              />
            </div>
          )}
          {/* Thumbnail Input */}
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2">
              Thumbnail
            </label>
            <input
              type="file"
              onChange={(e) => setThumbnail(e.target.files[0] || null)}
              accept="image/*"
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            />
          </div>
          {/* Submit Button */}
          <div className="flex items-center justify-between">
            <button
              className="bg-gray-700 hover:bg-gray-900 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
              type="submit"
              disabled={loading}
            >
              {loading ? 'Creating...' : 'Create Project'}
            </button>
          </div>
        </motion.form>
      </div>
    </div>
  );
};

export default ProjectCreationForm;