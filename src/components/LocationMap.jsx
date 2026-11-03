
import { useEffect, useState } from "react";
import {
  MapContainer,
  Marker,
  TileLayer,
  useMap,
  useMapEvents,
} from "react-leaflet";
import L from "leaflet";

import markerIcon2x from "leaflet/dist/images/marker-icon-2x.png";
import markerIcon from "leaflet/dist/images/marker-icon.png";
import markerShadow from "leaflet/dist/images/marker-shadow.png";

import "leaflet/dist/leaflet.css";

delete L.Icon.Default.prototype._getIconUrl;

L.Icon.Default.mergeOptions({
  iconRetinaUrl: markerIcon2x,
  iconUrl: markerIcon,
  shadowUrl: markerShadow,
});

function ChangeView({ position }) {
  const map = useMap();

  useEffect(() => {
    if (position) {
      map.flyTo([position.lat, position.lng], 17, {
        animate: true,
      });
    }
  }, [position, map]);

  return null;
}

function LocationMarker({ position, onLocationSelect }) {
  useMapEvents({
    click(e) {
      onLocationSelect({
        lat: e.latlng.lat,
        lng: e.latlng.lng,
      });
    },
  });

  if (!position) return null;

  return (
    <Marker
      position={[position.lat, position.lng]}
      draggable={true}
      eventHandlers={{
        dragend(e) {
          const marker = e.target;
          const newPosition = marker.getLatLng();

          onLocationSelect({
            lat: newPosition.lat,
            lng: newPosition.lng,
          });
        },
      }}
    />
  );
}

function LocationMap({ position, onLocationSelect }) {
  const [search, setSearch] = useState("");
  const [searching, setSearching] = useState(false);
  const [error, setError] = useState("");

  const searchLocation = async (e) => {
    e.preventDefault();

    if (!search.trim()) {
      setError("Please enter a location to search.");
      return;
    }

    try {
      setSearching(true);
      setError("");

      const url = `https://nominatim.openstreetmap.org/search?format=jsonv2&limit=1&q=${encodeURIComponent(search.trim())}`;

      const response = await fetch(url);

      if (!response.ok) {
        throw new Error("Location search failed.");
      }

      const results = await response.json();

      if (!results.length) {
        setError("Location not found. Try another search.");
        return;
      }

      onLocationSelect({
        lat: Number(results[0].lat),
        lng: Number(results[0].lon),
      });
    } catch (err) {
      console.error("Location search error:", err);
      setError("Unable to search location. Please try again.");
    } finally {
      setSearching(false);
    }
  };

  const useCurrentLocation = () => {
    setError("");

    if (!navigator.geolocation) {
      setError("Your browser does not support location detection.");
      return;
    }

    navigator.geolocation.getCurrentPosition(
      (location) => {
        onLocationSelect({
          lat: location.coords.latitude,
          lng: location.coords.longitude,
        });
      },
      () => {
        setError(
          "Unable to get your location. Please allow location permission."
        );
      },
      {
        enableHighAccuracy: true,
        timeout: 10000,
        maximumAge: 0,
      }
    );
  };

  return (
    <div className="w-full space-y-3">
      {/* Location search */}
      <form
        onSubmit={searchLocation}
        className="flex flex-col sm:flex-row gap-2"
      >
        <input
          type="text"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Search street, area, landmark or address..."
          className="flex-1 min-w-0 border border-gray-300 rounded-lg px-4 py-3 outline-none focus:ring-2 focus:ring-blue-500"
        />

        <button
          type="submit"
          disabled={searching}
          className="bg-blue-600 hover:bg-blue-700 disabled:bg-blue-400 text-white px-5 py-3 rounded-lg font-semibold"
        >
          {searching ? "Searching..." : "Search"}
        </button>
      </form>

      {/* Current location */}
      <button
        type="button"
        onClick={useCurrentLocation}
        className="w-full sm:w-auto bg-green-600 hover:bg-green-700 text-white px-5 py-3 rounded-lg font-semibold"
      >
        📍 Use My Current Location
      </button>

      {error && (
        <p className="text-sm text-red-600" role="alert">
          {error}
        </p>
      )}

      <p className="text-sm text-gray-600">
        Click anywhere on the map or drag the marker to select the exact
        complaint location.
      </p>

      {/* Map */}
      <div className="h-96 w-full rounded-lg overflow-hidden border border-gray-300">
        <MapContainer
          center={[17.385, 78.4867]}
          zoom={13}
          scrollWheelZoom={true}
          className="h-full w-full"
        >
          <TileLayer
            attribution="&copy; OpenStreetMap contributors"
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          />

          <LocationMarker
            position={position}
            onLocationSelect={onLocationSelect}
          />

          <ChangeView position={position} />
        </MapContainer>
      </div>

      {/* Selected coordinates */}
      {position && (
        <div className="bg-green-50 border border-green-200 rounded-lg p-3 text-sm">
          <p>
            <strong>Latitude:</strong> {position.lat}
          </p>
          <p>
            <strong>Longitude:</strong> {position.lng}
          </p>
        </div>
      )}
    </div>
  );
}

export default LocationMap;
