import React from 'react';
import Banner from '../Banner/Banner';
import About from '../About/About';
import Features from '../Features/Features';
import Testimonials from '../Testimonials/Testimonials';
import ExtraSections from '../ExtraSections/ExtraSections';
import UpgradePackage from '../../HRManager/UpgradePackage';



const Home = () => {
    return (
        <div className='mt-22 bg-[#A275FF]'>
            <Banner> </Banner>
            <About></About>
            <UpgradePackage></UpgradePackage>
            <Features></Features>
            <Testimonials></Testimonials>
            <ExtraSections></ExtraSections>
            
        </div>
    );
};

export default Home;