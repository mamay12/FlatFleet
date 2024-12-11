import { Input, Typography } from 'antd';
import { LeftOutlined, CloseCircleOutlined, EnvironmentOutlined } from '@ant-design/icons';
import { useNavigate } from 'react-router';
import '../styles/_buildingLocation.sass';
import GooglePlacesAutocomplete from '../components/PlacesAutocomplete';
import { usePlacesWidget } from 'react-google-autocomplete';

const { Text } = Typography;

const PlaceAutocomplete: React.FC<{}> = () => {
    const { ref } = usePlacesWidget({
        apiKey: "AIzaSyCkVOEKgJjK1Rcn2lgF-3pGUgt4MHwubd8",
        onPlaceSelected: (place) => console.log(place)
    })
    return (
        <input ref={ref as any} />
    )
}

const BuildingLocation: React.FC = () => {
    const navigate = useNavigate();
    
    return (
        <div className="building-location">
            <div className="header">
                <button className="back-button" onClick={() => navigate(-1)}>
                    <LeftOutlined /> Back
                </button>
            </div>

            <div className="content">
                <div className="search-section">
                    <Text className="label">Your home's location</Text>
                    <div className="search-container">
                        <Input
                            placeholder="Search address"
                            prefix={<EnvironmentOutlined />}
                            suffix={<CloseCircleOutlined />}
                            size="large"
                        />
                        <GooglePlacesAutocomplete />
                        <PlaceAutocomplete />
                    </div>
                </div>

                <div className="error-message">
                    <Text>Address not found, please try again</Text>
                </div>

                <button className="select-map-button">
                    Select on the map
                </button>
            </div>
        </div>
    );
};

export default BuildingLocation;
