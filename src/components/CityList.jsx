import Spinner from "./Spinner"
import CityItem from "./CityItem";
import Message from "./Message";

import styles from './CityList.module.css'

function CityList({ cities, isLoading }) {
    if (isLoading) return <Spinner />
    if (!cities.length) return <Message message="Add your city first by clicking on a city on the map" />

    return (
        <ul className={styles.cityList}>
            {cities.map((city, i) => {
                return <CityItem city={city} key={city.id} />
            })}
        </ul>
    )
}

export default CityList;
