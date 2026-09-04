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

  return (
    <div className="min-h-full bg-softwhite">
      <Nav currentPage={page} onNavigate={(p) => navigate(p as Page)} />
      <main
        style={{
          opacity: visible ? 1 : 0,
          transition: 'opacity 0.22s ease',
        }}
      >
        {page === 'home' && <Home onNavigate={navigate} />}
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
    </div>
  );
}
