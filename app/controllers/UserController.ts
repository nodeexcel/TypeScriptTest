import { RESPONSE_CODE, RESPONSE_FAILURE, RESPONSE_SUCCESS } from '@/common/Constants';
import { locale } from '@/config/locales';
import UserFactory from '@/factories/UserFactory';
import UserService from '@/services/UserService';
import { sendResponse } from '@/utils/common';
import { logger } from '@/utils/logger';
import { isEmpty, isObjectId } from '@utils/util';
import { NextFunction, Request, Response } from 'express';

class UserController {
    static async create(req: Request, res: Response) {
        if (isEmpty(req.body)) return sendResponse(res, {}, locale('User_INVALID_DATA'), RESPONSE_FAILURE, RESPONSE_CODE.BAD_REQUEST);
        const UserData = UserFactory.generateUser(req.body);
        const User = await UserService.create(UserData);

        return sendResponse(res, User, locale('User_CREATE_SUCCESS'), RESPONSE_SUCCESS, RESPONSE_CODE.CREATED);
    }

    static getAll = async (req: Request, res: Response, next: NextFunction) => {
        try {
            const Users = await UserService.list();
            return sendResponse(res, Users, locale('User_GET_ALL_SUCCESS'), RESPONSE_SUCCESS, RESPONSE_CODE.SUCCESS);
        } catch (error) {
            logger.error('UserController.getAll() Error: ', error);
            next(error);
        }
    };

    static getOne = async (req: Request, res: Response, next: NextFunction) => {
        try {
            if (!isObjectId(req.params.UserId)) return sendResponse(res, {}, locale('User_INVALID_ID'), RESPONSE_FAILURE, RESPONSE_CODE.BAD_REQUEST);
            const UserId: string = req.params.UserId;
            const findOneUserData = await UserService.readById(UserId);
            return sendResponse(res, findOneUserData, locale('User_GET_ONE_SUCCESS'), RESPONSE_SUCCESS, RESPONSE_CODE.SUCCESS);
        } catch (error) {
            logger.error('UserController.getOne() Error: ', error);
            next(error);
        }
    };

    static update = async (req: Request, res: Response, next: NextFunction) => {
        try {
            if (!isObjectId(req.params.UserId)) return sendResponse(res, {}, locale('User_INVALID_ID'), RESPONSE_FAILURE, RESPONSE_CODE.BAD_REQUEST);
            if (isEmpty(req.body)) return sendResponse(res, {}, locale('User_INVALID_DATA'), RESPONSE_FAILURE, RESPONSE_CODE.BAD_REQUEST);
            const UserId: string = req.params.UserId;
            const UserData = req.body;
            const updateUserData = await UserService.updateById(UserId, { $set: UserData });

            return sendResponse(res, updateUserData, locale('User_UPDATE_SUCCESS'), RESPONSE_SUCCESS, RESPONSE_CODE.SUCCESS);
        } catch (error) {
            logger.error('UserController.update() Error: ', error);
            next(error);
        }
    };

    static delete = async (req: Request, res: Response, next: NextFunction) => {
        try {
            if (!isObjectId(req.params.UserId)) return sendResponse(res, {}, locale('User_INVALID_ID'), RESPONSE_FAILURE, RESPONSE_CODE.BAD_REQUEST);
            const UserId: string = req.params.UserId;
            await UserService.deleteById(UserId);

            return sendResponse(res, null, locale('User_DELETE_SUCCESS'), RESPONSE_SUCCESS, RESPONSE_CODE.SUCCESS);
        } catch (error) {
            logger.error('UserController.delete() Error: ', error);
            next(error);
        }
    };
}

export default UserController;
