import {useState} from 'react';
import {Button, Select, Typography} from 'antd';
import {SearchOutlined} from '@ant-design/icons';
import {useNavigate} from 'react-router';
import '@styles/account/_accountTypeSelector.sass';
import BackButton from "@components/BackButton.tsx";
import {CircledIcon} from '@components/CircledIcon';
import SignInLoading from "@components/login/SignInLoading.tsx";

const {Title, Text} = Typography;

const accountTypes = [
    {value: 'house_committee', label: 'House committee', url: "/house-committee"},
    {value: 'management_company', label: 'Management company', url: "/management-company"},
    {value: 'tenant', label: 'The tenant of the house', url: "/tenant-of-house"},
    {value: 'doubt', label: 'Doubt', url: "/doubt"},
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
        <SignInLoading>
            <div className="account-type-selector">
                <div className="header">
                    <BackButton onClick={() => navigate(-1)}/>
                </div>

                <div className="content">
                    <CircledIcon src="/assets/account.svg"/>

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
                        prefix={<SearchOutlined/>}
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
        </SignInLoading>
    );
};

export default AccountTypeSelector; 
