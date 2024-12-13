import React, { createContext, useContext } from 'react';
import { useLocalStorage } from 'usehooks-ts';

interface BuildingLocation {
    placeId: string;
    address: string;
    coordinates: {
        lat: number;
        lng: number;
    };
}

interface UserData {
    email?: string;
    phone?: string;
    fullName?: string;
    accountType?: 'house_committee' | 'management_company' | 'tenant' | 'doubt';
    buildingLocation?: BuildingLocation;
}

interface UserContextType {
    isAuthenticated: boolean;
    userData: UserData;
    setAuthenticated: (value: boolean) => void;
    updateUserData: (data: Partial<UserData>) => void;
    clearUserData: () => void;
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

    return (
        <UserContext.Provider 
            value={{
                isAuthenticated,
                userData,
                setAuthenticated,
                updateUserData,
                clearUserData
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