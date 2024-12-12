import {AutoComplete, Button, Typography} from "antd";
import {LoadingOutlined, SearchOutlined} from "@ant-design/icons";
import {useEffect, useState} from "react";
import usePlacesService from "react-google-autocomplete/lib/usePlacesAutocompleteService";
import {useNavigate} from "react-router";
import GoogleMapPicker from "./GoogleMapPicker.tsx";

const {Text} = Typography

const API_KEY = "AIzaSyB4vfe1nYsVoGCdnZV1AGagrmzifTk0o80";

function AddressSearch() {
    const navigate = useNavigate()
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

    useEffect(() => {
        console.log(`placeId: ${placeId}`)
    }, [placeId])

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
            <Button
                type="primary"
                block
                size="large"
                disabled={!placeId}
                onClick={() => navigate('/next-page')}
                style={{marginTop: '24px'}}
            >
                Submit
            </Button>
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

export default AddressSearch
