import React, { useRef } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";

function Slider() {
  const trackRef = useRef(null);

  const icons = Array(20).fill(null);

  useGSAP(() => {
    const ctx = gsap.context(() => {
      gsap.to(trackRef.current, {
        xPercent: -50, // move half (because we duplicate)
        duration: 10,
        ease: "none",
        repeat: -1,
      });
    });

    return () => ctx.revert();
  });

  return (
    <div id="icon-slider" style={{ overflow: "hidden" }}>
      <div
        ref={trackRef}
        style={{
          display: "flex",
          gap: "40px",
          width: "max-content",
        }}
      >
        {/* 👇 duplicate for seamless loop */}
        {[...icons, ...icons].map((_, i) => (
          <img src="/images/logo2.PNG" alt="slider-logo" />
        ))}
      </div>
    </div>
  );
}

export default Slider;