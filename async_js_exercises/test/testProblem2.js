const {
  readFile,
  toUpperCaseAndWriteToNewFile,
  toLowerCaseAndSplitIntoSent,
  readFilesAndSort,
  deleteFilesConcurrently,
} = require("../problem2");

const filePathLipsum = "../lipsum.txt";

async function runProblem2() {
  try {
    const fileContent = await readFile(filePathLipsum);
    await toUpperCaseAndWriteToNewFile(fileContent);

    const uppercasePath = "./uppercase.txt";
    const newUpperFileContent = await readFile(uppercasePath);

    await toLowerCaseAndSplitIntoSent(newUpperFileContent);

    await readFilesAndSort();

    await deleteFilesConcurrently();
  } catch (err) {
    console.log(err);
  }
}

runProblem2();
