import React, { useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { GetStartedContext } from "../../App";
import "../../css/home.css";
import {useInView, animated} from "@react-spring/web";

const CategoryCard = ({ tittle, img, text, isAuthentificated, number}) => {
  const { toggleGetStarted } = useContext(GetStartedContext);
  const navigate = useNavigate();

  const [ref, springs] = useInView(
    () => ({
      from: {
        opacity: 0,
        transform: number === 1 ? 'translateX(-40px)' : 'translateX(40px)'
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
    <animated.div ref = {number === 2 ? refAppear : ref} style = {number === 2 ? springsAppear : springs} className="cat-card bg-white">
      <div className="cat-card-img">
        <img className="img-fluid" src={img} alt="Sport" />
      </div>
      <div className="cat-card-content">
        <div className="cat-card-text">
          <h3>{tittle}</h3>
          <p className="mt-12">{text}</p>
        </div>
        <div className="card-btn-wrapper">
          <Link
            className="primary-btn"
            onClick={
              !isAuthentificated
                ? toggleGetStarted
                : () => navigate("/dashboard")
            }
          >
            Get Started
          </Link>
        </div>
      </div>
    </animated.div>
  );
};

export default CategoryCard;
