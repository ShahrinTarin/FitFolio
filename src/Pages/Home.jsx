import React, { useEffect, useState } from 'react';
import Hero from '../Component/Hero';
import Feature from '../Component/Feature';
import AboutSection from '../Component/AboutSection';
import NewsletterSubscribe from '@/Component/NewsletterSubscribe';
import FeaturedClass from '@/Component/FeaturedClass';
import ReviewCarousel from '@/Component/ReviewCarousel';
import TeamSection from '@/Component/TeamSection';
import LatestForumPosts from '@/Component/LatestForumPosts';
import Marquee from '@/Component/Marquee';
import { Helmet } from 'react-helmet-async';
const Home = () => {
    const [pageTitle, setPageTitle] = useState('FitFolio');

    useEffect(() => {
        const newTitle = 'FitFolio | Home';
        setPageTitle(newTitle);
        document.title = newTitle;

    }, [])
    return (
        <div>
            <Helmet>
                <title>{pageTitle}</title>
            </Helmet>
            <Hero></Hero>
            <Feature></Feature>
            <AboutSection></AboutSection>
            <FeaturedClass></FeaturedClass>
            <LatestForumPosts></LatestForumPosts>
            <TeamSection></TeamSection>
            <ReviewCarousel></ReviewCarousel>
            <Marquee></Marquee>
            <NewsletterSubscribe></NewsletterSubscribe>
        </div>
    );
};

export default Home;