import "./ErrorModalAnimation.scss"

const ErrorModal = ({open, setOpen, text, descriptions}) => {
    return (
        <div className={open ? "modal open" : "modal"} onClick={() => setOpen(false)}>
            <div className="success-modal-content" onClick={e => e.stopPropagation()}>
                <h3 className="modal-header">{text ? text : "Щось пішло не так"}</h3>
                <div className="modal-container">
                    <div className="circle-border"/>
                    <div className="circle">
                        <div className="modal-error"/>
                    </div>
                </div>
                <h4 className="modal-header">{descriptions ? descriptions : "Спробуйте ще раз, або зверніться до менеджера"}</h4>
            </div>
        </div>
    )
}

export default ErrorModal;