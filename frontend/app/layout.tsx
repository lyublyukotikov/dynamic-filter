'use client';

import '@/styles/styles.scss';
import Layout from '@/components/layouts/layout';
import StoreContext from '@/app/storeContext/StoreContext';
import store from '@/app/store/Store';
import { useEffect } from 'react';
import PropTypes from 'prop-types';

const RootLayout: React.FC<{
  children: React.ReactNode;
}> = ({ children }) => {
  useEffect(() => {
    store.fetchFilters();
    store.fetchFlats(1);
  }, []);

  return (
    <StoreContext.Provider value={store}>
      <html lang="en">
        <body>
          <Layout>{children}</Layout>
        </body>
      </html>
    </StoreContext.Provider>
  );
};

RootLayout.propTypes = {
  children: PropTypes.node.isRequired,
};

export default RootLayout;
