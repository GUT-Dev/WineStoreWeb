import "./Modals.css"
import {useSelector} from "react-redux";
import axios from "axios";
import {useEffect, useState} from "react";

const AddItemModal = ({open, setOpen, loadData, itemName, link}) => {
    const token = useSelector(state => state.jwtToken)
    const [name, setName] = useState(null);
    const [error, setError] = useState(null);

    useEffect(() => {
        setName(null);
        setError(null);
    }, [open]);

    const createLand = (event) => {
        event.preventDefault();
        axios.post(link, {name}, {headers: {Authorization: 'Bearer ' + token}})
            .then(reload)
            .catch(error => {
                debugger;
                if(error.response.status === 422) {
                    setError(itemName + " з назвою " + name + " вже існує");
                } else {
                    setError(error.data.message);
                }
            });
    }

    const reload = () => {
        loadData();
        setOpen(false);
    }

    const handleKeyPress = (event) => {
        if(event.key === 'Enter') {
            createLand(event)
        }
    }

    const errorCheck = () => {
        if(error === null) {
            return null;
        } else {
            return (
                <p className="error">{error}</p>
            )
        }
    }

    return (
        <div className={open ? "modal open" : "modal"} onClick={() => setOpen(false)}>
            <div className="add-item-modal-content box" onClick={e => e.stopPropagation()}>
                <h3 className="modal-header">{"Додати " + itemName + " до списку"}</h3>
                <div className="modal-input">
                    <label for="name">Назва:</label>
                    <input autoComplete="no" maxLength={32} type="text" id="name" value={name} onKeyPress={handleKeyPress} onChange={(event => setName(event.target.value))}/>
                </div>
                <button className="modal-button" onClick={createLand}>Підтвердити</button>
                {errorCheck()}
            </div>
        </div>
    );
}

export default AddItemModal;