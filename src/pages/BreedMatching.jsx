import React, { useState, useEffect, useRef } from "react";
import "../style/BreedMatching.css";

const breedList = [
  "Gir", "Sahiwal", "Tharparkar", "Rathi", "Red Sindhi",
  "Ongole", "Kankrej", "Hariana", "Hallikar", "Amrit Mahal"
];

const compatibilityData = [
  {
    breed: "Gir",
    partners: [
      {
        breed: "Sahiwal",
        benefits: ["High milk yield", "Disease resistance"]
      },
      {
        breed: "Tharparkar",
        benefits: ["Improved heat tolerance", "Balanced temperament"]
      },
      {
        breed: "Kankrej",
        benefits: ["Better draught power", "Strong bone structure"]
      }
    ]
  },
  {
    breed: "Sahiwal",
    partners: [
      {
        breed: "Gir",
        benefits: ["Boosted lactation", "Improved fertility"]
      },
      {
        breed: "Red Sindhi",
        benefits: ["High butterfat content", "Good adaptability"]
      },
      {
        breed: "Hariana",
        benefits: ["Sturdy calves", "Better climate tolerance"]
      }
    ]
  },
  {
    breed: "Tharparkar",
    partners: [
      {
        breed: "Gir",
        benefits: ["Good temperament", "Consistent milk yield"]
      },
      {
        breed: "Ongole",
        benefits: ["Disease resilience", "Powerful physique"]
      },
      {
        breed: "Sahiwal",
        benefits: ["Good udder shape", "Heat resistance"]
      }
    ]
  },
  {
    breed: "Rathi",
    partners: [
      {
        breed: "Red Sindhi",
        benefits: ["Compact size", "Efficient milk production"]
      },
      {
        breed: "Hariana",
        benefits: ["Balanced strength", "Good adaptability"]
      },
      {
        breed: "Gir",
        benefits: ["Hybrid vigor", "Long lactation period"]
      }
    ]
  },
  {
    breed: "Red Sindhi",
    partners: [
      {
        breed: "Sahiwal",
        benefits: ["Milk richness", "Improved fertility"]
      },
      {
        breed: "Rathi",
        benefits: ["Low maintenance", "Docile nature"]
      },
      {
        breed: "Kankrej",
        benefits: ["Heat tolerance", "Robust frame"]
      }
    ]
  },
  {
    breed: "Ongole",
    partners: [
      {
        breed: "Tharparkar",
        benefits: ["Strong offsprings", "Disease resistance"]
      },
      {
        breed: "Hallikar",
        benefits: ["Agility", "Work efficiency"]
      },
      {
        breed: "Kankrej",
        benefits: ["Solid legs", "Better endurance"]
      }
    ]
  },
  {
    breed: "Kankrej",
    partners: [
      {
        breed: "Gir",
        benefits: ["Milk and draught combo", "Calm temperament"]
      },
      {
        breed: "Ongole",
        benefits: ["Strong muscling", "Heat adaptation"]
      },
      {
        breed: "Sahiwal",
        benefits: ["Hybrid milk potential", "Good immunity"]
      }
    ]
  },
  {
    breed: "Hariana",
    partners: [
      {
        breed: "Rathi",
        benefits: ["Balanced yield", "Hardy calves"]
      },
      {
        breed: "Red Sindhi",
        benefits: ["Compact body", "Dual-purpose usage"]
      },
      {
        breed: "Sahiwal",
        benefits: ["Improved genetics", "High survivability"]
      }
    ]
  },
  {
    breed: "Hallikar",
    partners: [
      {
        breed: "Ongole",
        benefits: ["Great working capacity", "Disease resistance"]
      },
      {
        breed: "Amrit Mahal",
        benefits: ["Stamina boost", "Lean muscle mass"]
      },
      {
        breed: "Kankrej",
        benefits: ["Body structure enhancement", "Long lifespan"]
      }
    ]
  },
  {
    breed: "Amrit Mahal",
    partners: [
      {
        breed: "Hallikar",
        benefits: ["Agility", "Improved load carrying"]
      },
      {
        breed: "Gir",
        benefits: ["Cross-use potential", "Better fertility"]
      },
      {
        breed: "Sahiwal",
        benefits: ["Good temperament", "Milk boost"]
      }
    ]
  }
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

  const handleSelect = (breed) => {
    setQuery(breed);
    setSuggestions([]);
    setLoading(true);
    setMatchingBreeds([]);

    const data = compatibilityData.find(b => b.breed === breed);
    setTimeout(() => {
      setMatchingBreeds(data?.partners || []);
      setLoading(false);
    }, 600);
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
