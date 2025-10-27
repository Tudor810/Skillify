import React, { useState, useEffect, useContext } from "react";
import { useSpring, animated, useInView } from "@react-spring/web";
import appSample from "../../images/appSample.mp4";
import { GetStartedContext } from "../../App";
import { useNavigate } from "react-router-dom";
import ReadMore from "./ReadMore";

export default function Content({ isAuthentificated }) {
  const [appear, setAppear] = useState(false);
  const [readMore, setReadMore] = useState(false);

  const toggleReadMore = () => setReadMore((prevState) => !prevState);

  const { toggleGetStarted } = useContext(GetStartedContext);

  useEffect(() => {
    setAppear(true);
  }, []);

  const navigate = useNavigate();

  const appearProps = useSpring({
    delay: 700,
    opacity: !appear ? "0" : "1",
    transform: !appear ? "translateY(0px)" : "translateY(-50px)",
    config: { mass: 1, tension: 50, friction: 20 },
  });

  const [ref, springs] = useInView(
    () => ({
      from: {
        opacity: 0,
        transform: "translateX(-40px)",
      },
      to: {
        opacity: 1,
        transform: "translateX(0)",
      },
    }),
    {
      rootMargin: "-40% -40%",
      once: true,
    }
  );

  return (
    <div className="content">
      <animated.div className="home-content" style={appearProps}>
        <div className="gradient-text">
          <h1 className="title">Skillify</h1>
        </div>
        <p className="description">
          Welcome to Skillify, a groundbreaking platform that leverages the
          latest AI technology to transform your learning experience. With our
          personalized lessons, you can master any subject in just a fraction of
          the time it would normally take - a remarkable three times faster. Our
          innovative approach adapts to your learning style, ensuring a deep and
          efficient understanding of the material.{" "}
          {!readMore && (
            <span onClick={toggleReadMore} className="read-more">
              Read more...
            </span>
          )}
        </p>
        <button
          className="home-button"
          onClick={
            !isAuthentificated
              ? toggleGetStarted
              : () => navigate("/categories")
          }
        >
          Explore
        </button>
      </animated.div>
      <animated.div ref={ref} style={springs} className="app-demo">
        <h4>App Demo</h4>
        <video controls autoPlay muted alt="Application example gif">
          <source src={appSample} type="video/mp4" />
        </video>
      </animated.div>
      <ReadMore open={readMore} handleClose={toggleReadMore} />
    </div>
  );
}
