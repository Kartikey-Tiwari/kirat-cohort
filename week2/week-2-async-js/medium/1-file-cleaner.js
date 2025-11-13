const fs = require("fs").promises;

async function cleanUpFile(filename) {
  try {
    let data = await fs.readFile(filename, "utf8");
    data = data.split(/\s+/g).join(" ");
    console.log(data);
    await fs.writeFile(filename, data);
    console.log("done writing to file");
  } catch (err) {
    console.log(err.name);
  }
}

cleanUpFile("temp");
