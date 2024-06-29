'use client';
import React from 'react'
import DataSection from './(components)/Dashboard/DataSection';
import Image from 'next/image';

function Home() {
  return (
    <div className = "bg-slate-900 flex flex-col justify-between h-full">
      <div className='flex flex-col flex-grow overflow-y-auto'>
        <section class="bg-white dark:bg-gray-900">
            <div class="grid max-w-screen-xl px-4 py-5 mx-auto lg:gap-8 xl:gap-0 lg:py-16 lg:grid-cols-12">
                <div class="mr-auto place-self-center lg:col-span-7">
                    <h1 class="max-w-2xl mb-4 text-4xl font-extrabold tracking-tight leading-none md:text-5xl xl:text-6xl dark:text-white">MediByte Admin Panel</h1>
                    <p class="max-w-2xl mb-6 font-light text-gray-500 lg:mb-8 md:text-lg lg:text-xl dark:text-gray-400">A healthier future for all—inspired by faith, driven by innovation, and powered by our humanity. Digitizing data documentation through data powered application.</p>
                    <a href="/PatientPage/1" class="inline-flex items-center justify-center px-5 py-3 mr-3 text-base font-medium text-center text-white rounded-lg bg-primary-700 hover:bg-primary-800 focus:ring-4 focus:ring-primary-300 dark:focus:ring-primary-900">
                        Get started
                        <svg class="w-5 h-5 ml-2 -mr-1" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z" clip-rule="evenodd"></path></svg>
                    </a>
                    <a href="/Dashboard/1" class="inline-flex items-center justify-center px-5 py-3 text-base font-medium text-center text-gray-900 border border-gray-300 rounded-lg hover:bg-gray-100 focus:ring-4 focus:ring-gray-100 dark:text-white dark:border-gray-700 dark:hover:bg-gray-700 dark:focus:ring-gray-800">
                        Go to Dashboard
                    </a> 
                </div>
                <div class="hidden lg:mt-0 lg:col-span-5 lg:flex">
                    <Image src="/design.svg" width={300} height={300} alt="mockup"/>
                </div>                
            </div>
            <DataSection/>
        </section>
        
      </div>
      {/* Footer */}
      <div className = " bg-slate-950 flex flex-row justify-between p-1 px-4">
         <div className='flex flex-row gap-2 content-evenly'>
            <Image src='icon.svg' width="40" height='40' alt='icon'/>
            <div className='m-auto'>
                <h1>Medibyte</h1>
            </div>
         </div>
         <div className='flex flex-row'>
            <div className='m-auto'>
                <span> Copyright 2024</span>
            </div>
         </div>
      </div>
     
    </div>
    
    
  )
}

export default Home;