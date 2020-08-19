const mongoose = require('mongoose');

const Category = mongoose.model('Category', new mongoose.Schema({
    name:{
        type: String,
        required: true,
    },
    icon:{
        type: String,
        required: true,
    },
    color:{
        type: String,
        required: true,
    }

}));

exports.Category = Category;