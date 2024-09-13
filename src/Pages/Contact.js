import React, { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { MapPin, Phone, Mail, Send } from 'lucide-react'
import Header from '../Components/Header'
import  '../Assets/instagram.png'
import  '../Assets/youtube.png'





const ContactPage = () => {
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [message, setMessage] = useState('')
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitMessage, setSubmitMessage] = useState('')

    const instagram = require('../Assets/instagram.png');
    const youtube = require('../Assets/youtube.png');


  const handleSubmit = (e) => {
    e.preventDefault()
    setIsSubmitting(true)
    // Simulating form submission
    setTimeout(() => {
      setIsSubmitting(false)
      setSubmitMessage('Thank you for your message. We\'ll be in touch soon!')
      setName('')
      setEmail('')
      setMessage('')
    }, 2000)
  }

  useEffect(() => {
    if (submitMessage) {
      const timer = setTimeout(() => setSubmitMessage(''), 5000)
      return () => clearTimeout(timer)
    }
  }, [submitMessage])

  return (
    <div className="min-h-screen bg-white text-black p-4 sm:p-8">
        <Header />

      <main className="flex flex-col md:flex-row gap-12">
        <motion.section 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="md:w-1/2"
        >
          <h1 className="text-3xl font-light mb-6">Get in Touch</h1>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">Name</label>
              <input
                type="text"
                id="name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
                className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">Email</label>
              <input
                type="email"
                id="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>
            <div>
              <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-1">Message</label>
              <textarea
                id="message"
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                required
                rows="4"
                className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              ></textarea>
            </div>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              type="submit"
              disabled={isSubmitting}
              className="w-full bg-black text-white py-2 px-4 rounded-md hover:bg-gray-800 transition-colors duration-300 flex items-center justify-center"
            >
              {isSubmitting ? (
                <motion.div
                  animate={{ rotate: 360 }}
                  transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                >
                  <Send className="w-5 h-5" />
                </motion.div>
              ) : (
                <>Send Message <Send className="w-5 h-5 ml-2" /></>
              )}
            </motion.button>
          </form>
          {submitMessage && (
            <motion.p
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              className="mt-4 text-green-600"
            >
              {submitMessage}
            </motion.p>
          )}
        </motion.section>

        <motion.section 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="md:w-1/2"
        >
          <h2 className="text-2xl font-light mb-6">Contact Information</h2>
          <div className="space-y-4">
            <motion.div 
              whileHover={{ scale: 1.05 }}
              className="flex items-center space-x-4"
            >
              <MapPin className="w-6 h-6" />
              <p>B1, Oakwood Apts, Banjara Hills, Hyderabad, India</p>
            </motion.div>
            <motion.div 
              whileHover={{ scale: 1.05 }}
              className="flex items-center space-x-4"
            >
              <Phone className="w-6 h-6" />
              <p>+91 7659000258</p>
            </motion.div>
            <motion.div 
              whileHover={{ scale: 1.05 }}
              className="flex items-center space-x-4"
            >
              <Mail className="w-6 h-6" />
              <p>work@arqviz.com</p>
            </motion.div>
          </div>
          <div className="mt-8">
            <h3 className="text-xl font-light mb-4">Follow Us</h3>
            <div className="flex flex-col items-start space-y-2 align-top">
              <a href="https://www.instagram.com/arqviz/" target="_blank" rel="noopener noreferrer" className="flex flex-row items-center space-x-2 gap-2">
                <img src={instagram} alt="Instagram" className="w-6 h-6" />
                <p>Instagram</p>
              </a>
              <a href="https://www.youtube.com/arqviz" target="_blank" rel="noopener noreferrer" className="flex flex-row items-center space-x-2 gap-2">
                <img src={youtube} alt="YouTube" className="w-6 h-6" />
                <p>YouTube</p>
              </a>
            </div>
          </div>
        </motion.section>
      </main>

      <footer className="mt-12 text-sm">
        <p>© 2024 ARQVIZ Interactive</p>
      </footer>
    </div>
  )
}

export default ContactPage