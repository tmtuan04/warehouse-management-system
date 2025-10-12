import express from "express";
import * as AuthMiddlewares from "../middlewares/auth.middleware.js";
import * as AuthController from "../controllers/auth.controller.js";

const router = express();

/**
 * @swagger
 * tags:
 *   name: Auth
 *   description: Authentication endpoints
 */

/**
 * @swagger
 * /auth/login:
 *   post:
 *     summary: User login
 *     tags: [Auth]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - email
 *               - password
 *             properties:
 *               email:
 *                 type: string
 *                 example: admin@warehouse.com
 *               password:
 *                 type: string
 *                 example: Admin123@
 *     responses:
 *       200:
 *         description: Successful login
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 id:
 *                   type: string
 *                   example: b5f62fbf-7a51-4326-8f40-c3badbfc5630
 *                 email:
 *                   type: string
 *                   example: admin@warehouse.com
 *                 role:
 *                   type: string
 *                   example: admin
 *       401:
 *         description: Invalid credentials
 */

// router.post("/signup", signup)
router.post("/login", AuthController.login)
// router.post("/logout", logout)
router.get("/check", AuthMiddlewares.protect, AuthController.checkAuth);

export default router;