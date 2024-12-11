import { useState } from "react";
import { AutoComplete } from "antd";

const API_KEY = "AIzaSyCkVOEKgJjK1Rcn2lgF-3pGUgt4MHwubd8"

const GooglePlacesAutocomplete = () => {
  const [options, setOptions] = useState([]);

  const handleSearch = async (value: any) => {
    if (!value) {
      setOptions([]);
      return;
    }

    try {
      const response = await fetch(
        `https://maps.googleapis.com/maps/api/place/autocomplete/json?input=${value}&key=${API_KEY}`
      );
      const data = await response.json();

      if (data.status === "OK") {
        const places = data.predictions.map((place: any) => ({
          value: place.description,
          label: place.description,
        }));
        setOptions(places);
      } else {
        console.error("Error fetching autocomplete data", data.status);
      }
    } catch (error) {
      console.error("Error fetching autocomplete data", error);
    }
  };

  const handleSelect = (value: any) => {
    console.log("Selected place:", value);
  };

  return (
    <AutoComplete
      options={options}
      style={{ width: 300 }}
      onSearch={handleSearch}
      onSelect={handleSelect}
      placeholder="Enter a location"
    />
  );
};

export default GooglePlacesAutocomplete;
