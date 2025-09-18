// function printDOM() {
    
//     var rootDoc = document.documentElement;
    
//     var childNodes = rootDoc.childNodes;



//     for(var i =0; i < childNodes.length; i++){
//         console.log("  "+childNodes[i].nodeName);
//         var x = childNodes[i].childNodes;
//         for(var j = 0; j< x.length; j++ ){
//             console.log("    "+x[j].nodeName);
//         }

//     }
// }


function printDOM(){

    const htmlcode = document.getElementById("html-code").value;
    
    const parse = new DOMParser();

    const doc = parse.parseFromString(htmlcode, "text/html");


    const domView = document.getElementById("dom-view");
    domView.value = "";

    iteratr(doc.documentElement,0)



    function iteratr(x,y){

        var space = "";
        for(var j = 0; j < y; j++){
            space = space + "  ";
        }
        
        let lineText = space + x.nodeName;

        if (x.attributes){
            
            for(var k = 0;k < x.attributes.length; k++){
                // console.log(space + " @" + x.attributes[k].name +" = " + x.attributes[k].value);
                lineText = lineText + (" @" + x.attributes[k].name +" = " + x.attributes[k].value)
            }
        }

        if (x.nodeType === Node.TEXT_NODE) {
            let text = x.nodeValue.trim();
            if (text.length > 0) {
                lineText += " => \"" + text + "\"";
            }
        }

        domView.value = (domView.value) + (lineText + "\n");

        for(var i =0; i < x.childNodes.length; i++){
            iteratr(x.childNodes[i],y+1);
        }

    }



}