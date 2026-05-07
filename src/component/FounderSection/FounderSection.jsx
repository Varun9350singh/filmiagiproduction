import React, { useRef, useState } from "react";
import Slider from "../commonComponents/Slider";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useNavigate } from "react-router-dom";
gsap.registerPlugin(ScrollTrigger);

function FounderSection() {
  const main = useRef(null);
  const animatedContainer = useRef(null);
  const navigate = useNavigate();

  const onReadMoreClick = () => {
    navigate("/team/3636d5d0-8158-4be9-8f1a-d2f9468f11db");
  }

  useGSAP(
    () => {
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: main.current,
          start: "top top",
          end: "+=700%",
          scrub: 1.5,
          pin: true,
          anticipatePin: 1,
        },
      });

      // 1. Text Animation Section - Intro
      tl.fromTo(
        ".top-text",
        { y: 50, opacity: 0 },
        { y: 0, opacity: 1, duration: 1.5, ease: "expo.out" },
      )
        .fromTo(
          ".middle-text",
          { scale: 0.8, opacity: 0 },
          { scale: 1, opacity: 1, duration: 2, ease: "expo.out" },
          "-=1.2",
        )
        .fromTo(
          ".bottom-text",
          { y: -50, opacity: 0 },
          { y: 0, opacity: 1, duration: 1.5, ease: "expo.out" },
          "-=1.5",
        )

        // 2. Transition - Scale up and Fade out the text section
        .to(animatedContainer.current, {
          scale: 1.5,
          opacity: 0,
          filter: "blur(20px)",
          duration: 2,
          ease: "power2.inOut",
        })
        .set(animatedContainer.current,{
          display: "none",
        })

        // 3. Founder Section - Reveal
        .fromTo(
          "#founder-section",
          { opacity: 0 },
          { opacity: 1, duration: 1, ease: "power2.out" },
          "-=1",
        )
        .fromTo(
          "#founder-gradient",
          { scale: 0, opacity: 0 },
          { scale: 1, opacity: 0.8, duration: 2, ease: "expo.out" },
          "-=0.5",
        )
        .fromTo(
          ["#founder-first-name", "#founder-last-name", "#founder-role"],
          { y: 50, opacity: 0 },
          { y: 0, opacity: 1, duration: 1.5, stagger: 0.2, ease: "expo.out" },
          "-=1.5",
        )
        .fromTo(
          "#founder-image",
          { y: 100, opacity: 0, scale: 0.95 },
          { y: 0, opacity: 1, scale: 1, duration: 2, ease: "expo.out" },
          "-=1.5",
        )
        .fromTo(
          "#founder-read-more-button",
          { y: 20, opacity: 0 },
          { y: 0, opacity: 1, duration: 1, ease: "expo.out" },
          "-=1",
        );
    },
    {
      scope: main,
    },
  );

  return (
    <div id="visionary" ref={main}>
      <section
        id="text-animation-section"
        className="animated-container-hero"
        ref={animatedContainer}
      >
        <h2 className="top-text">Meet the</h2>
        <h1 className="middle-text">VISIONARY</h1>
        <h2 className="bottom-text">Behind Filmiagi</h2>
      </section>

      <section id="founder-section">
        <h3 id="founder-role">MEET OUR VISIONARY</h3>
        <div id="founder-gradient"></div>
        <h1 id="founder-first-name">ABHISHEK</h1>
        <h3 id="founder-last-name">DROHAR</h3>
        <picture>
          <source srcSet="/images/founder2.webp" type="image/webp" />
        <img src="/images/founder2.webp" alt="founder" id="founder-image" />
        </picture>
        <button id="founder-read-more-button" onClick={onReadMoreClick}>Read About ➡ </button>
      </section>
    </div>
  );
}

export default FounderSection;
