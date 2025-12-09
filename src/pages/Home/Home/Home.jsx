import React from 'react';
import Banner from '../Banner/Banner';
import About from '../About/About';
import Features from '../Features/Features';
import Testimonials from '../Testimonials/Testimonials';
import ExtraSections from '../ExtraSections/ExtraSections';



const Home = () => {
    return (
        <div >
            <Banner> </Banner>
            <About></About>
            <Features></Features>
            <Testimonials></Testimonials>
            <ExtraSections></ExtraSections>
            
        </div>
    );
};

export default Home;