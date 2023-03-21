
import { Children, useEffect, useState } from "react"
import { useAdminContext } from "../context/AdminContext"
import { useAppContext } from "../context/AppContext"
import Form from "./Form"
import ExclamationCircleOutlined from '@ant-design/icons/ExclamationCircleOutlined';
import confirm from 'antd/lib/modal/confirm';
const AddCarForm = () => {


    const fields = [
        { name: "car_license_number", type: "text", required: true },
        { name: "car_rented_by", type: "text", required: true },
        { name: "car_type", type: "text", required: true },
        { name: "car_manufacturer", type: "text", required: true },
        { name: "car_model", type: "text", required: true },
        { name: "car_passkey", type: "text", required: true },
        { name: "car_towing_company", type: "text", required: true },
        { name: "car_image_1", type: "file", required: true },
        { name: "car_image_2", type: "file", required: true },
        { name: "car_image_3", type: "file", required: true },
        { name: "car_agent_name", type: "text", required: true },
        { name: "car_agent_price", type: "text", required: true },
        { name: "car_agent_phone", type: "text", required: true },
        { name: "car_manufacture_year", type: "text", required: true },
        { name: "car_color", type: "color", required: true },
        { name: "car_engine_capacity", type: "number", required: true },
        { name: "car_daily_price", type: "number", required: true },
        { name: "car_monthly_price", type: "number", required: true },
        { name: "car_fuel_type", type: "text", required: true },
        { name: "car_fuel", type: "text", required: true },
        { name: "car_chassis_type", type: "text", required: true },
        { name: "car_kilometrage", type: "number", required: true },
        { name: "car_license_expiration", type: "date", required: true },
        { name: "car_km_limit", type: "number", required: true },
        { name: "car_extra_km_price", type: "number", required: true },
        { name: "car_entry_date", type: "date", required: true },
        { name: "car_deductible_price", type: "text", required: true },
        { name: "car_hand", type: "number", required: true },

    ]
    return <div>
        <Form fields={fields} onSubmit={car => {
            const requestCar = { ...car, car_images: [car.car_image_1, car.car_image_2, car.car_image3] }
        }} />
    </div>
}


const AddCarRental = () => {
    const { cars, customers, manager, onAddRental } = useAppContext()
    const { } = useAdminContext()
    const [selectedCar, setSelectedCar] = useState(null)
    const [selectedCustomer, setSelectedCustomer] = useState(null)
    const fields = [
        {
            name: "car_rental_car", type: "select",
            options: cars ? cars.map(car => ({
                value: car._id,
                name: car.car_license_number + ',' + car.car_model,
                object: car
            })) : [],
            onSelect: (car) => {
                alert(car)
                setSelectedCar(car)
            },
            filterBy: (car, filter) => car.car_license_number.toLowerCase()
                .includes(filter.toLowerCase())
                || car.car_model.toLowerCase()
                    .includes(filter.toLowerCase()),
            required: true
        },
        {
            name: "car_rental_customer",
            type: "select",
            onSelect: (customer) => setSelectedCustomer(customer),
            filterBy: (customer, filter) => customer.customer_first_name.toLowerCase()
                .includes(filter.toLowerCase())
                || customer.customer_last_name.toLowerCase()
                    .includes(filter.toLowerCase())
                || customer.customer_passport_id.toLowerCase()
                    .includes(filter.toLowerCase()),
            options: customers.map(customer => ({
                value: customer._id,
                name: customer.customer_first_name + ' ' + customer.customer_last_name + ',' + customer.customer_passport_id,
                object: customer
            })),
            required: true
        },
        { name: "car_rental_start_date", type: "date", required: true },
        { name: "car_rental_end_date", type: "date", required: true },
        { name: "car_rental_daily_price", defaultValue: cars ? cars[0].car_daily_price : undefined, type: "number", required: true },
        { name: "car_rental_monthly_price", defaultValue: cars ? cars[0].car_monthly_price : undefined, type: "number", required: true },
        { name: "car_fuel_start", type: "number", required: true },
        { name: "car_toll_price", type: "number", required: true },
        { name: "car_toll_driving", type: "checkbox", required: true },
        { name: "car_rental_has_waze", type: "checkbox", required: true },
        { name: "car_decoration", type: "checkbox", required: true },
    ]

    if (!manager) return (<div>אין מנהל</div>)
    return <div>
        <Form fields={fields} onSubmit={carRental => {
            const requestRental = {
                ...carRental,
                car_rental_branch: manager.manager_branch._id,
            }
            // add a confirmation modal
            confirm({
                title: 'האם אתה בטוח שברצונך להוסיף השכרה זו?',
                icon: <ExclamationCircleOutlined />,
                content: 'לאחר הוספת ההשכרה לא ניתן לבטל את הפעולה',
                onOk: async () => await onAddRental(requestRental)
            })
        }} />
    </div>
}


const CarsTable = ({ cars }) => {

    return <table>
        <thead>
            <tr>
                <th>מספר רישוי</th>
                <th>סטאטוס</th>
                <th>דגם</th>
                <th>תאריך רישוי</th>
                <th>מחיר יומי</th>
                <th>פעולות</th>
            </tr>
        </thead>

        <tbody>
            {Children.toArray(cars.map(car => <tr className="data-row-table">
                <td>{car.car_license_number}</td>
                <td>{car.car_rented_by ? 'מושכר ' : 'פנוי'}</td>
                <td>{car.car_model}</td>
                <td>{car.car_license_expiration}</td>
                <td>{car.car_daily_price}</td>
                <td>
                    <button>מידע</button>
                    <button>עריכה</button>
                    <button>מחיקה</button>
                </td>
            </tr>))}
        </tbody>
    </table>
}

export default function Cars() {

    const { cars, openModal } = useAppContext()
    if (!cars) {
        return <div>
            <h1>אין רכבים</h1>
            <br />
            <AddCarForm />
        </div>
    }
    return (
        <div>
            <CarsTable cars={cars} />
            <br />
            <button onClick={() => openModal(<AddCarForm />)}>
                הוסף רכב חדש
            </button>

            <button onClick={() => openModal(<AddCarRental />)}>
                הוסף השכרה חדשה
            </button>
        </div>
    )
}