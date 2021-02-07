const router = require('express').Router();
const Payments = require('../../models/Payments');
const { check, validationResult } = require('express-validator')

// @route   api/payments
// @desc    GET all payments  
// @access  Unknown
router.get('/', async (req, res) => {
  try {
    const payments = await Payments.find()
    res.json(payments)
  } catch (err) {
    console.error(err.message)
    res.status(500).send('Server Error')
  }
  
});

// @route   api/payments/history
// @desc    GET all payments  
// @access  Private
router.get('/history', (req, res) => {
  Payments.find()
      .then(payments => res.json(payments))
      .catch(err => res.status(400).json(`Error: ${err}`))
});

// @route   api/payments/add
// @desc    POST a new payment 
// @access  Private
router.post('/add', [
  check('payment.*.payments.*.memberID', 'Member required.').not().isEmpty(),
  check('payment.*.payments.*.package', 'Package required.').not().isEmpty()
  ],
 async (req, res) => {

      const { year, month, body, payments } = req.body

      const errors = validationResult(req)
        if(!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array()})
        }

      const newPayment = new Payments({
        year,
        month,
        payments
      });

      try {
        const result = await newPayment.save()
        if(result) res.json("Transaction Done!")
      } 
      catch (error) {
        console.error(error)
        res.json(`Error: ${err}`)
      }
});

// @route   api/payments/update/:id
// @desc    Add new payment to existing period  
// @access  Private
router.put('/update/:id', [
  check('payments.*.memberID', 'Member required.').not().isEmpty(),
  check('payments.*.package', 'Package required.').not().isEmpty(),
  check('payments.*.memberID').custom(id => {
    return Payments.findOne({'payments.memberID': id.toString() })
        .then(entry => {
          if(entry) {
            return Promise.reject("Duplicate entry")
          }
    })
  })
],
(req, res) => {

    const errors = validationResult(req)
    if(!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array()})
    }

    Payments.findOneAndUpdate({_id: req.params.id}, {$push: {payments : req.body.payments}})
          .then(() => res.json('Payment added to existing period...'))
          .catch(err => res.status(400).json('Error: ' + err));
  });

module.exports = router;