import {List, Space, Typography} from "antd";
import DirectoryLogo from "./DirectoryLogo.tsx";
import {UploadFileStructure} from "./types.ts";
import FileItem from "./FileItem.tsx";

interface Props {
    files: UploadFileStructure
    handleRemove: (directory: string, filename: string) => void
}

function UploadFilesList({files, handleRemove}: Readonly<Props>) {


    return (
        <div style={{marginTop: 20}}>
            {Object.entries(files).map(([directory, files]) => (
                <div key={directory}>
                    <Space style={{display: "flex", alignItems: "center", marginBottom: 10}}>
                        <DirectoryLogo/>
                        <Typography.Title level={5} style={{margin: 0}}>
                            {directory}
                        </Typography.Title>
                    </Space>
                    <List
                        itemLayout="vertical"
                        dataSource={files}
                        renderItem={(file) => (
                            <List.Item style={{
                                paddingLeft: '16px'
                            }}>
                                <FileItem directory={directory} filename={file.name} handleRemove={handleRemove}/>
                            </List.Item>
                        )}
                    />
                </div>
            ))}
        </div>
    )
}

export default UploadFilesList
