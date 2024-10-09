const jsonfile = require("jsonfile");
const moment = require("moment");
const simpleGit = require("simple-git");
const random = require("random");
const FILE_PATH = "./data.json";

const makeCommit = (n) => {
  if (n === 0) {
    return simpleGit().push((err) => {
      if (err) {
        console.error("Error pushing changes:", err);
      } else {
        console.log("All changes pushed successfully!");
      }
    });
  }

  const x = Math.floor(Math.random() * 55); // Random number between 0 and 54
  const y = Math.floor(Math.random() * 7);  // Random number between 0 and 6
  
  const DATE = moment()
    .subtract(1, "y")
    .add(1, "d")
    .add(x, "w")
    .add(y, "d")
    .format();

  const data = { date: DATE };
  console.log(DATE);

  jsonfile.writeFile(FILE_PATH, data, (err) => {
    if (err) {
      console.error("Error writing file:", err);
      return; // Exit if there's an error writing the file
    }

    simpleGit()
      .add(FILE_PATH)
      .commit(DATE, { "--date": DATE }, (commitErr) => {
        if (commitErr) {
          console.error("Error during commit:", commitErr);
          return; // Exit if there's an error committing
        }
        // Recursively call makeCommit with decremented n
        makeCommit(n - 1);
      });
  });
};

// Start the commit process with 500 commits
makeCommit(500);
