"use client";

import "@/styles/styles.scss";
import Layout from "@/components/layouts/layout";
import StoreContext from "@/app/storeContext/StoreContext";
import store from "@/app/store/Store"; 
import { useEffect } from "react";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {

  
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
}