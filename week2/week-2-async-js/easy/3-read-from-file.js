const fs = require("fs");

fs.readFile("./1-counter.js", "utf8", (err, data) => {
  if (err) {
    console.error(err.name);
  } else {
    console.log(data);
  }
});

console.log("hello world");
for (let i = 0; i < 10000000000; i++) {}
