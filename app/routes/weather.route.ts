import WeatherController from '@/controllers/WeatherController';
import { Router } from 'express';

const path = '/Weather';
const WeatherRouter = Router({ mergeParams: true });

/**
 * @openapi
 * /Weather/{WeatherId}:
 *   get:
 *     tags: [Weather]
 *     summary: Get Weather.
 *     description: Get specific Weather.
 *     operationId: getOne
 *     parameters:
 *       - in: path
 *         name: WeatherId
 *         schema:
 *           type: string
 *           example: 201301
 *         required: true
 *         description: Id of Weather to get.
 *     responses:
 *       200:
 *         description: Successful operation.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                  data:
 *                      type: object
 *                      $ref: '#/components/schemas/Weather'
 *                  message:
 *                      type: string
 *                      example: Weather retrieved successfully
 *                  success:
 *                      type: boolean
 *                      example: true
 *       500:
 *         description: Server could not handle the request.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/500'
 *       401:
 *         description: Unauthenticated Weather
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/401'
 *     security: [jwt_api_auth: []]
 */
WeatherRouter.get(`${path}/:WeatherId`, WeatherController.getOne);

export default WeatherRouter;
