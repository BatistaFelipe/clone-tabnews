import bcryptjs from "bcryptjs";
import { ValidationError } from "infra/errors.js";

async function hash(password) {
  if (!password) {
    throw new ValidationError({
      message: "A senha de usuário é obritória.",
      action: "Informe a senha de usuário para realizar esta operação.",
    });
  }
  const rounds = getNumberOfRounds();
  const pepper = getPepper();
  return await bcryptjs.hash(password + pepper, rounds);
}

async function compare(providedPassword, storedPassword) {
  const pepper = getPepper();
  return await bcryptjs.compare(providedPassword + pepper, storedPassword);
}

const password = {
  hash,
  compare,
};

export default password;

function getNumberOfRounds() {
  return process.env.NODE_ENV === "production" ? 14 : 1;
}

function getPepper() {
  return process.env.PASSWORD_PEPPER || "";
}
