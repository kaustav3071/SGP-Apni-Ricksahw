const SaarthiModel = require('../models/saarthi.model.js');
const { validationResult } = require('express-validator');
const saarthiService = require('../services/saarthi.service.js');


module.exports.registerSaarthi = async (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    const { fullName, email, password, vehicle } = req.body;

    const isSaarthiAlreadyRegistered = await SaarthiModel.findOne({ email });
    const isVehicleAlreadyRegistered = await SaarthiModel.findOne({ "vehicle.plate": vehicle.plate });


    if (isSaarthiAlreadyRegistered) {
        return res.status(400).json({ message: "Saarthi email already registered" });
    }

    if (isVehicleAlreadyRegistered) {
        return res.status(400).json({ message: "Vehicle already registered"
        });
    }
    
    const hashedPassword = await SaarthiModel.hashPassword(password);

    const newSaarthi = new SaarthiModel({
        fullName: {
            firstName: fullName.firstName,
            lastName: fullName.lastName
        },
        email,
        password: hashedPassword,
        vehicle: {
            color: vehicle.color,
            plate: vehicle.plate,
            capacity: vehicle.capacity,
            type: vehicle.type
        }
    });

    await newSaarthi.save();

    const token = newSaarthi.generateAuthToken();

    res.status(201).json({ token, user: newSaarthi });
}