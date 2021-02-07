const router = require('express').Router();
const { check, validationResult } = require('express-validator')
let Packages = require('../../models/Packages');

// @route   api/packages
// @desc    Get all packages
// @access  Private
router.get('/', async (req, res) => {
    try {
        const packages = await Packages.find()
        res.json(packages)
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error')
    }
}); 

// @route   api/packages
// @desc    Create a package
// @access  Private
router.post('/', 
    [
        check('title', 'Package Title is required.').not().isEmpty(),
        check('fee', 'Package fee is required').not().isEmpty(),
        check('title').custom(title => {
            return Packages.findOne({ title: title }).exec().then(title => {
            if(title) {
                return Promise.reject('Duplicate Title');
            }
            });
        }),
    ],
    async (req, res) => {
        const errors = validationResult(req)
            if(!errors.isEmpty()) {
                return res.status(400).json({ errors: errors.array()})
            }
        
    const { title, fee, duration } = req.body

    const newPackage = new Packages({
        title,
        fee,
        duration
    });

    await newPackage.save()
    res.json({ msg: "New Package Created!"})
});

// @route   api/packages/:id
// @desc    Update package status
// @access  Private
router.post('/:id', (req, res) => {
    Packages.findById(req.params.id)
      .then(package => {
        package.title = req.body.title;
        package.fee = req.body.fee;
        package.duration = req.body.duration;
        package.status = req.body.status;

        package.save()
          .then(() => res.json('Package set to inactive!'))
          .catch(err => res.status(400).json('Error: ' + err));
      })
      .catch(err => res.status(400).json('Error: ' + err));
  });


module.exports = router;