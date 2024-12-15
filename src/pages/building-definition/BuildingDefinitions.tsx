import {Button, Typography} from 'antd';
import {DeleteOutlined, EditOutlined} from '@ant-design/icons';
import {useNavigate} from 'react-router';
import BackButton from '@components/BackButton.tsx';
import '@styles/building-definitions/_buildingDefinitions.sass';
import {useUser} from '../../contexts/UserContext.tsx';
import {CircledIcon} from '@components/CircledIcon.tsx';

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
        <Title level={2}>Building definitions</Title>
        <Text className="description">
          Create the floors of your building and fill them with apartments
        </Text>
      </div>

      <div className="my-building">
        <Title level={3} style={{textAlign: "center"}}>My building</Title>
        <div className="legend">
          <div className="legend-item">
            <div className="blue-box"></div>
            <Text>Apartment number</Text>
          </div>
          <div className="legend-item">
            <div className="purple-box"></div>
            <Text>Number of residents</Text>
          </div>
        </div>

        {floors.map((floor) => (
          <div key={floor.number} className="floor-section">
            <div className="floor-header">
              <Text strong style={{flexGrow: 1}}>{`${floor.number}${getOrdinalSuffix(floor.number)} Floor`}</Text>
              <Button 
                type="text"
                icon={<EditOutlined />}
                onClick={() => handleEditFloor(floor.number)}
              />
              <Button 
                type="text"
                icon={<DeleteOutlined />}
                onClick={() => handleDeleteFloor(floor.number)}
              />
            </div>
            <div className="apartments-grid">
              {floor.apartments.map((apt) => (
                <div key={apt.id} className="apartment-cell">
                  <div className="apartment-number">{apt.number}</div>
                  <div className="inhabitants-number">{apt.inhabitants}</div>
                </div>
              ))}
            </div>
          </div>
        ))}
        <div className='add-floor-wrapper'>
          <Button
            type="primary"
            shape="circle"
            size="large"
            onClick={handleAddFloor}
            className="add-floor-button"
            icon={<span className="plus-icon">+</span>}
          />
        </div>
      </div>
      <Button
        type="primary"
        block
        size="large"
        onClick={() => navigate('/final-status-check')}
        className="submit-button"
        disabled={floors.length === 0}
      >
        Submit
      </Button>
    </div>
  );
};

const getOrdinalSuffix = (num: number): string => {
  const j = num % 10;
  const k = num % 100;
  if (j === 1 && k !== 11) return 'st';
  if (j === 2 && k !== 12) return 'nd';
  if (j === 3 && k !== 13) return 'rd';
  return 'th';
};

export default BuildingDefinitions; 
