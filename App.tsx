import React, { useState } from "react";
import Header from "./components/Header";
import Hero from "./components/Hero";
import NewsEvents from "./components/NewsEvents";
import VelocitySection from "./components/VelocitySection";
import Gallery from "./components/Gallery";
import Footer from "./components/Footer";
import About from "./components/About";
import Aircraft from "./components/Aircraft";
import Events from "./components/Events";
import Media from "./components/Media";
import FlyWithSemin from "./components/FlyWithSemin";
import Contact from "./components/Contact";

type TabType = "home" | "about" | "aircraft" | "events" | "media" | "fly" | "contact";

const App: React.FC = () => {
  const [activeTab, setActiveTab] = useState<TabType>("home");

  const renderContent = () => {
    switch (activeTab) {
      case "about":
        return <About />;
      case "aircraft":
        return <Aircraft />;
      case "events":
        return <Events />;
      case "media":
        return <Media />;
      case "fly":
        return <FlyWithSemin />;
      case "contact":
        return <Contact />;
      case "sponsors":
        return (
          <>
            <Hero />
            <NewsEvents />
            <VelocitySection />
            <Gallery />
          </>
        );
      default:
        return (
          <>
            <Hero />
            <NewsEvents />
            <VelocitySection />
            <Gallery />
          </>
        );
    }
  };

  // Scroll to sections when tab is selected
  React.useEffect(() => {
    if (activeTab === "sponsors") {
      const sponsorsElement = document.getElementById("sponsors");
      if (sponsorsElement) {
        sponsorsElement.scrollIntoView({ behavior: "smooth" });
      }
      // Reset to home view but keep scrolled to sponsors
      setActiveTab("home");
    } else if (activeTab === "contact") {
      const contactElement = document.getElementById("contact");
      if (contactElement) {
        contactElement.scrollIntoView({ behavior: "smooth" });
      }
      // Reset to home view but keep scrolled to contact
      setActiveTab("home");
    }
  }, [activeTab]);

  return (
    <div className="relative flex min-h-screen w-full flex-col font-sans">
      <Header activeTab={activeTab} onTabChange={setActiveTab} />
      <main className="flex-grow">
        {renderContent()}
      </main>
      <Footer />
    </div>
  );
};

export default App;
