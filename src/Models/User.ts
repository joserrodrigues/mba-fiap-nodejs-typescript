import { Document, Schema, model, Types} from "mongoose";

export interface IUser extends Document {
    _id: string,
    email: string,
    password: string,
    name: string,
    products: Types.ObjectId
}

const userSchema:Schema = new Schema({
    email: {
        type: String,
        require: true
    },
    password: {
        type: String,
        required: true
    },
    name: {
        type: String,
        required: true
    },    
    products: [{
        type: Schema.Types.ObjectId,
        required: true
    }]
}, { timestamps: { createdAt: 'createdDate', updatedAt: 'updatedDate' } });

export default  model<IUser>("User", userSchema); 
