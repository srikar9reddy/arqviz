import React from 'react'
import Header from '../Components/Header'
import Footer from '../Components/Footer'
const AboutPage = () => {
  return (
    <div className="min-h-screen bg-white text-black p-8 flex flex-col">
        <Header />

      <main className="flex-grow flex flex-col md:flex-row gap-12 mt-20">
        <section className="md:w-1/2 flex flex-col justify-center md:pr-12">
          <h1 className="text-3xl font-light mb-6">Our Story</h1>
          <p className="text-sm leading-relaxed mb-6">
            Founded in 2010, ART STUDIO has been at the forefront of contemporary art, 
            pushing boundaries and redefining artistic expression. Our commitment to 
            innovation and creativity has made us a beacon for artists and art enthusiasts alike.
          </p>
          <p className="text-sm leading-relaxed mb-6">
            We believe in the power of art to transform spaces, spark conversations, 
            and inspire change. Our curated collections reflect this philosophy, 
            showcasing works that challenge perceptions and ignite imagination.
          </p>
          <p className="text-sm leading-relaxed">
            At ART STUDIO, we're not just creating art; we're crafting experiences 
            that resonate with the soul and stand the test of time.
          </p>
        </section>

        <section className="md:w-1/2 flex flex-col justify-between">
          <div className="mb-8 rounded-sm">
            <img 
              src="https://i.imgur.com/ocL3eLv.png" 
              alt="Studio space" 
              className="w-full h-auto object-cover rounded-sm"
            />
          </div>
         
        </section>
      </main>

      <Footer />
    </div>
  )
}

export default AboutPage