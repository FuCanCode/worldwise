import { useNavigate } from "react-router-dom";
import styles from "./Map.module.css";
import {
  MapContainer,
  Marker,
  Popup,
  TileLayer,
  useMap,
  useMapEvent,
} from "react-leaflet";
import { useEffect, useState } from "react";
import { LatLngExpression } from "leaflet";
import { useCities } from "../../hooks/useCities";
import { useGeolocation } from "../../hooks/useGeolocation";
import Button from "../Button/Button";
import { useURLPosition } from "../../hooks/useURLPosition";

function Map() {
  const [mapPosition, setMapPosition] = useState<LatLngExpression>([
    51.0772193, 13.7082522,
  ]);
  const { cities } = useCities();
  const {
    position: geoPosition,
    getPosition: getGeoLocation,
    isLoading: isLoadingPosition,
  } = useGeolocation();

  const { lat, lng } = useURLPosition();

  useEffect(() => {
    if (lat && lng) setMapPosition([lat, lng]);
  }, [lat, lng]);

  useEffect(() => {
    if (geoPosition) setMapPosition(geoPosition);
  }, [geoPosition]);

  return (
    <div className={styles.mapContainer}>
      {!geoPosition && (
        <Button type="position" action={getGeoLocation}>
          {isLoadingPosition ? "Loading..." : "Get your Location"}
        </Button>
      )}
      <MapContainer
        center={mapPosition}
        zoom={13}
        scrollWheelZoom={true}
        className={styles.map}
      >
        <ChangeCenter position={mapPosition} />
        <DetectClick />
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          // url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          url="https://{s}.tile.openstreetmap.fr/hot/{z}/{x}/{y}.png"
        />
        {cities.map((c) => {
          const position: LatLngExpression = [c.position.lat, c.position.lng];
          return (
            <Marker position={position} key={c.id}>
              <Popup>
                <span>{c.emoji}</span> <span>{c.cityName}</span>
              </Popup>
            </Marker>
          );
        })}
        {/* <Marker position={mapPosition}>
          <Popup>
            A pretty CSS3 popup. <br /> Easily customizable.
          </Popup>
        </Marker> */}
      </MapContainer>
    </div>
  );
}

function ChangeCenter({ position }: { position: LatLngExpression }) {
  const map = useMap();
  map.setView(position);

  return null;
}

function DetectClick() {
  const navigate = useNavigate();

  useMapEvent("click", (me) => {
    const { lat, lng } = me.latlng;

    navigate(`/app/form?lat=${lat}&lng=${lng}`, { replace: true });
  });

  return null;
}

export default Map;
