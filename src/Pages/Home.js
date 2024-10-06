import React from 'react';
import Header from '../Components/Header';
import Footer from '../Components/Footer';
import HeroSection from '../Components/HeroSection';
import VideoSection from '../Components/VideoSection';
import ServicesSection from '../Components/ServicesSection';
import ClientsSection from '../Components/ClientsSection';

export default function Home() {
  return (
    <div className="min-h-screen bg-white text-black">
      <Header />
      <main className='mt-0'>
        <HeroSection />
        <VideoSection />
        <ServicesSection />
        <ClientsSection />
      </main>
      <Footer />
    </div>
  );
}