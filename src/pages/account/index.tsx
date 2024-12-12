import SignInLoading from "../../components/SignInLoading.tsx";
import {Button} from "antd";
import {useNavigate} from "react-router";

function ChooseAccountTypePage() {
    const navigate = useNavigate()
    return (
        <SignInLoading>
            <Button onClick={() => navigate('/account/management-company')}></Button>
        </SignInLoading>
    )
}

export default ChooseAccountTypePage
