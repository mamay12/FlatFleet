import {AutoComplete, Button, Typography} from 'antd';
import {LeftOutlined, LoadingOutlined, SearchOutlined} from '@ant-design/icons';
import {useNavigate} from 'react-router';
import '../styles/_buildingLocation.sass';
import usePlacesService from "react-google-autocomplete/lib/usePlacesAutocompleteService";
import {CircledIcon} from '../components/CircledIcon';
import {useEffect, useState} from 'react';

const API_KEY = "AIzaSyB4vfe1nYsVoGCdnZV1AGagrmzifTk0o80";

const { Text, Title } = Typography;

const BuildingLocation: React.FC = () => {
    const navigate = useNavigate();
    const [placeId, setPlaceId] = useState<string | null>(null);
    const [touched, setTouched] = useState(false);
    const [selectedPlace, setSelectedPlace] = useState<string>("");
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
        getPlacePredictions({ input })
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
        <div className="building-location">
            <div className="header">
                <button className="back-button" onClick={() => navigate(-1)}>
                    <LeftOutlined /> Back
                </button>
            </div>
            <div className='location-collapsable'>
                <CircledIcon src="/assets/home-pin.svg" />
                <Title style={{marginTop: 24}} level={2}>Building location</Title>
                <Text className="description">Fill in the fields to continue registration</Text>
            </div>
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
                                    ? <LoadingOutlined />
                                    : <SearchOutlined />
                            }
                            options={options}
                            onSearch={handleSearch}
                            onSelect={handleSelect}
                            onChange={e => setSelectedPlace(e)}
                            value={selectedPlace}
                            style={{ width: '100%' }}
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
                    style={{ marginTop: '24px' }}
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
                                <button className="select-map-button">
                                    Select on the map
                                </button>
                            </div>
                        )
                        : null
                }
            </div>
        </div>
    );
};

export default BuildingLocation;
