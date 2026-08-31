import { Router, type IRouter } from "express";
import { appendContactLead, type ContactLead } from "../lib/googleSheets";

const router: IRouter = Router();
const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const mobilePattern = /^[+0-9٠-٩۰-۹\s()-]{7,30}$/;

function clean(value: unknown): string {
  return typeof value === "string" ? value.trim() : "";
}

router.post("/leads", async (req, res) => {
  const lead: ContactLead = {
    name: clean(req.body?.name),
    company: clean(req.body?.company),
    email: clean(req.body?.email),
    mobile: clean(req.body?.mobile),
  };

  if (
    !lead.name ||
    !lead.company ||
    !lead.email ||
    !lead.mobile ||
    lead.name.length > 120 ||
    lead.company.length > 160 ||
    lead.email.length > 200 ||
    lead.mobile.length > 30 ||
    !emailPattern.test(lead.email) ||
    !mobilePattern.test(lead.mobile)
  ) {
    res.status(400).json({ ok: false, message: "Invalid contact details." });
    return;
  }

  try {
    await appendContactLead(lead);
    res.status(201).json({ ok: true });
  } catch (error) {
    req.log.error({ err: error }, "Failed to save contact lead");
    res.status(502).json({
      ok: false,
      message: "Unable to save the contact request right now.",
    });
  }
});

export default router;