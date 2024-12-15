import FlatFleetUpload from "@components/account/upload-files/FlatFleetUpload.tsx";
import {useState} from "react";
import {UploadFileStructure} from "@components/account/upload-files/types.ts";


function DocumentExists () {
    const [files, setFiles] = useState<UploadFileStructure>({})

    return <div><FlatFleetUpload files={files} setFiles={setFiles}/></div>
}

export default DocumentExists
