import { writeFile } from "fs";

writeFile("./temp", "async writing to a file", (err) => {
  if (err) {
    console.log("couldn't write to file");
  } else console.log("written");
});
