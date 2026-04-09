import React from 'react';
import Hero from '../../components/Hero';
import About from '../../components/About';
import Specialization from '../../components/Specialization';
import Services from '../../components/Services';
import Contact from '../../components/Contact';

const Home = () => {
  return (
    <>
      <Hero />
      <About />
      <Specialization />
      <Services />
      <Contact />
    </>
  );
};

export default Home;
