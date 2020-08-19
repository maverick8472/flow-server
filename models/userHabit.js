const mongoose = require('mongoose');

const userHabit = mongoose.model('userHabit', new mongoose.Schema({
    name: {
        type: String,
        required: true,
        minlength: 3,
        maxlength: 20,
    },
    userId:{
        type: String,
        required: true,
    },
    categoryId:{
        type: String,
        required: true,
    },
    date:{
        type: Date,
        required: true,
    },
    reminder:{
        type: Date,
    },
    logs:[
        {   
            time: {type: Date}, 
            value: Number
        }
    ],

    

}));

exports.userHabit = userHabit;
