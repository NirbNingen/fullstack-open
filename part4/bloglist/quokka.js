const bcrypt = require("bcrypt");

const generateHashes = async () => {
  const saltRounds = 10;

  const passwords = ["banana", "kroket"];
  const hashes = await Promise.all(
    passwords.map(async (password) => {
      const hash = await bcrypt.hash(password, saltRounds);
      return hash;
    })
  );

  console.log("Generated hashes:");
  hashes.forEach((hash, index) => {
    console.log(`${passwords[index]}: ${hash}`);
  });
};

generateHashes().catch((error) => {
  console.error("Error generating hashes:", error);
});
