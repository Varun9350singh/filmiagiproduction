import React, { useState, useRef } from "react";
import { Link, NavLink } from "react-router-dom";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const navLinks = [
  {
    name: "Home",
    to: "/",
  },
  {
    name: "Visionary",
    to: "/#visionary",
  },
  {
    name: "Team",
    to: "/#team-section",
  },
  {
    name: "Spotlight",
    to: "/#winner-section",
  },
  {
    name: "Highlights",
    to: "/#highlights",
  },
  {
    name: "Latest",
    to: "/#latest-section",
  },
];

function NavBar() {
  const [isOpen, setIsOpen] = useState(false);
  const navRef = useRef(null);
  const menuRef = useRef(null);
  const contactButtonRef = useRef(null);

  useGSAP(
    () => {
      if (isOpen) {
        gsap.to(menuRef.current, {
          right: 0,
          duration: 0.8,
          ease: "expo.inOut",
        });

        gsap.to("#topSpan", {
          rotate: 45,
          y: 18,
          x: -5,
          width: "3rem",
          duration: 0.3,
        });

        gsap.to("#middleSpan", {
          opacity: 0,
          x: -20,
          duration: 0.3,
        });

        gsap.to("#bottomSpan", {
          rotate: -45,
          // y: -10,
          width: "3rem",
          duration: 0.3,
        });
        gsap.from(".menuLink", {
          x: 100,
          opacity: 0,
          stagger: 0.3,
          duration: 1,
          ease: "power2.out",
        });
        


      } else {
        gsap.to(menuRef.current, {
          right: "-100%",
          duration: 0.8,
          ease: "expo.inOut",
        });

        gsap.to("#topSpan", {
          rotate: 0,
          y: 0,
          duration: 0.3,
          width:"3rem",
          x:0
        });

        gsap.to("#middleSpan", {
          opacity: 1,
          x: 0,
          duration: 0.3,
        });

        gsap.to("#bottomSpan", {
          rotate: 0,
          y: 0,
          width: "1.5rem",
          duration: 0.3,
        });
      }
    },
    { dependencies: [isOpen], scope: navRef },
  );

  return (
    <nav ref={navRef}>
      <img src="/images/logo.webp" alt="filmiagi-production-logo" />

      <div id="navButton" onClick={() => setIsOpen(!isOpen)}>
        <span id="topSpan"></span>
        <span id="middleSpan"></span>
        <span id="bottomSpan"></span>
      </div>

      <div id="full-nav-menu" ref={menuRef}>
        <div id="menu-links">
          {navLinks.map((link, index) => (
            <a
              key={index}
              href={link.to}
              className="menuLink"
              onClick={() => setIsOpen(false)}
            >
              {link.name}
            </a>
          ))}
          <a
            href="/#contact"
            className="menuLink"
            onClick={() => setIsOpen(false)}
          >
            Contact Us
          </a>
        </div>
      </div>
    </nav>
  );
}

export default NavBar;
