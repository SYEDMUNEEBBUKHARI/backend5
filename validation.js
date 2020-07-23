const Joi = require('@hapi/joi');


const registerValidation = (data) => {
    const schema = Joi.object({


        Name: Joi.string()

            .min(3)
            .max(30)
            .required(),

        Email: Joi.string()
            .min(6)
            .required()
            .email(),
        password: Joi.string()
            .pattern(new RegExp('^[a-zA-Z0-9]{3,30}$')),


        password: Joi.string()
            .min(6)
            .required()
        ,

        City: Joi.string()
            .min(6)
            .required()
        ,
        Country: Joi.string()
            .min(6)
            .required()
        ,
        Address: Joi.string()
            .min(6)
            .required()

        ,
        ipfsHash: Joi.string()


    });
    return schema.validate(data);
}












const loginValidation = (data) => {
    const schema = Joi.object({
        Email: Joi.string()
            .min(6)
            .required()
            .email(),
        password: Joi.string()
            .pattern(new RegExp('^[a-zA-Z0-9]{3,30}$')),

    });
    return schema.validate(data);
}




const NotificationValidation = (data) => {
    const schema = Joi.object({
        FromUser: Joi.string()
            .min(6)
            .required(),
        ToUser: Joi.string()
            .min(6)
            .required()
        ,
        LandId: Joi.string()
            .min(6)
            .required()



    });
    return schema.validate(data);
}
















const LanddataValidation = (data) => {
    const schema = Joi.object({
        Name: Joi.string()
            .min(6)
            .required(), Metamaskid: Joi.string()
                .min(6)
                .required(),
        Cnic: Joi.string()
            .min(6)
            .required(),
        City: Joi.string()
            .min(6)
            .required()
        ,
        StreetNo: Joi.string()
            .min(6)
            .required()
        ,
        Postcode: Joi.string()
            .min(6)
            .required(),
        SerialNo: Joi.string()
            .min(6)
            .required(),
        Province: Joi.string()
            .min(6)
            .required(),
        LandNo: Joi.string()
            .min(6)
            .required(),
        Country: Joi.string()
            .min(6)
            .required(),
        LandArea: Joi.string()
            .min(6)
            .required(),

        LandLocation: Joi.string()
            .min(6)
            .required()


    });
    return schema.validate(data);
}



const PunjabLanddataValidation = (data) => {
    const schema = Joi.object({
        Name: Joi.string()
            .min(6)
            .required(),
        Cnic: Joi.string()
            .min(6)
            .required(),
        City: Joi.string()
            .min(6)
            .required()
        ,
        StreetNo: Joi.string()
            .min(1)
            .required()
        ,
        Postcode: Joi.string()
            .min(6)
            .required(),
        SerialNo: Joi.string()
            .min(6)
            .required(),
        Province: Joi.string()
            .min(6)
            .required(),
        LandNo: Joi.string()
            .min(1)
            .required(),
        Country: Joi.string()
            .min(6)
            .required(),
        LandArea: Joi.string()
            .min(1)
            .required(),
        LandLocation: Joi.string()
            .min(6)
            .required()


    });
    return schema.validate(data);
}








module.exports.registerValidation = registerValidation;
module.exports.loginValidation = loginValidation;
module.exports.NotificationValidation = NotificationValidation;
module.exports.LanddataValidation = LanddataValidation;
module.exports.PunjabLanddataValidation = PunjabLanddataValidation;