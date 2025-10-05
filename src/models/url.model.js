import mongoose from "mongoose";

const urlSchema = new mongoose.Schema({
    originalUrl: {
        type: String,
        trim: true,
        required: [true, "Original URL is needed"]
    },
    shortId: {
        type: String,
        required: [true, 'ShortId is required'],
        unique: true
    },
    clicks: {
        type: Number,
        default: 0
    }
}, {
    timestamps: true
});

urlSchema.methods.incrementClicks = async function() {
    this.clicks += 1;
    await this.save();
}

const Url = mongoose.model('Url', urlSchema);

export default Url;