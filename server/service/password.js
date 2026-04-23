import bcrypt from "bcrypt";

async function hash(password) {
  try {
    const hashPass = await bcrypt.hash(password, 10);
    return hashPass;
  } catch (error) {
    console.error("Error from password hash function", error);
  }
}

async function compare(givenPassword, existPassword) {
  try {
    const pass = await bcrypt.compare(givenPassword, existPassword);
    return pass;
  } catch (error) {
    console.log("Error from password compare function", error);
  }
}

export { hash, compare };
