const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const Review = require("./review.js");

const listingSchema = new Schema({
    title:{
        type:String,
        required:true,
    },
    description:String,
    image:{
        url:String,
        filename :String,
    },
    price :Number,
    location:String,
    country:String,
    reviews:[
        {
            type:mongoose.Schema.Types.ObjectId,
            ref:"Review",
        }
    ],

    owner:{
        type:Schema.Types.ObjectId,
        ref:"User",
        required: true
    },
    category:{
        type:String,
        enum:["mountains","farms","arctic","castle","iconic cities","desert"]
    }

    

});

//this deletes reviews of listing if listing  get deleted
listingSchema.post("findOneAndDelete",async(listing)=>{
    if(listing){
        await Review.deleteMany({_id:{$in:listing.reviews}});

    }
});

const Listing = mongoose.model("Listing",listingSchema);
module.exports=Listing;
