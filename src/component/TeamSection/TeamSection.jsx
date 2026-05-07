import React, { useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import TeamCard from "../commonComponents/TeamCard.jsx";
import team from "../../utils/team.js";
gsap.registerPlugin(ScrollTrigger);

function TeamSection() {
  const sectionRef = useRef(null);

  useGSAP(() => {
    const ctx = gsap.context(() => {
      // 🔹 Set initial state
      gsap.set([".overline", ".section-title", ".title-flourish"], {
        opacity: 0,
        y: 40,
      });

      gsap.set(".royal-team-card", {
        opacity: 0,
        y: 80,
        scale: 0.9,
      });

      // 🔥 Header scrub animation
      gsap.to([".overline", ".section-title", ".title-flourish"], {
        opacity: 1,
        y: 0,
        stagger: 0.2,
        scrollTrigger: {
          trigger: ".section-header",
          start: "top 90%",
          end: "top 40%",
          scrub: 1,
        },
      });

      // 🔥 Cards scrub animation
      const cards = gsap.utils.toArray(".royal-team-card");
      cards.forEach((card, i) => {
        gsap.to(card, {
          opacity: 1,
          y: 0,
          scale: 1,
          scrollTrigger: {
            trigger: card,
            start: "top 95%",
            end: "top 65%",
            scrub: 1.5,
          },
        });
      });

      // 🔥 Subtle parallax effect
      gsap.to(".section-decoration-left", {
        y: -100,
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top bottom",
          end: "bottom top",
          scrub: true,
        },
      });

      gsap.to(".section-decoration-right", {
        y: 100,
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top bottom",
          end: "bottom top",
          scrub: true,
        },
      });
    }, sectionRef);

    return () => ctx.revert(); // cleanup
  }, []);

  return (
    <section id="team-section" ref={sectionRef}>
      <div className="section-decoration-left"></div>
      <div className="section-decoration-right"></div>

      <header className="section-header">
        <span className="overline">OUR EXCLUSIVE FAMILY</span>
        <h1 className="section-title">MEET THE LEADERSHIP</h1>
        <div className="title-flourish"></div>
      </header>

      <div id="team-cards-container">
        {team &&
          team.map.length > 0 &&
          team.slice(0,team.length-1).map((member, index) => {
            return (
              <TeamCard
                name={member.name}
                role={member.role}
                image={member.image}
                memberId={member.id}
                key={`team-member-${member.id}+${index}`}
              />
            );
          })}
      </div>
    </section>
  );
}

export default TeamSection;
