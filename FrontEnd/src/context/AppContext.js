

import React, { createContext, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { getAllCarsForBranch, getAllCustomersByBranch, getBranch, loginManager, getManager, addCarRental } from '../http/service'
const AppContext = createContext(null)

export const AppProvider = ({ children }) => {

    const [rentals, setRentals] = useState([])
    const [manager, setManager] = useState()
    const nav = useNavigate()
    const [cars, setCars] = useState([])
    const [modalContent, setModalContent] = useState()
    const [customers, setCustomers] = useState()
    const [error, setError] = useState()
    const [loading, setLoading] = useState(false)

    const openModal = (content) => {
        setModalContent(content)
    }
    const closeModal = () => {
        setModalContent(null)
    }

    useEffect(() => {
        async function fetchManagerBranchData() {
            if (manager) {
                try {
                    setCustomers(await getAllCustomersByBranch(manager.manager_branch._id))
                    const c = await getAllCarsForBranch(manager.manager_branch._id)
                    console.log(c)
                    setCars(c)
                } catch (error) {
                    console.log(error)
                    setError(error)
                }
            }
        }
        fetchManagerBranchData();
    }, [manager])

    useEffect(() => {
        const fetchManagerByRefresh = async () => {
            try {
                const token = localStorage.getItem('token')
                if (token) {
                    setManager(await getManager())
                }
            } catch (error) {
                console.log(error)
                setError(error)
            }
        }
        fetchManagerByRefresh()
    }, [])

    const login = async (manager) => {
        try {
            await loginManager(manager)
            setManager(await getManager())
        } catch (error) {
            console.log(error)
            console.log(error)
            setError(error)
        }
    }

    const logOut = () => {
        localStorage.removeItem('token')
        setManager(null)
        nav("/Login")
    }


    const onAddRental = (rental) => {
        setLoading(true)
        try {
            const result = addCarRental(rental)
            const car = result.car// cars.find(c => c._id === rental.car_id)
            const customer = result.customer // customers.find(c => c._id === rental.customer_id)
            const newRental = result.rental
            setCars(cars.map(c => c._id === car._id ? car : c))
            setCustomers(customers.map(c => c._id === customer._id ? customer : c))
            setRentals([...rentals, newRental])
            setLoading(false)
        } catch (error) {
            console.log(error)
            setError(error)
            setLoading(false)
        }
    }

    return (
        <AppContext.Provider value={{
            manager,
            cars,
            login,
            logOut,
            onAddRental,
            modalContent,
            openModal,
            closeModal,
            customers
        }}>
            {children}
        </AppContext.Provider>
    )
}

export const useAppContext = () => {
    const context = React.useContext(AppContext)
    if (context === undefined) {
        throw new Error('useAppContext must be used within a AppProvider')
    }
    return context
}

export default AppContext
