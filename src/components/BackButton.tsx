import {Button} from "antd";
import {LeftOutlined} from "@ant-design/icons";
import '@styles/index.sass'

interface ButtonProps {
    onClick: () => void
}

const BackButton = ({onClick}: ButtonProps) => {
    return (
        <Button
            type="text"
            icon={<LeftOutlined/>}
            className="back-button"
            onClick={onClick}
        >
            Back
        </Button>
    )
}

export default BackButton
