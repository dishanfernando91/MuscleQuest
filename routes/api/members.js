const express = require('express');
const router = express.Router()
const { check, validationResult } = require('express-validator')
const Members = require('../../models/Members');

// Member updation pending.

// @route   api/members
// @desc    GET all members  
// @access  Private
router.get('/', async (req, res) => {
    try {
        const members = await Members.find()
        res.json(members)
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error')
    }
    
});

// @route   api/members
// @desc    Create or update a member
// @access  Private
router.post('/', 
    [
        // check('memberId', 'Please include an ID').not().isEmpty(),
        // check('firstName', 'Please include a first name.')
    ], async (req, res) => {
        // const errors = validationResult(req)
        // if(!errors.isEmpty()) {
        //     return res.status(400).json({ errors: errors.array()})
        // }
        
        let { 
            // memberId, 
            firstName, 
            lastName, 
            dateOfBirth, 
            address,
            phoneNumber, 
            gender, 
            features, 
            status 
        } = req. body

    
        let newMember = new Members({
            // memberId,
            firstName,
            lastName,
            dateOfBirth,
            address,
            phoneNumber,
            gender,
            features,
            status
        });

    try {
        await newMember.save()
        res.status(200).json({ msg: 'Member created'})
    } catch (err) {
        console.error(err);
        res.status(500).send('Server error')
    }
    
});

// @route   api/members/:id
// @desc    GET a single member
// @access  Private
router.get('/:id', async (req, res) => {
    try {
        const member = await Members.findById(req.params.id)
        if(!member) {
            return res.status(400).send('Member not found.')
        }
        res.json(member)
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error')
    }
  
});

module.exports = router;