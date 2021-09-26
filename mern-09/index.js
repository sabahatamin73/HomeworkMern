//Creating a new key "owner" in package.json
const fs = require("fs");
fs.readFile('./package.json', (err, data) => {
if (err){
    console.log(err);
}
else{
    let JSONdata = JSON.parse(data);
    JSONdata.owner = 'xyz';
    let STRINGdata = JSON.stringify(JSONdata);
    fs.writeFile('./package.json', STRINGdata, (err) => {
        if(err){
            console.log(err);
        }
    })
}
})



// rename folders
const currentPath = "./rename";
const nPath = "./assets";
    
fs.rename(currentPath, nPath, function(err) {
    if (err) {
        console.log(err);
    } else {
        console.log("Successfully renamed the directory.");
    }
})



//with sync method

const currPath = "./example";
const newPath = "./utils";

try {
  fs.renameSync(currPath, newPath)
  console.log("Successfully renamed the directory.")
} catch(err) {
  console.log(err)
}

// delete directory with existing files
// this method works but not for all versions
/*const dir = './utils';
try {
    fs.rmdirSync(dir, { recursive: true });

    console.log(`${dir} is deleted!`);
} catch (err) {
    console.error(`Error while deleting ${dir}.`);
}*/

// another method

const path = require("path");

const removeDir = function(path) {
  if (fs.existsSync(path)) {              //to verify that the directory we passed to our function exists
    const files = fs.readdirSync(path)    //function to get an array of all the files and sub-directories inside the parent directory

    if (files.length > 0) {
      files.forEach(function(filename) {
        if (fs.statSync(path + "/" + filename).isDirectory()) {
          removeDir(path + "/" + filename)
        } else {
          fs.unlinkSync(path + "/" + filename)   //to remove the file, with the path to the file given as a parameter.
        }
      })
      fs.rmdirSync(path)
    } else {
      fs.rmdirSync(path)
    }
  } else {
    console.log("Directory path not found.")
  }
}

const pathToDir = path.join(__dirname, "directory-name")

removeDir("./utilities"); //remove a parent directory and it's files and sub-directories
