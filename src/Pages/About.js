import React from 'react'
import Header from '../Components/Header'

const AboutPage = () => {
  return (
    <div className="min-h-screen bg-white text-black p-8 flex flex-col">
        <Header />

      <main className="flex-grow flex flex-col md:flex-row gap-12">
        <section className="md:w-1/2">
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
          <div className="mb-8">
            <img 
              src="https://i.imgur.com/ocL3eLv.png" 
              alt="Studio space" 
              className="w-full h-auto object-cover"
            />
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <h2 className="text-sm font-semibold mb-2">Location</h2>
              <p className="text-sm">123 Art Street<br />Creativity City, AC 12345</p>
            </div>
            <div>
              <h2 className="text-sm font-semibold mb-2">Contact</h2>
              <p className="text-sm">info@artstudio.com<br />+1 (234) 567-8900</p>
            </div>
          </div>
        </section>
      </main>

      <footer className="mt-12 text-sm">
        <p>© 2024 ARQVIZ Interactive</p>
      </footer>
    </div>
  )
}

export default AboutPage