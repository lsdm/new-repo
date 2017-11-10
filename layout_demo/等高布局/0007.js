/**
 * Created by Administrator on 2017/11/6.
 */
function matchColumns(classname) {
    var divs, contDivs, maxHeight, divHeight, d;
    // get all <div> elements in the document
    divs = document.getElementsByTagName("div");
    contDivs = [];
    // initialize maximum height value
    maxHeight = 0;
    // iterate over all <div> elements in the document
    for (var i = 0; i < divs.length; i++) {
        // make collection with <div> elements with class attribute 'container'
        if (new RegExp("\\b" + classname + "\\b").test(divs[i].className)) {
            d = divs[i];
            /*alert(divs[i].className);
            if(typeof d == undefined){
                continue;
            }*/
            contDivs[contDivs.length] = d; // determine height for <div> element
            if (d.offsetHeight) {
                divHeight = d.offsetHeight;
            } else if (d.style.pixelHeight) {
                divHeight = d.style.pixelHeight;
            }
        }
        // calculate maximum height
        if(!isNaN(parseInt(divHeight))){//将container筛选出去
            maxHeight = Math.max(parseInt(divHeight), maxHeight);
        }
    }
    // assign maximum height value to all of container <div> elements
    for (var j = 0; j < contDivs.length; j++) {
        contDivs[j].style.height = maxHeight + "px";
    }
}
// Runs the script when page loads
window.onload = function () {
    if (document.getElementsByTagName) {
        matchColumns('column');
        // class=maincolumn
    }
};