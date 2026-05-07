import React, { useState } from "react";

import hightlights from "../../utils/highlights";

function HighlightSections() {
  const [visibleCount, setVisibleCount] = useState(6);

  const handleViewMore = () => {
    setVisibleCount((prevCount) => prevCount + 3);
  };

  return (
    <section className="highlights-section" id="highlights">
      <div className="highlights-header">
        <div className="title-container">
          <h1 className="gold-text">FFw Highlights</h1>
          <img src="/images/logo2.PNG" id="ffwLogo" alt="FFw Logo" />
        </div>

        <div className="description-container">
          {hightlights?.highlightDescription.map((description, index) => (
            <div key={index} className="description-item">
              <p className="section-description">
                {description}
              </p>
              {index < hightlights.highlightDescription.length - 1 && (
                <div className="description-flourish"></div>
              )}
            </div>
          ))}
        </div>
      </div>

      <div className="highlight-grid">
        {hightlights?.images?.slice(0, visibleCount).map((image,index) => (
          <div key={index} className="grid-item">
            <div className="item-inner">
              <img src={image} alt={image.alt} />
              <div className="item-overlay">
                <div className="overlay-flourish"></div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {visibleCount < hightlights?.images?.length && (
        <div className="view-more-container">
          <button className="view-more-btn" onClick={handleViewMore}>
            View More
          </button>
        </div>
      )}
    </section>
  );
}

export default HighlightSections;
