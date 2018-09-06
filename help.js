


const help = (op)=>{
    switch(op){
        case 'remove':
        case 'read':
        console.log('options : \n -t, -title : title of note  \b ')
    break;
    
    case 'add' : 
    console.log('options: \n   -t, --title : title of note \n -b , --body : body of note ')
    break;
case 'list':
break;
default:
console.log('option : \n   add note :   add  -t/--title  title of note   -b/--body  body of note ')
console.log('   list all note : list')
console.log('   read note by title : read  -t/--title   title of note')
console.log('   remove note : remove  -t/--title   title of note')
console.log('   get help:   -h/--help')
    }
    
}

module.exports = help

