const mongoose = require('mongoose');

const Habit = mongoose.model('Habit', new mongoose.Schema({
    name: {
        type: String,
        required: true,
        minlength: 3,
        maxlength: 20,
    },
    imageUrl:{
        type: URL,
        required: true,
    },
    categoryId:{
        type: String,
        required: true,
    },
    dificulty:{
        type: Number,
        required: true,
        min: 1,
        max: 10
    },
    daysToForm:{type: Number,
        required: true,
        min: 7,
    },
    instructions:{
        type: String,
        required: true,
        minlength: 1,
    }

}));

exports.Habit = Habit;
