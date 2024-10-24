import React from 'react';
import { Link } from 'react-router-dom';

const HomePage = () => {
    return (
        <section className='home-container'>
            <div className='py-14 flex flex-col items-center'>
                <h1 className='head-text text-center mb-8'>Geek vs Geek</h1>
                <p>Welcome to Geek vs Geek, a competitive coding arena where programmers battle in
                real-time. Experience live coding battles with instant feedback and track your opponent's progress as
                you compete. Join now to showcase your skills, challenge fellow coders, and thrive in a dynamic environment!</p>
                <div className='mt-16 mb-11 grid grid-cols-2 gap-12 justify-center items-center'>
                    <Link to="/create" className='block-container relative w-48 h-32'>
                        <div className='rounded-xl absolute inset-0 bg-gray-200'></div>
                        <div className='btn-front rounded-xl flex flex-col justify-center items-center relative'>
                            <h2>Create Arena</h2>
                        </div>
                    </Link>
                    <Link to="/join" className='block-container relative w-48 h-32'>
                        <div className='rounded-xl absolute inset-0 bg-gray-200'></div>
                        <div className='btn-front rounded-xl flex flex-col justify-center items-center relative'>
                            <h2>Join Arena</h2>
                        </div>
                    </Link>
                </div>
                <p className='mt-16'>If you'd like to contribute questions, please email me at <a href="mailto:dheekshithbg@gmail.com">dheekshithbg@gmail.com</a>.</p>
            </div>
        </section>
    );
};

export default HomePage;
