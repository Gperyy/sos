import React from "react";
import Header from "./components/Header";
import Hero from "./components/Hero";
import NewsEvents from "./components/NewsEvents";
import VelocitySection from "./components/VelocitySection";
import Gallery from "./components/Gallery";
import Footer from "./components/Footer";

const App: React.FC = () => {
  return (
    <div className="relative flex min-h-screen w-full flex-col font-sans">
      <Header />
      <main className="flex-grow">
        <Hero />
        <NewsEvents />
        <VelocitySection />
        <Gallery />
      </main>
      <Footer />
    </div>
  );
};

export default App;