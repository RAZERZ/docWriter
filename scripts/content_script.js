chrome.storage.sync.get("docWriter", syncedStorageObj => {

    if(syncedStorageObj.docWriter.documents.activeDocs.docId.length !== 0 && syncedStorageObj.docWriter.documents.activeDocs.docId.includes(window.location.href.substr(35, 44))) {

        //Instantiate important variables

        let stackIndex = syncedStorageObj.docWriter.documents.activeDocs.docId.indexOf(window.location.href.substr(35, 44));
        let docLimit;
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

        if(syncedStorageObj.docWriter.documents.activeDocs.limit.word[stackIndex] !== "null") {
            docLimit = syncedStorageObj.docWriter.documents.activeDocs.limit.word[stackIndex];
        }
        else if(syncedStorageObj.docWriter.documents.activeDocs.limit.page[stackIndex] !== "null") {
            docLimit = syncedStorageObj.docWriter.documents.activeDocs.limit.page[stackIndex];
        }
        else {
            console.log("No limit set");
        }

        let percentColors = [
            { pct: 0.0, color: { r: 0xff, g: 0x00, b: 0 } },
            { pct: 0.5, color: { r: 0xff, g: 0xff, b: 0 } },
            { pct: 1.0, color: { r: 0x00, g: 0xff, b: 0 } } ];

        let getColorForPercentage = pct => {
            for (var i = 1; i < percentColors.length - 1; i++) {
                if (pct < percentColors[i].pct) {
                    break;
                }
            }
            let lower = percentColors[i - 1];
            let upper = percentColors[i];
            let range = upper.pct - lower.pct;
            let rangePct = (pct - lower.pct) / range;
            let pctLower = 1 - rangePct;
            let pctUpper = rangePct;
            let color = {
                r: Math.floor(lower.color.r * pctLower + upper.color.r * pctUpper),
                g: Math.floor(lower.color.g * pctLower + upper.color.g * pctUpper),
                b: Math.floor(lower.color.b * pctLower + upper.color.b * pctUpper)
            };
            return 'rgb(' + [color.r, color.g, color.b].join(',') + ')';
        };

        //Define functions

        getWordCount = () => {
            documentWordCount = document.getElementsByClassName("kix-paginateddocumentplugin")[0].innerText.match(/\S+/g).length; //Was /\w+/g
            return documentWordCount;
        };

        updateWordCount = () => {
            docWriterProgressbar.style.width = (((getWordCount())/(docLimit))*100) + "%";
            docWriterInfoSpan.innerText = getWordCount() + " words";
        };

        //Load progress bar

        //Remove "last changed" message to free up space
        document.getElementById("docs-notice").remove();

        let docWriterParent = document.createElement("div");
        let docWriterProgressbarParent = document.createElement("div");
        let docWriterProgressbar = document.createElement("div");
        let docWriterInfoSpan = document.createElement("span");

        docWriterParent.id = "docWriterParent";
        docWriterProgressbar.id = "docWriterProgressbar";
        docWriterInfoSpan.className = "docWriterInfoSpan";

        docWriterParent.setAttribute("style", "position: absolute;width:30%;height:2.5%;top:35px;left:550px;z-index:999");
        docWriterProgressbarParent.setAttribute("style", "width:80%;height:100%;float:right;background:#212121;border-radius:50px;overflow:hidden;z-index:999");
        docWriterProgressbar.setAttribute("style", "width:0%;height:100%;border-radius:50px;transition:2s ease");
        docWriterInfoSpan.setAttribute("style", "color:#171717;font-size:1.1em;padding:0.5% 2%;border:1px solid gray;border-radius:50px");

        docWriterParent.appendChild(docWriterProgressbarParent);
        docWriterParent.appendChild(docWriterInfoSpan);
        docWriterProgressbarParent.appendChild(docWriterProgressbar);
        document.body.insertBefore(docWriterParent, document.body.children[0]);

        //Onload populate fields

        docWriterInfoSpan.innerText = getWordCount() + " words";

        //Set eventlisteners

        document.getElementsByClassName("kix-paginateddocumentplugin")[0].addEventListener("DOMSubtreeModified", () => {
            docWriterProgressbar.style.width = (((getWordCount())/(docLimit))*100) + "%";
            docWriterProgressbar.style.background = getColorForPercentage((getWordCount())/(docLimit));
            docWriterInfoSpan.innerText = getWordCount() + " words";

            syncedStorageObj.docWriter.documents.activeDocs.progress[stackIndex] = getWordCount();
        });

        docWriterInfoSpan.addEventListener("click", () => {
            //TODO: Change to wpm
        });

        setInterval(() => {
            console.log(syncedStorageObj);
            chrome.storage.sync.set(syncedStorageObj);
        }, 10000);

    }
    else if(syncedStorageObj.docWriter.documents.inactiveDocs.docId.length !== 0 && syncedStorageObj.docWriter.documents.inactiveDocs.docId == window.location.href.substr(35, 44)){}
    else if(window.location.href.substr(37) == "" || window.location.href.substr(37) == "?tgif=d") {}

    else {

        let docWriterParent = document.createElement("div");
        let docWriterChild = document.createElement("span");
        let docWriterMessageContainer = document.createElement("div");
        let docWriterMessageTitle = document.createElement("span");
        let docWriterMessageContent = document.createElement("span");

        docWriterChild.innerText = "new";
        docWriterParent.id = "docWriterParent";
        docWriterMessageTitle.innerText = "Would you like to add this document to the list of tasks?";
        docWriterMessageContent.innerText = "Open the docWriter extension and add it";
        docWriterParent.setAttribute("style", "position:absolute;left:800px;top:35px;border-radius:50px;cursor:pointer;user-select:none;z-index:999");
        docWriterChild.setAttribute("style", "color:#eaeaea;font-size:1.1em;padding:15% 35%;background:#f44336;border-radius:50px");
        docWriterMessageContainer.setAttribute("style", "position:absolute;width:322px;margin-top:10px;margin-left:-150px;background:#424242;color:#fff;padding:20px;border-radius:50px;cursor:default");

        docWriterParent.addEventListener("click", ()=>{
            if(!docWriterMessageContainer.children.length) {
                docWriterParent.appendChild(docWriterMessageContainer);
                docWriterMessageContainer.appendChild(docWriterMessageTitle);
                docWriterMessageContainer.appendChild(document.createElement("hr"));
                docWriterMessageContainer.appendChild(docWriterMessageContent);
            }
            else {
                docWriterParent.innerHTML = ""; //TODO: Add possible styling/x btn
            }
        });

        docWriterParent.appendChild(docWriterChild);
        document.body.insertBefore(docWriterParent, document.body.children[0]);

    }

});