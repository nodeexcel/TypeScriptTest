import { RESPONSE_CODE, RESPONSE_SUCCESS } from '@/common/Constants';
import { locale } from '@/config/locales';
import WeatherService from '@/services/WeatherService';
import { sendResponse } from '@/utils/common';
import { logger } from '@/utils/logger';
import { NextFunction, Request, Response } from 'express';

class WeatherController {
    static getOne = async (req: Request, res: Response, next: NextFunction) => {
        try {
            const zipcode: string = req.params.WeatherId;
            const findOneWeatherData = await WeatherService.readById(zipcode);
            return sendResponse(res, findOneWeatherData, locale('Weather_GET_ONE_SUCCESS'), RESPONSE_SUCCESS, RESPONSE_CODE.SUCCESS);
        } catch (error) {
            logger.error('WeatherController.getOne() Error: ', error);
            next(error);
        }
    };
}

export default WeatherController;
