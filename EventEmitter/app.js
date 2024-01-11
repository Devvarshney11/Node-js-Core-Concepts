const EventEmitter = require("events");

const myEmitter = new EventEmitter();

myEmitter.on("foo", () => {
  console.log("foo event emitted");
});
myEmitter.on("foo", () => {
  console.log("another foo event emitted");
});
myEmitter.on("foo", (a, b) => {
  console.log(`yet another foo event emitted with ${a} and ${b}`);
});

myEmitter.emit("foo");
myEmitter.emit("foo", 42, 13);

myEmitter.on("error", (err) => {
  console.error("whoops! there was an error");
});
myEmitter.emit("error", new Error("whoops!"));
