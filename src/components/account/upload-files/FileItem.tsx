import {Typography} from "antd";
import {CloseOutlined} from "@ant-design/icons";

interface Props {
    directory: string
    filename: string
    handleRemove: (directory: string, filename: string) => void
}

function FileItem({filename, directory, handleRemove}: Readonly<Props>) {
    return (
        <div style={{display: "flex", justifyContent: "space-between"}}>
            <Typography.Text>{filename}</Typography.Text>
            <CloseOutlined style={{cursor: "pointer", color: "red"}}
                           onClick={() => handleRemove(directory, filename)}/>
        </div>
    );
}


export default FileItem
