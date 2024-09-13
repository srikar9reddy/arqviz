import React, { useState } from 'react'
import { motion } from 'framer-motion'
import { ChevronLeft, ChevronRight, X } from 'lucide-react'
import Header from '../Components/Header'

const ProjectDetails = () => {
  const [lightboxOpen, setLightboxOpen] = useState(false)
  const [currentImageIndex, setCurrentImageIndex] = useState(0)

  const project = {
    title: "Urban Oasis",
    description: "Urban Oasis is a revolutionary architectural project that seamlessly blends nature with modern city living. This innovative design incorporates vertical gardens, sustainable materials, and smart technology to create a harmonious living space that reduces environmental impact while enhancing the quality of life for its residents.",
    featureImage: "/placeholder.svg?height=600&width=800",
    images: [
      "/placeholder.svg?height=400&width=600",
      "/placeholder.svg?height=400&width=600",
      "/placeholder.svg?height=400&width=600",
      "/placeholder.svg?height=400&width=600",
      "/placeholder.svg?height=400&width=600",
      "/placeholder.svg?height=400&width=600",
    ]
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
    <div className="min-h-screen bg-white text-black p-4 sm:p-8">
      <Header />

      <main className="max-w-4xl mx-auto">
        <motion.h1 
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-3xl font-light mb-6"
        >
          {project.title}
        </motion.h1>

        <motion.p 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="mb-8 text-gray-600"
        >
          {project.description}
        </motion.p>

        <motion.div 
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5, delay: 0.4 }}
          className="mb-12"
        >
          <img
            src={project.featureImage}
            alt={project.title}
            className="w-full h-auto object-cover rounded-lg"
          />
        </motion.div>

        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.6 }}
          className="grid grid-cols-2 sm:grid-cols-3 gap-4"
        >
          {project.images.map((image, index) => (
            <motion.div
              key={index}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="cursor-pointer"
              onClick={() => openLightbox(index)}
            >
              <img
                src={image}
                alt={`Project image ${index + 1}`}
                className="w-full h-auto object-cover rounded-lg"
              />
            </motion.div>
          ))}
        </motion.div>

        {lightboxOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black bg-opacity-90 flex items-center justify-center z-50"
            onClick={closeLightbox}
          >
            <button
              className="absolute top-4 right-4 text-white"
              onClick={closeLightbox}
            >
              <X size={24} />
            </button>
            <button
              className="absolute left-4 top-1/2 transform -translate-y-1/2 text-white"
              onClick={prevImage}
            >
              <ChevronLeft size={24} />
            </button>
            <img
              src={project.images[currentImageIndex]}
              alt={`Project image ${currentImageIndex + 1}`}
              className="max-w-full max-h-[80vh] object-contain"
            />
            <button
              className="absolute right-4 top-1/2 transform -translate-y-1/2 text-white"
              onClick={nextImage}
            >
              <ChevronRight size={24} />
            </button>
          </motion.div>
        )}
      </main>

      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.8 }}
        className="mt-12 flex justify-between"
      >
        <a href="/projects/previous" className="text-gray-600 hover:text-black transition-colors duration-300">
          ← Previous Project
        </a>
        <a href="/projects/next" className="text-gray-600 hover:text-black transition-colors duration-300">
          Next Project →
        </a>
      </motion.div>

      <footer className="mt-12 text-sm text-center">
        <p>© 2023 ART STUDIO. ALL RIGHTS RESERVED.</p>
      </footer>
    </div>
  )
}

export default ProjectDetails