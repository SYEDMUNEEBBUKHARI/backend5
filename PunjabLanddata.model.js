const mongoose = require("mongoose");
const Schema = mongoose.Schema;


let PunjabLanddata = new Schema({
    Name: {
        type: String,
        required: true,
        min: 6,
        max: 255
    }, Cnic: {
        type: String,
        required: true,
        min: 6,
        max: 255
    }
    ,
    City: {
        type: String
        , required: true,
        min: 6,
        max: 255

    },
    StreetNo: {
        type: String
        , required: true,
        min: 6,
        max: 255


    },
    Postcode: {

        type: String
        , required: true,
        min: 6,
        max: 255

    },
    SerialNo: {

        type: String
        , required: true,
        min: 6,
        max: 255

    },
    Province: {

        type: String
        , required: true,
        min: 6,
        max: 255



    },
    LandNo: {

        type: String
        , required: true,
        min: 6,
        max: 255

    },
    Country: {
        type: String
        , required: true,
        min: 6,
        max: 255

    },
    LandArea: {
        type: String
        , required: true,
        min: 6,
        max: 255

    },
    LandLocation: {
        type: String
        , required: true,
        min: 6,
        max: 255

    }




});

module.exports = mongoose.model('PunjabLanddata', PunjabLanddata);