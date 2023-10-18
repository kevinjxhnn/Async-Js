const fs = require("fs").promises;
const path = require("path");

async function readFile(filePath) {
  try {
    const content = await fs.readFile(filePath, "utf-8");
    return content;
  } catch (err) {
    console.log(err);
  }
}

async function toUpperCaseAndWriteToNewFile(content) {
  try {
    const upperCaseContent = content.toUpperCase();
    const writeFilePath = "./uppercase.txt";

    await fs.writeFile(writeFilePath, upperCaseContent, "utf-8");
    console.log(`Uppercase content written to ${writeFilePath}`);

    const filenamesFilePath = "./filenames.txt";
    await fs.writeFile(filenamesFilePath, "uppercase.txt", "utf-8");
    console.log(`Filename written to ${filenamesFilePath}`);
  } catch (err) {
    console.log(err);
  }
}

async function toLowerCaseAndSplitIntoSent(content) {
  try {
    const lowerCaseContent = content.toLowerCase();
    const sentences = lowerCaseContent.split(/\s*[.!?]\s*/);

    // Create and write each sentence to separate files
    const filenames = [];
    for (let i = 0; i < sentences.length; i++) {
      const sentence = sentences[i];
      const filename = `sentence${i + 1}.txt`;
      const filePath = path.join("sentences", filename);
      await fs.writeFile(filePath, sentence, "utf-8");
      filenames.push(filename);
    }

    // Write the names of new files to filenames.txt
    const filenamesFilePath = "./filenames.txt";
    await fs.writeFile(filenamesFilePath, filenames.join("\n"), "utf-8");

    console.log(
      "Sentences written to separate files and filenames saved in filenames.txt"
    );
  } catch (err) {
    console.error(err);
  }
}

async function readFilesAndSort() {
  try {
    const directoryPath = "./sentences"; // Specify the directory path
    const files = await fs.readdir(directoryPath);

    const fileContents = await Promise.all(
      files.map(async (file) => {
        const content = await fs.readFile(
          path.join(directoryPath, file),
          "utf-8"
        );
        return content;
      })
    );

    // Sort the content
    const sortedContent = fileContents.sort();

    // Write sorted content to a new file
    const sortedFilePath = "./sentences/sorted.txt";
    await fs.writeFile(sortedFilePath, sortedContent.join("\n"), "utf-8");
    console.log("Sorted content written to sorted.txt");

    // Update filenames.txt with the name of the new sorted file
    const filenamesFilePath = "./filenames.txt";
    await fs.appendFile(filenamesFilePath, "\n" + "sorted.txt", "utf-8");
    console.log("Filename for sorted file added to filenames.txt");
  } catch (err) {
    console.error(err);
  }
}

async function deleteFilesConcurrently() {
  try {
    const filenamesFilePath = "./filenames.txt";
    const filesToDelete = (await fs.readFile(filenamesFilePath, "utf-8")).split(
      "\n"
    );

    const deletionPromises = filesToDelete.map(async (fileName) => {
      const filePath = path.join("./sentences", fileName);
      try {
        await fs.unlink(filePath);
        console.log(`File '${fileName}' deleted successfully.`);
      } catch (err) {
        console.error(`Error deleting file '${fileName}':`, err);
      }
    });

    await Promise.all(deletionPromises);

    console.log("All specified files deleted successfully.");
  } catch (err) {
    console.error(err);
  }
}

module.exports = {
  readFile,
  toUpperCaseAndWriteToNewFile,
  toLowerCaseAndSplitIntoSent,
  readFilesAndSort,
  deleteFilesConcurrently,
};
