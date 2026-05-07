import React from "react";
import HeroSection from "../HeroSection/HeroSection.jsx";
import FounderSection from "../FounderSection/FounderSection.jsx";
import TeamSection from "../TeamSection/TeamSection.jsx";
import WinnerSection from "../WinnerSection/WinnerSection.jsx";
import ContactSection from "../ContactSection/ContactSection.jsx";
import HighlightSections from "../highlightsSections/highlightSections.jsx";
import Latest from "../Latest/Latest.jsx";

import modelsInfo from '../../utils/model.js'
import latestEvent from '../../utils/latest.js'

function Home() {
  return (
    <>
      <HeroSection />
      <FounderSection />
      <TeamSection />
      <WinnerSection
        title="MEET OUR CHAMPIONS"
        winners={modelsInfo}
        subtitle={"The Hall of Frame"}
      />
      <HighlightSections/>
      <Latest image={`${latestEvent.noticeImage}`} title={latestEvent.title}  subtitle={latestEvent.subtitle} />
      <ContactSection />
    </>
  );
}

export default Home;
