import React from "react";
import { Helmet } from "react-helmet-async";
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
      <Helmet>
        <title>Filmiagi Production | Fashion Shows & Model Management Lucknow</title>
        <meta name="description" content="Filmiagi Production — premier fashion show organizer in Lucknow. Mr. Miss & Mrs Lucknow, Filmiagi Fashion Week, model management and events." />
        <meta name="keywords" content="fashion show Lucknow, modelling agency Lucknow, Mr Miss Mrs Lucknow, Filmiagi Fashion Week, fashion week Lucknow, model management Lucknow" />
        <link rel="canonical" href="https://filmiagiproduction.in/" />

        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://filmiagiproduction.in/" />
        <meta property="og:title" content="Filmiagi Production | Fashion Shows & Model Management Lucknow" />
        <meta property="og:description" content="Premier fashion show organizer in Lucknow. Mr. Miss & Mrs Lucknow, Filmiagi Fashion Week, model management and events." />
        <meta property="og:image" content="https://filmiagiproduction.in/images/og-cover.jpeg" />

        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="Filmiagi Production | Fashion Shows Lucknow" />
        <meta name="twitter:description" content="Premier fashion show organizer in Lucknow." />
        <meta name="twitter:image" content="https://filmiagiproduction.in/images/og-cover.jpeg" />

        <script type="application/ld+json">{`
          {
            "@context": "https://schema.org",
            "@type": "Organization",
            "name": "Filmiagi Production",
            "url": "https://filmiagiproduction.in",
            "logo": "https://filmiagiproduction.in/images/logo.png",
            "description": "Premier fashion show organizer and model management agency in Lucknow.",
            "address": {
              "@type": "PostalAddress",
              "addressLocality": "Lucknow",
              "addressRegion": "Uttar Pradesh",
              "addressCountry": "IN"
            },
            "sameAs": [
              "https://www.instagram.com/filmiagiproduction/"
            ]
          }
        `}</script>
      </Helmet>

      <HeroSection />
      <FounderSection />
      <TeamSection />
      <WinnerSection
        title="MEET OUR CHAMPIONS"
        winners={modelsInfo}
        subtitle={"The Hall of Frame"}
      />
      <HighlightSections/>
      <Latest image={`${latestEvent.noticeImage}`} title={latestEvent.title} subtitle={latestEvent.subtitle} />
      <ContactSection />
    </>
  );
}

export default Home;