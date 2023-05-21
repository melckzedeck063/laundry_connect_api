const mongoose =  require('mongoose');

const LaundrySchema = mongoose.Schema({
    laundryName : {
        type : String,
        required :  [true, 'laundry name  is required'],
        trim : true
    },
    location :  {
        type : String,
        required : [true, 'Location is required'],
        trim :  true
    },
    description : {
        type : String,
        required : true,
        trim  : true
    },
    phone : {
        type : String,
        minLength : [10, "not less than 10"],
        maxLength  :  [10, 'Not  longer than  10'],
        trim : true
    },
    email  :  {
        type : String,
        unique : [true, "Provided email already exist, try another  one"],
        lowercase : true,
        validate : [validator.isEmail, 'Please provide a valid email'],
        default : ""
    },
    owner : {
        type : mongoose.Schema.ObjectId,
        ref  : 'User',
        required  : true,
        trim  :  true
    },
    date_created :  {
        type : Date,
        default : Date.now()
    },
    photo : String
})


LaundrySchema.pre(/^find/, function(next){
    this.populate({
        path  : 'created_by',
        select: '-password -  __V -role'
    })

    next();
})

const Laundry =   mongoose.model('Laundry', LaundrySchema);
module.exports  = Laundry;