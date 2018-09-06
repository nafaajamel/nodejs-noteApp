const fs = require("fs");


const help = require('./help')

let note = { title: "", body: "" };

let p = process.argv;

let noteList = [];

if (fs.existsSync("note.json")) {

  let content = fs.readFileSync("note.json", "utf-8");

  noteList = content ? JSON.parse(content) : [];
}

let exT = p.indexOf("-t") + p.indexOf("--title");

let title = "";

const verifTitle = () => {
  if (exT !== 2) {
    console.log("invalid or missing title !");
    help(p[2])
    return false;
  } else {
    title = p[exT + 2];
    return true;
  }
};

const verifBody = ()=>{
    if (p.indexOf("-b")==-1 && p.indexOf("--body")==-1) {
        console.log("invalid or missing body !");
        help(p[2])
        return false;
      } 
      return true

}

switch (p[2]) {

  case "add":

  if(! verifTitle() || ! verifBody())break;
  
    if (p.length != 7) {

      console.log("error syntax");
       help(p[2])
      break;
    }
    let t = p.indexOf("-t") !== -1 ? p.indexOf("-t") : p.indexOf("--title");

    let b = p.indexOf("-b") !== -1 ? p.indexOf("-b") : p.indexOf("--body");

    if (b - t != 2) {
      console.log(" error element order ! ");
      help(p[2])
      break;
    }

    note.title = p[t + 1];

    note.body = p[b + 1];

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
  
    exT + 2 === p.length
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
