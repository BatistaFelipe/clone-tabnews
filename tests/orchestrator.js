import retry from "async-retry";
import { faker } from "@faker-js/faker";
import database from "infra/database.js";
import migrator from "models/migrator.js";
import user from "models/user.js";
import session from "models/session.js";

const emailHttpUrl = `http://${process.env.EMAIL_HTTP_HOST}:${process.env.EMAIL_HTTP_PORT}/messages`;

async function waitForAllServices() {
  await waitForWebServer();
  await waitForEmailServer();

  async function waitForWebServer() {
    return retry(fetchStatusPage, {
      retries: 100,
      maxTimeout: 1000,
    });

    async function fetchStatusPage() {
      const response = await fetch("http://localhost:3000/api/v1/status");

      if (response.status !== 200) {
        throw Error();
      }
    }
  }

  async function waitForEmailServer() {
    return retry(fetchEmailPage, {
      retries: 100,
      maxTimeout: 1000,
    });

    async function fetchEmailPage() {
      const response = await fetch(emailHttpUrl);

      if (response.status !== 200) {
        throw Error();
      }
    }
  }
}

async function clearDatabase() {
  await database.query("drop schema public cascade; create schema public;");
}

async function runPendingMigrations() {
  await migrator.runPendingMigrations();
}

async function createUser(userObject) {
  return await user.create({
    username:
      userObject?.username || faker.internet.username().replace(/[-._]/g, ""),
    email: userObject?.email || faker.internet.email(),
    password: userObject?.password || "validpassword",
  });
}

async function createSession(userId) {
  return await session.create(userId);
}

async function clearAllEmails() {
  await fetch(emailHttpUrl, {
    method: "DELETE",
  });
}

async function getLastEmail() {
  const emailListResponse = await fetch(emailHttpUrl);
  const emailListBody = await emailListResponse.json();
  const lastEmailObject = emailListBody.pop();

  const lastEmailTextResponse = await fetch(
    `${emailHttpUrl}/${lastEmailObject.id}.plain`,
  );
  const lastEmailText = await lastEmailTextResponse.text();

  lastEmailObject.text = lastEmailText;
  return lastEmailObject;
}

const orchestrator = {
  waitForAllServices,
  clearDatabase,
  createUser,
  createSession,
  runPendingMigrations,
  clearAllEmails,
  getLastEmail,
};

export default orchestrator;
