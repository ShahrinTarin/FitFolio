import React from 'react';
import Hero from '../Component/Hero';
import Feature from '../Component/Feature';
import AboutSection from '../Component/AboutSection';
import NewsletterSubscribe from '@/Component/NewsletterSubscribe';
import FeaturedClass from '@/Component/FeaturedClass';
import ReviewCarousel from '@/Component/ReviewCarousel';
import TeamSection from '@/Component/TeamSection';
import LatestForumPosts from '@/Component/LatestForumPosts';
import Marquee from '@/Component/Marquee';
const Home = () => {
    return (
        <div>
            <Hero></Hero>
            <Feature></Feature>
            <AboutSection></AboutSection>
            <FeaturedClass></FeaturedClass>
            <ReviewCarousel></ReviewCarousel>
            <LatestForumPosts></LatestForumPosts>
            <TeamSection></TeamSection>
            <Marquee></Marquee>
            <NewsletterSubscribe></NewsletterSubscribe>
        </div>
    );
};

export default Home;