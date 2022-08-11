import TodoRouter from '@/routes/todo.route';
import UserRouter from '@/routes/user.route';
import { IRoutes } from '@common/interfaces/IRoutes';
import DemoRouter from '@routes/demo.route';
import WeatherRouter from '@routes/weather.route';
import { logger } from '@utils/logger';
import { Router } from 'express';

export class IndexRoute implements IRoutes {
    public path = '/api';
    public router = Router({ mergeParams: true });
    public routerArray = [];

    constructor() {
        this.initializeRoutes();
    }

    private initializeRoutes() {
        this.router.use(this.path, DemoRouter);
        this.router.use(this.path, TodoRouter);
        this.router.use(this.path, UserRouter);
        this.router.use(this.path, WeatherRouter);
        logger.info('Routes initiated...');
    }
}
