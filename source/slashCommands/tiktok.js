const {
  Client,
  CommandInteraction,
  MessageEmbed,
  MessageButton,
  MessageActionRow,
} = require("discord.js");
const { player } = require("../index");
const emojis = require("../../config/emojis.json");
const axios = require("axios");

module.exports = {
  name: "tiktok",
  description: "Download and preview the data of the tiktok video",
  type: "CHAT_INPUT",
  options: [
    {
      name: "value",
      description: "the tiktok url that the bot will fetch his data",
      type: "STRING",
      required: true,
    },
  ],

  /**
   *
   * @param {Client} client
   * @param {CommandInteraction} interaction
   * @param {String[]} args
   */

  run: async (client, interaction, args) => {
    try {
      const arg = interaction.options.getString("value");
      if (!arg)
        return interaction.followUp(
          emojis.error + " | **Can't Find The Ticktok Url**"
        );
      const axiosData = axios.get(
        `https://godownloader.com/api/tiktok-no-watermark-free?url=${arg}&key=godownloader.com`
      );
      try {
        interaction
          .followUp({
            content: "**P**rocessing data...",
          })
          .then((msg) => {
            interaction
              .editReply({
                content: "**Pr**ocessing data...",
              })
              .then((msg) => {
                interaction
                  .editReply({
                    content: "**Pro**cessing data...",
                  })
                  .then((msg) => {
                    interaction
                      .editReply({
                        content: "**Proc**essing data...",
                      })
                      .then((msg) => {
                        interaction
                          .editReply({
                            content: "**Proce**ssing data...",
                          })
                          .then((msg) => {
                            interaction
                              .editReply({
                                content: "**Proces**sing data...",
                              })
                              .then((msg) => {
                                interaction
                                  .editReply({
                                    content: "**Process**ing data...",
                                  })
                                  .then((msg) => {
                                    interaction
                                      .editReply({
                                        content: "**Process**ing data...",
                                      })
                                      .then((msg) => {
                                        interaction
                                          .editReply({
                                            content: "**Processi**ng data...",
                                          })
                                          .then((msg) => {
                                            interaction
                                              .editReply({
                                                content:
                                                  "**Processin**g data...",
                                              })
                                              .then((msg) => {
                                                interaction
                                                  .editReply({
                                                    content:
                                                      "**Processing** data...",
                                                  })
                                                  .then((msg) => {
                                                    interaction
                                                      .editReply({
                                                        content:
                                                          "**Processing da**ta...",
                                                      })
                                                      .then((msg) => {
                                                        interaction
                                                          .editReply({
                                                            content:
                                                              "**Processing data**...",
                                                          })
                                                          .then((msg) => {
                                                            interaction
                                                              .editReply({
                                                                content:
                                                                  "**Processing data...**",
                                                              })
                                                              .then(
                                                                async (
                                                                  doneOfLoading
                                                                ) => {
                                                                  let video =
                                                                    new MessageButton()
                                                                      .setCustomId(
                                                                        "video"
                                                                      )
                                                                      .setStyle(
                                                                        "DANGER"
                                                                      )
                                                                      .setLabel(
                                                                        "Video"
                                                                      );
                                                                  let music =
                                                                    new MessageButton()
                                                                      .setCustomId(
                                                                        "music"
                                                                      )
                                                                      .setStyle(
                                                                        "SECONDARY"
                                                                      )
                                                                      .setLabel(
                                                                        "Music"
                                                                      );
                                                                  let row =
                                                                    new MessageActionRow().addComponents(
                                                                      video,
                                                                      music
                                                                    );
                                                                  let MeSsAgE =
                                                                    await interaction.editReply(
                                                                      {
                                                                        content:
                                                                          "Data Has Been **Processed**!\nPlease Choose The Option Of Data Preview",
                                                                        components:
                                                                          [row],
                                                                        allowedMentions:
                                                                          {
                                                                            repliedUser: false,
                                                                          },
                                                                      }
                                                                    );
                                                                  let filter = (
                                                                    i
                                                                  ) =>
                                                                    i.user.id ==
                                                                    interaction
                                                                      .user.id;
                                                                  let collector =
                                                                    await MeSsAgE.createMessageComponentCollector(
                                                                      filter,
                                                                      {
                                                                        time: 0,
                                                                      }
                                                                    );
                                                                  collector.on(
                                                                    "collect",
                                                                    async (
                                                                      i
                                                                    ) => {
                                                                      i.deferReply(
                                                                        {
                                                                          ephemeral: true,
                                                                        }
                                                                      ).catch(
                                                                        () => {}
                                                                      );
                                                                      if (
                                                                        i.customId ==
                                                                        "video"
                                                                      ) {
                                                                        i.followUp(
                                                                          {
                                                                            content:
                                                                              "video data has loaded!",
                                                                          }
                                                                        );
                                                                        let embed =
                                                                          new MessageEmbed()
                                                                            .setColor(
                                                                              "BLUE"
                                                                            )
                                                                            .setDescription(
                                                                              `**\`\`\`\n${
                                                                                axiosData
                                                                                  .data
                                                                                  .desc ||
                                                                                null
                                                                              }\n\`\`\`**`
                                                                            )
                                                                            .setThumbnail(
                                                                              axiosData
                                                                                .data
                                                                                .author_cover ||
                                                                                client.user.avatarURL(
                                                                                  {
                                                                                    dynamic: true,
                                                                                  }
                                                                                )
                                                                            )
                                                                            .addFields(
                                                                              {
                                                                                name: "**Video Conver:**",
                                                                                value: `**[animated](${axiosData.data.video_animated_cover}) | [origin](${axiosData.data.video_origin_cover})**`,
                                                                                inline: true,
                                                                              },
                                                                              {
                                                                                name: "**Video Download:**",
                                                                                value: `**[with coprights](${axiosData.data.video_watermark}) | [without copyrights](${axiosData.data.video_no_watermark})**`,
                                                                                inline: true,
                                                                              }
                                                                            );
                                                                        let btn =
                                                                          new MessageButton()
                                                                            .setCustomId(
                                                                              "preview"
                                                                            )
                                                                            .setStyle(
                                                                              "DANGER"
                                                                            )
                                                                            .setLabel(
                                                                              "Preview The Video"
                                                                            );
                                                                        let videoRow =
                                                                          new MessageActionRow().addComponents(
                                                                            btn
                                                                          );
                                                                        let videoMessage =
                                                                          await interaction.editReply(
                                                                            {
                                                                              embeds:
                                                                                [
                                                                                  embed,
                                                                                ],
                                                                              components:
                                                                                [
                                                                                  videoRow,
                                                                                ],
                                                                            }
                                                                          );
                                                                        let filter =
                                                                          (i) =>
                                                                            i
                                                                              .user
                                                                              .id ==
                                                                            interaction
                                                                              .user
                                                                              .id;
                                                                        let collector =
                                                                          await videoMessage.createMessageComponentCollector(
                                                                            filter,
                                                                            {
                                                                              time: 0,
                                                                            }
                                                                          );
                                                                        collector.on(
                                                                          "collect",
                                                                          async (
                                                                            i
                                                                          ) => {
                                                                            i.deferReply(
                                                                              {
                                                                                ephemeral: true,
                                                                              }
                                                                            ).catch(
                                                                              () => {}
                                                                            );
                                                                            i.followUp(
                                                                              {
                                                                                content:
                                                                                  "The View Has Sended",
                                                                              }
                                                                            );
                                                                            interaction.channel.send(
                                                                              {
                                                                                files:
                                                                                  [
                                                                                    {
                                                                                      name: "rexom.mp4",
                                                                                      attachment:
                                                                                        axiosData
                                                                                          .data
                                                                                          .video_no_watermark,
                                                                                    },
                                                                                  ],
                                                                              }
                                                                            );
                                                                          }
                                                                        );
                                                                      } else if (
                                                                        i.customId ==
                                                                        "music"
                                                                      ) {
                                                                        i.followUp(
                                                                          {
                                                                            content:
                                                                              "music data has loaded!",
                                                                          }
                                                                        );
                                                                        i.deferReply(
                                                                          {
                                                                            ephemeral: true,
                                                                          }
                                                                        ).catch(
                                                                          () => {}
                                                                        );
                                                                        let embed =
                                                                          new MessageEmbed()
                                                                            .setColor(
                                                                              "BLUE"
                                                                            )
                                                                            .setDescription(
                                                                              `**\`\`\`\n${
                                                                                axiosData
                                                                                  .data
                                                                                  .music_author ||
                                                                                null
                                                                              }\n\`\`\`**`
                                                                            )
                                                                            .setThumbnail(
                                                                              axiosData
                                                                                .data
                                                                                .music_cover ||
                                                                                client.user.avatarURL(
                                                                                  {
                                                                                    dynamic: true,
                                                                                  }
                                                                                )
                                                                            )
                                                                            .addFields(
                                                                              {
                                                                                name: "**Music Url:**",
                                                                                value: `**[Here](${axiosData.data.music_url})**`,
                                                                                inline: true,
                                                                              }
                                                                            );
                                                                        let btn =
                                                                          new MessageButton()
                                                                            .setCustomId(
                                                                              "play"
                                                                            )
                                                                            .setStyle(
                                                                              "DANGER"
                                                                            )
                                                                            .setLabel(
                                                                              "Play The Music"
                                                                            );
                                                                        let playRow =
                                                                          new MessageActionRow().addComponents(
                                                                            btn
                                                                          );
                                                                        let musicMessage =
                                                                          await interaction.editReply(
                                                                            {
                                                                              embeds:
                                                                                [
                                                                                  embed,
                                                                                ],
                                                                              components:
                                                                                [
                                                                                  playRow,
                                                                                ],
                                                                            }
                                                                          );
                                                                        let filter =
                                                                          (i) =>
                                                                            i
                                                                              .user
                                                                              .id ==
                                                                            interaction
                                                                              .user
                                                                              .id;
                                                                        let collector =
                                                                          await musicMessage.createMessageComponentCollector(
                                                                            filter,
                                                                            {
                                                                              time: 0,
                                                                            }
                                                                          );
                                                                        collector.on(
                                                                          "collect",
                                                                          async (
                                                                            i
                                                                          ) => {
                                                                            i.deferReply(
                                                                              {
                                                                                ephemeral: true,
                                                                              }
                                                                            ).catch(
                                                                              () => {}
                                                                            );
                                                                            player.play(
                                                                              interaction,
                                                                              axiosData
                                                                                .data
                                                                                .music_url
                                                                            );
                                                                            i.followUp(
                                                                              {
                                                                                content:
                                                                                  "music has add to server queue!",
                                                                              }
                                                                            );
                                                                          }
                                                                        );
                                                                      }
                                                                    }
                                                                  );
                                                                }
                                                              );
                                                          });
                                                      });
                                                  });
                                              });
                                          });
                                      });
                                  });
                              });
                          });
                      });
                  });
              });
          });
      } catch (error) {
        console.log(error);
      }
    } catch {
      console.log("rexom");
    }
  },
};
