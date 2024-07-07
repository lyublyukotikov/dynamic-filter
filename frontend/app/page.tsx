import React from "react";


import Cards from "@/components/elements/Cards/Cards";

export default function Home() {
  return (
    <main>
      <div className="section container">
        <div className="section__body">
          <h2 className="visually-hidden">Card with info about Object</h2>
          <Cards />
        </div>
      </div>
    </main>
  );
}
