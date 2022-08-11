import { Document, model, Schema } from 'mongoose';

interface IUser extends Document {
    name: string;
    address: string;
    phone: string;
    bloodType: string;
    firstName: string;
    lastName: string;
    // Add more fields
}

const UserSchema = new Schema({
    name: { type: String, required: true },
    address: { type: String, required: true },
    phone: { type: String, required: true },
    bloodType: { type: String, required: true },
    firstName: { type: String, required: true },
    lastName: { type: String, required: true },
    // Add more fields
});

const User = model<IUser>('User', UserSchema, 'User');

export { User, IUser };

