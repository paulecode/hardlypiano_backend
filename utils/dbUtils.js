const getUri = () => {
  const username = process.env.MONGODB_USERNAME || "";
  const password = process.env.MONGODB_PASSWORD || "";
  const uri =
    process.env.MONGODB_URI.replace("USERNAME", username).replace(
      "PASSWORD",
      password
    ) || "";
  return uri;
};

module.exports = { getUri };
