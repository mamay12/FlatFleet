import {Button, Typography} from 'antd';
import {useNavigate} from 'react-router';
import '../styles/_buildingLocation.sass';
import {CircledIcon} from '../components/CircledIcon';
import AddressSearch from "../components/AddressSearch.tsx";
import BackButton from "@components/BackButton.tsx";
import {useState} from "react";

const {Text, Title} = Typography;

const BuildingLocation: React.FC = () => {
    const navigate = useNavigate();
    const [address, setAddress] = useState<string>();

    return (
        <div className="building-location">
            <div className="header">
                <BackButton onClick={() => navigate(-1)}/>
            </div>
            <div className='location-collapsable'>
                <CircledIcon src="assets/home-pin.svg"/>
                <Title style={{marginTop: 24}} level={2}>Building location</Title>
                <Text className="description">Fill in the fields to continue registration</Text>
            </div>
            <AddressSearch setAddress={setAddress}/>
            <Button
                type="primary"
                block
                size="large"
                disabled={!address}
                onClick={() => navigate('/next-page')}
                style={{marginTop: '24px'}}
            >
                Submit
            </Button>
        </div>
    );
};

export default BuildingLocation;
