import React, { useState, useEffect } from 'react'
import Header from '../Components/Header'
import { Link } from 'react-router-dom'
import Footer from '../Components/Footer'
import { motion, AnimatePresence } from 'framer-motion'

const WorkPage = () => {
  const [filter, setFilter] = useState('all')
  const [filteredWorks, setFilteredWorks] = useState([])

  const works = [
    { id: 1, title: 'Ethereal Dreams', year: '2023', category: 'residential', image: 'https://i.imgur.com/zEivwNS.png' },
    { id: 2, title: 'Urban Rhythm', year: '2022', category: 'commercial', image: 'https://i.imgur.com/BBL4RQe.jpeg' },
    { id: 3, title: 'Whispers of Nature', year: '2023', category: 'exterior', image: 'https://i.imgur.com/vimagzm.jpeg' },
    { id: 4, title: 'Chromatic Harmony', year: '2022', category: 'interior', image: 'https://i.imgur.com/HR84tsX.jpeg' },
    { id: 5, title: 'Sculptural Serenity', year: '2023', category: 'residential', image: 'https://i.imgur.com/SLSmHFx.jpeg' },
    { id: 6, title: 'Abstract Reverie', year: '2022', category: 'commercial', image: 'https://i.imgur.com/ocL3eLv.png' },
    { id: 7, title: 'Luminous Shadows', year: '2023', category: 'interior', image: 'https://i.imgur.com/zEivwNS.png' },
    { id: 8, title: 'Urban Oasis', year: '2023', category: 'exterior', image: 'https://i.imgur.com/zEivwNS.png' },
    { id: 9, title: 'Modern Elegance', year: '2023', category: 'residential', image: 'https://i.imgur.com/SLSmHFx.jpeg' },
  ]

  useEffect(() => {
    setFilteredWorks(filter === 'all' ? works : works.filter(work => work.category === filter))
  }, [filter])

  return (  
    <div className="min-h-screen bg-white text-black">
      <Header />

      <main className='my-20 px-8'>
        <h1 className="text-4xl md:text-6xl font-light mb-4 sm:mb-8 text-center">Our Work</h1>
        <div className="mb-8 flex space-x-4 overflow-x-auto pr-4 scrollbar-hide md:justify-center">
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
                      alt={work.title}
                      className="w-full h-64 sm:h-80 object-cover transition-transform duration-300 ease-in-out group-hover:scale-110"
                    />
                    <div className="absolute inset-0 bg-black bg-opacity-50 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-4">
                      <h3 className="text-xl font-light mb-1 text-white">{work.title}</h3>
                      <p className="text-sm text-gray-300">{work.category.charAt(0).toUpperCase() + work.category.slice(1)} | {work.year}</p>
                    </div>
                  </div>
                </Link>
              </motion.div>
            ))}
          </motion.div>
        </AnimatePresence>
      </main>

      <Footer />
    </div>
  )
}

export default WorkPage