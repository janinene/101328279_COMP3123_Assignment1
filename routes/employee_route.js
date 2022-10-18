const express = require("express")
const mongoose = require("mongoose")
const routes = express.Router()
const employeeModel = require('../models/Employee')

/*  Sample Employee
{
    "first_name" : "Tam",
    "last_name" : "Harrow",
    "email" : "tam@hollywood.com", 
    "gender" : "Male",
    "salary" : 125500.00
}
*/

// 3. All employee list
routes.get('/employees', async (req,res) => {                   
    try {
        const employee = await employeeModel.find()
        res.status(200).send(employee)
    }catch (error) {
        res.status(400).send(error)
    }

});


// 4. Create employee
routes.post('/employees', async (req,res) => {                  
    try {
        const newEmployee = new employeeModel(req.body)
        const employs = await newEmployee.save()
        return res.status(201).send(employs)
    }
    catch (error) {
        return res.status(400).send(error)
    }

});


// 5. Show details of employee by id
routes.get('/employees/:eid', async (req,res) => {
    try {
        const employs = await employeeModel.findById(req.params.eid)
        return res.status(200).send(employs)
    }
    catch (error) {
        return res.status(400).send({
            message : "ID does not exists"
        })
    }

});


// 6. Update employee details using id
routes.put('/employees/:eid', async (req,res) => {
    try {
        const updateEmployee = await employeeModel.findByIdAndUpdate(req.params.eid, req.body)
        return res.status(200).send({
            updateEmployee,
            message : "Succesfully updated"
        })
    }
    catch (error) {
        return res.status(400).send(error)
    }

});


//http://localhost:8080/api/emp/employees?id=
// 7. Delete employee by employee id using query
routes.delete('/employees', async (req,res) => {
    try {
        const deleteEmployee = await employeeModel.findByIdAndDelete(req.query.id)

        if(!deleteEmployee){
            return res.status(400).send({message:"No employee deleted"})
        }

        return res.status(204).send(deleteEmployee)

    }
    catch (error) {
        return res.status(400).send({
            error,
            message : "ID does not exists"
        })
    }

});



module.exports = routes