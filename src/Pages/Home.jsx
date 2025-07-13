import React from 'react';
import Hero from '../Component/Hero';
import Feature from '../Component/Feature';
import AboutSection from '../Component/AboutSection';
import NewsletterSubscribe from '@/Component/NewsletterSubscribe';
const Home = () => {
    return (
        <div>
            <Hero></Hero>
            <Feature></Feature>
            <AboutSection></AboutSection>
            <NewsletterSubscribe></NewsletterSubscribe>
        </div>
    );
};

export default Home;