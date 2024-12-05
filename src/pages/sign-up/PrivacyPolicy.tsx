import {Dispatch, SetStateAction} from 'react';
import {Modal} from 'antd';

interface Props {
    open: boolean
    setOpen: Dispatch<SetStateAction<boolean>>
}

const PrivacyPolicyModal = ({open, setOpen}: Props) => {

    const handleOk = () => {
        setOpen(false);
    };

    const handleCancel = () => {
        setOpen(false);
    };

    return (
        <div>

            <Modal
                title="Privacy Policy"
                open={open}
                onOk={handleOk}
                onCancel={handleCancel}
                width={600}
                footer={null}
            >
                <div>
                    <p>Lorem ipsum dolor sit amet consectetur. Malesuada vitae id tempus aliquet pharetra netus nam
                        nulla. Mattis et velit tincidunt proin nunc. Amet volutpat viverra diam ullamcorper mauris leo.
                        Luctus faucibus viverra sit vitae elementum cras rhoncus scelerisque nisl.</p>
                    <br/>
                    <p>Fames pulvinar viverra nisi at at augue mi cras. Sodales pharetra tortor eu eu. Sagittis et
                        faucibus lacus faucibus diam aliquam. Pellentesque dignissim viverra leo enim pretium diam
                        integer ac eget.</p>
                    <br/>
                    <p>Convallis quis montes sit enim vivamus neque nulla. Ullamcorper curabitur faucibus tellus non in
                        mauris euismod tempus. Turpis pulvinar ut vitae leo sollicitudin ultrices dapibus.</p>
                    <br/>
                    <p>Lorem ipsum dolor sit amet consectetur. Malesuada vitae id tempus aliquet pharetra netus nam
                        nulla. Mattis et velit tincidunt proin nunc. Amet volutpat viverra diam ullamcorper mauris
                        leo.</p>
                    <br/>
                    <p>Luctus faucibus viverra sit vitae elementum cras rhoncus scelerisque nisl. Fames pulvinar viverra
                        nisi at at augue mi cras.</p>
                    <br/>
                    <p>Fames pulvinar viverra nisi at at augue mi cras. Sodales pharetra tortor eu eu. Sagittis et
                        faucibus lacus faucibus diam aliquam. Pellentesque dignissim viverra leo enim pretium diam
                        integer ac eget.</p>
                </div>
            </Modal>
        </div>
    );
};

export default PrivacyPolicyModal;
