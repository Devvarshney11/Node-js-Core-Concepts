//Promise Api
// const fs = require("fs/promises");

// (async () => {
//   try {
//     await fs.copyFile("file.txt", "copy_promise.txt");
//   } catch (err) {
//     console.log(err);
//   }
// })();

//Callback Api

// const fs = require("fs");
// fs.copyFile("file.txt", "copy_callback.txt", (err) => {
//   if (err) {
//     console.log(err);
//   }
// });

//Synchronous Api

const fs = require("fs");

// try {
//   fs.copyFileSync("file.txt", "copy_sync.txt");
// } catch (err) {
//   console.log(err);
// }

const token = fs.openSync("text.txt", "w");
