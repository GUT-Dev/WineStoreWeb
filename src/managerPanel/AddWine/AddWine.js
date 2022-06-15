import './AddWine.css'
import axios from "axios";
import {useCallback, useEffect, useState} from "react";
import {convertAvailableStatus, convertSweetness, convertType} from "../../utils/StringConverter";
import {useSelector} from "react-redux";
import plusIcon from "../../resources/icons/plus_icon.png"
import AddItemModal from "../../modals/AddItemModal";
import SuccessModal from "../../modals/SuccessModal/SuccessModal";
import ErrorModal from "../../modals/ErrorModal/ErrorModal";
import {useForm} from "react-hook-form";

const BASE_PATH = "http://localhost:8080/wine";
const LANDS_PATH = "http://localhost:8080/land";
const CREATE_LAND_PATH = LANDS_PATH + "/manager";
const BRAND_PATH = "http://localhost:8080/brand";
const CREATE_BRAND_PATH = BRAND_PATH + "/manager";
const TYPES_PATH = BASE_PATH + "/types";
const SWEETNESS_PATH = BASE_PATH + "/sweetness"
const STATUSES_PATH = BASE_PATH + "/statuses"

const AddWine = (props) => {
    const [createLandOpen, setCreateLandOpen] = useState(false);
    const [createBrandOpen, setCreateBrandOpen] = useState(false);
    const [openSuccessModal, setOpenSuccessModal] = useState(false);
    const [openErrorModal, setOpenErrorModal] = useState(false);
    const token = useSelector(state => state.jwtToken);
    const { register, handleSubmit, watch, reset, setError, clearErrors, formState: { errors, isValid } } = useForm({
        mode: "all",
        shouldFocusError: false
    });

    const [state, setState] = useState({
        lands: [],
        brands: [],
        types: [],
        sweetness: [],
        statuses: [],
        isLoaded: false
    });

    const defaultData = {
        availableStatus: null,
        type: null,
        sweetness: null,
        brand: {
            id: null,
            name: null
        },
        land: {
            id: null,
            name: null
        }
    };

    const [tempData, setTempData] = useState(defaultData);

    const create = (data) => {
        if (data.available !== false) {
            if (data.availableStatus != null) {
                setTempData({
                    ...data,
                    availableStatus: null
                })
            }
        }

        const sendData = {
            name: data.name,
            img: data.img,
            price: data.price,
            discount: data.discount,
            available: data.available,
            availableStatus: tempData.availableStatus,
            visible: data.visible,
            descriptions: data.descriptions,
            type: tempData.type,
            sweetness: tempData.sweetness,
            strength: data.strength,
            sugarAmount: data.sugarAmount,
            ean: data.ean,
            brand: tempData.brand,
            land: tempData.land,
            region: data.region,
            amountForSale: data.amountForSale,
        };

        axios.post(BASE_PATH, sendData, {headers: {Authorization: 'Bearer ' + token}})
            .then(() => setOpenSuccessModal(true))
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
                isLoaded: true
            });
    }, [])

    useEffect(() => {
        if(!state.isLoaded) {
            loadData();
        }
        customValidate();
    }, [props, tempData]);

    const customValidate = () => {
        if(tempData.land.id === null) {
            setError("land", {
                message: "*Поле обов'язкове"
            })
        } else {
            clearErrors("land");
        }

        if(tempData.brand.id === null) {
            setError("brand", {
                message: "*Поле обов'язкове"
            })
        } else {
            clearErrors("brand");
        }

        if(tempData.type === null) {
            setError("type", {
                message: "*Поле обов'язкове"
            })
        } else {
            clearErrors("type");
        }

        if(tempData.sweetness === null) {
            setError("sweetness", {
                message: "*Поле обов'язкове"
            })
        } else {
            clearErrors("sweetness");
        }

        if(watch("available") === false && tempData.availableStatus === null) {
            setError("availableStatus", {
                message: "*Поле обов'язкове"
            })
        } else {
            clearErrors("availableStatus");
        }

        if(watch("available") === true) {
            clearErrors("availableStatus");
        }
    }

    const Option = ({value}) => {
        return (
            <option value={value}>{value}</option>
        )
    }

    const EnumOption = ({value, translatedValue}) => {
        return (
            <option value={value}>{translatedValue}</option>
        )
    }

    const pickOption = async (event) => {
        if (state.lands.map(m => m.name).includes(event.target.value)) {
            const index = state.lands.map(m => m.name).indexOf(event.target.value);
            const land = state.lands.at(index);
            setTempData({
                ...tempData,
                land: {
                    id: land.id,
                    name: land.name
                }
            })
        } else if (state.brands.map(b => b.name).includes(event.target.value)) {
            const index = state.brands.map(b => b.name).indexOf(event.target.value);
            const brand = state.brands.at(index);
            setTempData({
                ...tempData,
                brand: {
                    id: brand.id,
                    name: brand.name
                }
            })
        }
    }

    const pickEnumOption = (event) => {
        if (state.types.includes(event.target.value)) {
            setTempData({
                ...tempData,
                type: event.target.value
            })
        } else if (state.sweetness.includes(event.target.value)) {
            setTempData({
                ...tempData,
                sweetness: event.target.value
            })
        } else if (state.statuses.includes(event.target.value)) {
            setTempData({
                ...tempData,
                availableStatus: event.target.value
            })
        }
    }

    const onSubmit = async (data) => {
        create(data);
        reset();
        setTempData(defaultData);
    }

    return (
        <div>
            <h3 className="add-wine-header">Додати товар</h3>
            <form className="add-wine-form box" onSubmit={handleSubmit(onSubmit)}>
                <div className="add-wine-form-element">
                    <label>
                        Назва:
                        <input className="add-wine-form-element-input"
                               type="text"
                               {...register("name", {
                                   required: "*Поле обов'язкове для заповнення",
                                   minLength: {
                                       value: 5,
                                       message: "*Поле повинне бути від 5 символів"
                                   },
                               })}
                        />
                        {errors?.name && <span className="add-wine-form-validation-error error">{errors.name?.message || "Помилка валідації"}</span>}
                    </label>

                    <label>
                        Код товару:
                        <input className="add-wine-form-element-input"
                               type="number"
                               {...register("ean", {
                                   required: "*Поле обов'язкове для заповнення",
                                   minLength: {
                                       value: 5,
                                       message: "*Поле повинне бути від 5 символів"
                                   },
                                   pattern: {
                                       value: /^[0-9]+$/,
                                       message: "*Поле повинне складатися тільки з цифр"
                                   },
                               })}
                        />
                        {errors?.ean && <span className="add-wine-form-validation-error error">{errors.ean?.message || "Помилка валідації"}</span>}
                    </label>

                    <label>
                        Бренд:
                        <div className="add-wine-form-add-item">
                            <select className="add-wine-form-element-select" value={tempData.brand.name} onChange={(event) => {pickOption(event); customValidate();}}>
                                {state.brands.map(item =>
                                    <Option value={item.name}/>)}
                                <option hidden={true} value={null}/>
                            </select>

                            <div onClick={() => setCreateBrandOpen(true)}>
                                <img src={plusIcon} alt="plus icon"/>
                            </div>
                        </div>
                        {errors?.brand && <span className="add-wine-form-validation-error error">{errors.brand?.message || "Помилка валідації"}</span>}
                    </label>

                    <label>
                        Країна:
                        <div className="add-wine-form-add-item">
                            <select className="add-wine-form-element-select" value={tempData.land.name} onChange={(event) => {pickOption(event); customValidate();}}>
                                {state.lands.map(item =>
                                    <Option value={item.name}/>)}
                                <option selected hidden value={null}/>
                            </select>

                            <div onClick={() => setCreateLandOpen(true)}>
                                <img src={plusIcon} alt="plus icon"/>
                            </div>
                        </div>
                        {errors?.land && <span className="add-wine-form-validation-error error">{errors.land?.message || "Помилка валідації"}</span>}
                    </label>

                    <label>
                        Регіон:
                        <input className="add-wine-form-element-input"
                               type="text"
                               {...register("region", {
                                   required: "*Поле обов'язкове для заповнення",
                                   minLength: {
                                       value: 5,
                                       message: "*Поле повинне бути від 5 символів"
                                   }
                               })}
                        />
                        {errors?.region && <span className="add-wine-form-validation-error error">{errors.region?.message || "Помилка валідації"}</span>}
                    </label>

                    <label>
                        Тип напою:
                        <select className="add-wine-form-element-select"
                            value={tempData.type}
                            onChange={pickEnumOption}>
                            <option hidden value={null}/>
                            {state.types.map(v =>
                                <EnumOption value={v} translatedValue={convertType(v)}/>)}
                        </select>
                        {errors?.type && <span className="add-wine-form-validation-error error">{errors.type?.message || "Помилка валідації"}</span>}
                    </label>

                    <label>
                        Міцність %:
                        <input className="add-wine-form-element-input"
                               type="number"
                               {...register("strength", {
                                   required: "*Поле обов'язкове для заповнення",
                                   min: {
                                       value: 0,
                                       message: "*Мінімальна величина 0"
                                   },
                                   max: {
                                       value: 100,
                                       message: "*Мінімальна величина 100"
                                   }
                               })}
                        />
                        {errors?.strength && <span className="add-wine-form-validation-error error">{errors.strength?.message || "Помилка валідації"}</span>}
                    </label>

                    <label>
                        Солодкість:
                        <select className="add-wine-form-element-select" value={tempData.sweetness} onChange={pickEnumOption}>
                            {state.sweetness.map(v =>
                                <EnumOption id={v} value={v} translatedValue={convertSweetness(v)}/>)}
                            <option selected hidden value={null}/>
                        </select>
                        {errors?.sweetness && <span className="add-wine-form-validation-error error">{errors.sweetness?.message || "Помилка валідації"}</span>}
                    </label>

                    <label>
                        Кількість цукру %:
                        <input className="add-wine-form-element-input"
                               type="number"
                               {...register("sugarAmount", {
                                   required: "*Поле обов'язкове для заповнення",
                                   min: {
                                       value: 0,
                                       message: "*Мінімальна величина 0"
                                   },
                                   max: {
                                       value: 100,
                                       message: "*Мінімальна величина 100"
                                   }
                               })}
                        />
                        {errors?.sugarAmount && <span className="add-wine-form-validation-error error">{errors.sugarAmount?.message || "Помилка валідації"}</span>}
                    </label>

                    <label>
                        Посилання на фото (рекомендовано 600x600  і більше):
                        <input className="add-wine-form-element-input"
                               type="text"
                               {...register("img", {
                                   required: "*Поле обов'язкове для заповнення",
                                   pattern: {
                                       value: /(\b(http|https?|ftp|file):\/\/[-A-Z0-9+&@#\/%?=~_|!:,.;]*[-A-Z0-9+&@#\/%=~_|])/ig,
                                       message: "*Посилання не валідне"
                                   }
                               })}
                        />
                        {errors?.img && <span className="add-wine-form-validation-error error">{errors.img?.message || "Помилка валідації"}</span>}
                    </label>

                    <label>
                        Опис:
                        <textarea className="add-wine-form-element-textarea"
                                  {...register("descriptions", {
                                      required: "*Поле обов'язкове для заповнення",
                                      minLength: {
                                          value: 20,
                                          message: "*Мінімальна довжина поля 20 символів"
                                      }
                                  })}
                            maxLength={250}
                        />
                        {errors?.descriptions && <span className="add-wine-form-validation-error error">{errors.descriptions?.message || "Помилка валідації"}</span>}
                    </label>
                </div>

                <div className="add-wine-form-element">
                    <label>
                        Ціна:
                        <input className="add-wine-form-element-input"
                               type="number"
                               {...register("price", {
                                   required: "*Поле обов'язкове для заповнення",
                                   min: {
                                       value: 0,
                                       message: "*Мінімальна величина 0"
                                   }
                               })}
                        />
                        {errors?.price && <span className="add-wine-form-validation-error error">{errors.price?.message || "Помилка валідації"}</span>}
                    </label>

                    <label>
                        Знижка %:
                        <input className="add-wine-form-element-input"
                               type="number"
                               {...register("discount", {
                                   required: "*Поле обов'язкове для заповнення",
                                   min: {
                                       value: 0,
                                       message: "*Мінімальна величина 0"
                                   },
                                   max: {
                                       value: 100,
                                       message: "*Мінімальна величина 100"
                                   }
                               })}
                        />
                        {errors?.discount && <span className="add-wine-form-validation-error error">{errors.discount?.message || "Помилка валідації"}</span>}
                    </label>

                    <label>
                        Стартова кількість для продажу:
                        <input className="add-wine-form-element-input"
                               type="number"
                               {...register("amountForSale", {
                                   required: "*Поле обов'язкове для заповнення",
                                   min: {
                                       value: 0,
                                       message: "*Мінімальна величина 0"
                                   }
                               })}
                        />
                        {errors?.amountForSale && <span
                            className="add-wine-form-validation-error error">{errors.amountForSale?.message || "Помилка валідації"}</span>}
                    </label>

                    <label style={{display: "flex", flexDirection: "row", marginBottom: 15 + 'px'}}>
                        Доступно для продаж
                        <input className="add-wine-form-element-checkbox" type="checkbox"
                               {...register("available", {
                                   value: false
                               })}
                        />
                    </label>

                    <label>
                        Статус товару:
                        <select className="add-wine-form-element-select" disabled={watch("available")}
                                value={tempData.availableStatus} onChange={pickEnumOption}>
                            <option selected hidden value={null}/>
                            {state.statuses.map(v =>
                                <EnumOption id={v} value={v} translatedValue={convertAvailableStatus(v)}/>)}
                        </select>
                        {errors?.availableStatus && <span
                            className="add-wine-form-validation-error error">{errors.availableStatus?.message || "Помилка валідації"}</span>}
                    </label>

                    <label style={{display: "flex", flexDirection: "row", marginBottom: 15 + 'px'}}>
                        Видимість для користувачів
                        <input className="add-wine-form-element-checkbox" type="checkbox"
                               {...register("visible", {
                                   value: true
                               })}
                        />
                    </label>

                    <div className="addWine-form-img-container">
                        {watch("img") ? <img src={watch("img")} alt="wine logo"/> : null}
                    </div>
                </div>

                <input className="add-wine-form-submit" type="submit" value="Підтвердити" disabled={!isValid}/>
            </form>

            <AddItemModal open={createLandOpen} setOpen={setCreateLandOpen} loadData={loadData} link={CREATE_LAND_PATH} itemName="країну" />
            <AddItemModal open={createBrandOpen} setOpen={setCreateBrandOpen} loadData={loadData} link={CREATE_BRAND_PATH} itemName="бренд" />
            <SuccessModal text="Товар успішно додано" open={openSuccessModal} setOpen={setOpenSuccessModal}/>
            <ErrorModal open={openErrorModal} setOpen={setOpenErrorModal} descriptions="Спробуйте ще раз, або зверніться до адміна"/>
        </div>
    )
}

export default AddWine;