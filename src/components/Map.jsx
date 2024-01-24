import { useSearchParams, useNavigate } from 'react-router-dom';
import styles from './Map.module.css'

function Map() {
    const navigate = useNavigate();
    const [searchParams, setSearchParams] = useSearchParams();
    const lat = searchParams.get("lat");
    const lng = searchParams.get("lng");
    return (
        <div className={styles.mapContainer} onClick={() => navigate("form")}>
            lat: {lat}
            <div>
                lng: {lng}
                <button onClick={() => setSearchParams({ lat: 23, lng: 555 })}>Change pos</button>
            </div>
        </div>
    )
}

export default Map
