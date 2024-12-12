import BackButton from "../../../components/BackButton.tsx";
import {useNavigate} from "react-router";
import "../../../styles/account/house-committee/_house-committee.sass"

function HouseCommittee() {
    const navigate = useNavigate()
    const handleBack = () => navigate(-1)

    return (
        <div className="page">
            <BackButton onClick={handleBack}/>


        </div>
    )
}

export default HouseCommittee
