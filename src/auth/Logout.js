import {useNavigate} from "react-router";
import {useDispatch} from "react-redux";

const Logout = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    dispatch({type: "LOGOUT"})
    navigate("/");
}

export default Logout;