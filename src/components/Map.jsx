import { useNavigate, useSearchParams } from 'react-router-dom';
import { MapContainer, TileLayer, Marker, Popup, useMap, useMapEvents } from 'react-leaflet';

import styles from './Map.module.css';
import { useEffect, useState } from 'react';
import { useCities } from '../contexts/CitiesProvider';
import { useGeoLocation } from '../hooks/UseGeoLocation';
import Button from './Button';
import { useUrlPosition } from '../hooks/useUrlPosition';

function Map() {
    const { cities } = useCities();
    const [mapLat, mapLng] = useUrlPosition();
    const [mapPosition, setMapPosition] = useState([40, 0]);
    const { isLoading: isLoadingPosition, position: geolocationPosition, getPosition } = useGeoLocation();



    useEffect(
        function () {
            if (mapLat && mapLng) setMapPosition([mapLat, mapLng]);
        },
        [mapLat, mapLng]
    );

    useEffect(() => {
        if (geolocationPosition)
            setMapPosition([geolocationPosition.lat, geolocationPosition.lng])
    }, [geolocationPosition])

    return (
        <div className={styles.mapContainer}>
            {!geolocationPosition && <Button type="position" onClick={getPosition}>{isLoadingPosition ? "Loading..." : "USE YOUR POSITION"}</Button>}
            <MapContainer
                center={mapPosition}
                zoom={6}
                scrollWheelZoom={true}
                className={styles.map}
            >
                <TileLayer
                    attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                    url="https://{s}.tile.openstreetmap.fr/hot/{z}/{x}/{y}.png"
                />
                {cities.map((city) => (
                    <Marker
                        position={[city.position.lat, city.position.lng]}
                        key={city.id}
                    >
                        <Popup>
                            <span>{city.emoji}</span> <span>{city.cityName}</span>
                        </Popup>
                    </Marker>
                ))}

                <ChangeCenter position={mapPosition} />
                <DetectClick />
            </MapContainer>
        </div>
    );
}

// 2nd Component
function ChangeCenter({ position }) {
    const map = useMap();
    map.setView(position);
    return null;
}

// 3rd component
function DetectClick() {
    const navigate = useNavigate();
    useMapEvents({
        click: e => navigate(`form?lat=${e.latlng.lat}&lng=${e.latlng.lng}`)
    });
    return null;
}

export default Map;
