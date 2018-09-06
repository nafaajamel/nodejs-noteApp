
const arg = require('yargs').argv


const fs = require("fs");

const help = require('./help')

let note = { title: "", body: "" };

let op = arg._[0]

let noteList = [];

if (fs.existsSync("note.json")) {

  let content = fs.readFileSync("note.json", "utf-8");

  noteList = content ? JSON.parse(content) : [];
}

let title = arg.t || arg.title;
let body = arg.b || arg.body

const verifTitle = () => {
  if (title === undefined) {
    console.log("invalid or missing title !");
    help(op)
    return false;
  } 
    return true;
};

const verifBody = ()=>{
    if (body ===undefined) {
        console.log("invalid or missing body !");
        help(op)
        return false;
      } 
      return true

}

switch (op) {

  case "add":

  if(! verifTitle() || ! verifBody())break;

    note.title = title;

    note.body = body;

    noteList.push(note);

    fs.writeFile("note.json", JSON.stringify(noteList), err => {
      if (err) console.log(err);
    });

    console.log("note added !");

    break;

  case "list":
    noteList.map((x, i) => {
      console.log(
        " - note : " + i + "  title: " + x.title + "   body :  " + x.body + "\n"
      );
    });

    break;

  case "read":
    if (!verifTitle()) break;

    let found = 0;
    if(! verifTitle())
  
    ! title 
      ? console.log("empty title !")
      : noteList.map((x, i) => {
          if (x.title == title) {
            console.log("-------- \n" + "- title : " + x.title + "\n");

            console.log("- body : " + x.body + "\n");

            found++;
          }
        });
    !found
      ? console.log("0 note")
      : console.log("--->printing  " + found + " note");

    break;

  case "remove":
    if (!verifTitle()) break;

    fs.writeFile(
      "note.json",
      JSON.stringify(noteList.filter(x => x.title != title)),
      err => {
        if (err) console.log(err);
      }
    );

    console.log(
      "---> " +
        noteList.filter(x => (x.title == title)).length +
        " note removed !"
    );

    break;

  default:
   help('')
}