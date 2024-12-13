import { useState } from 'react';
import { Button, Input, Select, Typography } from 'antd';
import { CloseCircleOutlined } from '@ant-design/icons';
import { useNavigate } from 'react-router';
import BackButton from '@components/BackButton';
import '../styles/_buildingDefinitions.sass';

const { Title, Text } = Typography;

interface Apartment {
  id: string;
  number: string;
  inhabitants: string;
}

const BuildingDefinitions = () => {
  const navigate = useNavigate();
  const [selectedFloor, setSelectedFloor] = useState<string>('First floor');
  const [apartments, setApartments] = useState<Apartment[]>([]);

  const handleAddApartment = () => {
    const newApartment = {
      id: Date.now().toString(),
      number: '',
      inhabitants: ''
    };
    setApartments([...apartments, newApartment]);
  };

  const handleRemoveApartment = (id: string) => {
    setApartments(apartments.filter(apt => apt.id !== id));
  };

  const handleApartmentChange = (id: string, field: keyof Apartment, value: string) => {
    setApartments(apartments.map(apt => 
      apt.id === id ? { ...apt, [field]: value } : apt
    ));
  };

  const handleReset = () => {
    setApartments([]);
  };

  const handleSubmit = () => {
    // Handle submission logic here
    console.log({ floor: selectedFloor, apartments });
    navigate('/next-step');
  };

  return (
    <div className="building-definitions">
        <div className='header'>
            <BackButton onClick={() => navigate(-1)} />
        </div>
        <div style={{display: 'flex', flexDirection: 'column', alignItems: 'center', textAlign: 'center'}}>
            <Title level={2}>Building definitions</Title>
            <Text className="description">
                Please provide information about the apartments and residents on each floor
        </Text>
    </div>

      <Select
        value={selectedFloor}
        onChange={setSelectedFloor}
        className="floor-select"
        size="large"
        options={[
          { value: 'First floor', label: 'First floor' },
          { value: 'Second floor', label: 'Second floor' },
          { value: 'Third floor', label: 'Third floor' },
        ]}
      />

      {apartments.map((apartment) => (
        <div key={apartment.id} className="apartment-row">
          <Input
            placeholder="Apartment"
            value={apartment.number}
            onChange={(e) => handleApartmentChange(apartment.id, 'number', e.target.value)}
            className="apartment-input"
          />
          <Input
            placeholder="Inhabitants"
            value={apartment.inhabitants}
            onChange={(e) => handleApartmentChange(apartment.id, 'inhabitants', e.target.value)}
            className="inhabitants-input"
          />
          <CloseCircleOutlined 
            onClick={() => handleRemoveApartment(apartment.id)}
            className="remove-button"
          />
        </div>
      ))}

      <div className="actions-row">
        <Button 
          type="link" 
          onClick={handleAddApartment}
          icon={<span className="plus-icon">+</span>}
        >
          Add apartment
        </Button>
        <Button type="link" onClick={handleReset}>Reset</Button>
      </div>

      <Text className="note">
        Remember, the order of the added apartments will be preserved in the final plan of the house
      </Text>

      <Button
        type="primary"
        block
        size="large"
        onClick={handleSubmit}
        className="submit-button"
      >
        Submit
      </Button>
    </div>
  );
};

export default BuildingDefinitions; 