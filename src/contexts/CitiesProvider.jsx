import { createContext, useContext, useEffect, useState } from "react"

const CitiesContext = createContext();
const BASE_URL = "http://localhost:3000";

function CitiesProvider({ children }) {
    const [cities, setCities] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [currentCity, setCurrentCity] = useState({});

    useEffect(() => {
        async function fetchCities() {
            try {
                setIsLoading(true);
                const res = await fetch(`${BASE_URL}/cities`);
                const data = await res.json();
                setCities(data);
            } catch {
                alert("Failed to fetch cities or check if server is running or not")
            } finally {
                setIsLoading(false);
            }

        }
        fetchCities();
    }, [])


    const getCity = async (id) => {
        try {
            setIsLoading(true);
            const res = await fetch(`${BASE_URL}/cities/${id}`);
            const data = await res.json();
            setCurrentCity(data);
        } catch {
            alert("Failed to fetch cities ")
        } finally {
            setIsLoading(false);
        }

    }

    const createCities = async (newCityData) => {
        try {
            setIsLoading(true);
            const res = await fetch(`${BASE_URL}/cities`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    // Add any additional headers as needed
                },
                body: JSON.stringify(newCityData)
            })
            const data = await res.json();
            setCities((cities) => [...cities, data]);
        } catch {
            alert("There is an error creating the city")
        } finally {
            setIsLoading(false);
        }
    }

    const deleteCities = async (id) => {
        console.log(id);
        try {
            setIsLoading(true);
            await fetch(`${BASE_URL}/cities/${id}`, {
                method: 'DELETE',
            })
            setCities((cities) => cities.filter(city => city.id !== id));
        } catch {
            alert("There is an error deleting the city")
        } finally {
            setIsLoading(false);
        }
    }

    return (
        <CitiesContext.Provider value={{ cities, isLoading, currentCity, getCity, createCities, deleteCities }}>
            {children}
        </CitiesContext.Provider>
    )
}

export function useCities() {
    const citiesdata = useContext(CitiesContext);
    if (citiesdata === undefined) {
        throw new Error('CitiesContext was used outside of the CitiesProvider')
    }
    return citiesdata;
}

export default CitiesProvider;
