import React, {createContext, useContext} from 'react';
import {useLocalStorage} from 'usehooks-ts';
import {UploadFileStructure} from "@components/account/upload-files/types.ts";

interface Floor {
    number: number;
    apartments: {
        id: string;
        number: number | null;
        inhabitants: number | null;
    }[];
}

interface ManagementCompanyData {
    companyName: string
}

interface TenantData{
    apartmentNo?: number;
}

interface DoubtData{
    profession?: string
}

interface ElectedByVote{
    emails?: string[]
}

interface UserData {
    email?: string;
    phone?: string;
    fullName?: string;
    accountType?: 'house_committee' | 'management_company' | 'tenant' | 'doubt';
    buildingLocation?: string;
    floors?: Floor[];
    files?: UploadFileStructure
    managementCompany?: ManagementCompanyData
    tenant?: TenantData
    doubt?: DoubtData
    electedByVote?: ElectedByVote
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
    updateHouseCommittee: (address?: string) => void;
    updateFiles: (files?: UploadFileStructure) => void;
    updateManagementCompany: (managementCompany: ManagementCompanyData) => void;
    updateTenant: (tenant: TenantData) => void;
    updateDoubt: (doubt: DoubtData) => void;
    updateElectedByVote: (data: ElectedByVote) => void;
}

const UserContext = createContext<UserContextType | undefined>(undefined);

export const UserProvider: React.FC<{ children: React.ReactNode }> = ({children}) => {
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

    const updateHouseCommittee = (address?: string) => {
        setUserData((prev) => ({...prev, buildingLocation: address}))
    }

    const updateFiles = (files?: UploadFileStructure) => {
        setUserData((prev) => ({...prev, files}))
    }

    const updateManagementCompany = (managementCompanyData: ManagementCompanyData) => {
        setUserData((prevState) => ({...prevState, managementCompanyData}))
    }

    const updateTenant = (tenantData: TenantData) => {
        setUserData((prevState) => ({...prevState, tenant: tenantData}))
    }

    const updateDoubt = (doubt: DoubtData) => {
        setUserData((prevState) => ({...prevState, doubt: doubt }))
    }

    const updateElectedByVote = (data: ElectedByVote) => {
        setUserData((prevState) => ({...prevState, electedByVote:data}))
    }

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
                removeFloor,
                updateHouseCommittee,
                updateFiles,
                updateManagementCompany,
                updateTenant,
                updateDoubt,
                updateElectedByVote
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
