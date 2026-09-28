import React, { useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import events from "../../utils/events.js";

gsap.registerPlugin(ScrollTrigger);

function EventCard({ event }) {
  const [flipped, setFlipped] = useState(false);
  const navigate = useNavigate();

  const toggleFlip = () => setFlipped((prev) => !prev);

  const handleKeyDown = (e) => {
    if (e.key === "Enter" || e.key === " ") {
      e.preventDefault();
      toggleFlip();
    }
  };

  const handleCta = (e) => {
    e.stopPropagation();
    
    navigate(event.route);
  };

  return (
    <div
      className={`event-flip-card${flipped ? " is-flipped" : ""}`}
      onClick={toggleFlip}
      onKeyDown={handleKeyDown}
      tabIndex={0}
      role="button"
      aria-pressed={flipped}
      aria-label={`${event.title} — tap for details`}
    >
      <div className="event-flip-inner">
        {/* FRONT */}
        <div className="event-face event-face-front">
          <div className="event-frame"></div>
          <div className="corner-tl"></div>
          <div className="corner-tr"></div>
          <div className="corner-bl"></div>
          <div className="corner-br"></div>

          <div
            className="event-bg"
            style={{ backgroundImage: `url(${event.logo})` }}
          ></div>
          <div className="event-front-overlay"></div>

          

          <div className="event-front-content">
            <span className="event-tagline">{event.tagline}</span>
            <h3 className="event-title">{event.title}</h3>
            <div className="divider-gold"></div>
            <span className="flip-hint">
              <span className="flip-hint-dot"></span>
              Hover / Tap to know more
            </span>
          </div>
        </div>

        {/* BACK */}
        <div className="event-face event-face-back">
          <div className="event-frame"></div>
          <div className="corner-tl"></div>
          <div className="corner-tr"></div>
          <div className="corner-bl"></div>
          <div className="corner-br"></div>

          <span className="event-tagline">{event.tagline}</span>
          <h3 className="event-title-back">{event.title}</h3>
          <div className="divider-gold"></div>
          <p className="event-description">{event.description.length < 70 ? event.description : event.description.substring(0,100) +"..." }</p>
          <button className="royal-btn event-cta" onClick={handleCta}>
            {event.cta}
          </button>
        </div>
      </div>
    </div>
  );
}

function EventsSection() {
  const sectionRef = useRef(null);

  useGSAP(() => {
    const ctx = gsap.context(() => {
      gsap.set([".events-overline", ".events-title", ".events-flourish"], {
        opacity: 0,
        y: 40,
      });

      gsap.set(".event-flip-card", {
        opacity: 0,
        y: 80,
        scale: 0.92,
      });

      gsap.to([".events-overline", ".events-title", ".events-flourish"], {
        opacity: 1,
        y: 0,
        stagger: 0.2,
        scrollTrigger: {
          trigger: ".events-header",
          start: "top 90%",
          end: "top 45%",
          scrub: 1,
        },
      });

      const cards = gsap.utils.toArray(".event-flip-card");
      cards.forEach((card) => {
        gsap.to(card, {
          opacity: 1,
          y: 0,
          scale: 1,
          scrollTrigger: {
            trigger: card,
            start: "top 92%",
            end: "top 60%",
            scrub: 1.4,
          },
        });
      });

      gsap.to(".events-decoration-left", {
        y: -80,
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top bottom",
          end: "bottom top",
          scrub: true,
        },
      });

      gsap.to(".events-decoration-right", {
        y: 80,
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top bottom",
          end: "bottom top",
          scrub: true,
        },
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section id="events-section" ref={sectionRef}>
      <div className="events-decoration-left"></div>
      <div className="events-decoration-right"></div>

      <header className="events-header">
        <span className="events-overline">Flagship Events of Filmiagi Production</span>
        <h2 className="events-title">WHERE LEGENDS ARE MADE</h2>
        <div className="events-flourish"></div>
      </header>

      <div className="events-cards-container">
        {events.map((event) => (
          <EventCard event={event} key={event.id} />
        ))}
      </div>
    </section>
  );
}

export default EventsSection;
