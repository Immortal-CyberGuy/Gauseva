import React, { useState, useEffect, useRef } from "react";
import "../style/BreedMatching.css";

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

const BreedMatching = () => {
  const [query, setQuery] = useState("");
  const [suggestions, setSuggestions] = useState([]);
  const [matchingBreeds, setMatchingBreeds] = useState([]);
  const [loading, setLoading] = useState(false);
  const searchRef = useRef(null);

  const handleChange = (event) => {
    const input = event.target.value;
    setQuery(input);

    if (input.length > 0) {
      const filtered = breedList
        .filter(b => b.toLowerCase().includes(input.toLowerCase()))
        .slice(0, 6);
      setSuggestions(filtered);
    } else {
      setSuggestions([]);
      setMatchingBreeds([]);
    }
  };
  const handleSelect = async (breed) => {
    setQuery(breed);
    setSuggestions([]);
    setLoading(true);
    setMatchingBreeds([]);

    try {
      const response = await fetch(`http://localhost:5000/api/breed-compatibility?breed=${breed}`);
      const data = await response.json();
      setMatchingBreeds(data.partners || []); // ✅ Fix here
    } catch (error) {
      console.error("Error fetching breed compatibility:", error);
    } finally {
      setLoading(false);
    }
};


  useEffect(() => {
    const handleClickOutside = (e) => {
      if (searchRef.current && !searchRef.current.contains(e.target)) {
        setSuggestions([]);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div className="search-container" ref={searchRef}>
      <h2>Find Best Breeding Partner</h2>
      <input
        type="text"
        placeholder="Enter breed name..."
        value={query}
        onChange={handleChange}
        className="search-input"
      />
      {suggestions.length > 0 && (
        <ul className="suggestions-list">
          {suggestions.map((breed, index) => (
            <li key={index} className="suggestion-item" onClick={() => handleSelect(breed)}>
              {breed}
            </li>
          ))}
        </ul>
      )}

      {loading && (
        <div className="loading-container">
          <div className="loader"></div>
          <span className="loading-text">Analyzing Data...</span>
        </div>
      )}

      {matchingBreeds.length > 0 && !loading && (
        <div className="results-container">
          <h4>Best Breeding Partners for {query}:</h4>
          {matchingBreeds.map((partner, index) => (
            <div key={index} className="breed-card">
              <h4>{partner.breed}</h4>
              <ul>
                {partner.benefits.map((benefit, i) => (
                  <li key={i}>{benefit}</li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default BreedMatching;
