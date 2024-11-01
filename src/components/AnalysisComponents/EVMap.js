import React, { useEffect, useState } from "react";
import { MapContainer, TileLayer, useMap } from "react-leaflet";
import L from "leaflet";
import "leaflet/dist/leaflet.css";
import "leaflet.heat";

const HeatmapLayer = ({ data }) => {
  const map = useMap();

  useEffect(() => {
    if (!data || !map) return;

    const heatLayer = L.heatLayer(
      data.map(({ lat, lng, count }) => [lat, lng, count / 10000]),
      { radius: 25, blur: 15, maxZoom: 17 }
    );

    map.addLayer(heatLayer);

    return () => {
      map.removeLayer(heatLayer);
    };
  }, [data, map]);

  return null;
};

const EVHeatmap = () => {
  const [locationData, setLocationData] = useState([]);

  useEffect(() => {
    fetch("/api/ev-location-data")
      .then((response) => response.json())
      .then((data) => setLocationData(data))
      .catch((error) => console.error("Error fetching location data:", error));
  }, []);

  return (
    <MapContainer
      center={[47.6062, -122.3321]}
      zoom={10}
      style={{ height: "500px", width: "100%" }}
    >
      <TileLayer
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        attribution='&copy; <a href="https://osm.org/copyright">OpenStreetMap</a> contributors'
      />
      <HeatmapLayer data={locationData} />
    </MapContainer>
  );
};

export default EVHeatmap;
