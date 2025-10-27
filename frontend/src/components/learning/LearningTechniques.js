import React from 'react'
import Technique from './Technique'
import LearningHeader from './learning header/LearningHeader'
import { Swiper, SwiperSlide} from 'swiper/react';
import  {Pagination, Scrollbar } from 'swiper'
import { learningTechniques } from '../home/data';
import LockTechnique from './LockTechnique';

import 'swiper/css/scrollbar';
export default function LearningTechniques({width, planType}) {

  
  return (
    <>
    <LearningHeader width={width}/>
    <div className='learning-techniques'>
      <div className='techniques-title'>
        <h1>Learning Techniques</h1>
        <p>Read and choose your favourite learning technique</p>
      </div>

      {planType !== "Free" && <div className='swiper-container'>
        <Swiper
        modules={[ Pagination, Scrollbar]}
        spaceBetween={50}
        // navigation = {true}
        pagination={{ clickable: true }}
        scrollbar={{ draggable: true }}
        slidesPerView= {1}    
      >
        {learningTechniques.map((item, index) => {
          return <SwiperSlide key={index}><Technique {...item}/></SwiperSlide>
        })}
      </Swiper>
      </div>}

      {planType === "Free" && <div className='swiper-container'>
      <Swiper
        modules={[ Pagination, Scrollbar]}
        spaceBetween={50}
        // navigation = {true}
        pagination={{ clickable: true }}
        scrollbar={{ draggable: true }}
        slidesPerView= {1}    
      >
        {learningTechniques.map((item, index) => {
          return <SwiperSlide key={index}><LockTechnique /></SwiperSlide>
        })}
      </Swiper>
           
        </div>}
    </div>

    </>
  )
}
