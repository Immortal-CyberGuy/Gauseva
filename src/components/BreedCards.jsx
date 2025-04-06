import React, { useState } from "react";
import "../style/BreedCards.css";

const breedData = [
    {
      name: "Gir",
      image: "/images/Brown-Gir-Cow.jpg",
      details: {
        allergies: ["Corn"],
        avg_lifespan: 13,
        best_breeding_partner: "Bargur",
        climate_suitability: "Tropical",
        diseases: ["Hemorrhagic Septicemia", "Anthrax"],
        milk_production: 6,
        state_of_origin: "Gujarat",
        weight: 350,
      },
      general: [
        "Known for its high milk yield and heat tolerance.",
        "Excellent grazing ability and disease resistance.",
        "Preferred for organic dairy farming.",
        "Highly adaptable to tropical climates.",
        "Strong maternal instincts, making them good breeders.",
      ],
    },
    {
      name: "Sahiwal",
      image: "/images/sahiwal.jpg",
      details: {
        allergies: ["Soy"],
        avg_lifespan: 15,
        best_breeding_partner: "Red Sindhi",
        climate_suitability: "Hot & Humid",
        diseases: ["Mastitis", "Tick Fever"],
        milk_production: 8,
        state_of_origin: "Punjab",
        weight: 450,
      },
      general: [
        "High milk-producing indigenous breed.",
        "Adaptable to both stall-fed and open grazing systems.",
        "Good reproductive efficiency.",
        "Resistant to heat stress and parasites.",
        "Used in crossbreeding programs worldwide.",
      ],
    },
    {
      name: "Red Sindhi",
      image: "/images/red_sindhi.jpeg",
      details: {
        allergies: ["Peanuts"],
        avg_lifespan: 14,
        best_breeding_partner: "Sahiwal",
        climate_suitability: "Hot & Dry",
        diseases: ["Foot and Mouth Disease", "Brucellosis"],
        milk_production: 7,
        state_of_origin: "Sindh (Pakistan)",
        weight: 400,
      },
      general: [
        "One of the most heat-tolerant breeds.",
        "Known for good reproductive efficiency.",
        "Used for dairy farming and crossbreeding programs.",
        "Resistant to common tropical diseases.",
        "Highly adaptable to arid regions.",
      ],
    },
    {
      name: "Ongole",
      image: "/images/ongole.jpeg",
      details: {
        allergies: ["Wheat"],
        avg_lifespan: 16,
        best_breeding_partner: "Krishna Valley",
        climate_suitability: "Hot & Humid",
        diseases: ["Black Quarter", "Bovine Ephemeral Fever"],
        milk_production: 5,
        state_of_origin: "Andhra Pradesh",
        weight: 600,
      },
      general: [
        "Primarily used as a draught breed.",
        "Known for its strength and endurance.",
        "Exported to Brazil and the USA for breeding.",
        "Highly resistant to local diseases.",
        "Used in crossbreeding to improve local cattle.",
      ],
    },
    {
      name: "Holstein",
      image: "/images/Hoistein.jpeg",
      details: {
        allergies: ["Soy", "Grain"],
        avg_lifespan: 10,
        best_breeding_partner: "Jersey",
        climate_suitability: "Temperate",
        diseases: ["Mastitis", "Lameness"],
        milk_production: 25,
        state_of_origin: "Netherlands",
        weight: 700,
      },
      general: [
        "World's highest milk-producing breed.",
        "Popular in commercial dairy farms.",
        "Requires high-quality feed and care.",
        "Less heat tolerant compared to native breeds.",
        "Prone to metabolic disorders due to high production.",
      ],
    },
    {
      name: "Jersey",
      image: "/images/jersey.jpeg",
      details: {
        allergies: ["Soy", "Corn"],
        avg_lifespan: 12,
        best_breeding_partner: "Holstein",
        climate_suitability: "Moderate",
        diseases: ["Ketosis", "Milk Fever"],
        milk_production: 20,
        state_of_origin: "Jersey (UK)",
        weight: 400,
      },
      general: [
        "Produces high-butterfat milk, ideal for cheese and butter.",
        "Smaller body size, requiring less feed.",
        "Early maturity and high fertility rates.",
        "Adaptable to various climatic conditions.",
        "Used in crossbreeding to improve milk quality.",
      ],
    },
  ];

const BreedCards = () => {
  const [selectedBreed, setSelectedBreed] = useState(null);
  const [showGeneral, setShowGeneral] = useState(false);

  const handleClick = (breed) => {
    if (selectedBreed?.name === breed.name) {
      setSelectedBreed(null);
    } else {
      setSelectedBreed(breed);
      setShowGeneral(false);
    }
  };

  return (
    <div className="container">
      {breedData.map((breed, index) => (
        <div key={index} className="card" onClick={() => handleClick(breed)}>
          <img src={breed.image} alt={breed.name} className="card-image" />
          <h3 className="card-title">{breed.name}</h3>
        </div>
      ))}

      {selectedBreed && (
        <div className={`modal show`}>
          <div className="modal-content">
            <h2>{selectedBreed.name}</h2>
            <table className="breed-table">
              <tbody>
                <tr>
                  <th>Origin</th>
                  <td>{selectedBreed.details.state_of_origin}</td>
                </tr>
                <tr>
                  <th>Milk Production</th>
                  <td>{selectedBreed.details.milk_production} L/day</td>
                </tr>
                <tr>
                  <th>Weight</th>
                  <td>{selectedBreed.details.weight} kg</td>
                </tr>
                <tr>
                  <th>Best Breeding Partner</th>
                  <td>{selectedBreed.details.best_breeding_partner}</td>
                </tr>
                <tr>
                  <th>Climate Suitability</th>
                  <td>{selectedBreed.details.climate_suitability}</td>
                </tr>
                <tr>
                  <th>Allergies</th>
                  <td>{selectedBreed.details.allergies.join(", ")}</td>
                </tr>
                <tr>
                  <th>Diseases</th>
                  <td>{selectedBreed.details.diseases.join(", ")}</td>
                </tr>
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
                  {selectedBreed.general.map((point, idx) => (
                    <li key={idx}>{point}</li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default BreedCards;
