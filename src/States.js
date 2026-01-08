import { useEffect, useState } from "react";
import axios from "axios";
import "./States.css";

export default function States() {
  const [countries, setCountries] = useState([]);
  const [states, setStates] = useState([]);
  const [cities, setCities] = useState([]);

  const [selectedcountry, setselectedCountry] = useState("");
  const [selectedstate, setselectedState] = useState("");
  const [selectedcity, setselectedCity] = useState("");

  useEffect(() => {
    const fetchCountries = async () => {
      try {
        const res = await axios.get(
          "https://location-selector.labs.crio.do/countries"
        );
        setCountries(res.data);
      } catch (error) {
        console.error("Error fetching countries:", error);
      }
    };

    fetchCountries();
  }, []);

  useEffect(() => {
    if (selectedcountry){

    const fetchStates = async () => {
      try {
        const res = await axios.get(
          `https://location-selector.labs.crio.do/country=${selectedcountry}/states`
        );
        setStates(res.data);
        setselectedState("");
        setCities([]);
        setselectedCity("");
      } catch (error) {
        console.error("Error fetching states:", error);
      }
    };

    fetchStates();
}
  }, [selectedcountry]);

  useEffect(() => {
    if (selectedcountry && selectedstate){

    const fetchCities = async () => {
      try {
        const res = await axios.get(
          `https://location-selector.labs.crio.do/country=${selectedcountry}/state=${selectedstate}/cities`
        );
        setCities(res.data);
        setselectedCity("");
      } catch (error) {
        console.error("Error fetching cities:", error);
      }
    };

    fetchCities();
}
  }, [selectedcountry, selectedstate]);

  return (
    <div className="container">
      <h1>Select Location</h1>

      <div className="dropdowns">
        <select
          value={selectedcountry}
          onChange={(e) => setselectedCountry(e.target.value)}
        >
          <option value="">Select Country</option>
          {countries.map((c) => (
            <option key={c} value={c}>
              {c}
            </option>
          ))}
        </select>

        <select
          value={selectedstate}
          onChange={(e) => setselectedState(e.target.value)}
          disabled={!selectedcountry}
        >
          <option value="">Select State</option>
          {states.map((s) => (
            <option key={s} value={s}>
              {s}
            </option>
          ))}
        </select>

        <select
          value={selectedcity}
          onChange={(e) => setselectedCity(e.target.value)}
          disabled={!selectedstate}
        >
          <option value="">Select City</option>
          {cities.map((c) => (
            <option key={c} value={c}>
              {c}
            </option>
          ))}
        </select>
      </div>

      {selectedcity && (
        <p className="result">
          You selected {selectedcity}, {selectedstate}, {selectedcountry}
        </p>
      )}
    </div>
  );
}
