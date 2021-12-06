import asyncHandler from 'express-async-handler'
import User from '../models/userModel.js'
import LeadGenerate from '../models/leadgenerateModel.js'
import generateToken from '../utils/generateToken.js'
import nodemailer from 'nodemailer'



// @desc   Regsiter a new User
// @route  POST /api/users
// @access Public
const registerUser = asyncHandler(async (req,res) => {

    const {name , email , password} = req.body

    const userExists = await User.findOne({email: email})

    if(userExists){
        res.status(400)
        throw new Error('User already Exists')
    }

    const user = await User.create({
        name,
        email,
        password
    })

    if(user) {
        res.json({
            _id: user._id,
            name: user.name,
            email: user.email,
            isLeadCreator: user.isLeadCreator,
            isLeadExecutive: user.isLeadExecutive,
            isLeadManager: user.isLeadManager,
            token: generateToken(user._id),
        })
    }

    else{
        res.status(400)
        throw new Error('Invalid user data')
    }

   
})




// @desc   Auth user & get token
// @route  POST /api/users/login
// @access Public
const authUser = asyncHandler(async (req,res) => {

    const {email , password} = req.body

    const user = await User.findOne({email: email})

    if (user && (await user.matchPassword(password))){
        res.json({
            _id: user._id,
            name: user.name,
            email: user.email,
            isLeadCreator: user.isLeadCreator,
            isLeadExecutive: user.isLeadExecutive,
            isLeadManager: user.isLeadManager,
            token: generateToken(user._id),
        })
    } 

    else{
        res.status(401)
        throw new Error('Invalid email or password')
    }
})

// @desc   create a new Lead
// @route  POST /api/users/createlead
// @access Private/ LeadCreator
const createLead = asyncHandler(async (req,res) => {

    const {user , customerName, customerRepresentative, image} = req.body

    const lead = await LeadGenerate.create({
        user: user,
        customerName: customerName,
        customerRepresentative: customerRepresentative,
        image: image
    })

    if(lead) {
        res.json({
            user: lead.user,
            customerName: lead.customerName,
            customerRepresentative: lead.customerRepresentative,
            image: lead.image,
            isMarked:lead.isMarked
        })
    }

    else{
        res.status(400)
        throw new Error('Invalid data')
    }

   
})

// @desc   Get all leadsCreated
// @route  GET /api/users/leads
// @access Private/LeadManager
const getLeads = asyncHandler(async (req,res) => {
    const leads = await LeadGenerate.find({})
    res.json(leads)
})


// @desc   Update lead
// @route  PUT /api/users/:id/edit
// @access Private/LeadManager
const updateLead = asyncHandler(async (req,res) => {
    const lead = await LeadGenerate.findById(req.params.id) 

    //console.log(user)

    if (lead) {
        lead.customerName = req.body.customerName || lead.customerName,
        lead.customerRepresentative = req.body.customerRepresentative || lead.customerRepresentative
        lead.isMarked = req.body.isMarked 

        const updatedLead = await lead.save()

        res.json({
            _id: updatedLead._id,
            customerName: updatedLead.customerName,
            customerRepresentative: updatedLead.customerRepresentative,
            isMarked: updatedLead.isMarked,
        })
    }

    else{
        res.status(404)
        throw new Error('Lead not found')
    }
})

// @desc   Get lead by ID
// @route  GET /api/users/:id
// @access Private/leadManager
const getLeadById = asyncHandler(async (req,res) => {
    const lead = await LeadGenerate.findById(req.params.id)
    if(lead){
        res.json(lead)
    }
    else{
        res.status(404)
        throw new Error('Lead not found')
    }
})



//
const sendEmail = asyncHandler(async (req,res) => {
            "use strict";

            async function main() {
            
            let testAccount = await nodemailer.createTestAccount();

            let transporter = nodemailer.createTransport({
                host: "smtp.ethereal.email",
                port: 587,
                secure: false, 
                auth: {
                user: testAccount.user, 
                pass: testAccount.pass, 
                },
            });

            
            let info = await transporter.sendMail({
                from: '"Fred Foo 👻" <aneel.huzaifa@gmail.com>', // sender address
                to: "huzaifaaneel09@gmail.com", // list of receivers
                subject: "Hello ✔", // Subject line
                text: "Your account activated", // plain text body
                html: "Your account activated", // html body
            });

            if(info){
                res.send("email sent")
            }

            console.log("Message sent: %s", info.messageId);
            // Message sent: <b658f8ca-6296-ccf4-8306-87d57a0b4321@example.com>

            // Preview only available when sending through an Ethereal account
            console.log("Preview URL: %s", nodemailer.getTestMessageUrl(info));
            // Preview URL: https://ethereal.email/message/WaQKMgKddxQDoou...
            }

            main().catch(console.error);
})




export {registerUser, authUser, createLead, getLeads, updateLead, getLeadById,sendEmail}