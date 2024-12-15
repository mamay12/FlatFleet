import {Button, Typography} from 'antd';
import {useNavigate} from 'react-router';
import '@styles/account/house-committee/_house-committee.sass';
import {CircledIcon} from '@components/CircledIcon.tsx';
import GoogleAddressSearch from "@components/GoogleAddressSearch.tsx";
import BackButton from "@components/BackButton.tsx";
import {useState} from "react";
import {useUser} from "../../../contexts/UserContext.tsx";

const {Text, Title} = Typography;

const HouseCommittee: React.FC = () => {
    const navigate = useNavigate();
    const [address, setAddress] = useState<string>();
    const {updateHouseCommittee} = useUser()

    const handleSubmit = () => {
        updateHouseCommittee(address)
        navigate('/building-definitions')
    }

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
            <GoogleAddressSearch setAddress={setAddress}/>
            <Button
                type="primary"
                block
                size="large"
                disabled={!address}
                onClick={handleSubmit}
                style={{marginTop: '24px'}}
            >
                Submit
            </Button>
        </div>
    );
};

export default HouseCommittee;
