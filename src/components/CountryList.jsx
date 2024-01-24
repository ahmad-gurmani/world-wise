import CountryItem from "./CountryItem";
import Message from "./Message";
import Spinner from "./Spinner"
import styles from './CountryList.module.css'

function CountryList({ isLoading, cities }) {
    if (isLoading) return <Spinner />
    if (!cities.length) return <Message message="Add your city first by clicking on a city on the map" />

    // 1st way
    const countries = cities.reduce((arr, city) => {
        if (!arr.map(el => el.country).includes(city.country))
            return [...arr, { country: city.country, emoji: city.emoji }];
        else return arr;
    }, [])

    // way 2nd

    // const countries = [];
    // const uniqueCountries = [];

    // cities.forEach(city => {
    //     if (!uniqueCountries.includes(city.country)) {
    //         uniqueCountries.push(city.country);
    //         countries.push({ country: city.country, emoji: city.emoji });
    //     }
    // });

    return (
        <ul className={styles.countryList}>
            {countries.map((country, i) => {
                return <CountryItem country={country} key={country.country} />
            })}
        </ul>
    )
}

export default CountryList;
