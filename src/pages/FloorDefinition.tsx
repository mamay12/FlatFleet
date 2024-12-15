import { useState, useEffect } from 'react';
import { Button, InputNumber, Typography, Select } from 'antd';
import { CloseCircleOutlined } from '@ant-design/icons';
import { useNavigate, useLocation } from 'react-router';
import BackButton from '@components/BackButton';
import '../styles/_floorDefinition.sass';
import { useUser } from 'src/contexts/UserContext';

const { Title, Text } = Typography;

interface Apartment {
  id: string;
  number: number | null;
  inhabitants: number | null;
}

interface Floor {
  number: number;
  apartments: {
    id: string;
    number: number | null;
    inhabitants: number | null;
  }[];
}

const FloorDefinition = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { userData, addFloor, updateFloor } = useUser();
  
  // Get floor from query parameter
  const queryParams = new URLSearchParams(location.search);
  const initialFloor = Number(queryParams.get('floor')) || null;
  
  const [selectedFloor, setSelectedFloor] = useState<number | null>(initialFloor);
  const [apartments, setApartments] = useState<Apartment[]>([]);

  // Add useEffect to handle initial floor data
  useEffect(() => {
    if (initialFloor) {
      const existingFloor = userData.floors?.find(f => f.number === initialFloor);
      if (existingFloor) {
        setApartments(existingFloor.apartments);
      }
    }
  }, [initialFloor, userData.floors]);

  const handleFloorChange = (value: number) => {
    setSelectedFloor(value);
    const existingFloor = userData.floors?.find(f => f.number === value);
    setApartments(existingFloor?.apartments || []);
  };

  const handleAddApartment = () => {
    const newApartment = {
      id: Date.now().toString(),
      number: null,
      inhabitants: null
    };
    setApartments([...apartments, newApartment]);
  };

  const handleRemoveApartment = (id: string) => {
    setApartments(apartments.filter(apt => apt.id !== id));
  };

  const handleApartmentChange = (id: string, field: keyof Apartment, value: number | null) => {
    setApartments(apartments.map(apt => 
      apt.id === id ? { ...apt, [field]: value } : apt
    ));
  };

  const handleReset = () => {
    setApartments([]);
  };

  const handleSubmit = () => {
    if (!selectedFloor) return;

    const floorData: Floor = {
      number: selectedFloor,
      apartments
    };

    if (userData.floors?.some(f => f.number === selectedFloor)) {
      updateFloor(selectedFloor, floorData);
    } else {
      addFloor(floorData);
    }
    
    navigate('/building-definitions');
  };

  const floorOptions = Array.from({ length: 50 }, (_, i) => ({
    value: i + 1,
    label: `Floor ${i + 1}`
  }));

  return (
    <div className="floor-definition">
      <div className='header'>
        <BackButton onClick={() => navigate(-1)} />
      </div>
      <div style={{display: 'flex', flexDirection: 'column', alignItems: 'center', textAlign: 'center'}}>
        <Title level={2}>Floor definition</Title>
        <Text className="description">
          Please select a floor and provide information about its apartments
        </Text>
        
        <Select
          placeholder="Select floor"
          style={{ width: '100%', marginTop: '16px' }}
          onChange={handleFloorChange}
          value={selectedFloor}
          options={floorOptions}
        />
      </div>

      {apartments.map((apartment) => (
        <div key={apartment.id} className="apartment-row">
          <InputNumber
            placeholder="Apartment"
            value={apartment.number}
            onChange={(value) => handleApartmentChange(apartment.id, 'number', value)}
            className="apartment-input"
            min={1}
            max={999}
          />
          <InputNumber
            placeholder="Inhabitants"
            value={apartment.inhabitants}
            onChange={(value) => handleApartmentChange(apartment.id, 'inhabitants', value)}
            className="inhabitants-input"
            min={0}
            max={99}
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

      <Button
        type="primary"
        block
        size="large"
        onClick={handleSubmit}
        disabled={!selectedFloor || apartments.length === 0}
        className="submit-button"
      >
        Submit
      </Button>
    </div>
  );
};

export default FloorDefinition; 