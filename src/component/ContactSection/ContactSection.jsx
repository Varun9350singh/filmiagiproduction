import React, { useEffect, useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { useGSAP } from '@gsap/react';

gsap.registerPlugin(ScrollTrigger);

function ContactSection() {
    const sectionRef = useRef(null);
    const contentRef = useRef(null);

    useGSAP(() => {
        const el = sectionRef.current;
        const infoItems = contentRef.current.querySelectorAll('.info-item');

        gsap.fromTo(infoItems, 
            { y: 30, opacity: 0 },
            { 
                y: 0, 
                opacity: 1, 
                duration: 1, 
                stagger: 0.3,
                scrollTrigger: {
                    trigger: el,
                    start: "top 75%",
                }
            }
        );
    }, []);

    return (
        <section id="contact" className="contact-section" ref={sectionRef}>
            <div className="contact-container">
                <div className="contact-header">
                    <h2 className="luxury-title">Get in <span className="gold-text">Touch</span></h2>
                    <p className="contact-subtitle">Let's create something extraordinary together.</p>
                </div>
                
                <div className="contact-content-centered" ref={contentRef}>
                    <div className="info-item">
                        <h4 className="gold-text">Instagram</h4>
                        <p className="contact-link">@filmiagiproduction</p>
                    </div>
                    <div className="info-divider"></div>
                    <div className="info-item">
                        <h4 className="gold-text">Email</h4>
                        <p className="contact-link">filmiagiproduction@gmail.com</p>
                    </div>
                </div>
            </div>
        </section>
    )
}

export default ContactSection;
