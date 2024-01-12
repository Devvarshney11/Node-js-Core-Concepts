const fs = require("fs/promises");
(async () => {
  const createFile = async (path) => {
    try {
      const existingFileHandle = await fs.open(path, "r");
      existingFileHandle.close();
      return console.log(`The file ${path} already exists.`);
    } catch (e) {
      const newFileHandle = await fs.open(path, "w");
      console.log("A new file was successfully created.");
      newFileHandle.close();
    }
  };

  const deleteFile = async (path) => {
    try {
      await fs.unlink(path);
      console.log("File Deleted Sucessfully");
    } catch (e) {
      console.log("File didn't Exist");
    }
  };
  const renameFile = async (oldPath, newPath) => {
    try {
      await fs.rename(oldPath, newPath);
      console.log("File Renamed Sucessfully");
    } catch (e) {
      console.log("File didn't Exist");
    }
  };
  let addcont;
  const addContent = async (path, content) => {
    if (addcont == content) {
      return console.log("Content already added");
    }
    try {
      const fileHandle = await fs.open(path, "a");
      await fileHandle.appendFile(content);
      console.log("Content added successfully");
      addcont = content;
    } catch (e) {
      console.log("File didn't Exist");
    }
  };
  const CREATE_FILE = "create a file";
  const DELETE_FILE = "delete a file";
  const RENAME_FILE = "rename a file";
  const ADD_CONTENT = "add content to a file";
  const commandFileHandle = await fs.open("./commands.txt", "r");
  commandFileHandle.on("change", async () => {
    const size = (await commandFileHandle.stat()).size;
    const offset = 0;
    const position = 0;
    const buff = Buffer.alloc(size);
    const length = buff.byteLength;
    await commandFileHandle.read(buff, offset, length, position);
    const content = buff.toString();
    if (content.includes(CREATE_FILE)) {
      const filePath = content.substring(CREATE_FILE.length + 1);
      createFile(filePath);
    } else if (content.includes(DELETE_FILE)) {
      const filePath = content.substring(DELETE_FILE.length + 1);
      deleteFile(filePath);
    } else if (content.includes(RENAME_FILE)) {
      const idx = content.indexOf(" to ");
      const oldPath = content.substring(RENAME_FILE.length + 1, idx);
      const newPath = content.substring(idx + 4);
      renameFile(oldPath, newPath);
    } else if (content.includes(ADD_CONTENT)) {
      const idx = content.indexOf(" this content: ");
      const path = content.substring(ADD_CONTENT.length + 1, idx);
      const cont = content.substring(idx + 15);
      addContent(path, cont);
    }
  });
  const watcher = fs.watch("./commands.txt");
  for await (const event of watcher) {
    if (event.eventType === "change") {
      commandFileHandle.emit("change");
    }
  }
})();
