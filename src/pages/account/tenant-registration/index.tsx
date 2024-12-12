import {Button, Form, Input, Modal, Typography} from "antd";
import BackButton from "../../../components/BackButton.tsx";
import {useNavigate} from "react-router";
import '../../../styles/account/tenant-registration/_tenant-of-house.sass'
import {useState} from "react";
import QRCodeScanner from "./QRCodeScanner.tsx";

function TenantOfHouseRegistration() {
    const onFinish = (values: any) => {
        console.log("Form values:", values);
    };

    const [qrOpen, setQrOpen] = useState(false);

    const navigate = useNavigate()

    const handleBackClick = () => navigate(-1)

    return (
        <div className="page">

            <BackButton onClick={handleBackClick}/>

            <div className="icon">
                TODO: ICON
            </div>

            <Typography.Title level={3} className='typography-title'>
                Tenant registration
            </Typography.Title>
            <Typography.Text type="secondary" className='typography-text'>
                Fill in the fields to continue registration
            </Typography.Text>

            <Form layout="vertical" onFinish={onFinish}>
                <Form.Item
                    name="location"
                >
                    <div>TBD: maps api select</div>
                </Form.Item>

                <Form.Item
                    name="apartmentNumber"
                    rules={[{required: true, message: "Please input your apartment number!"}]}
                >
                    <Input placeholder="Apartment number"/>
                </Form.Item>

                <Form.Item>
                    <Button type="primary" htmlType="submit" block>
                        Submit
                    </Button>
                </Form.Item>
            </Form>

            <div className="footer">
                <Typography.Text type="secondary">
                    Is your apartment already in the system?
                </Typography.Text>
                <br/>
                <Typography.Link onClick={() => setQrOpen(true)}>Registration via QR code</Typography.Link>
            </div>
            {qrOpen ? <Modal onCancel={() => setQrOpen(false)} open={qrOpen} onOk={() => setQrOpen(false)}>
                <QRCodeScanner/>
            </Modal> : null}
        </div>
    );
}

export default TenantOfHouseRegistration
