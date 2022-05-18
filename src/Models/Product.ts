import { Document, Schema, model, Types} from "mongoose";

export interface IProduct extends Document {
    title: string,
    imageUrl?: string,
    type: string,
    creator?: Types.ObjectId
}

const productSchema:Schema = new Schema({
    title: {
        type: String,
        require: true
    },
    imageUrl: {
        type: String,
        required: false
    },
    type: {
        type: String,
        required: true
    },
    creator: {
        type: Schema.Types.ObjectId,
        required: false
    },
}, { timestamps: { createdAt: 'createdDate', updatedAt: 'updatedDate' } });

export default  model<IProduct>("Product", productSchema); 
