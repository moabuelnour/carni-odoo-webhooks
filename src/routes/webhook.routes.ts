import { Router } from "express";
import { handleOrderUpdate } from "../controllers/webhook.controller";
import { verifyWebhookMiddleware } from "../middleware/verifyWebhook";

const router = Router();
router.post("/orders/updated", verifyWebhookMiddleware, handleOrderUpdate);

export default router;
