import React, { useRef, useState, useEffect } from 'react';
import { motion, useScroll, useTransform, useInView } from 'framer-motion';

export default function VideoSection() {
  const videoRef = useRef(null);
  const containerRef = useRef(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isVideoLoaded, setIsVideoLoaded] = useState(false);

  const { scrollYProgress } = useScroll();
  const videoScale = useTransform(scrollYProgress, [0.1, 0.3], [0.8, 1]);

  const togglePlay = () => {
    if (!isVideoLoaded) {
      setIsVideoLoaded(true);
      videoRef.current.load();
    }
    
    if (videoRef.current.paused) {
      videoRef.current.play();
      setIsPlaying(true);
    } else {
      videoRef.current.pause();
      setIsPlaying(false);
    }
  };

  const toggleFullscreen = () => {
    if (videoRef.current && window.innerWidth > 768) { // Check if the screen width is greater than 768px (a common mobile screen width)
      if (!document.fullscreenElement) {
        videoRef.current.requestFullscreen().catch(err => {
          console.error(`Error attempting to enable full-screen mode: ${err.message}`);
        });
      } else {
        document.exitFullscreen();
      }
    }
  };

  return (
    <motion.div 
      ref={containerRef}
      className='w-full flex justify-center items-center relative overflow-hidden p-8 md:px-16 mt-12'
      style={{ scale: videoScale }}
    >
      <div className='relative w-full'>
        {!isVideoLoaded ? (
          <img 
            src="https://firebasestorage.googleapis.com/v0/b/arqviz-inc.appspot.com/o/i61MAzTzEDLnOjSUQuiQ%2Fimages%2FSancha-9000.png?alt=media&token=59f91e61-a01d-403c-8ed8-e9d4dcb896d2" // Replace with your thumbnail image path
            className='w-full h-[80vh] object-cover rounded-sm'
            alt="Video thumbnail"
          />
        ) : null}
        <video 
          ref={videoRef}
          className='w-full h-[80vh] object-cover rounded-sm' 
          style={{ display: isVideoLoaded ? 'block' : 'none' }}
          preload="none"
          loop 
          muted 
        >
          <source src="https://firebasestorage.googleapis.com/v0/b/arqviz-inc.appspot.com/o/videos%2FSancha-Low-res.mp4?alt=media&token=6b288f69-ca8e-460b-8789-0991266a25bf" type="video/mp4" />
        </video>
        <div className='absolute bottom-4 right-4 flex space-x-3'>
          <button 
            onClick={togglePlay}
            className='bg-black bg-opacity-50 text-white px-6 py-2 rounded-full hover:bg-opacity-70 transition-all duration-300 flex items-center'
          >
            {isPlaying ? (
              <>
                <svg className="w-4 h-4 mr-2" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                  <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zM7 8a1 1 0 012 0v4a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v4a1 1 0 102 0V8a1 1 0 00-1-1z" clipRule="evenodd" />
                </svg>
                Pause
              </>
            ) : (
              <>
                <svg className="w-4 h-4 mr-2" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM9.555 7.168A1 1 0 008 8v4a1 1 0 001.555.832l3-2a1 1 0 000-1.664l-3-2z" clipRule="evenodd" />
                </svg>
                Play
              </>
            )}
          </button>
          <button 
            onClick={toggleFullscreen}
            className='bg-black bg-opacity-50 text-white px-6 py-2 rounded-full hover:bg-opacity-70 transition-all duration-300 flex items-center'
          >
            <svg className="w-4 h-4 mr-2" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
              <path fillRule="evenodd" d="M3 4a1 1 0 011-1h4a1 1 0 010 2H6.414l2.293 2.293a1 1 0 11-1.414 1.414L5 6.414V8a1 1 0 01-2 0V4zm9 1a1 1 0 010-2h4a1 1 0 011 1v4a1 1 0 01-2 0V6.414l-2.293 2.293a1 1 0 111.414 1.414L13.586 5H12zm-9 7a1 1 0 012 0v1.586l2.293-2.293a1 1 0 111.414 1.414L6.414 15H8a1 1 0 010 2H4a1 1 0 01-1-1v-4zm13-1a1 1 0 011 1v4a1 1 0 01-1 1h-4a1 1 0 010-2h1.586l-2.293-2.293a1 1 0 111.414-1.414L15 13.586V12a1 1 0 011-1z" clipRule="evenodd" />
            </svg>
            Fullscreen
          </button>
        </div>
      </div>
    </motion.div>
  );
}