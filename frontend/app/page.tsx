'use client';

import React from 'react';
import Cards from '@/components/elements/Cards/Cards';

const Home: React.FC = () => (
  <main>
    <div className="section container">
      <div className="section__body">
        <h2 className="visually-hidden">Card with info about Object</h2>
        <Cards />
      </div>
    </div>
  </main>
);

export default Home;
