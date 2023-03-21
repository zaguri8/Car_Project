const Car = require("../models/Car");
const CarRental = require("../models/CarRental");
const Customer = require("../models/Customer");

const addNewRental = async (rental) => {

    // Create new rental
    const newRental = new CarRental(rental);
   
    const customerId = rental.car_rental_customer
    const carId = rental.car_rental_car

    // Get car and customer by id
    let car = await Car.findById(carId)
    let customer = await Customer.findById(customerId)
    
    // Update car and customer
    car.car_rented_by = customerId
    customer.car_rentals = [...customer.car_rentals, newRental._id]
    // Save changes
    car = await car.save()
    customer = await customer.save()

    // return new rental & updated car & customer
    return {
        rental: await newRental.save(),
        customer: {
            ...customer,
            car_rentals: [...customer.car_rentals, newRental]
        },
        car: {
            ...car,
            car_rented_by: customer
        }
    }
}

const editRental = async (rental) => {
    await CarRental.findByIdAndUpdate(rental._id, rental)
    return rental
}

const deleteRental = async (rental) => {
    await CarRental.findByIdAndDelete(rental._id)
    return rental
}

const getAllRentals = async () => {
    const rentals = await CarRental.find({})
        .populate("car_rental_car")
        .populate("car_rental_customer")
    return rentals
}

const getAllCustomerRentals = async (customer) => {
    const rentals = await CarRental.find({ car_rental_customer: customer })
        .populate("car_rental_car")
        .populate("car_rental_customer")
    return rentals
}

const getAllRentalsByCar = async (car) => {
    const rentals = await CarRental.find({ car_rental_car: car })
        .populate("car_rental_car")
        .populate("car_rental_customer")
    return rentals
}

const getAllCustomerRentalsForBranch = async (branch) => {
    const rentals = await CarRental.find({ car_rental_branch: branch })
        .populate("car_rental_car")
        .populate("car_rental_customer")

    return rentals
}


module.exports = {
    addNewRental,
    editRental,
    deleteRental,
    getAllRentals,
    getAllRentalsByCar,
    getAllCustomerRentals,
    getAllCustomerRentalsForBranch
}