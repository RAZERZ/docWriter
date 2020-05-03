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

injectScript = () => {
    let templateElement = document.createElement("template");
    templateElement.innerHTML = '<div style="position: absolute;width: 30%;height: 1.5%;background: #212121;top: 15px;left: 300px;border-radius: 50px;"><div id="docWriterProgressbar" style="width: 0%;height: 100%;background: #00ad00;border-radius: 50px;"></div></div>';
    let genEl = templateElement.content.childNodes[0];
    document.body.insertBefore(genEl, document.body.children[0]);
    //TODO: Add onwriter listener
    document.getElementById("docWriterProgressbar").style.width = (((document.getElementsByClassName("kix-paginateddocumentplugin")[0].innerText.match(/\w+/g).length)/(/*word limit. TODO: Fetch from chrome storage*/5000))*100) + "%";
};

chrome.tabs.executeScript({code:'(' + injectScript +')();'});

/*Gets wordcount
t = () => {return document.getElementsByClassName("kix-paginateddocumentplugin")[0].innerText.match(/\w+/g).length};
chrome.tabs.executeScript({code:'('+t+')();'},(r)=>{document.getElementsByTagName("span")[0].innerText=r;});
*/
