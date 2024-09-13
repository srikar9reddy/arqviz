import { React, useState, useEffect } from 'react'
import Header from '../Components/Header'
import { Link } from 'react-router-dom'
// import { db } from './firebaseConfig'; // Your Firebase config file
// import { collection, getDocs } from 'firebase/firestore';

const WorkPage = () => {
  const works = [
    { id: 1, title: 'Ethereal Dreams', year: '2023', size: 'large' },
    { id: 2, title: 'Urban Rhythm', year: '2022', size: 'small' },
    { id: 3, title: 'Whispers of Nature', year: '2023', size: 'small' },
    { id: 4, title: 'Chromatic Harmony', year: '2022', size: 'medium' },
    { id: 5, title: 'Sculptural Serenity', year: '2023', size: 'small' },
    { id: 6, title: 'Abstract Reverie', year: '2022', size: 'medium' },
    { id: 7, title: 'Luminous Shadows', year: '2023', size: 'small' },
  ]

  const getGridItemClass = (size) => {
    switch(size) {
      case 'large':
        return 'md:col-span-2 md:row-span-2'
      case 'medium':
        return 'md:col-span-2'
      default:
        return ''
    }
  }

  return (  
    <div className="min-h-screen bg-white text-black p-4 sm:p-8">
      <Header />

      <main>
        <h1 className="text-2xl sm:text-3xl font-light mb-6 sm:mb-8">Our Work</h1>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
          {works.map((work) => (
            <Link to={`/project/${work.id}`} key={work.id} className={`bg-gray-100 p-4 flex flex-col justify-between ${getGridItemClass(work.size)} 
                          transition-all duration-300 ease-in-out 
                          hover:shadow-lg hover:scale-[1.02] hover:bg-gray-200`}
            >
              <div>
                <h2 className="text-lg font-medium mb-2">{work.title}</h2>
                <p className="text-sm text-gray-600">{work.year}</p>
              </div>
              <div className="mt-4 overflow-hidden">
                <img 
                  src={`/placeholder.svg?height=300&width=400&text=${work.title}`}
                  alt={work.title}
                  className="w-full h-auto object-cover transition-transform duration-300 ease-in-out hover:scale-110"
                />
              </div>
            </Link>
          ))}
        </div>
      </main>

      <footer className="mt-8 sm:mt-12 text-sm">
        <p>© 2024 ARQVIZ Interactive</p>
      </footer>
    </div>
  )
}

export default WorkPage