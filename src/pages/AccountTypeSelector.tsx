import { useState } from 'react';
import { Button, Typography, Select } from 'antd';
import { LeftOutlined, SearchOutlined } from '@ant-design/icons';
import { useNavigate } from 'react-router';
import '../styles/_accountTypeSelector.sass';

const { Title, Text } = Typography;

const accountTypes = [
    { value: 'house_committee', label: 'House committee', url: "/onboarding" },
    { value: 'management_company', label: 'Management company', url: "/onboarding2" },
    { value: 'tenant', label: 'The tenant of the house', url: "/onboarding3" },
    { value: 'doubt', label: 'Doubt', url: "/onboarding4" },
];

const AccountTypeSelector: React.FC = () => {
    const navigate = useNavigate();
    const [selectedType, setSelectedType] = useState<string>();

    const handleSubmit = () => {
        if (selectedType) {
            const url = accountTypes.find(({value}) => value === selectedType)?.url;
            navigate(url ?? "");
        }
    };

    return (
        <div className="account-type-selector">
            <div className="header">
                <button className="back-button" onClick={() => navigate(-1)}>
                    <LeftOutlined /> Back
                </button>
            </div>

            <div className="content">
                <div className="icon-container">
                    <img src="/assets/account.svg" alt="Account" />
                </div>
                
                <Title level={2}>Select account type</Title>
                <Text className="description">
                    Select the user category you want to continue registering with
                </Text>

                <Select
                    placeholder="Select category"
                    className="category-select"
                    onChange={(value) => setSelectedType(value)}
                    options={accountTypes}
                    size="large"
                    prefix={<SearchOutlined />}
                />

                <Button
                    type="primary"
                    block
                    size="large"
                    disabled={!selectedType}
                    onClick={handleSubmit}
                >
                    Submit
                </Button>
            </div>
        </div>
    );
};

export default AccountTypeSelector; 