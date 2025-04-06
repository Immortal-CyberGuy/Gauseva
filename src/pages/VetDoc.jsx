import { useState, useEffect } from "react";
import { GoogleMap, Marker, InfoWindow, useLoadScript } from "@react-google-maps/api";

const mapContainerStyle = { width: "100%", height: "500px" };
const defaultCenter = { lat: 20.5937, lng: 78.9629 };

const mockVetDoctors = [
  {
    name: "Dr. Sinha Veterinary Clinic",
    vicinity: "Connaught Place, Delhi",
    rating: 4.6,
    formatted_phone_number: "9876543210",
    geometry: {
      location: { lat: 28.6315, lng: 77.2167 },
    },
  },
  {
    name: "Happy Paws Vet Center",
    vicinity: "Hauz Khas, Delhi",
    rating: 4.2,
    formatted_phone_number: "9998887777",
    geometry: {
      location: { lat: 28.5494, lng: 77.2001 },
    },
  },
  {
    name: "Purrfect Care Hospital",
    vicinity: "Dwarka, Delhi",
    rating: 4.8,
    formatted_phone_number: "9955443322",
    geometry: {
      location: { lat: 28.5721, lng: 77.0123 },
    },
  },
];

const VetDoc = () => {
  const [location, setLocation] = useState(null);
  const [vetDoctors, setVetDoctors] = useState([]);
  const [selectedVet, setSelectedVet] = useState(null);
  const [error, setError] = useState("");
  const [sortType, setSortType] = useState("rating");

  const { isLoaded, loadError } = useLoadScript({
    googleMapsApiKey: import.meta.env.VITE_GOOGLE_MAPS_API_KEY,
  });

  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (pos) => setLocation({ lat: pos.coords.latitude, lng: pos.coords.longitude }),
        () => setError("Unable to fetch location.")
      );
    } else {
      setError("Geolocation not supported.");
    }
  }, []);

  const calculateDistance = (lat1, lon1, lat2, lon2) => {
    const toRad = (deg) => (deg * Math.PI) / 180;
    const R = 6371;
    const dLat = toRad(lat2 - lat1);
    const dLon = toRad(lon2 - lon1);
    const a =
      Math.sin(dLat / 2) ** 2 +
      Math.cos(toRad(lat1)) * Math.cos(toRad(lat2)) * Math.sin(dLon / 2) ** 2;
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    return R * c;
  };

  const fetchVetDoctors = () => {
    if (!location) return setError("Location not available.");
    setVetDoctors(mockVetDoctors);
    setError("");
  };

  const sortedVets = [...vetDoctors].sort((a, b) => {
    if (sortType === "rating") return (b.rating || 0) - (a.rating || 0);
    if (sortType === "distance" && location) {
      const distA = calculateDistance(location.lat, location.lng, a.geometry.location.lat, a.geometry.location.lng);
      const distB = calculateDistance(location.lat, location.lng, b.geometry.location.lat, b.geometry.location.lng);
      return distA - distB;
    }
    return 0;
  });

  if (loadError) return <p className="error">Error loading maps.</p>;
  if (!isLoaded) return <p className="loading">Loading Maps...</p>;

  return (
    <div className="vet-container">
      <h2>Smart Vet Locator</h2>
      <button className="fetch-button" onClick={fetchVetDoctors}>Find Nearby Vets</button>
      {error && <p className="error">{error}</p>}

      <div className="map-container">
        <GoogleMap mapContainerStyle={mapContainerStyle} zoom={12} center={location || defaultCenter}>
          {location && <Marker position={location} title="Your Location" />}
          {vetDoctors.map((vet, index) => (
            <Marker
              key={index}
              position={{ lat: vet.geometry.location.lat, lng: vet.geometry.location.lng }}
              onClick={() => setSelectedVet(vet)}
            />
          ))}
          {selectedVet && (
            <InfoWindow position={{ lat: selectedVet.geometry.location.lat, lng: selectedVet.geometry.location.lng }} onCloseClick={() => setSelectedVet(null)}>
              <div>
                <h3>{selectedVet.name}</h3>
                <p>{selectedVet.vicinity}</p>
                <p><strong>Rating:</strong> {selectedVet.rating || "N/A"}</p>
                {selectedVet.formatted_phone_number && (
                  <p><strong>Phone:</strong> <a href={`tel:${selectedVet.formatted_phone_number}`}>{selectedVet.formatted_phone_number}</a></p>
                )}
              </div>
            </InfoWindow>
          )}
        </GoogleMap>
      </div>

      <div className="sort-container">
        <span className="sort-title">Sort By:</span>
        <button className="sort-button" onClick={() => setSortType("rating")}>⭐ Rating</button>
        <button className="sort-button" onClick={() => setSortType("distance")}>📍 Distance</button>
      </div>

      <div className="vet-list">
        {sortedVets.map((vet, index) => (
          <div key={index} className="vet-card">
            <h3 className="vet-name">{vet.name}</h3>
            <p className="vet-info"><strong>📍 Address:</strong> {vet.vicinity}</p>
            <p className="vet-info"><strong>⭐ Rating:</strong> {vet.rating || "N/A"}</p>
            <p className="vet-info">
              <strong>📞 Phone:</strong>{" "}
              {vet.formatted_phone_number ? (
                <a href={`tel:${vet.formatted_phone_number}`} className="phone-link">
                  {vet.formatted_phone_number}
                </a>
              ) : (
                "Not Available"
              )}
            </p>
            <a className="vet-link" href={`https://www.google.com/maps/search/?api=1&query=${vet.geometry.location.lat},${vet.geometry.location.lng}`} target="_blank" rel="noopener noreferrer">
              🔗 View on Google Maps
            </a>
          </div>
        ))}
      </div>

      <style>{`
        .vet-container {
          max-width: 1200px;
          margin: auto;
          padding: 2rem;
          font-family: "Segoe UI", Tahoma, Geneva, Verdana, sans-serif;
          color: #333;
        }
        h2 {
          text-align: center;
          font-size: 2rem;
          margin-bottom: 1rem;
        }
        .fetch-button {
          display: block;
          margin: 0.5rem auto 1.5rem;
          padding: 0.7rem 1.5rem;
          background-color: #0077cc;
          color: white;
          border: none;
          border-radius: 6px;
          cursor: pointer;
          font-weight: 600;
          transition: background-color 0.3s;
        }
        .fetch-button:hover {
          background-color: #005fa3;
        }
        .error {
          text-align: center;
          color: red;
          margin: 1rem 0;
        }
        .loading {
          text-align: center;
          color: #555;
          margin: 2rem 0;
        }
        .map-container {
          width: 100%;
          height: 500px;
          margin-bottom: 2rem;
          border-radius: 12px;
          overflow: hidden;
          box-shadow: 0 0 15px rgba(0, 0, 0, 0.1);
        }
        .sort-container {
          display: flex;
          justify-content: center;
          align-items: center;
          gap: 1rem;
          margin: 1rem 0;
        }
        .sort-title {
          font-weight: 600;
        }
        .sort-button {
          padding: 0.5rem 1rem;
          border: 1px solid #0077cc;
          background: white;
          color: #0077cc;
          border-radius: 5px;
          cursor: pointer;
          transition: all 0.2s ease;
        }
        .sort-button:hover {
          background-color: #0077cc;
          color: white;
        }
        .vet-list {
          display: grid;
          gap: 1.5rem;
          grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
          margin-top: 2rem;
        }
        .vet-card {
          background: #f9f9f9;
          border-radius: 10px;
          padding: 1.2rem;
          box-shadow: 0 4px 12px rgba(0, 0, 0, 0.06);
          transition: transform 0.2s;
        }
        .vet-card:hover {
          transform: scale(1.02);
        }
        .vet-name {
          font-size: 1.3rem;
          color: #0077cc;
          margin-bottom: 0.5rem;
        }
        .vet-info {
          font-size: 0.95rem;
          margin: 0.3rem 0;
        }
        .phone-link {
          color: #0077cc;
          text-decoration: none;
        }
        .phone-link:hover {
          text-decoration: underline;
        }
        .vet-link {
          display: inline-block;
          margin-top: 0.5rem;
          color: #0077cc;
          text-decoration: none;
          font-weight: 500;
        }
        .vet-link:hover {
          text-decoration: underline;
        }
      `}</style>
    </div>
  );
};

export default VetDoc;
