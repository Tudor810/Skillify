import React, { useState, useEffect, useRef, useContext } from "react";
import { Link } from "react-router-dom";
import { useSpring, animated } from "@react-spring/web";
import { GetStartedContext } from "../../App";
import "../../css/header.css";
import ContactPopover from "./ContactPopover";
import { Button } from "@mui/material";

export default function Header({ width, isAuthentificated }) {
  const { toggleGetStarted } = useContext(GetStartedContext);

  const [anchorEl, setAnchorEl] = useState(null);
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => {
    if (isOpen === "False") document.body.style.overflow = "hidden";
    else document.body.style.overflow = "auto";
    setIsOpen((prevState) => !prevState);
  };
  const ref = useRef();

  const liProps = useSpring({
    delay: isOpen ? 400 : 0,
    opacity: !isOpen ? "0" : "1",
    transform: !isOpen ? "translateY(50px)" : "translateY(0)",
    config: { mass: 1, tension: 200, friction: 20 },
  });

  const appearProps = useSpring({
    delay: isOpen ? 200 : 0,
    opacity: !isOpen ? "0" : "1",
    config: { mass: 1, tension: 200, friction: 20 },
  });

  const [appear, setAppear] = useState(false)
    

  useEffect(() => {
      setAppear(true)
  },[])

  const appearProps2 = useSpring({

      opacity: !appear ? '0' : '1',
      config:{mass:1 ,tension:30,friction:20}
    })

  const toggleAnchorEl = (event) => setAnchorEl(event.currentTarget);

  const handleClose = () => setAnchorEl(null);

  return (
    <>
      <animated.header style={appearProps2} className = "header-home">
        <nav className = "header-navbar">
          <div className="logo">
            <Link to="/">
              {/* <img src={DarkLogo} alt="Footer-Logo" /> */}
              <p translate = "no">Skillify<span>.</span></p>
            </Link>
          </div>
          <Button
            className="NavMenuBtn"
            onClick={toggleMenu}
          >
            <i className="fa-solid fa-bars" style={{color: "white"}}/>
          </Button>
          {width > 750 && <div className="close">
            <div className="menu">
              <ul className="flex-center">
                {isAuthentificated && (
                  <animated.li
                    ref={ref}
                    // style={liProps}
                    onClick={toggleMenu}
                    className="text-link"
                  >
                    <Link to="/dashboard" className="link">
                      Dashboard
                    </Link>
                  </animated.li>
                )}
                {!isAuthentificated && (
                  <animated.li
                    onClick={() => {
                      toggleGetStarted();
                      toggleMenu();
                    }}
                    ref={ref}
                    // style={liProps}
                    className="text-link"
                  >
                    <Link className="link">Get Started</Link>
                  </animated.li>
                )}
                <li>
                  <Link to="/pricing">Pricing</Link>
                </li>
                <li>
                  <Link onClick={toggleAnchorEl}>Contact Us</Link>
                  <ContactPopover
                    anchorEl={anchorEl}
                    containerId="mobile-contac"
                    handleClose={handleClose}
                  />
                </li>
                <li>
                  <Link to="/reviews">Reviews</Link>
                </li>
                <li>
                  <Link to="/about-us">About Us</Link>
                </li>
              </ul>
            </div>
          </div>}
        </nav>
      </animated.header>
      {isOpen && width < 750 && <div className='header-mobile'>
              <div onClick = {toggleMenu} className = "bars-container">
                  <i className={`fa-solid ${!isOpen ? 'fa-bars' : 'fa-xmark'}`}></i>
              </div>
          <animated.ul className = "mobile-ul" style = {appearProps}>
            {isAuthentificated && <li ref = {ref} style = {liProps} onClick = {toggleMenu} className='text-link'>
              <Link to="/dashboard"  className='link'>Dashboard</Link>
            </li>}
            {!isAuthentificated && <li ref = {ref} style = {liProps} onClick = {() => {
              toggleMenu()
              toggleGetStarted()
              }} className='text-link'>
              <Link className='link'>Dashboard</Link>
            </li>}
            <li ref = {ref} style = {liProps} onClick = {toggleMenu} className='text-link'>
              <Link to="/pricing" className='link'>Pricing</Link>
            </li>
            <li ref = {ref} style = {liProps} onClick = {toggleMenu} className='text-link'>
              <Link to="/reviews" className='link'>Reviews</Link>
            </li>
            <li ref = {ref} style = {liProps} onClick = {toggleMenu} className='text-link'>
              <Link to="/about-us" className='link'>About us</Link>
            </li>
            <li id = 'mobile-contact' ref = {ref} style = {liProps} className="text-link">
              <Link className = 'link' onClick={toggleAnchorEl}>Contact Us</Link> 
              <ContactPopover anchorEl = {anchorEl} containerId='mobile-contac' handleClose = {handleClose}/>
            </li>
          </animated.ul>
        </div>  }

    </>
  );
}
