import React, { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { ChevronLeft, ChevronRight, X } from 'lucide-react'
import { useParams, useNavigate } from 'react-router-dom'
import { doc, getDoc } from 'firebase/firestore'
import { db } from '../firebaseConfig'
import Header from '../Components/Header'
import Footer from '../Components/Footer'

// Add this helper function to extract YouTube video ID
const getYouTubeVideoId = (url) => {
  if (!url) return null;
  const regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|&v=)([^#&?]*).*/;
  const match = url.match(regExp);
  return (match && match[2].length === 11) ? match[2] : null;
}

const ProjectDetails = () => {
  const { id } = useParams()
  const navigate = useNavigate()
  const [lightboxOpen, setLightboxOpen] = useState(false)
  const [currentImageIndex, setCurrentImageIndex] = useState(0)
  const [project, setProject] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    const fetchProject = async () => {
      try {
        const projectDoc = await getDoc(doc(db, 'projects', id))
        if (projectDoc.exists()) {
          setProject({
            id: projectDoc.id,
            ...projectDoc.data(),
            // Use thumbnailUrl as featureImage if available
            featureImage: projectDoc.data().featureImageUrl || 
                         projectDoc.data().thumbnailUrl || 
                         (projectDoc.data().images && projectDoc.data().images.length > 0 
                           ? projectDoc.data().images[0] 
                           : null),
            // Use imageUrls as images array
            images: projectDoc.data().imageUrls || []
          })
        } else {
          setError('Project not found')
        }
      } catch (err) {
        console.error('Error fetching project:', err)
        setError('Failed to load project')
      } finally {
        setLoading(false)
      }
    }

    fetchProject()
  }, [id])

  // Add keyboard event handler
  useEffect(() => {
    const handleKeyPress = (e) => {
      if (!lightboxOpen) return;
      
      e.stopPropagation();
      switch (e.key) {
        case 'ArrowLeft':
          prevImage();
          break;
        case 'ArrowRight':
          nextImage();
          break;
        case 'Escape':
          closeLightbox();
          break;
        default:
          break;
      }
    };

    window.addEventListener('keydown', handleKeyPress);
    return () => window.removeEventListener('keydown', handleKeyPress);
  }, [lightboxOpen]); // Only re-run if lightboxOpen changes

  if (loading) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center">
        <div className="animate-spin rounded-full h-32 w-32 border-t-2 border-b-2 border-black"></div>
      </div>
    )
  }

  if (error || !project) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center">
        <div className="text-red-500 text-xl">{error}</div>
      </div>
    )
  }

  const openLightbox = (index) => {
    setCurrentImageIndex(index)
    setLightboxOpen(true)
  }

  const closeLightbox = () => {
    setLightboxOpen(false)
  }

  const nextImage = () => {
    setCurrentImageIndex((prevIndex) => (prevIndex + 1) % project.images.length)
  }

  const prevImage = () => {
    setCurrentImageIndex((prevIndex) => (prevIndex - 1 + project.images.length) % project.images.length)
  }

  return (
    <div className="min-h-screen bg-white text-black mt-20">
      <Header />

      <main className="max-w-full mx-auto p-10 md:p-20">
        <motion.div 
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="mb-8"
        >
          <h1 className="text-4xl font-light mb-4">{project.name}</h1>
          {project.client && (
            <p className="text-gray-600 mb-2">Client: {project.client}</p>
          )}
          {project.categories && (
            <div className="flex gap-2 mb-4">
              {project.categories.map((category, index) => (
                <span 
                  key={index}
                  className="px-3 py-1 bg-gray-100 rounded-full text-sm text-gray-600"
                >
                  {category}
                </span>
              ))}
            </div>
          )}
        </motion.div> {/* Add YouTube video section */}
        {project.featureVideo && getYouTubeVideoId(project.featureVideo) && (
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="mb-12 .aspect-w-16 aspect-h-9"
          >
            <iframe
              src={`https://www.youtube.com/embed/${getYouTubeVideoId(project.featureVideo)}`}
              title="Project Video"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
              className="w-full h-[400px] rounded-lg"
              
            ></iframe>
          </motion.div>
        )}

 {/* Feature image */}
 <motion.div 
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5, delay: 0.4 }}
          className="mb-12"
        >
          <img
            src={project.featureImage}
            alt={project.title}
            className="w-full max-h-[80vh] object-cover rounded-sm"
          />
        </motion.div>

        {/* Add description section */}
        {project.description && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="mb-8 prose prose-lg max-w-none"
          >
            <p className="text-gray-700 leading-relaxed whitespace-pre-line">
              {project.description}
            </p>
          </motion.div>
        )}

       
       
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.6 }}
          className="grid grid-cols-1 sm:grid-cols-2 gap-8"
        >
          {project.images.map((image, index) => (
            <motion.div
              key={index}
              whileHover={{ scale: 1.03, transition: { duration: 0.3 } }}
              whileTap={{ scale: 0.97 }}
              className="cursor-pointer relative group overflow-hidden rounded-sm shadow-lg"
              onClick={() => openLightbox(index)}
            >
              <img
                src={image}
                alt={`Project image ${index + 1}`}
                className="w-full h-[500px] object-cover transition-transform duration-500 ease-in-out group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-30 transition-all duration-300 flex items-center justify-center">
                <span className="text-white opacity-0 group-hover:opacity-100 transition-opacity duration-300 text-lg font-light">
                  Click to expand
                </span>
              </div>
            </motion.div>
          ))}
        </motion.div>

        {lightboxOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black bg-opacity-95 flex items-center justify-center z-50"
            onClick={closeLightbox}
          >
            <button
              className="absolute top-4 right-4 text-white hover:text-gray-300 transition-colors duration-300 p-2"
              onClick={(e) => {
                e.stopPropagation();
                closeLightbox();
              }}
            >
              <X size={32} />
            </button>
            <button
              className="absolute left-4 top-1/2 transform -translate-y-1/2 text-white hover:text-gray-300 transition-colors duration-300 p-4"
              onClick={(e) => {
                e.stopPropagation();
                prevImage();
              }}
            >
              <ChevronLeft size={48} />
            </button>
            <img
              src={project.images[currentImageIndex]}
              alt={`Project image ${currentImageIndex + 1}`}
              className="max-w-[90vw] max-h-[90vh] object-contain"
              onClick={(e) => e.stopPropagation()}
            />
            <button
              className="absolute right-4 top-1/2 transform -translate-y-1/2 text-white hover:text-gray-300 transition-colors duration-300 p-4"
              onClick={(e) => {
                e.stopPropagation();
                nextImage();
              }}
            >
              <ChevronRight size={48} />
            </button>
          </motion.div>
        )}
      </main>

      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.8 }}
        className="mt-12 flex justify-between p-10 md:p-20"
      >
        <a href="/projects/previous" className="text-gray-600 hover:text-black transition-colors duration-300">
          ← Previous Project
        </a>
        <a href="/projects/next" className="text-gray-600 hover:text-black transition-colors duration-300">
          Next Project →
        </a>
      </motion.div>
      <Footer/>
    </div>
  )
}

export default ProjectDetails