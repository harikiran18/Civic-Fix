const bcrypt = require("bcryptjs");

const password = "Admin@123";

const hash = bcrypt.hashSync(password, 10);

console.log("Generated Hash:");
console.log(hash);

console.log("Match:", bcrypt.compareSync(password, hash));