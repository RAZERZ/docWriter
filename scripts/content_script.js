//Instantiate important variables

let documentWordCount;
let wordcount = 0;
let timepassed = 0;

//Extras

document.body.addEventListener("keydown", () => {
    wordcount++;
    console.log(Math.round((wordcount/5)/(timepassed/60)));
}, true);

setInterval(()=>{
    timepassed++;
    //console.log(Math.round((wordcount/5)/(timepassed/60)));
},1000);

//Define functions

getWordCount = () => {
    documentWordCount = document.getElementsByClassName("kix-paginateddocumentplugin")[0].innerText.match(/\w+/g).length;
    return documentWordCount;
};

updateWordCount = () => {
    docWriterProgressbar.style.width = (((getWordCount())/(/*word limit. TODO: Fetch from chrome storage*/5000))*100) + "%";
    docWriterInfoSpan.innerText = getWordCount() + " words";
};

//Load progress bar
let docWriterParent = document.createElement("div");
let docWriterProgressbarParent = document.createElement("div");
let docWriterProgressbar = document.createElement("div");
let docWriterInfoSpan = document.createElement("span");

docWriterParent.id = "docWriterParent";
docWriterProgressbar.id = "docWriterProgressbar";
docWriterInfoSpan.className = "docWriterInfoSpan";

docWriterParent.setAttribute("style", "position: absolute;width:30%;height: 2.5%;top:35px;left:800px;z-index:999");
docWriterProgressbarParent.setAttribute("style", "width:80%;height:100%;float:right;background:#212121;border-radius:50px;z-index:999");
docWriterProgressbar.setAttribute("style", "width:0%;height:100%;background:#00ad00;border-radius:50px;transition:2s ease");
docWriterInfoSpan.setAttribute("style", "color:#171717;font-size:1.1em;padding:0.5% 2%;border:1px solid gray;border-radius:50px");

docWriterParent.appendChild(docWriterProgressbarParent);
docWriterParent.appendChild(docWriterInfoSpan);
docWriterProgressbarParent.appendChild(docWriterProgressbar);
document.body.insertBefore(docWriterParent, document.body.children[0]);

//Onload populate fields

docWriterInfoSpan.innerText = getWordCount() + " words";

//Set eventlisteners

document.getElementsByClassName("kix-paginateddocumentplugin")[0].addEventListener("DOMSubtreeModified", () => {
    docWriterProgressbar.style.width = (((getWordCount())/(/*word limit. TODO: Fetch from chrome storage*/5000))*100) + "%";
    docWriterInfoSpan.innerText = getWordCount() + " words";
});

docWriterInfoSpan.addEventListener("click", () => {
    //TODO: Change to wpm
});

//Temp code