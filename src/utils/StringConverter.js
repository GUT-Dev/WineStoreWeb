export const convertType = (type) => {
            switch (type) {
            case ("WHITE") :
                return "Біле";
            case ("RED") :
                return "Червоне";
            case ("ROSE") :
                return "Рожеве";
            case ("SPARKLING") :
                return "Ігристе";
            case ("FORTIFIED") :
                return "Кріплене"
            default :
                return " - "
        }
}

export const convertSweetness = (sweetness) => {
        switch (sweetness) {
            case ("EXTRA_DRY") :
                return "Сухе";
            case ("DRY") :
                return "Напів-сухе";
            case ("MEDIUM") :
                return "Напів-солодке";
            case ("SWEET") :
                return "Солодке";
            case ("VERY_SWEET") :
                return "Дуже солодке";
            default :
                return " - "
        }
}

export const convertAvailableStatus = (visibleStatus) => {
    switch (visibleStatus) {
        case "IS_OVER" :
            return "Немає в наявності";
        case ("EXPECTED") :
            return "Очікується";
        case "DISCONTINUED" :
            return "Знято з виробництва";
    }
}

export const convertTrackingStatus = (status) => {
    switch (status) {
        case ("NEW") :
            return (<div className="order-status order-new">Нове</div>);
        case ("IN_PROGRESS") :
            return (<div className="order-status order-in-progress">Комплектується</div>);
        case ("SENT") :
            return (<div className="order-status order-sent">Відправлено</div>);
        case ("ARRIVED") :
            return (<div className="order-status order-arrived">Прибуло у відділення</div>);
        case ("RECEIVED") :
            return (<div className="order-status order-received">Отримано</div>);
        case ("CANCELED") :
            return (<div className="order-status order-canceled">Відмінено</div>);
        default :
            return ""
    }
}