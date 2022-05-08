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
                return ("Сухе");
            case ("DRY") :
                return ("Напів-сухе");
            case ("MEDIUM") :
                return ("Напів-солодке");
            case ("SWEET") :
                return ("Солодке");
            case ("VERY_SWEET") :
                return ("Дуже солодке");
            default :
                return " - "
        }
}