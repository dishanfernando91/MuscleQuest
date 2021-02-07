const Payments = require('../models/Payments')

export default function validatePayment(req, res, next) {

    let year = new Date().getFullYear().toString();
    let month = new Date().getMonth().toString();

    return Payments.findOne({ year: year, month: month, payments: { memberID: req.body.memberID }})
        .then(entry => {
            if(entry) {
                console.log("Found");
            }
        })
}