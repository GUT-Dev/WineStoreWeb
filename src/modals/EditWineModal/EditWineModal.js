import "./EditWineModal.css"
import plusIcon from "../../resources/icons/plus_icon.png";
import {convertAvailableStatus, convertSweetness, convertType} from "../../utils/StringConverter";
import {useCallback, useEffect, useState} from "react";
import {useSelector} from "react-redux";
import axios from "axios";
import AddItemModal from "../AddItemModal";
import SuccessModal from "../SuccessModal/SuccessModal";
import ErrorModal from "../ErrorModal/ErrorModal";
import {wait} from "@testing-library/user-event/dist/utils";

const BASE_PATH = "http://localhost:8080/wine";
const LANDS_PATH = "http://localhost:8080/land";
const CREATE_LAND_PATH = LANDS_PATH + "/manager";
const BRAND_PATH = "http://localhost:8080/brand";
const CREATE_BRAND_PATH = BRAND_PATH + "/manager";
const TYPES_PATH = BASE_PATH + "/types";
const SWEETNESS_PATH = BASE_PATH + "/sweetness"
const STATUSES_PATH = BASE_PATH + "/statuses"

const EditWineModal = ({open, setOpen, item}) => {
    const [createLandOpen, setCreateLandOpen] = useState(false);
    const [createBrandOpen, setCreateBrandOpen] = useState(false);
    const [openSuccessModal, setOpenSuccessModal] = useState(false);
    const [openErrorModal, setOpenErrorModal] = useState(false);
    const token = useSelector(state => state.jwtToken);

    const [state, setState] = useState({
        lands: [],
        brands: [],
        types: [],
        sweetness: [],
        statuses: [],
    });

    const [data, setData] = useState(item);

    const update = () => {
        if (data.available !== false) {
            if (data.availableStatus != null) {
                setData({
                    ...data,
                    availableStatus: null
                })
            }
        }
        axios.put(BASE_PATH, data, {headers: {Authorization: 'Bearer ' + token}})
            .then(() => {
                setOpenSuccessModal(true);
                wait(1000)
                    .then(() => {
                        setOpen(false);
                        setOpenSuccessModal(false);
                    });
            })
            .catch(error => {
                if(error.response.status === 500) {
                    setOpenErrorModal(true)
                }
            })
    }

    const loadData = useCallback(async () => {
        let tempLands = await axios.get(LANDS_PATH)
            .then(res => res.data);
        let tempBrands = await axios.get(BRAND_PATH)
            .then(res => res.data);
        let tempTypes = await axios.get(TYPES_PATH)
            .then(res => res.data);
        let tempSweetness = await axios.get(SWEETNESS_PATH)
            .then(res => res.data);
        let tempStatuses = await axios.get(STATUSES_PATH)
            .then(res => res.data);

        setState({
            lands: tempLands,
            brands: tempBrands,
            types: tempTypes,
            sweetness: tempSweetness,
            statuses: tempStatuses,
        });
    }, [])

    useEffect(() => {
        if(open) {
            loadData();
        }
    }, [open]);

    const Option = (props) => {
        return (
            <option id={props.id} value={props.item.name}>{props.item.name}</option>
        )
    }

    const EnumOption = (props) => {
        return (
            <option id={props.value} value={props.value}>{props.translatedValue}</option>
        )
    }

    const pickOption = (event) => {
        if (state.lands.map(m => m.name).includes(event.target.value)) {
            const index = state.lands.map(m => m.name).indexOf(event.target.value);
            const land = state.lands.at(index);
            setData({
                ...data,
                land: {
                    id: land.id,
                    name: land.name
                }
            })
        } else if (state.brands.map(b => b.name).includes(event.target.value)) {
            const index = state.brands.map(b => b.name).indexOf(event.target.value);
            const brand = state.brands.at(index);
            setData({
                ...data,
                brand: {
                    id: brand.id,
                    name: brand.name
                }
            })
        }
    }

    const pickEnumOption = (event) => {
        if (state.types.includes(event.target.value)) {
            setData({
                ...data,
                type: event.target.value
            })
        } else if (state.sweetness.includes(event.target.value)) {
            setData({
                ...data,
                sweetness: event.target.value
            })
        } else if (state.statuses.includes(event.target.value)) {
            setData({
                ...data,
                availableStatus: event.target.value
            })
        }
    }

    const onSubmit = (event) => {
        event.preventDefault();
        update();
    }

    const onChange = (event) => {
        setData({
            ...data,
            [event.target.id]: event.target.value
        })

    }

    return (
        <div className={open ? "modal open" : "modal"} onClick={() => setOpen(false)}>
            <div className="edit-wine-modal-content" onClick={e => e.stopPropagation()}>
                <form className="edit-wine-form box">
                    <div className="edit-wine-form-element">
                        <label>??????????:</label>
                        <input className="edit-wine-form-element-input" type="text" id="name" autoComplete="no" value={data.name} onChange={onChange}/>

                        <label>?????? ????????????:</label>
                        <input className="edit-wine-form-element-input" type="number" id="ean" autoComplete="no" value={data.ean} onChange={onChange}/>

                        <label>??????????:</label>
                        <div className="edit-wine-form-add-item">
                            <select className="edit-wine-form-element-select" value={data.brand.name} onChange={pickOption}>
                                {state.brands.map(item =>
                                    <Option id={item.id} item={item}/>)}
                                <option selected hidden value={null}/>
                            </select>
                            <div onClick={() => setCreateBrandOpen(true)}>
                                <img src={plusIcon} alt="plus icon"/>
                            </div>
                        </div>

                        <label>????????????:</label>
                        <div className="edit-wine-form-add-item">
                            <select className="edit-wine-form-element-select" value={data.land.name} onChange={pickOption}>
                                {state.lands.map(item =>
                                    <Option id={item.id} item={item}/>)}
                                <option selected hidden value={null}/>
                            </select>
                            <div onClick={() => setCreateLandOpen(true)}>
                                <img src={plusIcon} alt="plus icon"/>
                            </div>
                        </div>

                        <label>????????????:</label>
                        <input className="edit-wine-form-element-input" type="text" id="region" autoComplete="no" value={data.region} onChange={onChange}/>

                        <label>?????? ??????????:</label>
                        <select className="edit-wine-form-element-select" value={data.type} onChange={pickEnumOption}>
                            {state.types.map(v =>
                                <EnumOption id={v} value={v} translatedValue={convertType(v)}/>)}
                            <option selected hidden value={null}/>
                        </select>

                        <label>???????????????? %:</label>
                        <input className="edit-wine-form-element-input" type="number" id="strength" value={data.strength} onChange={onChange}/>

                        <label>????????????????????:</label>
                        <select className="edit-wine-form-element-select" value={data.sweetness} onChange={pickEnumOption}>
                            {state.sweetness.map(v =>
                                <EnumOption id={v} value={v} translatedValue={convertSweetness(v)}/>)}
                            <option selected hidden value={null}/>
                        </select>

                        <label>?????????????????? ?????????? %:</label>
                        <input className="edit-wine-form-element-input" type="number" id="sugarAmount" value={data.sugarAmount} onChange={onChange}/>

                        <label>?????????????????? ???? ???????? (?????????????????????????? 600x600  ?? ????????????):</label>
                        <input className="edit-wine-form-element-input" type="text" id="img" value={data.img} onChange={onChange}/>

                        <label>????????:</label>
                        <textarea className="edit-wine-form-element-textarea" id="descriptions" maxLength={250} value={data.descriptions} onChange={onChange}/>
                    </div>
                    <div className="edit-wine-form-element">
                        <label>????????:</label>
                        <input className="edit-wine-form-element-input" type="number" id="price" value={data.price} onChange={onChange}/>

                        <label>????????????:</label>
                        <input className="edit-wine-form-element-input" type="number" id="discount" value={data.discount} onChange={onChange}/>

                        <label>???????????????? ?????????????????? ?????? ??????????????:</label>
                        <input className="edit-wine-form-element-input" type="number" id="amountForSale" value={data.amountForSale} onChange={onChange}/>

                        <div>
                            <input className="edit-wine-form-element-checkbox" type="checkbox" id="available"
                                   checked={data.available}
                                   value={data.available}
                                   onClick={() => setData({...data, available: !data.available})}/>
                            <label htmlFor="available">???????????????? ?????? ????????????</label>
                        </div>

                        <label>???????????? ????????????:</label>
                        <select className="edit-wine-form-element-select" disabled={data.available} value={data.availableStatus} onChange={pickEnumOption}>
                            {state.statuses.map(v =>
                                <EnumOption id={v} value={v} translatedValue={convertAvailableStatus(v)}/>)}
                            <option selected hidden value={null}/>
                        </select>

                        <div>
                            <input className="edit-wine-form-element-checkbox" type="checkbox" id="visible"
                                   checked={data.visible}
                                   value={data.visible}
                                   onClick={() => setData({...data, visible: !data.visible})}/>
                            <lable htmlFor="visible">?????????????????? ?????? ????????????????????????</lable>
                        </div>
                        <div className="editWine-form-img-container">
                            {data.img ? <img src={data.img} alt="wine logo"/> : null}
                        </div>
                    </div>
                    <button type="submit" onClick={onSubmit}>????????????????</button>

                    <AddItemModal open={createLandOpen} setOpen={setCreateLandOpen} loadData={loadData} link={CREATE_LAND_PATH} itemName="????????????"/>
                    <AddItemModal open={createBrandOpen} setOpen={setCreateBrandOpen} loadData={loadData} link={CREATE_BRAND_PATH} itemName="??????????"/>
                    <SuccessModal text="?????????? ?????????????? ????????????" open={openSuccessModal} setOpen={setOpenSuccessModal}/>
                    <ErrorModal open={openErrorModal} setOpen={setOpenErrorModal} descriptions="?????????????????? ???? ??????, ?????? ???????????????????? ???? ????????????"/>
                </form>
            </div>
        </div>
    )
}

export default EditWineModal;