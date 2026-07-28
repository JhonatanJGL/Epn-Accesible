import Status from "../components/status/Status";
import { lazy, Suspense } from "react";
import DeferredSection from "../components/DeferredSection";

const Statistics = lazy(() => import("../components/statistics/Statistics"));
const Types = lazy(() => import("../components/types/Types"));
const Search = lazy(() => import("../components/search/Search"));
const InfoTabs = lazy(() => import("../components/infoTabs/InfoTabs"));
const Services = lazy(() => import("../components/services/Services"));
const Gallery = lazy(() => import("../components/gallery/Gallery"));
const AppSection = lazy(() => import("../components/appSection/AppSection"));

const HomePage = () => {
  return (
    <main className="main-content home-page">
      <Status />
      <Suspense fallback={null}>
        <DeferredSection>
          <Statistics />
          <Types />
          <Search />
          <InfoTabs />
        </DeferredSection>
        <DeferredSection delay={2500}>
          <Services />
          <Gallery />
          <AppSection />
        </DeferredSection>
      </Suspense>
    </main>
    
  );
};

export default HomePage;
