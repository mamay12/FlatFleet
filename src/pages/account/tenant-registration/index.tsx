import {Button, Form, InputNumber, Modal, Typography} from "antd";
import BackButton from "@components/BackButton.tsx";
import {useNavigate} from "react-router";
import '@styles/account/tenant-registration/_tenant-of-house.sass'
import {useState} from "react";
import QRCodeScanner from "./QRCodeScanner.tsx";
import AccountIcon from "@assets/account.svg";
import GoogleAddressSearch from "@components/GoogleAddressSearch.tsx";
import StatusCheck from "./StatusCheck.tsx";
import {useUser} from "../../../contexts/UserContext.tsx";

function TenantOfHouseRegistration() {
    const [address, setAddress] = useState<string>();
    const [apartmentNumber, setApartmentNumber] = useState<number>();
    const [statusCheckOpen, setStatusCheckOpen] = useState<boolean>(false);
    const {updateTenant, updateUserData} = useUser()
    const [qrOpen, setQrOpen] = useState(false);

    const navigate = useNavigate()

    const handleBackClick = () => navigate(-1)

    const handleSubmit = () => {
        setStatusCheckOpen(true)
        updateTenant({apartmentNo: apartmentNumber})
        updateUserData({buildingLocation: address})
    }

    return statusCheckOpen ?
        <StatusCheck handleBackClick={() => setStatusCheckOpen(false)}/> : (
            <div className="page">
                <div>
                    <BackButton onClick={handleBackClick}/>

                    <div className="avatar">
                        <div className="avatar-circle">
                            <img src={AccountIcon} alt="Account"/>
                        </div>
                    </div>

                    <Typography.Title level={3} className='typography-title'>
                        Tenant registration
                    </Typography.Title>
                    <Typography.Text type="secondary" className='typography-text'>
                        Fill in the fields to continue registration
                    </Typography.Text>

                    <Form layout="vertical">
                        <Form.Item
                            name="location"
                        >
                            <GoogleAddressSearch setAddress={setAddress}/>
                        </Form.Item>

                        <Form.Item
                            name="apartmentNumber"
                            rules={[{required: true, message: "Please input your apartment number!"}]}
                        >
                            <InputNumber style={{
                                width: "100%"
                            }} size='large' placeholder="Apartment number"
                                         onChange={(e) => setApartmentNumber(e as number)}/>
                        </Form.Item>

                        <Form.Item>
                            <Button
                                type="primary"
                                block
                                size="large"
                                disabled={!address || !apartmentNumber}
                                onClick={handleSubmit}
                                style={{marginTop: '24px'}}
                                htmlType="submit"
                            >
                                Submit
                            </Button>
                        </Form.Item>
                    </Form>
                </div>
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
