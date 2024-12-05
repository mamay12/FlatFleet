import {Button, Typography} from "antd";
import "../styles/_start-screen.sass"
import {useNavigate} from "react-router";

const {Title, Text} = Typography;

const StartScreenPage = () => {

    const navigate = useNavigate()

    const handleGetStartedClick = () => navigate("/onboarding")

    const handleSignInClick = () => navigate('/login')

    return (
        <div className="start-screen-container">
            <div className="start-screen-backgroundImage">
                <img
                    src="../../public/assets/start-screen-picture.png"
                    alt="Background"
                />
            </div>
            <div className="start-screen-logo-container">
                <div className="start-screen-logo">
                    <img
                        src="../../public/assets/flat-fleet-logo.svg"
                        alt="Logo"
                    />
                </div>
            </div>
            <div className="start-screen-text-section">
                <Title level={2}>FlatFleet</Title>
                <Text type="secondary">
                    Lorem ipsum dolor sit amet consectetur. Mi enim dignissim vitae quam
                    quis fringilla sodales. Sed vel pellentesque nec proin.
                </Text>
            </div>

            <div className="start-screen-button-section">
                <Button
                    type="primary"
                    block
                    size="large"
                    className="start-screen-primary-button"
                    onClick={handleGetStartedClick}
                >
                    Get started
                </Button>
                <Button
                    type="default"
                    block
                    size="large"
                    onClick={handleSignInClick}
                >
                    Sign in
                </Button>
            </div>
        </div>
    );
};

export default StartScreenPage
