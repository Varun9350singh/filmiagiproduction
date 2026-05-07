import React, { useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";

gsap.registerPlugin(ScrollTrigger);

const Latest = ({ 
  image = "", 
  title = "LATEST GLIMPSE", 
  subtitle = "The Grand Celebration" 
}) => {
  const sectionRef = useRef(null);
  const imageWrapperRef = useRef(null);
  const imageRef = useRef(null);

  useGSAP(() => {
    const ctx = gsap.context(() => {
      // 🔹 Initial States
      gsap.set(".latest-header", { opacity: 0, y: 50 });
      gsap.set(".image-frame", { scale: 0.8, opacity: 0 });
      gsap.set(imageRef.current, { scale: 1.2 });

      // 🔥 Header scrub animation
      gsap.to(".latest-header", {
        opacity: 1,
        y: 0,
        scrollTrigger: {
          trigger: ".latest-header",
          start: "top 90%",
          end: "top 60%",
          scrub: 1,
        },
      });

      // 🔥 Image frame reveal
      gsap.to(".image-frame", {
        scale: 1,
        opacity: 1,
        scrollTrigger: {
          trigger: imageWrapperRef.current,
          start: "top 95%",
          end: "top 50%",
          scrub: 1.5,
        },
      });

      // 🔥 Parallax effect on image
      gsap.to(imageRef.current, {
        scale: 1,
        y: 30,
        scrollTrigger: {
          trigger: imageWrapperRef.current,
          start: "top bottom",
          end: "bottom top",
          scrub: true,
        },
      });

      // 🔥 Corner flourishes scrub
      gsap.from(".corner-latest", {
        width: 0,
        height: 0,
        stagger: 0.1,
        scrollTrigger: {
          trigger: imageWrapperRef.current,
          start: "top 80%",
          end: "top 40%",
          scrub: 1,
        },
      });

    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section id="latest-section" ref={sectionRef}>
      <header className="latest-header">
        <span className="overline">{subtitle}</span>
        <h2 className="section-title">{title}</h2>
        <div className="title-flourish"></div>
      </header>

      <div className="image-wrapper" ref={imageWrapperRef}>
        <div className="image-frame">
          {/* Ornate Corners */}
          <div className="corner-latest tl"></div>
          <div className="corner-latest tr"></div>
          <div className="corner-latest bl"></div>
          <div className="corner-latest br"></div>
          
          <div className="image-inner">
            <img 
              ref={imageRef}
              src={image} 
              alt="Latest Event" 
              className="latest-image"
            />
            <div className="gold-overlay"></div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Latest;
