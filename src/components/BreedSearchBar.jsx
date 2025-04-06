import React, { useState, useEffect, useRef } from "react";
import { getFirestore, doc, getDoc } from "firebase/firestore";
import "../style/BreedSearchBar.css";
import "../style/BreedCards.css";
import { db } from "../firebaseConfig";

const breedList = [
  "Gir", "Sahiwal", "Holstein", "Jersey", "Rathi", "Tharparkar", "Red Sindhi", "Ongole", "Hallikar",
  "Amrit Mahal", "Kankrej", "Hariana", "Montbéliarde", "Khillari", "Malnad Gidda", "Punganur", "Vechur",
  "Kangayam", "Krishna Valley", "Belahi", "Deoni", "Nagori", "Mewati", "Gangatiri", "Ponwar", "Lal Kandhari",
  "Siri", "Kherigarh", "Shahabadi", "Kalahandi", "Khariar", "Motu", "Binjharpuri", "Dangi", "Kasaragod",
  "Ayrshire", "Brown Swiss", "Normande", "Simmental", "Fleckvieh", "Swedish Red", "Norwegian Red",
  "Danish Red", "Belgian Blue", "Piedmontese", "Charolais", "Limousin", "Hereford", "Angus", "Shorthorn",
  "Texas Longhorn", "Brahman", "Gelbvieh", "Dexter", "South Devon", "Wagyu", "Murray Grey", "Highland",
  "Parthenais", "Ankole-Watusi", "Galloway"
];

const BreedSearchBar = () => {
  const [query, setQuery] = useState("");
  const [suggestions, setSuggestions] = useState([]);
  const [selectedBreed, setSelectedBreed] = useState(null);
  const [showGeneral, setShowGeneral] = useState(false);
  const searchRef = useRef(null);

  const handleChange = (event) => {
    const input = event.target.value;
    setQuery(input);
    if (input.length > 0) {
      const filteredSuggestions = breedList
        .filter(breed => breed.toLowerCase().includes(input.toLowerCase()))
        .slice(0, 6);
      setSuggestions(filteredSuggestions);
    } else {
      setSuggestions([]);
    }
  };

  const fetchBreedData = async (breedName) => {
    const generalRef = doc(db, "cow_breed_general", breedName);
    const specificRef = doc(db, "cow_breed_specific", breedName);

    try {
      const [generalSnap, specificSnap] = await Promise.all([
        getDoc(generalRef),
        getDoc(specificRef)
      ]);

      if (!generalSnap.exists() && !specificSnap.exists()) {
        setSelectedBreed(null);
        return;
      }

      setSelectedBreed({
        name: breedName,
        details: generalSnap.exists() ? generalSnap.data() : {},
        general: specificSnap.exists() ? specificSnap.data() : {}  
      });
    } catch (error) {
      console.error("Error fetching breed data:", error);
    }
  };

  const handleSelect = (breed) => {
    setQuery(breed);
    setSuggestions([]);
    fetchBreedData(breed);
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (searchRef.current && !searchRef.current.contains(event.target)) {
        setSuggestions([]);
      }
    };
    document.addEventListener("click", handleClickOutside);
    return () => document.removeEventListener("click", handleClickOutside);
  }, []);

  return (
    <div>
      <div className="search-container" ref={searchRef}>
        <input
          type="text"
          placeholder="Search for a breed..."
          value={query}
          onChange={handleChange}
          className="search-input"
        />
        {suggestions.length > 0 && (
          <ul className="suggestions-list active">
            {suggestions.map((breed, index) => (
              <li key={index} className="suggestion-item" onClick={() => handleSelect(breed)}>
                {breed}
              </li>
            ))}
          </ul>
        )}
      </div>

      {selectedBreed && (
        <div
          className="modal show"
          style={{
            position: "fixed",
            top: 0,
            left: 0,
            width: "100vw",
            height: "100vh",
            backgroundColor: "rgba(0, 0, 0, 0.6)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            zIndex: 1000,
            pointerEvents: "auto"
          }}
        >
          <div className="modal-content">
            <h2 className="breed-title">{selectedBreed.name}</h2>
            <table className="breed-table">
              <tbody>
                <tr><th>Origin</th><td>{selectedBreed.details.state_of_origin || "N/A"}</td></tr>
                <tr><th>Milk Production</th><td>{selectedBreed.details.milk_production || "N/A"} L/day</td></tr>
                <tr><th>Weight</th><td>{selectedBreed.details.weight || "N/A"} kg</td></tr>
                <tr><th>Best Breeding Partner</th><td>{selectedBreed.details.best_breeding_partner || "N/A"}</td></tr>
                <tr><th>Climate Suitability</th><td>{selectedBreed.details.climate_suitability || "N/A"}</td></tr>
                <tr><th>Allergies</th><td>{selectedBreed.details.allergies ? selectedBreed.details.allergies.join(", ") : "None"}</td></tr>
                <tr><th>Diseases</th><td>{selectedBreed.details.diseases ? selectedBreed.details.diseases.join(", ") : "None"}</td></tr>
              </tbody>
            </table>

            <div className="button-container">
              <button className="info-btn" onClick={() => setShowGeneral(!showGeneral)}>
                {showGeneral ? "Hide General Info" : "Show General Info"}
              </button>
              <button className="close-btn" onClick={() => setSelectedBreed(null)}>Close</button>
            </div>

            {showGeneral && (
                <div className="general-info">
                  <ul>
                    <li>{selectedBreed.general.g1}</li>
                    <li>{selectedBreed.general.g2}</li>
                    <li>{selectedBreed.general.g3}</li>
                    <li>{selectedBreed.general.g4}</li>
                    <li>{selectedBreed.general.g5}</li>
                  </ul>
                </div>
              )}


          </div>
        </div>
      )}
    </div>
  );
};

export default BreedSearchBar;
