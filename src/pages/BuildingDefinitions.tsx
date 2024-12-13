import { Button, List, Typography } from 'antd';
import { PlusOutlined, EditOutlined } from '@ant-design/icons';
import { useNavigate } from 'react-router';
import BackButton from '@components/BackButton';
import '../styles/_buildingDefinitions.sass';
import { useUser } from 'src/contexts/UserContext';
import { CircledIcon } from '@components/CircledIcon';

const { Title, Text } = Typography;

const BuildingDefinitions = () => {
  const navigate = useNavigate();
  const { userData, removeFloor } = useUser();
  const floors = userData.floors || [];

  const handleAddFloor = () => {
    const nextFloorNumber = floors.length + 1;
    navigate(`/floor-definition?floor=${nextFloorNumber}`);
  };

  const handleEditFloor = (floorNumber: number) => {
    navigate(`/floor-definition?floor=${floorNumber}`);
  };

  const handleDeleteFloor = (floorNumber: number) => {
    removeFloor(floorNumber);
  };

  return (
    <div className="building-definitions">
      <div className='header'>
        <BackButton onClick={() => navigate(-1)} />
      </div>
      <div style={{display: 'flex', flexDirection: 'column', alignItems: 'center', textAlign: 'center'}}>
        <CircledIcon src="/assets/home.svg" />
        <Title level={2} style={{marginTop: '14px'}}>Building definitions</Title>
        <Text className="description">
          Define the floors of your building and their apartments
        </Text>
      </div>

      <List
        className="floors-list"
        dataSource={floors}
        renderItem={(floor) => (
          <List.Item
            actions={[
              <Button 
                icon={<EditOutlined />} 
                onClick={() => handleEditFloor(floor.number)}
              />,
              <Button 
                danger
                onClick={() => handleDeleteFloor(floor.number)}
              >
                Delete
              </Button>
            ]}
          >
            <List.Item.Meta
              title={`Floor ${floor.number}`}
              description={`${floor.apartments.length} apartments, ${floor.apartments.reduce((sum, apt) => sum + (apt.inhabitants || 0), 0)} inhabitants`}
            />
          </List.Item>
        )}
      />

      <Button
        type="dashed"
        block
        icon={<PlusOutlined />}
        onClick={handleAddFloor}
        className="add-floor-button"
      >
        Add Floor
      </Button>

      <Button
        type="primary"
        block
        size="large"
        onClick={() => navigate('/next-step')}
        className="submit-button"
        disabled={floors.length === 0}
      >
        Submit
      </Button>
    </div>
  );
};

export default BuildingDefinitions; 