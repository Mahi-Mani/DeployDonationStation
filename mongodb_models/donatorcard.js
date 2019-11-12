const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const donatorCardSchema = new Schema({
    startdate: { type: String },
    enddate: { type: String },
    category: { type: String },
    item: { type: String },
    location: { type: String },
    itemnumber: { type: Number },
    image: { type: String }
    });

    const DonatorCard = mongoose.model("DonatorCard", donatorCardSchema);

module.exports = DonatorCard;
    
