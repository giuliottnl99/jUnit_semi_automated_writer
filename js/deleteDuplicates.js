function deleteDuplicatesInTextArea(strTextAreaId){
  let textArea = document.getElementById(strTextAreaId);
  let strToChange = textArea.value;
  let strResult = deleteDuplicatesJUnit(strToChange);
  textArea.value = strResult; 

}

/** Returns the data before the parenthesis and inside the parenthesis */
function divideCommandString(strToChange){
    if(strToChange.trim()==""){
      return ["", ""];
    }
    //se ci sono "=", allora divido in modo diverso:
    if(strToChange.includes("=") && !strToChange.includes("==") && strToChange.split("=").length<=2){
      let parts = strToChange.split("=");
      return [parts[0], parts[1]];
    }

    //divide elemento prima e dopo la parentesi. Se ci sono degli "=" che non sono degli "==", allora divide per "="
    let lastParenthesisIndex = strToChange.lastIndexOf(")");
    let countParenthesis = 0;
    let firstParenthesisIndex;
    for(let i=lastParenthesisIndex; i>=0; i--){
        if(strToChange[i]==")"){
            countParenthesis++;
        }
        if(strToChange[i]=="("){
            countParenthesis--;
            if(countParenthesis==0){
                firstParenthesisIndex = i;
                break;
            }
        }
    }

    //return the index:
    let firstPart = strToChange.substring(0, firstParenthesisIndex).trim();
    let secondPart = strToChange.substring(firstParenthesisIndex+1, lastParenthesisIndex).trim();

    return [firstPart, secondPart]
  }
  
/** This method delete duplicates of a jUnit-formatted coding language */
function deleteDuplicatesJUnit(strToChange) {
    let listaIstanze = strToChange.replace("\n", "").replace("\t", "").split(";");
    //listaChiamate: "metodo, listaPrima, listaParentesi"
    let listInstructions = [];
    for (let istanza of listaIstanze) {
      [firstPart, secondPart] = divideCommandString(istanza);
      listInstructions.push({ "instance": istanza.trim(), "part1": firstPart, "part2": secondPart });
    }
  
    //una volta fatto questo, posso ciclare:
    //il primo while si ripete finchè non esce un ciclo senza sporcizia
    let redoCycle = true;
    let countRedo = 0;
    while (redoCycle) {
      redoCycle = false;
      countRedo++;
      if(countRedo==1000000){
        throw "Error infinite loop";
        break;
      }
      redoLoop: for (let i = 0; i < listInstructions.length; i++) {
        let instruction1 = listInstructions[i];
        //for all the lines AFTER line 1;
        for (let j = i + 1; j < listInstructions.length; j++) {
          instruction2 = listInstructions[j];
          //If Ithe "left part" is the same:
          if (instruction1.part1 == instruction2.part1) {
            //if the two instances are equals, it means it is important the first part (es. MyClass myVar = new MyClass();) because it is sometimes used by another part of the code:
            if (instruction1.part2 == instruction2.part2) {
              //j because I want to remove the second (avoid issues):
              redoCycle = verifyAndRemoveDataFromListOfInstructions(listInstructions, j);
              //If I remove something, everything must be re-done from zero (otherwise I risk issues):
              if(redoCycle == true){
                break redoLoop;
              }
              
            }
            //if the instances are different, it means the more updated part is important:
            else {
              //i because I want to remove the first (less updated):
              redoCycle = verifyAndRemoveDataFromListOfInstructions(listInstructions, i);
              //If I remove something, everything must be re-done from zero (otherwise I risk issues):
              if(redoCycle == true){
                break redoLoop;
              }
            }
          }
        }
      }
    }
    //in the end, I recompose the code:
    let strResult = "";
    for(instruction of listInstructions){
      if(instruction.instance!=""){
        strResult += instruction.instance + ";\n";
      }
    }
    return strResult;
  }

  /** Verify if the element must be removed. If it is removed, return true; */
  function verifyAndRemoveDataFromListOfInstructions(listOfInstructions, positionToRemove){
    for(instruction of listOfInstructions){
      let firstPart = listOfInstructions.part1;
      //I should not remove empty strings
      if(firstPart==null || firstPart==""){
        return false;
      }
      //if contains the command "add" or "remove" in the last part (List.add), it is not a duplicate
      if(firstPart.substring(firstPart.length-3, firstPart.length)=="add"){
        return false;
      }
      if(firstPart.substring(firstPart.length-6, firstPart.length)=="remove"){
        return false;
      }
      listOfInstructions.splice(positionToRemove, 1);
      return true;
    }
  }