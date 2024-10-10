import React, { useState } from 'react'
import Header from '../Components/Header'
import Footer from '../Components/Footer'
import { motion, AnimatePresence } from 'framer-motion'
import ServicesSection from '../Components/ServicesSection'

const AboutPage = () => {
  const faqs = [
    { question: "What types of 3D visualization services do you offer?", answer: "We offer a wide range of services including architectural renderings, interior visualizations, virtual reality experiences, and interactive 3D walkthroughs." },
    { question: "How long does a typical project take?", answer: "Project timelines vary depending on complexity. A standard architectural visualization might take 2-3 weeks, while more complex projects could take 4-6 weeks or more." },
    { question: "Do you work with international clients?", answer: "Absolutely! We have experience working with clients from all over the world, utilizing modern communication tools to ensure smooth collaboration regardless of location." },
    { question: "Can you work directly from architectural plans?", answer: "Yes, we are proficient in working from various types of architectural drawings, including CAD files, BIM models, or even hand-drawn sketches." },
    { question: "What sets Arqviz Interactive apart from other visualization studios?", answer: "Our commitment to pushing the boundaries of technology, combined with our deep understanding of architectural principles, allows us to create truly immersive and accurate visualizations that bring designs to life." },
  ]

  const [openFaq, setOpenFaq] = useState(null)

  const toggleFaq = (index) => {
    setOpenFaq(openFaq === index ? null : index)
  }

  return (
    <div className="min-h-screen bg-white text-black flex flex-col">
      <Header />

      <main className="flex-grow flex flex-col gap-40 mt-20">
        <ServicesSection />

        <motion.section 
          className="mt-40 md:max-w-2xl md:mx-auto px-8"
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          <h2 className="text-3xl md:text-4xl font-light mb-20 text-center">Frequently Asked Questions</h2>
          <div className="space-y-8">
            {faqs.map((faq, index) => (
              <motion.div 
                key={index}
                className="border-b border-gray-200 pb-8"
                initial={false}
              >
                <button
                  className="flex justify-between items-center w-full text-left"
                  onClick={() => toggleFaq(index)}
                >
                  <h3 className="text-xl font-medium">{faq.question}</h3>
                  <span className="ml-6 flex-shrink-0">
                    {openFaq === index ? (
                      <svg className="h-6 w-6 text-gray-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 15l7-7 7 7" />
                      </svg>
                    ) : (
                      <svg className="h-6 w-6 text-gray-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                      </svg>
                    )}
                  </span>
                </button>
                <AnimatePresence>
                  {openFaq === index && (
                    <motion.div
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: "auto" }}
                      exit={{ opacity: 0, height: 0 }}
                      transition={{ duration: 0.3 }}
                    >
                      <p className="mt-6 text-gray-700 text-lg">{faq.answer}</p>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            ))}
          </div>
        </motion.section>
      </main>

      <Footer />
    </div>
  )
}

export default AboutPage