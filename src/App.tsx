import { useState, useEffect } from 'react';
import Nav from './components/Nav';
import Footer from './components/Footer';
import Home from './pages/Home';
import Villas from './pages/Villas';
import VillaDetail from './pages/VillaDetail';
import Dining from './pages/Dining';
import Spa from './pages/Spa';
import Experiences from './pages/Experiences';
import Island from './pages/Island';
import Offers from './pages/Offers';
import Gallery from './pages/Gallery';
import Journal from './pages/Journal';
import Book from './pages/Book';
import OpeningExperience from './components/OpeningExperience';
import Cursor from './components/Cursor';
import Concierge from './components/Concierge';
import MobileBottomNav from './components/MobileBottomNav';
import OceanAtmosphere from './components/OceanAtmosphere';
import IslandModeSelector from './components/IslandModeSelector';
import type { IslandMode } from './components/IslandModeSelector';

export type Page =
  | 'home'
  | 'villas'
  | 'villa-detail'
  | 'dining'
  | 'spa'
  | 'experiences'
  | 'island'
  | 'offers'
  | 'gallery'
  | 'journal'
  | 'book';

export type NavigateFn = (page: Page, villaId?: number) => void;

export default function App() {
  const [page, setPage] = useState<Page>('home');
  const [selectedVilla, setSelectedVilla] = useState(0);
  const [visible, setVisible] = useState(true);
  const [showOpening, setShowOpening] = useState(true);
  const [islandMode, setIslandMode] = useState<IslandMode>('discover');
  const [conciergeOpen, setConciergeOpen] = useState(false);

  const navigate: NavigateFn = (p, villaId) => {
    setVisible(false);
    setTimeout(() => {
      if (villaId !== undefined) setSelectedVilla(villaId);
      setPage(p);
      window.scrollTo({ top: 0 });
      setVisible(true);
    }, 220);
  };

  useEffect(() => {
    setVisible(true);
  }, []);

  const handleEnter = () => {
    setShowOpening(false);
  };

  return (
    <div className={`min-h-full bg-softwhite ${!showOpening ? 'cursor-none' : ''}`}>
      {showOpening && <OpeningExperience onEnter={handleEnter} />}

      {!showOpening && (
        <>
          <Cursor />
          <OceanAtmosphere visible={page === 'home'} />
          <IslandModeSelector mode={islandMode} onChange={setIslandMode} visible={page === 'home'} />

          <Nav currentPage={page} onNavigate={(p) => navigate(p as Page)} />

          <main
            style={{
              opacity: visible ? 1 : 0,
              transition: 'opacity 0.22s ease',
            }}
          >
            {page === 'home' && <Home onNavigate={navigate} islandMode={islandMode} />}
            {page === 'villas' && <Villas onNavigate={navigate} />}
            {page === 'villa-detail' && <VillaDetail villaId={selectedVilla} onNavigate={navigate} />}
            {page === 'dining' && <Dining />}
            {page === 'spa' && <Spa />}
            {page === 'experiences' && <Experiences />}
            {page === 'island' && <Island />}
            {page === 'offers' && <Offers onNavigate={navigate} />}
            {page === 'gallery' && <Gallery />}
            {page === 'journal' && <Journal />}
            {page === 'book' && <Book />}
          </main>

          <Footer onNavigate={(p) => navigate(p as Page)} />

          <MobileBottomNav
            currentPage={page}
            onNavigate={navigate}
            onConcierge={() => setConciergeOpen(!conciergeOpen)}
          />

          <Concierge onNavigate={navigate} />
        </>
      )}
    </div>
  );
}
