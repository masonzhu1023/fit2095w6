const mongoose= require ("mongoose");

const doctorsSchema= mongoose.Schema({
_id: {type:mongoose.Schema.Types.ObjectId,
auto:true},
fullname:{
    type:String,
    required:true,//cannot be empty
},
lastname:String,
DOB:Date,
address:{
    State:String,
    Suburb:String,
    Street:String,
    Unit:Number,
},
numberPatients:{
    type:Number,
    validate:{
        validator:function(patientsNumber){
            return patientsNumber >0;
        },
        message:'Number of patients should be positive'
    }
}
});

module.exports = mongoose.model('Doctors', doctorsSchema);