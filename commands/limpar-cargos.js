module.exports = {
  category: "Configuration",
  description: "Limpa todos os cargos dos usuários",
  permissions: ["MANAGE_ROLES"],
  minArgs: 1,
  expectedArgs: `<user @>`,
  slash: "both",
  options: [
    {
      name: "usuário",
      description: "Usuário para ter os cargos limpos",
      type: "USER",
      required: true,
    },
  ],
  callback: ({ guild, args, message, interaction }) => {
    const memberId = args.shift()?.replace(/[<@!&>]/g, "");
    const member = guild?.members.cache.get(memberId);
    let responseMessage = "";

    if (!member) {
      return "Usuário não encontrado";
    }

    member.roles.set([]);
    responseMessage = `Todos os cargos de ${member.user.username} foram removidos`;

    if (message) {
      message.reply({
        content: responseMessage,
        ephemeral: true,
      });
    }

    if (interaction) {
      interaction.reply({
        content: responseMessage,
        ephemeral: true,
      });
    }
  },
};
