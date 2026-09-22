import React from 'react';
import { DECK } from '../data/portfolioData';
import { SlideView } from './SlideView';

export const PrintDeck: React.FC = () => {
  return (
    <div id="print-landscape-deck" className="print-page-deck hidden print:block">
      {DECK.map((slide) => (
        <section key={slide.id} className="print-slide">
          <div className="print-slide-inner">
            <SlideView slide={slide} />
          </div>
        </section>
      ))}
    </div>
  );
};
