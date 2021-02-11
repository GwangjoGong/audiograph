module.exports = {
  client: {
    includes: ["./src/**/*.tsx"],
    tagName: "gql",
    service: {
      name: "audiograph-server",
      url: "http://54.180.223.40:3000/graphql",
    },
  },
};
