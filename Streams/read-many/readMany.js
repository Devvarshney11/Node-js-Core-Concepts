const fs = require("fs/promises");

(async () => {
  console.time("Done");
  const srcFile = await fs.open("src.txt", "r");
  const destFile = await fs.open("dest.txt", "w");

  const srcStream = srcFile.createReadStream();
  const destStream = destFile.createWriteStream();
  let error = "";
  srcStream.on("data", (chunk) => {
    const number = chunk.toString().split("  ");
    if (Number(number[0]) + 1 !== Number(number[1])) {
      if (error !== "") {
        number[0] = error.trim() + number[0].trim();
      }
    }
    if (
      Number(number[number.length - 2]) + 1 !==
      Number(number[number.length - 1])
    ) {
      error = number.pop();
    }
    number.forEach((element) => {
      if (Number(element) % 10 === 0) {
        if (!destStream.write(element + " ")) {
          srcStream.pause();
        }
      }
    });
  });
  destStream.on("drain", () => {
    srcStream.resume();
  });
  srcStream.on("end", () => {
    destStream.end();
    console.timeEnd("Done");
  });
})();
