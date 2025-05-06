import { Router } from "express";
const router = Router();
router.post("/", async (req, res) => {
  try {
    res.json("Recieved");
  } catch (error) {
    console.error("Error fetching orders:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});
export default router;
