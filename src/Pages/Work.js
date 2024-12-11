import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import { collection, getDocs } from 'firebase/firestore'
import { db } from '../firebaseConfig'

const WorkPage = () => {
  const [filter, setFilter] = useState('all')
  const [filteredWorks, setFilteredWorks] = useState([])
  const [works, setWorks] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  // Fetch projects from Firestore
  useEffect(() => {
    const fetchProjects = async () => {
      try {
        const projectsCollection = collection(db, 'projects')
        const projectSnapshot = await getDocs(projectsCollection)
        const projectsList = projectSnapshot.docs.map(doc => ({
          id: doc.id,
          ...doc.data(),
          // Use thumbnailUrl as image, fallback to featureImageUrl, then to first available image
          image: doc.data().thumbnailUrl || 
                 doc.data().featureImageUrl || 
                 (doc.data().images && doc.data().images.length > 0 ? doc.data().images[0] : null)
        }))
        setWorks(projectsList)
        setLoading(false)
      } catch (err) {
        console.error('Error fetching projects:', err)
        setError('Failed to load projects')
        setLoading(false)
      }
    }

    fetchProjects()
  }, [])

  // Filter projects based on category
  useEffect(() => {
    if (filter === 'all') {
      setFilteredWorks(works)
    } else {
      setFilteredWorks(works.filter(work => 
        work.categories && work.categories.map(cat => cat.toLowerCase()).includes(filter.toLowerCase())
      ))
    }
  }, [filter, works])

  if (loading) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center">
        <div className="animate-spin rounded-full h-32 w-32 border-t-2 border-b-2 border-black"></div>
      </div>
    )
  }

  if (error) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center">
        <div className="text-red-500 text-xl">{error}</div>
      </div>
    )
  }

  return (  
    <div className="min-h-screen bg-white text-black">
      <main className='my-20 px-10 md:px-20'>
        <h2 className="text-2xl md:text-4xl font-medium mb-4 sm:mb-8 text-left">Our Portfolio</h2>
        <div className="mb-8 flex space-x-4 overflow-x-auto pr-4 scrollbar-hide">
          <style jsx>{`
            ::-webkit-scrollbar {
              display: none;
            }
          `}</style>
          {['all', 'commercial', 'residential', 'interior', 'exterior'].map((category) => (
            <button
              key={category}
              onClick={() => setFilter(category)}
              className={`px-6 py-3 rounded-full transition-all duration-300 ${
                filter === category
                  ? ' text-black underline'
                  : ' text-black hover:underline'
              }`}
            >
              {category.charAt(0).toUpperCase() + category.slice(1)}
            </button>
          ))}
        </div>
        
        <AnimatePresence>
          <motion.div 
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-2 md:gap-1 min-h-screen"
            layout
          >
            {filteredWorks.map((work) => (
              <motion.div
                key={work.id}
                layout
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.8 }}
                transition={{ duration: 0.5 }}
              >
                <Link to={`/project/${work.id}`} className="bg-white rounded-sm overflow-hidden shadow-lg hover:shadow-xl transition-all duration-300 ease-in-out block">
                  <div className="relative overflow-hidden group">
                    <img 
                      src={work.image}
                      alt={work.name}
                      className="w-full h-96 sm:h-80 object-cover transition-transform duration-300 ease-in-out group-hover:scale-110"
                    />
                    <div className="absolute inset-0 bg-black bg-opacity-20 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-4">
                      <h3 className="text-xl font-light mb-1 text-white">{work.name}</h3>
                      <p className="text-sm text-gray-300">
                        {work.categories && work.categories.join(' | ')}
                      </p>
                    </div>
                  </div>
                </Link>
              </motion.div>
            ))}
          </motion.div>
        </AnimatePresence>
      </main>
    </div>
  )
}

export default WorkPage