import mongoose from 'mongoose'

const leadgenerateSchema = mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },
    customerName: {
        type: String,
        required: true
    },
    customerRepresentative: {
        type: String,
        required: true,
    },

    linkedin: {
        type: String,
        default: null
    },
    contact: {
        type: Number,
        default: null
    },
    linkedin: {
        type: String,
        default: null
    },
    leadAssignedTo: {
        type: String,
        default: null
    },

    nextFollowup:{
        type:Date,
        default: null
    },

    followUpEmail:{
        type: String,
        default: null
    },

    followUpQutation:{
        type: String,
        default: null
    },

    followUpletter:{
        type: String,
        default: null
    },
   
    remarks:{
        type: String,
        default: null
    },
    image:{
        type: String,
        default: null
    },
    isMarked: {
        type:Boolean,
        default: false
    }
}, 
    {
        timestamps: true
    }
)


const LeadGenerate = mongoose.model('LeadGenerate', leadgenerateSchema)

export default LeadGenerate
