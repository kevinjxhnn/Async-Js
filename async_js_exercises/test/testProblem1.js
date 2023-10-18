const {
  createDirectory,
  createJSONFilesPart1,
  deleteJSONFilesPart1,
  createJSONFilesPart2,
  deleteJSONFilesPart2,
  createJSONFilesPart3,
  deleteJSONFilesPart3,
} = require("../problem1");

async function runningProblem1() {
  try {
    // Part 1
    await new Promise((resolve) => {
      createDirectory("part1", async () => {
        createJSONFilesPart1(() => {
          deleteJSONFilesPart1();
          resolve();
        });
      });
    });

    // Part 2
    await new Promise(async (resolve) => {
      createDirectory("part2", () => {
        createJSONFilesPart2().then(() => {
          deleteJSONFilesPart2().then(() => {
            resolve();
          });
        });
      });
    });

    // Part 3
    await new Promise((resolve) => {
      createDirectory("part3", () => {
        createJSONFilesPart3().then(() => {
          deleteJSONFilesPart3().then(() => {
            resolve();
          });
        });
      });
    });

    console.log("All parts completed successfully.");
  } catch (err) {
    console.error("Error running the program:", err);
  }
}

runningProblem1();
