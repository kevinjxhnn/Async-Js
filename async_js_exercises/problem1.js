const fs = require("fs");
const path = require("path");
const util = require("util");

const writeFileAsync = util.promisify(fs.writeFile);
const readdirAsync = util.promisify(fs.readdir);
const unlinkAsync = util.promisify(fs.unlink);

const data = {
  key1: Math.random(),
  key2: Math.random(),
  key3: Math.random(),
};

function createDirectory(directory, callback) {
  fs.mkdir(directory, (err) => {
    if (err) {
      console.error(`Error creating directory: ${err}`);
    } else {
      console.log(`Directory '${directory}' created successfully.`);
      callback();
    }
  });
}

function createJSONFilesPart1(callback) {
  for (let i = 1; i <= 3; i++) {
    const fileName = `file${i}.json`;
    const jsonFilePath = path.join("part1", fileName);

    fs.writeFile(jsonFilePath, JSON.stringify(data, null, 2), (err) => {
      if (err) {
        console.error(`Error writing to ${fileName}`, err);
      } else {
        console.log(
          `File '${fileName}' created successfully in part1 directory`
        );
      }

      if (i == 3) {
        callback();
      }
    });
  }
}

function deleteJSONFilesPart1() {
  fs.readdir("part1", (err, files) => {
    if (err) {
      console.error("Error reading files from part1 directory");
    } else {
      files.forEach((file) => {
        const filePath = path.join("part1", file);
        fs.unlink(filePath, (err) => {
          if (err) {
            console.error(`Error deleting ${file}:`, err);
          } else {
            console.log(
              `File '${file}' deleted successfully from part1 directory`
            );
          }
        });
      });
    }
  });
}

function createJSONFilesPart2() {
  return new Promise((resolve, reject) => {
    const createFile = (i) => {
      if (i <= 3) {
        const fileName = `file${i}.json`;
        const jsonFilePath = path.join("part2", fileName);

        fs.writeFile(jsonFilePath, JSON.stringify(data, null, 2), (err) => {
          if (err) {
            console.error(err);
            reject(err);
          } else {
            console.log(
              `File '${fileName}' created successfully in part2 directory`
            );
          }

          if (i == 3) {
            resolve();
          } else {
            createFile(i + 1);
          }
        });
      }
    };
    createFile(1);
  });
}

function deleteJSONFilesPart2() {
  return new Promise((resolve, reject) => {
    fs.readdir("part2", (err, files) => {
      if (err) {
        console.error("Error reading files from part2 directory");
        reject(err);
      } else {
        const deleteFile = (index) => {
          if (index < files.length) {
            const file = files[index];
            const filePath = path.join("part2", file);
            fs.unlink(filePath, (err) => {
              if (err) {
                console.error(`Error deleting ${file}:`, err);
                reject(err);
              } else {
                console.log(
                  `File '${file}' deleted successfully from part2 directory`
                );
                deleteFile(index + 1);
              }
            });
          } else {
            resolve();
          }
        };

        deleteFile(0);
      }
    });
  });
}

async function createJSONFilesPart3() {
  for (let i = 1; i <= 3; i++) {
    const fileName = `file${i}.json`;
    const jsonFilePath = path.join("part3", fileName);

    try {
      await writeFileAsync(jsonFilePath, JSON.stringify(data, null, 2));
      console.log(
        `File '${fileName}' created successfully in 'part3' directory`
      );
    } catch (err) {
      console.error(`Error writing to ${fileName}`, err);
    }
  }
}

async function deleteJSONFilesPart3() {
  try {
    const files = await readdirAsync("part3");
    for (const file of files) {
      const filePath = path.join("part3", file);
      await unlinkAsync(filePath);
      console.log(`File '${file}' deleted successfully in part3 directory`);
    }
  } catch (err) {
    console.error("Error running the program");
  }
}

module.exports = {
  createDirectory,
  createJSONFilesPart1,
  deleteJSONFilesPart1,
  createJSONFilesPart2,
  deleteJSONFilesPart2,
  createJSONFilesPart3,
  deleteJSONFilesPart3,
};
