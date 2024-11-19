import React, { useEffect } from 'react'
import HeroSection from './HeroSection'
import { CategoryCarousel } from './CategoryCarousel'
import LatestJobs from './LatestJobs'
import Footer from './shared/Footer'
import Navbar from './shared/Navbar'
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import useGetAllJobs from '@/hooks/useGetAllJobs'


const Home = () => {
    useGetAllJobs();
    const { authUser } = useSelector(store => store.auth);
    const navigate = useNavigate();
    useEffect(() => {
        if (authUser?.role === 'recruiter') {
            navigate("/admin/companies");
        }
    },[authUser, navigate])
    return (
        <div className="bg-gradient-to-r from-gray-900 via-black to-blue-700 text-white min-h-screen">
            <Navbar />
            <HeroSection />
            <CategoryCarousel />
            <LatestJobs />
            <Footer />
        </div>
    );
}

export default Home