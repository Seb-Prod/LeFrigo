import cron from "node-cron";
import { sessionRepository } from "../modules/sessions/session.repository";

cron.schedule("0 * * * *", async () => {
  try {
    const result = await sessionRepository.deleteExpiredSessions();

    console.log(`[SESSION CLEANUP] ${result.count} sessions supprimées`);
  } catch (error) {
    console.error("[SESSION CLEANUP ERROR", error);
  }
});
