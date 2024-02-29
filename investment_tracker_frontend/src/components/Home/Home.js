import { Routes, Route } from 'react-router-dom';
import React from 'react';
import Header from '../Header/Header';
import Hero from '../Home/Hero';
import Features from '../Home/Features';
import ESGHome from '../Home/ESGHome';
import Testimonials from '../Home/Testimonial';
import Footer from '../Footer/Footer';

const Home = () => {
  return (
    <div id='home'>
      <Header />
      <Hero />
      <Features />
      <ESGHome />
      <Testimonials />
      <Footer />
    </div>
  );
};

export default Home;
