const fs = require("fs/promises");

(async () => {
  console.time("copy");
  const srcFile = await fs.open("src.txt", "r");
  const destFile = await fs.open("dest.txt", "w");

  let bytesRead = -1;
  while (bytesRead) {
    const readContent = await srcFile.read();
    bytesRead = readContent.bytesRead;
    if (bytesRead !== 16384) {
      const indexOfZero = readContent.buffer.indexOf(0);
      const buffer = Buffer.alloc(indexOfZero);
      readContent.buffer.copy(buffer, 0, 0, indexOfZero);
      await destFile.write(buffer);
    } else {
      await destFile.write(readContent.buffer);
    }
  }
  console.timeEnd("copy");
})();
