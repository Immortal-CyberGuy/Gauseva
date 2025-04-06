import React from "react";
import BreedCards from "../components/BreedCards.jsx";
import BreedSearchBar from "../components/BreedSearchBar.jsx";
import CowFAQ from "../components/CowFAQ.jsx"; 

function CowPedia() {
  return (
    <div>
      <BreedSearchBar />
      <BreedCards />
      <CowFAQ /> 
    </div>
  );
}

export default CowPedia;
