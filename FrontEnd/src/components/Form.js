import { Children } from "react"
import './Form.css'
import SearchSelect from "./SearchSelect"
const translations = {
    "email": "אימייל",
    "password": "סיסמא",
    "car_license_number": "מספר לוחית רישוי",
    "car_image_1": "תמונה 1",
    "car_image_2": "תמונה 2",
    "car_image_3": "תמונה 3",
    "car_toll_driving": "אגרה",
    "car_rental_has_waze": "וויז",
    "car_decoration": "קישוט",
    "email": "אימייל",
    "password": "סיסמא",
    "car_license_number": "מספר לוחית רישוי",
    "car_image_1": "תמונה 1",
    "car_image_2": "תמונה 2",
    "car_image_3": "תמונה 3",
    "car_toll_driving": "אגרה",
    "car_rental_has_waze": "וויז",
    "car_decoration": "קישוט",
    "branch_number": "מספר סניף",
    "branch_name": "שם סניף",
    "branch_manager": "מנהל סניף",

    "car_license_number": "מספר רישוי",
    "car_rented_by": "רכב שכור על ידי",
    "car_type": "סוג רכב",
    "car_manufacturer": "יצרן רכב",
    "car_model": "דגם רכב",
    "car_passkey": "קוד דגם",
    "car_towing_company": "חברת גרירת רכב",
    "car_agent": "סוכן רכב",
    "name": "שֵׁם",
    "phone": "טלפון",
    "price": "מחיר",
    "car_manufacture_year": "שנת ייצור",
    "car_color": "צבע",
    "car_engine_capacity": "נפח מנוע",
    "car_daily_price": "תעריף יומי להשכרה",
    "car_monthly_price": "תעריף חודשי להשכרה",
    "car_fuel_type": "סוג דלק",
    "car_fuel": "כמות דלק",
    "car_chassis_type:": "מספר שילד",
    "car_license_fee": "אגרת רישוי",
    "car_license_expiration": "תאריך תוקף רישוי",
    "car_kilometrage": " 'קמ ",
    "car_km_limit": "הגבלת קמ",
    "car_extra_km_price": "מחיר קמ נוסף",
    "car_entry_date": "תאריך עלייה לכביש",
    "car_deductible_price": "מחיר השתתפות עצמית",
    "car_hand": "יד",
    "car_images": "תמונות רכב",
    "car_branch": "סניף רכב",
    "car_care_car": "",
    "car_care_customer": "",
    "price": "מחיר",
    "date": "תַאֲרִיך",
    "car_care_name": "",
    "car_care_branch": "",
    "car_rental_car": "רכב להשכרה:",
    "car_rental_customer": "לקוח משכיר רכב:",
    "car_rental_branch": "סניף השכרת רכב",
    "car_rental_start_date": "",
    "car_rental_end_date": "תאריך השכרת רכב",
    "car_rental_price": "מחיר השכרת רכב",
    "car_toll_driving": "אגרה",
    "car_toll_price": "מחיר אגרה",
    "car_rental_daily_price": "מחיר השכרת רכב יומי",
    "car_rental_monthly_price": "מחיר השכרת רכב חודשי",
    "car_rental_has_waze": "וויז",
    "car_decoration": "תיאור רכב",
    "car_fuel_start": "דלק בתחילת השכרה",
    "car_fuel_end": "דלק בסוף השכרה",
    "customer_first_name": "שם פרטי",
    "customer_last_name": "שם משפחה",
    "customer_passport_id": "מספר ת.ז",
    "customer_phone": "פלאפון נייד",
    "customer_email": "דואר אלקטרוני",
    "customer_account_management_id": "מספר חשבון לקוח",
    "customer_birth_date": "תאריך לידה",
    "customer_age": "גיל",
    "customer_driver_license_id": "מספר רישיון נהיגה",
    "customer_driver_licence_expiration_date": "תוקף רישיון נהיגה",
    "customer_street": "כתובת",
    "customer_city": "עיר",
    "customer_postal_code": "מיקוד",
    "payment_info": "פרטי התשלום",
    "card_number": "מספר כרטיס",
    "card_holder_name": "שם בעל הכרטיס",
    "card_expiration_date": "תאריך תפוגה כרטיס",
    "card_cvv": "CVV",
    "comments": "הערות",
    "customer_type": "סוג לקוח",
    "license_image": "תמונת רישיון",
    "passport_image": "תמונת דרכון",
    "customer_company_name": "שם החברה",
    "customer_branch": "סניף לקוח",
    "customer_company_id": "מספר ח.פ",
    "manager_email": "אימייל המנהל",
    "manager_password": "סיסמא מנהל",
    "manager_passport_id": "ת.ז מנל",
    "manager_name": "שם מנהל",
    "manager_protection_level": "רמת הגנה",
    "manager_branch": "סניף מנהל",
}
export const translate = (word) => translations[word] ?? word


const determineStyleForInputField = (field) => {
    return field.type === 'checkbox' ? 'cb' : ''
}
const Form = ({ fields, onSubmit }) => {

    const SplittedFields = () => {
        let splitFields = fields
        if (splitFields.length >= 7) {
            const splitted = fields.slice(0, Math.floor(splitFields.length / 2))
            const splitted2 = fields.slice(Math.floor(splitFields.length / 2))
            return <div className="d_split form">
                <div className="split">
                    {Children.toArray(splitted.map(field => {
                        return (
                            <div className={determineStyleForInputField(field)}>
                                <label>{translate(field.name)}</label>
                                {field.type === 'select' ? <SearchSelect
                                    name={field.name}
                                    filterBy={field.filterBy}
                                    onSelect={field.onSelect}
                                    options={field.options} /> :
                                    <input defaultValue={field.defaultValue}
                                        name={field.name}
                                        type={field.type}
                                        required={field.type === 'checkbox' ? false : field.required} />
                                }
                            </div>
                        )
                    }))}
                </div>
                <div className="split">
                    {Children.toArray(splitted2.map(field => {
                        return (
                            <div className={determineStyleForInputField(field)}>
                                <label>{translate(field.name)}</label>
                                {field.type === 'select' ? <SearchSelect
                                    onSelect={field.onSelect}
                                    filterBy={field.filterBy}
                                    name={field.name}
                                    options={field.options} /> :
                                    <input defaultValue={field.defaultValue}
                                        name={field.name}
                                        type={field.type}
                                        required={field.type === 'checkbox' ? false : field.required} />
                                }
                            </div>
                        )
                    }))}
                </div>
            </div>
        }

        return <div className="form">
            {Children.toArray(fields.map(field => {
                return (
                    <div className={determineStyleForInputField(field)}>
                        <label>{translate(field.name)}</label>
                        {field.type === 'select' ? <SearchSelect
                            onSelect={field.onSelect}
                            filterBy={field.filterBy} name={field.name} options={field.options} /> :
                            <input defaultValue={field.defaultValue} name={field.name} type={field.type} required={field.type === 'checkbox' ? false : field.required} />
                        }
                    </div>
                )
            }))}
        </div>
    }
    return (
        <form onSubmit={
            e => {
                e.preventDefault()
                let data = {}
                let targetFields = Array.from(e.target)
                const fieldNames = fields.map(f => f.name)

                targetFields = targetFields.filter(field => fieldNames.includes(field.name))

                targetFields.forEach(field => {
                    const value = field.type === 'checkbox' ? field.checked : field.value
                    data[field.name] = value
                })
                onSubmit(data)
            }
        }>
            <SplittedFields />
            <button className="buttom-form" type="submit">שלח</button>
        </form>
    )
}

export default Form