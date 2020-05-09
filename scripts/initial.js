let navBarBtns = document.getElementById("navBar").children;

navBarBtns[0].addEventListener("click", () => {
    for(let i=0;navBarBtns.length>i;i++){navBarBtns[i].removeAttribute("class");}
    navBarBtns[0].setAttribute("class", "active");

    document.getElementById("content").innerHTML = '<div class="overview"><div class="activeDocs"></div></div>';

    chrome.storage.sync.get("docWriter", resp => {
        let docWriter = resp.docWriter;
        let activeDocs = document.getElementsByClassName("activeDocs")[0];

        for(let i = 0; i < docWriter.documents.activeDocs.docId.length; i++) {

            let progressPct;
            let docLimit;

            if(docWriter.documents.activeDocs.limit.word[i] !== "null") {
                docLimit = docWriter.documents.activeDocs.limit.word[i];
            }
            else if(docWriter.documents.activeDocs.limit.page[i] !== "null") {
                docLimit = docWriter.documents.activeDocs.limit.page[i];
            }
            else {
                console.log("No limit set");
            }

            progressPct = docWriter.documents.activeDocs.progress[i]/docLimit;

            let bgColor = getColorForPercentage(progressPct);

            activeDocs.innerHTML += '<div class="listElement"><p class="title">' + docWriter.documents.activeDocs.title[i] + '</p><div class="activeContent"><span class="deadline">' + docWriter.documents.activeDocs.limit.deadline[i] + '</span><div class="progress"><div class="progressbar" style="width:' + progressPct*100 + '%;background:' + bgColor + ';"></div></div></div></div>';

        }

    });

});

navBarBtns[1].addEventListener("click", () => {
    for(let i=0;navBarBtns.length>i;i++){navBarBtns[i].removeAttribute("class");}
    navBarBtns[1].setAttribute("class", "active");
});

navBarBtns[2].addEventListener("click", () => {
    for(let i=0;navBarBtns.length>i;i++){navBarBtns[i].removeAttribute("class");}
    navBarBtns[2].setAttribute("class", "active");
});


//Event listeners

window.addEventListener("load", () => {
    navBarBtns[0].click();
});

//Temp code

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