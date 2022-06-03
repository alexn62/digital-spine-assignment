import mongoose from 'mongoose';
import { userSchema } from '../schemas/user.schema';

export const User = mongoose.model('User', userSchema);
