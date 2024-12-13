import {Scanner} from "@yudiel/react-qr-scanner";
import {Typography} from "antd";

function QRCodeScanner() {
    const handleScan = (data: any) => {
        if (data) {
            console.log("QR Code Data:", data);
        }
    };

    const handleError = (err: any) => {
        console.error("QR Code Scan Error:", err);
    };

    return (
        <div style={{width: "400px", height: "400px"}}>

            {/*<div style={{position: "absolute", top: 20, right: 20}}>*/}
            {/*    <Button type="link" icon={<CloseOutlined/>} style={{padding: 0}} onClick={handleClose}/>*/}
            {/*</div>*/}

            <div style={{
                position: "absolute",
                top: "50%",
                left: "50%",
                transform: "translate(-50%, -50%)",
                textAlign: "center",
            }}>
                <Scanner
                    onError={handleError}
                    onScan={handleScan}
                />
                <div style={{
                    marginTop: "100px"
                }}>
                    <Typography.Text type="secondary">Let’s Scan a QR code</Typography.Text>
                </div>
            </div>
        </div>
    );
}

export default QRCodeScanner;
