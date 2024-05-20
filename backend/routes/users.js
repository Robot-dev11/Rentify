const express = require('express');
const { User, Seller } = require('../db');
const { z } = require('zod');
const jwt = require('jsonwebtoken');
const { JWT_SECRET } = require('../config');
const router = express.Router();


router.use(express.json());
router.use(express.urlencoded({extended: true}));

const signUpBody = z.object({
    firstName: z.string().max(50),
    lastName: z.string().max(50),
    email: z.string().email(),
    password: z.string().min(8),
    phoneNumber: z.string().length(10),
})

const signInBody = z.object({
    email: z.string().email(),
    password: z.string()
})

router.post('/signup', async (req, res) => {
    try {
        console.log(req.body);

        const { success } = signUpBody.safeParse(req.body);
        console.log(success);

        if(!success){
            return res.status(411).json({
                message: "Incorrect Inputs"
            })
        }

        const existingUser = await User.findOne({
            email: req.body.email
        })

        if(existingUser){
            return res.status(411).json({
                message: 'Email already taken'
            })
        }

        const user = await User.create({
            firstName: req.body.firstName,
            lastName: req.body.lastName,
            email: req.body.email,
            password: req.body.password,
            phoneNumber: req.body.phoneNumber
        })

        const userId = user._id;

        const token = jwt.sign({
            userId
        }, JWT_SECRET)

        res.status(200).json({
            message: "User created Successfully",
            token: token
        })
    } catch (err) {
        console.error(err);
        res.status(500).json({
            message: err
        })
    }
})

router.post('/signin', async (req, res) => {
    try {
        const { success } = signInBody.safeParse(req.body);

        if(!success){
            return res.status(411).json({
                message: 'Incorrect Inputs'
            })
        }

        const user = await User.findOne({
            email: req.body.email,
            password: req.body.password,
        })

        if(user){
            const token = jwt.sign({
                userId: user._id
            }, JWT_SECRET)
    
            return res.status(200).json({
                token: token
            })
        } else {
            return res.status(400).json({
                message: 'Invalid username/ password'
            })
        }
    
    } catch(err){
        console.error(err);
        res.status(500).json({
            message: err
        })
    }
})

module.exports = router;