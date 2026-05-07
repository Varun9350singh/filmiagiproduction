import React, { useEffect, useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger);

const events = [
    { title: "Filmiagi Lucknow Awards", date: "June 2026", description: "Celebrating the stars of the fashion world." },
    { title: "Summer Fashion Gala", date: "August 2026", description: "A dazzling display of summer's finest designs." },
    { title: "Production House Launch", date: "October 2026", description: "Expanding our horizons in film and TV production." }
];

function WhatsNextSection() {
    const sectionRef = useRef(null);

    useEffect(() => {
        const el = sectionRef.current;
        
        gsap.from(el.querySelectorAll('.event-item'), {
            x: 50,
            opacity: 0,
            duration: 1,
            stagger: 0.3,
            scrollTrigger: {
                trigger: el,
                start: "top 80%",
            }
        });
    }, []);

    return (
        <section id="whats-next" ref={sectionRef}>
            <div className="whats-next-container">
                <div className="whats-next-content">
                    <span className="sub-title gold-text">Future Vision</span>
                    <h2 className="luxury-title">UPCOMING <br /><span className="gold-text">MILESTONES</span></h2>
                    <p className="description">We are constantly evolving and bringing new heights of excellence to the fashion industry. Our upcoming shows are designed to push the boundaries of luxury and production.</p>
                </div>

                <div className="event-list">
                    {events.map((event, index) => (
                        <div className="event-item" key={index}>
                            <div className="event-date">
                                <h3 className="gold-text">{event.date}</h3>
                            </div>
                            <div className="event-content">
                                <h3>{event.title}</h3>
                                <p>{event.description}</p>
                            </div>
                            <div className="event-arrow">
                                <span className="gold-text">→</span>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    )
}

export default WhatsNextSection
