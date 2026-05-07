import React, { useRef } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";

function HeroSection() {
  const main = useRef(null);

  useGSAP(
    () => {
      // 🔹 Set initial state (prevents flicker)
      gsap.set(
        [
          "#hero-text-section h3",
          "#hero-text-section h1",
          ".event-card",
          "#hero-text-section button",
          "#hero-text-section > h4",
        ],
        {
          opacity: 0,
          y: 30,
        },
      );

      const tl = gsap.timeline();

      // 🔹 Top label
      tl.fromTo(
        "#hero-text-section h3",
        { opacity: 0, y: 30 },
        {
          opacity: 1,
          y: 0,
          duration: 1,
          ease: "expo.out",
        },
      )

        // 🔹 Main headings
        .fromTo(
          "#hero-text-section h1",
          { opacity: 0, y: 100 },
          {
            opacity: 1,
            y: 0,
            duration: 1.4,
            stagger: 0.15,
            ease: "expo.out",
          },
          "-=0.6",
        )

        // 🔹 Event cards
        .fromTo(
          ".event-card",
          { opacity: 0, y: 50 },
          {
            opacity: 1,
            y: 0,
            duration: 1.2,
            stagger: 0.2,
            ease: "expo.out",
          },
          "-=1",
        )

        // 🔹 Button
        .fromTo(
          "#hero-text-section button",
          { opacity: 0, y: 20 },
          {
            opacity: 1,
            y: 0,
            duration: 1,
            ease: "expo.out",
          },
          "-=0.8",
        )

        // 🔹 Bottom text
        .fromTo(
          "#hero-text-section > h4",
          { opacity: 0, y: 20 },
          {
            opacity: 1,
            y: 0,
            duration: 1,
            ease: "expo.out",
          },
          "-=0.7",
        );
    },
    { scope: main },
  );

  return (
    <section id="hero-section" ref={main}>
      <video src="https://res.cloudinary.com/df7lu0dw7/video/upload/v1776188106/WhatsApp_Video_2026-04-14_at_10.57.22_PM_cke7ym.mp4" muted autoPlay loop></video>
      <div id="transparent-Layer"></div>
      <div id="hero-text-section">
        <h3>A World Of Luxury</h3>
        <h1>FILMIAGI</h1>
        <h1>PRODUCTION</h1>
        <div id="event-section">
          <div id="event-section1" className="event-card">
            <h4>TRADEMARK EVENT</h4>
            <h2>Mr, Miss & Mrs LUCKNOW</h2>
          </div>
          <div id="event-section2" className="event-card">
            <h4>SIGNATURE SHOW</h4>
            <h2>FILMIAGI FASHION WEEK</h2>
          </div>
        </div>
        <h4>SCROLL TO EXPLORE</h4>
      </div>
    </section>
  );
}

export default HeroSection;
