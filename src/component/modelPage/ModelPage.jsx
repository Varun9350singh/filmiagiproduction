import React, { useMemo, useRef } from "react";
import { useParams } from "react-router-dom";
import modelsInfo from "../../utils/model";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import scrollTrigger from "gsap/ScrollTrigger";
import { FaInstagram, FaWhatsapp, FaEnvelope, FaMapMarkerAlt, FaPhoneAlt } from "react-icons/fa";
import NotFound from "../NotFound/NotFound";

gsap.registerPlugin(scrollTrigger);

function ModelPage() {
  const { artistId } = useParams();
  const videoTagRef = useRef(null);
  const containerRef = useRef(null);



  const modelInfo = useMemo(() => {
    if (!artistId) return null;
    return modelsInfo.find((model) => model.id === artistId);
  }, [artistId]);


  useGSAP(() => {
  const mm = gsap.matchMedia();

  mm.add("(min-width: 703px)", () => {
    gsap.to(videoTagRef.current, {
      scale: 4,
      ease: "none",
      scrollTrigger: {
        trigger: videoTagRef.current,
        start: "top 90%",
        end: "top 30%",
        scrub: true,
        pin: true,
      },
    });
  });

}, { scope: containerRef });

  useGSAP(
    () => {
      
      // Animate sections on scroll
      gsap.utils.toArray(".reveal").forEach((section) => {
        gsap.from(section, {
          y: 50,
          opacity: 0,
          duration: 1,
          scrollTrigger: {
            trigger: section,
            start: "top 85%",
            toggleActions: "play none none reverse",
          },
        });
      });
    },
    {
      scope: containerRef,
    },
  );

  if (!modelInfo) return <NotFound />;

  return (
    <div ref={containerRef} id="model-page">
      <section id="Model-hero-Section">
        <h2>Shaping the Spotlight</h2>
        <h1>{modelInfo?.name}</h1>
      </section>
      <section id="videoSection">
        <div id="videoDiv" ref={videoTagRef}>
          <video src={`${modelInfo?.video}`} autoPlay loop muted></video>
        </div>
      </section>

      {/* About Section */}
      <section id="about-section" className="reveal">
        <div className="container">
          <div className="about-content">
            <h3 className="section-title">Professional Journey</h3>
            <p className="description">{modelInfo?.description}</p>
            <div className="vision-box">
              <h4>Vision</h4>
              <p>{modelInfo?.vision}</p>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section id="stats-section" className="reveal">
        <div className="container">
          <h3 className="section-title">Model Statistics</h3>
          <div className="stats-grid">
            {Object.entries(modelInfo?.stats).map(([key, value]) => (
              <div key={key} className="stat-card">
                <span className="stat-label">{key.replace(/([A-Z])/g, " $1")}</span>
                <span className="stat-value">{value}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Achievements Section */}
      <section id="achievements-section" className="reveal">
        <div className="container">
          <h3 className="section-title">Achievements & Accolades</h3>
          <div className="achievements-list">
            {modelInfo?.achievements.map((achievement, index) => (
              <div key={index} className="achievement-item">
                <span className="gold-bullet">✦</span>
                <p>{achievement}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Gallery Section */}
      <section id="gallery-section" className="reveal">
        <div className="container">
          <h3 className="section-title">The Gallery</h3>
          <div className="gallery-grid">
            {modelInfo?.images.map((img, index) => (
              <div key={index} className="gallery-item">
                <img src={img} alt={`${modelInfo?.name} shot ${index + 1}`} />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="model-contact-section" className="reveal">
        <div className="container">
          <h3 className="section-title">Get In Touch</h3>
          <div className="contact-info">
            <p  className="contact-link">
              <FaPhoneAlt /> <span>{modelInfo?.contact.phone}</span>
            </p>
            <p  className="contact-link">
              <FaWhatsapp /> <span>WhatsApp</span>
            </p>
            <p  className="contact-link">
              <FaEnvelope /> <span>{modelInfo?.contact.email}</span>
            </p>
            <p className="contact-link">
              <FaInstagram /> <span>{modelInfo?.contact.instagram}</span>
            </p>
            <div className="contact-link">
              <FaMapMarkerAlt /> <span>{modelInfo?.contact.location}</span>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

export default ModelPage;
