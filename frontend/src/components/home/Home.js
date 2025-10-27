import React, {useState, useEffect, useContext} from "react";
import ReactPlayer from "react-player/lazy";
import { Link} from "react-router-dom";

import Faq from "react-faq-component";
import CategoryCard from "./CategoryCard";

import "../../css/home.css";
import DotElement from "../../images/dots-element.png";
import video from "../../images/Video.png";
import catImgI from "../../images/cat-img-1.png";
import catImgII from "../../images/cat-img-2.png";
import catImgIII from "../../images/cat-img-3.png";
import effect from "../../images/Ellipse 7.png";
import testimonial_image from "../../images/testimonial-image.png";
import { useSpring, animated, useInView } from "@react-spring/web";
import { GetStartedContext } from "../../App";
import { reviewsData } from "./data";
import Review from "./Review";
import GoogleTranslate from "../../GoogleTranslate";

const data = {
  title: "",
  rows: [
    {
      title: "What's the difference between the Lesson Plan and Tool Plan?",
      content:
        "The Lesson Plan enables acces to the: Chat, Lesson, Homework, Flashcards and Tests without using credits, while the Tool Plan enables acces to everything else.",
    },
    {
      title: "Will there be new updates?",
      content:
        "Yes, if you have some ideea about new features, please contact us or leave us a suggestion!",
    },
    {
      title: "What AI are you using?",
      content:
        "We are using the latest AI technology in order for our customers to have the best learning experience.",
    },
    {
      title: "What is the difference between the standard and premium plan?",
      content:
        "The premium plan enables acces to GPT-4, which is considerably better at helping you learn faster!",
    },
    {
      title: "Is the app suitable for beginners or more advanced learners?",
      content:
        "The lessons provided by the app can take you from a beginner to an expert, thus the app can be used by everyone.",
    },
    {
      title: "Is there a trial period before I have to pay for the app?",
      content:
        "No, but you get 500 free credits everyday, that can be used to generate anything.",
    },
    {
      title:
        "What kind of customer support is available if I encounter any issues or have questions about the app?",
      content:
        "You can email us at skillify.ai7@gmail.com or write on our Discord server.",
    },
    {
      title: "How often are you adding new features to the app?",
      content:
        "We are continuously improving our app, in order for our users to have the best learning experience!",
    },
  ],
};

const videoSrc = "https://www.youtube.com/watch?v=03PKTxwzU18";


