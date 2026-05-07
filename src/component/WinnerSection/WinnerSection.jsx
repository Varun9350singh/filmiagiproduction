import React, { useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";

gsap.registerPlugin(ScrollTrigger);

const WinnerSection = ({ title = "GRAND FINALE", subtitle = "The Hall of Fame", winners = [] }) => {
  const sectionRef = useRef(null);
  const containerRef = useRef(null);
  
  // Normalize winners data to an array if an object is passed
  const winnersArray = Array.isArray(winners) ? winners : Object.values(winners);

  useGSAP(() => {
    const ctx = gsap.context(() => {
      // 🔹 Initial States
      gsap.set([".overline", ".section-title", ".title-flourish"], {
        opacity: 0,
        y: 60,
      });

      gsap.set(".royal-winner-card", {
        opacity: 0,
        y: 100,
        scale: 0.9,
      });

      // 🔥 Header scrub animation
      gsap.to([".overline", ".section-title", ".title-flourish"], {
        opacity: 1,
        y: 0,
        stagger: 0.2,
        scrollTrigger: {
          trigger: ".winner-header",
          start: "top 90%",
          end: "top 40%",
          scrub: 1,
        },
      });

      // 🔥 Cards scrub animation
      const cards = gsap.utils.toArray(".royal-winner-card");
      cards.forEach((card, i) => {
        gsap.to(card, {
          opacity: 1,
          y: 0,
          scale: 1,
          scrollTrigger: {
            trigger: card,
            start: "top 95%",
            end: "top 60%",
            scrub: 1.5,
          },
        });
      });

      // 🔥 Background parallax
      gsap.to(".section-decoration-left", {
        y: -100,
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top bottom",
          end: "bottom top",
          scrub: 1,
        },
      });

      gsap.to(".section-decoration-right", {
        y: 100,
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top bottom",
          end: "bottom top",
          scrub: 1,
        },
      });
    }, sectionRef);

    return () => ctx.revert();
  }, [winnersArray]);


    const onClickHandler = (id) => {
      window.location.href=`/artist/${id}`
    }

  return (
    <section id="winner-section" ref={sectionRef}>
      <div className="section-decoration-left"></div>
      <div className="section-decoration-right"></div>

      <header className="winner-header">
        <span className="overline">{subtitle}</span>
        <h1 className="section-title">{title}</h1>
        <div className="title-flourish"></div>
      </header>

      <div className="winners-container" ref={containerRef}>
        {winnersArray.map((winner, index) => (
          <div key={index} className="royal-winner-card">
            <div className="card-inner-flip">
              {/* Front Side */}
              <div className="card-face card-front">
                <div className="corner-flourish top-left"></div>
                <div className="corner-flourish top-right"></div>
                <div className="corner-flourish bottom-left"></div>
                <div className="corner-flourish bottom-right"></div>
                
                <div className="card-image">
                  <img src={winner?.images[0]} alt={winner.name} />
                  <div className="image-overlay"></div>
                </div>
                <div className="card-content">
                  <h2 className="winner-name">{winner.name}</h2>
                  <p className="winner-year">{winner?.winningEvent}</p>
                </div>
              </div>

              {/* Back Side */}
              <div className="card-face card-back">
                <div className="corner-flourish top-left"></div>
                <div className="corner-flourish top-right"></div>
                <div className="corner-flourish bottom-left"></div>
                <div className="corner-flourish bottom-right"></div>

                <div className="back-content">
                  <h3 className="back-title">{winner.name}</h3>
                  <div className="divider-flourish"></div>
                  <p className="winner-description">
                    {winner.description || "Celebrating excellence and timeless elegance in the heart of Filmiagi's grand showcase."}
                  </p>
                  <button
                    onClick={()=>onClickHandler(winner.id)}
                    className="read-more-btn">
                    <span>READ MORE</span>
                  </button>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default WinnerSection;
