const mongoose=require('mongoose');


const mongourl="mongodb://user:user123@ds349045.mlab.com:49045/shudhwater"
mongoose.Promise=global.Promise
mongoose.connect(mongourl)

const temp_schema=new mongoose.Schema({
    device_id:String,
    Name:String,
    Password:String,
    MobileNo:{type:String,unique:true},
    Email:{type:String,unique:true},
    IMEI:{type:String,unique:true},
    Flag:{type:Number,default:0},
    Date:{type:Date}
})
const perma_schema=new mongoose.Schema({
    device_id:String,
    Name:String,
    Password:String,
    MobileNo:{type:String,unique:true},
    Email:{type:String,unique:true},
    IMEI:{type:String,unique:true},
    Flag:{type:Number,default:0},
    Date:{type:Date}
})

const temp_model=mongoose.model('temp',temp_schema);
const perma_model=mongoose.model('perma',perma_schema);


module.exports={
    temp:temp_model,
    perma:perma_model
}