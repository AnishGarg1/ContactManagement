import React from 'react'

const Home = () => {
  return (
    <div className='w-full h-full flex justify-center items-center'>
        <main className='max-w-7xl mx-auto p-6 text-center'>
          <section className='my-16'>
            <h2 className='text-4xl font-bold mb-4'>Welcome to Rehaabit</h2>
            <p className='text-white text-opacity-80 mb-6'>
              Your journey to better habits starts here. Track your progress and achieve your goals with Rehaabit.
            </p>
            <div className='flex justify-center flex-wrap'>
              <button className='bg-purple-600 text-white py-3 px-6 rounded mr-4 mb-2 hover:bg-purple-700'>
                Get Started
              </button>
              <button className='bg-gray-700 text-white py-3 px-6 rounded mb-2 hover:bg-gray-800'>
                Learn More
              </button>
            </div>
          </section>
        </main>
    </div>
  )
}

export default Home