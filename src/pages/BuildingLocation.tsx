import {Typography} from 'antd';
import {LeftOutlined} from '@ant-design/icons';
import {useNavigate} from 'react-router';
import '../styles/_buildingLocation.sass';
import {CircledIcon} from '../components/CircledIcon';
import AddressSearch from "../components/AddressSearch.tsx";

const { Text, Title } = Typography;

const BuildingLocation: React.FC = () => {
    const navigate = useNavigate();


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
            <AddressSearch/>
        </div>
    );
};

export default BuildingLocation;
