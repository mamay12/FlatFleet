import {AutoComplete, Typography} from "antd";
import {LoadingOutlined, SearchOutlined} from "@ant-design/icons";
import {Dispatch, SetStateAction, useEffect, useState} from "react";
import usePlacesService from "react-google-autocomplete/lib/usePlacesAutocompleteService";
import GoogleMapPicker from "./GoogleMapPicker.tsx";
import "@styles/_google-address-search.sass"

const {Text} = Typography

const API_KEY = "AIzaSyB4vfe1nYsVoGCdnZV1AGagrmzifTk0o80";


interface SearchProps {
    setAddress: Dispatch<SetStateAction<string | undefined>>
}

function GoogleAddressSearch({setAddress}: Readonly<SearchProps>) {
    const [placeId, setPlaceId] = useState<string | null>(null);
    const [touched, setTouched] = useState(false);
    const [selectedPlace, setSelectedPlace] = useState<string>("");
    const [mapOpen, setMapOpen] = useState(false)
    const {
        placePredictions,
        getPlacePredictions,
        isPlacePredictionsLoading,
    } = usePlacesService({
        apiKey: API_KEY,
    });

    const handleSearch = (input: string) => {
        setPlaceId(null)
        getPlacePredictions({input})
    }

    const options = placePredictions.map((item) => ({
        value: item.place_id,
        label: item.description
    }));

    const handleSelect = (value: string, option: any) => {
        setPlaceId(value)
        setSelectedPlace(option.label);
    };

    useEffect(() => {
        setAddress(selectedPlace)
    }, [selectedPlace, setAddress]);

    return (
        <div className="content">
            <div className="search-section">
                <div className="search-container">
                    <AutoComplete
                        placeholder="Search address"
                        onBlur={() => {
                            setTouched(true)
                        }}
                        size="large"
                        prefix={
                            isPlacePredictionsLoading
                                ? <LoadingOutlined/>
                                : <SearchOutlined/>
                        }
                        options={options}
                        onSearch={handleSearch}
                        onSelect={handleSelect}
                        onChange={e => setSelectedPlace(e)}
                        value={selectedPlace}
                        style={{width: '100%'}}
                    >
                    </AutoComplete>
                </div>
            </div>

            {
                !options.length && !placeId && touched
                    ? (
                        <div>
                            <div className="error-message">
                                <Text>Address not found, please try again</Text>
                            </div>
                            <button className="select-map-button"
                                    onClick={() => setMapOpen(true)}>
                                Select on the map
                            </button>
                        </div>
                    )
                    : null
            }
            <GoogleMapPicker onClose={() => setMapOpen(false)} open={mapOpen} apiKey={API_KEY}
                             onPlaceSelect={setSelectedPlace} setPlaceId={setPlaceId}/>
        </div>
    )
}

export default GoogleAddressSearch
