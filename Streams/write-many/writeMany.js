const fs = require("fs/promises");

(async () => {
  console.time("writeMany");
  const fileHandler = await fs.open("writeMany.txt", "w");
  const stream = fileHandler.createWriteStream();
  let i = 0;
  const numberOfWrites = 100000;
  const writeStream = () => {
    while (i < numberOfWrites) {
      const buff = Buffer.from(` ${i} `, "utf-8");
      if (i === numberOfWrites - 1) {
        return stream.end(buff);
      }
      if (!stream.write(buff)) {
        break;
      }
      i++;
    }
  };
  writeStream();
  stream.on("drain", () => {
    // console.log("drain");
    writeStream();
  });
  stream.on("finish", () => {
    console.timeEnd("writeMany");
    fileHandler.close();
  });
})();
