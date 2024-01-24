import { useEffect, useState } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom"
import Product from "./pages/Product";
import HomePage from "./pages/HomePage";
import Pricing from "./pages/Pricing";
import PageNotFound from "./pages/PageNotFound";
import AppLayout from "./pages/AppLayout";
import Login from "./pages/Login";
import CityList from "./components/CityList";
import CountryList from "./components/countryList";

const BASE_URL = "http://localhost:3000";
function App() {
  const [cities, setCities] = useState({});
  const [isLoading, setIsLoading] = useState({});

  useEffect(() => {
    async function fetchCities() {
      try {
        const res = await fetch(`${BASE_URL}/cities`);
        const data = await res.json();
        setCities(data);
      } catch (err) {
        alert("Failed to fetch cities")
      } finally {
        setIsLoading(false);
      }


    }
    fetchCities();
  }, [])

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/pricing" element={<Pricing />} />
        <Route path="/product" element={<Product />} />
        <Route path="/login" element={<Login />} />
        <Route path="/app" element={<AppLayout />}>
          <Route index element={<p>indexxx</p>} />
          <Route path="cities" element={<CityList cities={cities} isLoading={isLoading} />} />
          {/* <Route path="cities" element={<CityList ctites={cities} isLoading={isLoading} />} /> */}
          <Route path="countries" element={<CountryList cities={cities} isLoading={isLoading} />} />
          <Route path="form" element={<p>Form</p>} />
        </Route>
        <Route path="*" element={<PageNotFound />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
