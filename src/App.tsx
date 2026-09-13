import { useCallback, useState } from "react";
import { MotionConfig } from "framer-motion";
import Nav from "./components/Nav";
import Hero from "./components/Hero";
import Domains from "./components/Domains";
import Process from "./components/Process";
import InductionForm from "./components/InductionForm";
import Faq from "./components/Faq";
import Footer from "./components/Footer";

export default function App() {
  const [selectedDomain, setSelectedDomain] = useState<string | null>(null);

  const handleSelectDomain = useCallback((domain: string) => {
    setSelectedDomain(domain);
    document.getElementById("apply")?.scrollIntoView({ behavior: "smooth", block: "start" });
  }, []);

  const handleConsumeDomain = useCallback(() => setSelectedDomain(null), []);

  return (
    <MotionConfig reducedMotion="user">
      <div id="top">
        <Nav />
        <main>
          <Hero />
          <Domains onSelectDomain={handleSelectDomain} />
          <Process />
          <InductionForm selectedDomain={selectedDomain} onConsumeSelectedDomain={handleConsumeDomain} />
          <Faq />
        </main>
        <Footer />
      </div>
    </MotionConfig>
  );
}
