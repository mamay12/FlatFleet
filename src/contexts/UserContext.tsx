import React, {createContext, useContext} from 'react';
import {useLocalStorage} from 'usehooks-ts';

interface BuildingLocation {
    placeId: string;
    address: string;
    coordinates: {
        lat: number;
        lng: number;
    };
}

interface Floor {
    number: number;
    apartments: {
        id: string;
        number: number | null;
        inhabitants: number | null;
    }[];
}

interface UserData {
    email?: string;
    phone?: string;
    fullName?: string;
    accountType?: 'house_committee' | 'management_company' | 'tenant' | 'doubt';
    buildingLocation?: BuildingLocation;
    floors?: Floor[];
}

interface UserContextType {
    isAuthenticated: boolean;
    userData: UserData;
    setAuthenticated: (value: boolean) => void;
    updateUserData: (data: Partial<UserData>) => void;
    clearUserData: () => void;
    addFloor: (floor: Floor) => void;
    updateFloor: (floorNumber: number, floorData: Floor) => void;
    removeFloor: (floorNumber: number) => void;
}

const UserContext = createContext<UserContextType | undefined>(undefined);

export const UserProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const [isAuthenticated, setIsAuthenticated] = useLocalStorage('isAuthenticated', false);
    const [userData, setUserData] = useLocalStorage<UserData>('userData', {});


    const setAuthenticated = (value: boolean) => {
        setIsAuthenticated(value);
        if (!value) {
            clearUserData();
        }
    };

    const updateUserData = (data: Partial<UserData>) => {
        setUserData(prevData => ({
            ...prevData,
            ...data
        }));
    };

    const clearUserData = () => {
        setUserData({});
    };

    const addFloor = (floor: Floor) => {
        setUserData(prevData => ({
            ...prevData,
            floors: [...(prevData.floors || []), floor]
        }));
    };

    const updateFloor = (floorNumber: number, floorData: Floor) => {
        setUserData(prevData => ({
            ...prevData,
            floors: (prevData.floors || []).map(floor => 
                floor.number === floorNumber ? floorData : floor
            )
        }));
    };

    const removeFloor = (floorNumber: number) => {
        setUserData(prevData => ({
            ...prevData,
            floors: (prevData.floors || []).filter(floor => floor.number !== floorNumber)
        }));
    };

    return (
        <UserContext.Provider 
            value={{
                isAuthenticated,
                userData,
                setAuthenticated,
                updateUserData,
                clearUserData,
                addFloor,
                updateFloor,
                removeFloor
            }}
        >
            {children}
        </UserContext.Provider>
    );
};

export const useUser = () => {
    const context = useContext(UserContext);
    if (context === undefined) {
        throw new Error('useUser must be used within a UserProvider');
    }
    return context;
}; 
