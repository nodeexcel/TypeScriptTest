import UserController from '@/controllers/UserController';
import UserAuthenticator from '@common/middlewares/UserAuthenticator';
import { Router } from 'express';

const path = '/User';
const UserRouter = Router({ mergeParams: true });

/**
 * @openapi
 * /User:
 *   get:
 *     tags: [User]
 *     summary: Get User.
 *     description: Get all Users.
 *     operationId: getAll
 *     parameters:
 *       - in: query
 *         name: limit
 *         schema:
 *           type: integer
 *           example: 25
 *         description: Numbers of records from server.
 *       - in: query
 *         name: page
 *         schema:
 *           type: integer
 *           example: 2
 *           minimum: 1
 *         description: Page number of pagination request.
 *     responses:
 *       200:
 *         description: Successful operation.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 data:
 *                   type: array
 *                   items:
 *                      $ref: '#/components/schemas/User'
 *                 message:
 *                    type: string
 *                    example: User(s) retrieved successfully
 *                 success:
 *                    type: boolean
 *                    example: true
 *       500:
 *         description: Server could not handle the request.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/500'
 *       401:
 *         description: Unauthenticated User
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/401'
 *     security: [jwt_api_auth: []]
 */
UserRouter.get(`${path}`, UserAuthenticator.isAdminAuthenticated(), UserController.getAll);
/**
 * @openapi
 * /User/{UserId}:
 *   get:
 *     tags: [User]
 *     summary: Get User.
 *     description: Get specific User.
 *     operationId: getOne
 *     parameters:
 *       - in: path
 *         name: UserId
 *         schema:
 *           type: string
 *           example: 577417e645d1b2640cd1f6e6
 *         required: true
 *         description: Id of User to get.
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
 *                      $ref: '#/components/schemas/User'
 *                  message:
 *                      type: string
 *                      example: User retrieved successfully
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
 *         description: Unauthenticated User
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/401'
 *     security: [jwt_api_auth: []]
 */
UserRouter.get(`${path}/:UserId`, UserAuthenticator.isAdminAuthenticated(), UserController.getOne);
/**
 * @openapi
 * /User/{UserId}:
 *   patch:
 *     tags: [User]
 *     summary: Edit User.
 *     description: Edit specific User.
 *     operationId: update
 *     parameters:
 *       - in: path
 *         name: UserId
 *         schema:
 *           type: string
 *           example: 577417e645d1b2640cd1f6e6
 *         required: true
 *         description: Id of User to update
 *     requestBody:
 *       description: Available properties to update
 *       required: true
 *       content:
 *          application/json:
 *              schema:
 *                  $ref: '#/components/schemas/User'
 *     responses:
 *       200:
 *         description: Successful operation.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 data:
 *                   type: object
 *                   $ref: '#/components/schemas/User'
 *                 message:
 *                     type: string
 *                     example: User updated successfully
 *                 success:
 *                     type: boolean
 *                     example: true
 *       500:
 *         description: Server was not able to handle request.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/500'
 *       401:
 *         description: Unauthenticated Employee
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/401'
 *     security: [jwt_api_auth: []]
 */
UserRouter.patch(`${path}/:UserId`, UserAuthenticator.isAdminAuthenticated(), UserController.update);
/**
 * @openapi
 * /User/{UserId}:
 *   delete:
 *     tags: [User]
 *     summary: Delete User.
 *     description:  Delete specific User.
 *     operationId: delete
 *     parameters:
 *       - in: path
 *         name: UserId
 *         schema:
 *           type: string
 *           example: 577417e645d1b2640cd1f6e6
 *         required: true
 *         description: Id of User to delete
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
 *                      example: null
 *                  message:
 *                      type: string
 *                      example: User deleted successfully
 *                  success:
 *                      type: boolean
 *                      example: true
 *       500:
 *         description: Server was not able to handle the request.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/500'
 *       401:
 *         description: Unauthenticated User
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/401'
 *       409:
 *         description: Found active User
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/400'
 *     security: [jwt_api_auth: []]
 */
UserRouter.delete(`${path}/:UserId`, UserAuthenticator.isAdminAuthenticated(), UserController.delete);
/**
 * @openapi
 * /User:
 *   post:
 *     tags: [User]
 *     summary: Create User.
 *     description: Create User.
 *     operationId: create
 *     requestBody:
 *       description: create User
 *       required: true
 *       content:
 *          application/json:
 *              schema:
 *                  $ref: '#/components/schemas/User'
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
 *                      $ref: '#/components/schemas/User'
 *                  message:
 *                      type: string
 *                      example: User created successfully
 *                  success:
 *                      type: boolean
 *                      example: true
 *       500:
 *         description: Server was not able to handle request.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/500'
 *       401:
 *         description: Unauthenticated Employee
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/401'
 *     security: [jwt_api_auth: []]
 */
UserRouter.post(`${path}`, UserAuthenticator.isAdminAuthenticated(), UserController.create);

export default UserRouter;