export default function Home({isAuthentificated, width }) {

  const [appear, setAppear] = useState(false)
    

  const { toggleGetStarted } = useContext(GetStartedContext);
  
  useEffect(() => {
      setAppear(true)
  },[])

  const appearProps = useSpring({

      opacity: !appear ? '0' : '1',
      transform: !appear ? 'translateY(-40px)' : 'translateY(0)',
      config:{mass:1 ,tension:20,friction:20}
    })

  const propsRight = useSpring({
    delay: 400,
    opacity: !appear ? '0' : '1',
    transform: !appear ? 'translateX(120px)' : 'translateX(0)',
    config:{mass:1 ,tension:30,friction:20}
  })

  const [ref, springs] = useInView(
    () => ({
      from: {
        opacity: 0,
        transform: 'translateX(-40px)'
      },
      to: {
        opacity: 1,
        transform: 'translateX(0)'
      },
      config: {mass: 1, tension: 30, friction: 20}
    }),
    {
      rootMargin: '-10% -10%',
      once: true,
    }
  )
    
  const [refRight, springsRight] = useInView(
    () => ({
      from: {
        opacity: 0,
        transform: 'translateX(40px)'
      },
      to: {
        opacity: 1,
        transform: 'translateX(0)'
      },
      config: {mass: 1, tension: 30, friction: 20}
    }),
    {
      rootMargin: '-10% -10%',
      once: true,
    }
  )

  const [refAppear, springsAppear] = useInView(
    () => ({
      from: {
        opacity: 0,
      },
      to: {
        opacity: 1,
      },
      config: {mass: 1, tension: 30, friction: 20}
    }),
    {
      rootMargin: '-10% -10%',
      once: true,
    })

  
  return (
    <div className = "home-main-div">
      
      <GoogleTranslate />
      <animated.div style={appearProps} className="big-text-bg">
        <p translate="no">Skillify</p>
      </animated.div>
      <animated.div style = {appearProps} className="home-main-dev">

        <h1 className="main-heading">
         
          <span>SkillifyAI is an AI-powered platform </span>
          <span>that helps individuals unlock their </span>potential and improve
          by <span>learning new skills.</span>
          {/* <span>Welcome to Skillify, </span>
          <span>a groundbreaking platform </span> that leverages the latest AI
          technology. */}
        </h1>
        
        <Link
            className="primary-btn primary-link"
            to = {isAuthentificated ? "/dashboard" : ""}
            onClick={
              !isAuthentificated
                ? toggleGetStarted
                : null
            }
          >
            {isAuthentificated ? "Dashboard" : "Get Started"}
          </Link>
        {width >= 900 && <animated.div style = {propsRight} className="testimonial-section">
          <div className="testimonial-card">
            <img alt = "Profile" src={testimonial_image} />
            <div className="testimonial-text">
              <p>
              Skillify AI is an AI-powered platform that helps individuals 
            unlock their potential and improve themselves by learning 
            new skills. openpedia.io 
              </p>
            </div>
          </div>
        </animated.div>}
      </animated.div>

      <animated.img style = {appearProps} className="Effect-AboutSection" alt = "Effect" src={effect} />
     
      {/* ABOUT SECTION */}
      <section className="main--section about--section m-lr-100">
        <div className="about-section-content d--flex gap-60">
          <animated.div ref = {ref} style={springs} className="about-section-left  w-50 d--flex flex--column justify--center">
            <h3>Who we are?</h3>
            <p>
              Welcome to Skillify, an AI-powered platform that transcends
              borders and empowers individuals worldwide to unlock their
              potential and master any skill they desire 3x faster. Our journey
              began amidst world-wide protests, most notably Romania, where a
              group of passionate minds came together to revolutionize education
              and make learning accessible to all.
            </p>
            {/* <Link
              onClick={
                !isAuthentificated
                  ? toggleGetStarted
                  : () => navigate("/categories")
              }
            >
              Learn More
            </Link> */}
            <Link to="/about-us">Learn More</Link>
          </animated.div>
         
          <animated.div ref = {refRight} style = {springsRight} className="about-section-right rounded w-50">
            <ReactPlayer
              controls
              muted
              width="100%"
              height="350px"
              url={videoSrc}
              config={{
                file: {
                  attributes: {
                    poster: { video },
                  },
                },
              }}
            />
            {/* <img
              className="rounded"
              style={{ width: "100%", height: "420px", objectFit: "cover" }}
              src={video}
              alt="Sample Video"
            /> */}
          </animated.div>
        </div>
      </section>
      <img className="Effect-AboutSection-2" alt = "Effect" src={effect} />
      {/* CATEGORY CARDS */}
      <section className="cat--section m-lr-100">
        <div className="cat-section-content d--flex gapY-30">
          <CategoryCard
            tittle="Lesson"
            img={catImgI}
            isAuthentificated={isAuthentificated}
            text="Skillify offers personalized lessons in order to teach, every user, anything 3 times faster!"
            number = {1}
          />
          <CategoryCard
            tittle="Tools"
            img={catImgII}
            isAuthentificated={isAuthentificated}
            text="Skillify's AI-generated tools supercharge your abilities, featuring anything you can think of from coding to writing your business plan."
            number = {2}
          />
          <CategoryCard
            tittle="Many More"
            img={catImgIII}
            isAuthentificated={isAuthentificated}
            text="Skillify offers a bunch of cool features, including an open chat, a document or videos summary tool, your own Skillify Friend and many more!"
            number={3}
          />
        </div>
      </section>

      <img className="Effect-CatSection" alt = "Effect" src={effect} />
        
      {/* REVIEW`S SECTION */}
      <section className="cat--section m-lr-100">
        <div className="faq-heading" style={{marginBottom: '25px'}}>
          <h3>Reviews</h3>
        </div>
          <div className="cat-section-content d--flex gapY-30">
              {reviewsData.map((item, index) => <Review key = {index} {...item} />)}
          </div>
      </section>
      {/* FAQ'S SECTION */}
      <animated.section ref = {refAppear} style={springsAppear} className="faqs-wrapper m-tb-100 m-lr-100 rounded">
        <div className="faq-heading">
          <h3>Frequently Asked Questions</h3>
        </div>
        <div className="faqs-container mt-50 gapY-30 d--flex justify--between gapY">
          <div className="faqsLeft">
            <Faq data={data} />
          </div>
          <div className="faqsLeft">
            <Faq data={data} />
          </div>
        </div>
        <img alt = "Effect" className="dotsEffect" src={DotElement} />
      </animated.section>

    </div>
  );
}
