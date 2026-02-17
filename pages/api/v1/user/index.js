import { createRouter } from "next-connect";
import controller from "infra/controller.js";
import session from "models/session.js";
import user from "models/user.js";

const router = createRouter();
router.get(getHandler);

export default router.handler(controller.errorHandlers);

async function getHandler(request, response) {
  const sessionToken = request.cookies.session_id;
  const sessionObject = await session.findOneValidByToken(sessionToken);
  const renewedSession = await session.renew(sessionObject.id);
  controller.setSessionCookie(renewedSession.token, response);

  response.setHeader(
    "Cache-Control",
    "no-store, no-cache, max-age=0, must-revalidate",
  );
  const userObject = await user.findOneById(sessionObject.user_id);
  return response.status(200).json(userObject);
}
