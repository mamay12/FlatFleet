import { useEffect, useState } from 'react';
import Logo from '@components/Logo.tsx';

const Loading: React.FC = () => {
    const [dots, setDots] = useState('.');

    useEffect(() => {
        const interval = setInterval(() => {
            setDots(prev => prev.length >= 3 ? '.' : prev + '.');
        }, 500);

        return () => clearInterval(interval);
    }, []);

    return (
        <div className="full-screen">
            <Logo />
            <h1>Loading{dots}</h1>
            <p>Wait a couple of minutes</p>
        </div>
    );
};

export default Loading; 
