const mongoose = require('mongoose');

const employeeSchema = new mongoose.Schema({
    first_name : {
        type: String,
        require: true,
        maxlength: 100

    },

    last_name : {
        type: String,
        require: true,
        maxlength: 50
    },

    email : {
        type: String,
        require: true,
        maxlength: 50,
        unique: true
    },

    gender : {
        type: String,
        require: true,
        lowercase: true,
        enum: {
            values: ['male', 'female', 'other'],
            message: 'value must be male, female or other only'
        
        },
        maxlength: 25
    },

    salary : {
        type: Number,
        require: true,
    },
    
})

const Employee = mongoose.model("Employee", employeeSchema)
module.exports = Employee