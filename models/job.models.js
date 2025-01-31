const mongoose  = require('mongoose');


const jobSchema = new mongoose.Schema({
    jobtitle:{
        required: true,
        type: String
    },
    companyDetails:{
        name:{
            type: String,
            required: true
        },
        location:{
            type: String,
            required: true
        },
        salary:{
            type: Number,
            required: true
        },
        jobType:{
            type: String,
            required: true,
            enum:["Full-time(on-site)", "Part-time(on-site)","Full-time(remote", "Part-time(remote)",]
        }
    },
    requiredQualifications:{
        required: true,
        type: [String]
    },
    description:{
        required:true,
        type:String
    }
}) 


const Job  = mongoose.model('Job', jobSchema);


module.exports = Job;