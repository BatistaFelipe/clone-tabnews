import email from "infra/email.js";
import orchestrator from "tests/orchestrator.js";

beforeAll(async () => {
  await orchestrator.waitForAllServices();
});

describe("infra/email.js", () => {
  test("send()", async () => {
    await orchestrator.clearAllEmails();
    await email.send({
      from: "CloneTabNews <clonetabnews@felipebatista.dev>",
      to: "contato@felipebatista.dev",
      subject: "Teste de assunto",
      text: "Teste de integração com mailcatcher e nodemailer.",
    });

    await email.send({
      from: "CloneTabNews <clonetabnews@felipebatista.dev>",
      to: "contato@felipebatista.dev",
      subject: "Último email de teste",
      text: "Este é o último email de teste enviado pelo jest com mailcatcher e nodemailer.",
    });

    const lastEmail = await orchestrator.getLastEmail();

    expect(lastEmail.sender).toBe("<clonetabnews@felipebatista.dev>");
    expect(lastEmail.recipients[0]).toBe("<contato@felipebatista.dev>");
    expect(lastEmail.subject).toBe("Último email de teste");
    expect(lastEmail.text).toBe(
      "Este é o último email de teste enviado pelo jest com mailcatcher e nodemailer.\r\n",
    );
  });
});
