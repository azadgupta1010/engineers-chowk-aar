import React, { useState } from 'react'
import { Button } from './ui/button'
import { Search } from 'lucide-react'
import { useDispatch } from 'react-redux';
import { setSearchText } from '@/redux/jobSlice';
import { useNavigate } from 'react-router-dom';

const HeroSection = () => {
    const [query, setQuery] = useState("");
    const dispatch = useDispatch();
    const navigate = useNavigate();


    const searchJobHandler = () => {
        dispatch(setSearchText(query));
        navigate("/browse");
    }

    return (
        <div className='text-center'>
            <div className='flex flex-col gap-5 my-10'>
                <div className='text-center mx-auto'>
                    <div className="text-[#F83002] px-4 py-2 rounded-full bg-gray-100 font-medium" >Your Engineering Talent Meets Opportunity.</div>
                </div>
                <div>
                    <h1 className='text-5xl font-bold'><span className='text-[#FFFFFF]'>Every Engineers choice </span><br /> choice  <span className='text-[#2d0794]'>for a Brighter future</span></h1>
                </div>
                <div>
                    <p className='text-gray-500'>Welcome to Engineers Chowk - the premier platform dedicated to empowering engineers across all disciplines. Our mission is to bridge the gap between innovative talent and the opportunities that drive global progress. Here’s why Engineers Chowk is your ultimate destination:</p>
                </div>
                <div className='flex w-[40%] shadow-lg border pl-3 border-gray-200 rounded-full items-center gap-4 mx-auto'>
                    <input 
                        type="text"
                        name="query"
                        value={query}
                        onChange={(e) => setQuery(e.target.value)}
                        placeholder="Find your work and get paid"
                       className="outline-none border-none w-full bg-transparent"
                        
                    />
                    <Button onClick={searchJobHandler} className='rounded-r-full bg-[#6A38C2]'>
                        <Search className='h-5 w-5' />
                    </Button>
                </div>
            </div>
        </div>
    )
}

export default HeroSection