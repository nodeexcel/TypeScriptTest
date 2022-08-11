import { ILooseObject } from '@/common/interfaces/ILooseObject';
import { IUser, User } from '@models/User';
import { ObjectId, QueryOptions, UpdateQuery } from 'mongoose';

export default class UserService {
    static async create(resource: IUser): Promise<IUser> {
        return await resource.save();
    }

    static async list(findOptions: QueryOptions = {}, sortOptions: ILooseObject = {}, page?: number, limit?: number): Promise<IUser[]> {
        const cursor = User.find({}, findOptions);
        if (sortOptions) {
            cursor.sort(sortOptions);
        }
        if (page != undefined && limit) {
            cursor.skip(Math.max(page - 1, 0) * limit).limit(limit);
        }
        return cursor;
    }

    static async readById(id: string): Promise<IUser | null> {
        return User.findById(id).select('-__v');
    }

    static async updateById(administratorId: string, administratorFields: UpdateQuery<IUser>): Promise<IUser> {
        const existingUser = await User.findByIdAndUpdate(administratorId, administratorFields, { new: true });
        return existingUser;
    }

    static async deleteById(id: string | ObjectId): Promise<IUser | null> {
        return User.findByIdAndRemove(id);
    }
}
