import user from "models/user.js";
import password from "models/password.js";
import { NotFoundError, UnauthorizedError } from "infra/errors.js";

async function getAuthenticatedUser(providedEmail, providedPassword) {
  try {
    const storedUser = await findUserByEmail(providedEmail);
    await validatePassword(providedPassword, storedUser.password);

    return storedUser;
  } catch (error) {
    if (error instanceof UnauthorizedError) {
      throw new UnauthorizedError({
        message: "Dados de autenticação não conferem.",
        action: "Verifique se os dados enviados estão corretos.",
      });
    }

    throw error;
  }

  async function findUserByEmail(providedEmail) {
    try {
      const storedUser = await user.findOneByEmail(providedEmail);
      return storedUser;
    } catch (error) {
      if (error instanceof NotFoundError) {
        throw new UnauthorizedError({
          message: "O endereço de email está incorreto.",
          action: "Verifique o endereço de email e tente novamente.",
        });
      }

      throw error;
    }
  }

  async function validatePassword(providedPassword, storedPassword) {
    const isCorrectPassword = await password.compare(
      providedPassword,
      storedPassword,
    );

    if (!isCorrectPassword) {
      throw new UnauthorizedError({
        message: "A senha está incorreta.",
        action: "Verifique a senha e tente novamente.",
      });
    }
  }
}

const authentication = {
  getAuthenticatedUser,
};

export default authentication;
