import "./SuccessModalAnimation.scss"

const SuccessModal = ({open, setOpen, text}) => {
    return (
        <div className={open ? "modal open" : "modal"} onClick={() => setOpen(false)}>
            <div className="success-modal-content">
                <h3 className="modal-header">{text}</h3>
                <div className="success-checkmark">
                    <div className={open ? "check-icon" : null}>
                        <span className="icon-line line-tip"/>
                        <span className="icon-line line-long"/>
                        <div className="icon-circle"/>
                        <div className="icon-fix"/>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default SuccessModal;