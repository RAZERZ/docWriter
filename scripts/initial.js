let navBarBtns = document.getElementById("navBar").children;

navBarBtns[0].addEventListener("click", () => {
    for(let i=0;navBarBtns.length>i;i++){navBarBtns[i].removeAttribute("class");}
    navBarBtns[0].setAttribute("class", "active");
});

navBarBtns[1].addEventListener("click", () => {
    for(let i=0;navBarBtns.length>i;i++){navBarBtns[i].removeAttribute("class");}
    navBarBtns[1].setAttribute("class", "active");
});

navBarBtns[2].addEventListener("click", () => {
    for(let i=0;navBarBtns.length>i;i++){navBarBtns[i].removeAttribute("class");}
    navBarBtns[2].setAttribute("class", "active");
});

//TODO: Evaluate if this code block is necessary, considering content_script.js
/*injectScript = () => {
    updateWordCount = () => {
        let wordCount = document.getElementsByClassName("kix-paginateddocumentplugin")[0].innerText.match(/\w+/g).length;
        let docWriterProgressbar = document.getElementById("docWriterProgressbar");
        let docWriterProgressbarParent = document.getElementById("docWriterProgressbarParent");
        docWriterProgressbar.style.width = (((wordCount)/(word limit. TODO: Fetch from chrome storage 5000))*100) + "%";
        docWriterProgressbarParent.getElementsByClassName("wc")[0].innerText = wordCount;
        return wordCount;
    };

    if(document.getElementById("docWriterProgressbarParent") == undefined) {
        let templateElement = document.createElement("template");
        templateElement.innerHTML = '<div id="docWriterProgressbarParent" style="position: absolute;width:30%;height: 2.5%;top:35px;left:800px"><span class="wc" style="color:#171717;font-size:1.1em;padding:0.5% 4%;border:1px solid gray;border-radius:50px"></span><div style="width:85%;height:100%;float:right;background:#212121;border-radius:50px;z-index:999"><div id="docWriterProgressbar" style="width: 0%;height: 100%;background: #00ad00;border-radius: 50px;transition:2s ease"></div></div></div>';
        let genEl = templateElement.content.childNodes[0];
        document.body.insertBefore(genEl, document.body.children[0]);
    }

    document.getElementsByClassName("kix-paginateddocumentplugin")[0].addEventListener("DOMSubtreeModified", () => {updateWordCount()});
    updateWordCount();
};*/

chrome.tabs.executeScript({code:'(' + injectScript +')();'});