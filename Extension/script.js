// function scanSinks() {
//     chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
//         chrome.scripting.executeScript({
//             target: { tabId: tabs[0].id },
//             function: getDomAndScan
//         }, function (results) {
//             if (results && results[0]) {
//                 document.getElementById("scan-results").textContent = results[0].result || "No dangerous sinks found.";
//             }
//         });
//     });
// }


async function tabInject(){

    async function getCurrentTab() {
        let queryOptions = {active: true,currentWindow: true };

        let[tab] = await chrome.tabs.query(queryOptions);

        return tab;
    }

    let tab = await getCurrentTab();


    await chrome.scripting.executeScript({

        target: {tabId: tab.id},
        function: getDomAndScan
    }).then(injectionResults => {
        if(injectionResults && injectionResults[0]){
            document.getElementById("scan-results").textContent = injectionResults[0].result || "No dangerous sinks found.";
        }

    })
    
}

function getDomAndScan() {
    
    function getDom() {
        let finalDomString = "";

        
        iteratr(document.documentElement, 0);

        
        function iteratr(x, y) {
            var space = "";
            for (var j = 0; j < y; j++) {
                space = space + "  ";
            }

            let lineText = space + x.nodeName;

            if (x.attributes) {
                for (var k = 0; k < x.attributes.length; k++) {
                    lineText = lineText + (" @" + x.attributes[k].name + " = " + x.attributes[k].value);
                }
            }

            if (x.nodeType === Node.TEXT_NODE) {
                let text = x.nodeValue.trim();
                if (text.length > 0) {
                    lineText += " => \"" + text + "\"";
                }
            }

            finalDomString = finalDomString + lineText + "\n";

            for (var i = 0; i < x.childNodes.length; i++) {
                iteratr(x.childNodes[i], y + 1);
            }
        }

        return finalDomString;
    }

    
    let scanString = getDom();

    
    const dangerousSinks = ["eval", "innerHTML", "document.write", "setTimeout", "setInterval"];

    
    let results = "";
    const lines = scanString.split("\n");


    for(let l=0; l<lines.length;l++){
        let line = lines[l];

        for(let m=0; m<dangerousSinks.length; m++){
            let sinks = dangerousSinks[m];

            if(line.includes(sinks)){
                results = results + line + `Dnagerous sink: ${sinks} \n`
            }
        }
    }

    // lines.forEach(line => {
    //     dangerousSinks.forEach(sink => {
    //         if (line.includes(sink)) {
    //             results += line + ` ⚠️ [Dangerous: ${sink}]\n`;
    //         }
    //     });
    // });

    return results || "No dangerous sinks found.";
}


document.addEventListener('DOMContentLoaded', function () {
    document.getElementById('scan').addEventListener('click', tabInject);
});



