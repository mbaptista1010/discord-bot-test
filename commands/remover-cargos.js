const quantityOfRolesOptions = 10;
const rolesOptions = [...Array(quantityOfRolesOptions).keys()].map((item) => {
  const number = item + 1;
  return {
    name: `cargo-${number}`,
    description: `Cargo para ser atribuido ao usuário`,
    type: "ROLE",
    required: number === 1,
  };
});

module.exports = {
  category: "Configuration",
  description: "Remove do usuário os cargos informados",
  permissions: ["MANAGE_ROLES"],
  minArgs: 2,
  expectedArgs: `<user @> <role @>`,
  slash: "both",
  options: [
    {
      name: "usuário",
      description: "Usuário para ser removido o(s) cargo(s)",
      type: "USER",
      required: true,
    },
    ...rolesOptions,
  ],
  callback: ({ guild, args, message, interaction }) => {
    const memberId = args.shift()?.replace(/[<@!&>]/g, "");
    const member = guild?.members.cache.get(memberId);
    let responseMessage = [];

    if (!member) {
      return "Usuário não encontrado";
    }

    args.map((arg) => {
      const roleIdOrName = arg.replace(/[<@!&>]/g, "");
      let role = guild?.roles.cache.get(roleIdOrName);

      if (!role) {
        role = guild?.roles.cache.find((role) => role.name === roleIdOrName);

        if (!role) {
          return responseMessage.push(`${roleIdOrName} não encontrado`);
        }
      }

      member.roles.remove(role);
      return responseMessage.push(`${roleIdOrName} removido com sucesso`);
    });

    if (message) {
      message.reply({
        content: responseMessage.join(", "),
        ephemeral: true,
      });
    }

    if (interaction) {
      interaction.reply({
        content: responseMessage.join(", "),
        ephemeral: true,
      });
    }
  },
};
