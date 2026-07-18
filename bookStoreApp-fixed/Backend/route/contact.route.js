import express from "express";
import { createContact, getContacts } from "../controller/contact.controller.js";

const router = express.Router();

router.post("/", createContact);
router.get("/", getContacts);

export default router;
