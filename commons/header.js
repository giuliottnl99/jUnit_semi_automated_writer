
function getHeader(pathUntilHeader){
    let headerValue = "<div style=\"display: grid; grid-template-columns : 3fr 1fr;\">" 
    +"<div></div>"
    +"<div style=\"display: grid; grid-template-columns : 5fr 1fr 5fr;\">"
    +"    <img src=\"" + pathUntilHeader + "\"..\img\IT_FLAG.png\" style=\"height: 75%; width: 100%\" />"
    +"    <div></div>"
    +"    <img src=\"" + pathUntilHeader + "\"..\img\EN_FLAG.png\" style=\"width: 100%\"/>   " 
    +"</div>"
    +"</div>";
    return headerValue;
}