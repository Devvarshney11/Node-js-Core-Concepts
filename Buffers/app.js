const { Buffer } = require("buffer");

// const buf = Buffer.alloc(3);
// buf[0] = 0x61;
// buf[1] = 0x62;
// buf[2] = 0x63;

// const buf = Buffer.from([0x61, 0x62, 0x63]);
// const buf = Buffer.from("abc", "hex");
const buf = Buffer.from("616263", "hex");
console.log(buf[0]);
console.log(buf[1]);
console.log(buf[2]);

const buf2 = Buffer.from("Hello World");
console.log(buf2);
console.log(buf2.toString());
