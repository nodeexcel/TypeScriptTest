import { ILooseObject } from '@/common/interfaces/ILooseObject';
import { IUser, User } from '@/models/User';
import InvalidBuildDataError from '@common/errors/InvalidBuildDataError';
import BaseFactory from './BaseFactory';

export default class UserFactory extends BaseFactory {
    static checkKeysInModel(keys: string | string[]): { result: boolean; message?: string } {
        return super._checkKeysInModel(keys, User);
    }

    static generateUser(data: any): IUser {
        if (this.checkValidBuildData(data)) {
            return new User(data);
        } else {
            throw new InvalidBuildDataError('User');
        }
    }

    static checkValidBuildData(data: ILooseObject): boolean {
        return !!data && data.name && data.address && data.phone && data.bloodType && data.firstName && data.lastName;
    }
}
