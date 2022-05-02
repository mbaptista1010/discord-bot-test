const quantityOfRolesOptions = 11;
const rolesOptions = [...Array(quantityOfRolesOptions).keys()]
  .filter((item) => item !== 0)
  .map((item) => {
    return {
      name: `cargo-${item}`,
      description: `Cargo para ser atribuido ao usuário`,
      type: "ROLE",
      required: item === 1,
    };
  });

module.exports = {
  category: "Configuration",
  description: "Atribui ao usuário os cargos informados",
  permissions: ["MANAGE_ROLES"],
  minArgs: 2,
  expectedArgs: `<user @> <role @>`,
  slash: "both",
  options: [
    {
      name: "usuário",
      description: "Usuário para ser atribuído ao(s) cargo(s)",
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

    args.map(async (arg) => {
      const roleIdOrName = arg.replace(/[<@!&>]/g, "");
      let role = guild?.roles.cache.get(roleIdOrName);

      if (!role) {
        role = guild?.roles.cache.find((role) => role.name === roleIdOrName);

        if (!role) {
          return responseMessage.push(`${roleIdOrName} não encontrado`);
        }
      }

      member.roles.add(role);
      return responseMessage.push(`${roleIdOrName} atribuído com sucesso`);
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
