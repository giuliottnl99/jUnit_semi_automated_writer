var header;
var flgCarryOneResult;
var commonHeader;
var methodName;
var callOfTheMethodStr;
var throwsStr;

/**In questo file si trovano le logiche backend di generazione degli output (che si attivano quando si clicca su "generaOutput") */

/** Questo è il metodo principale: prende tutti i dati dalle varie textArea e chaima funzioni che, nell'ordine:
 * 1. Costruiscono un oggetto di classe Condizione (rappresentante il primo if) collegato a una serie di altri oggetti di classe Condizione (rappresentanti if annidati o conseguenti)
 * 2. A partire dall'oggetto, creano una lista "listaFiglie" di tipo Condizione ciascuna rappresentante i nodi finali di ciascun if 
 * 3. A partire da listaFiglie, crea un array contenente tutte le condizioni per rendere true/false ogni caso, tutti gli assert per ogni caso e il "suffisso" del nome del metodo per ogni caso
 * 4. A partire da questo array, genera per ogni riga di questo array un metodo
 */
function generateOutput() {

    //I get all the data from the json
    const outputTextarea = document.getElementById('outputResult');
    let output = '';
    let jsonDataStr = document.getElementById("jsonDataStr").value;
    let jsonData = JSON.parse(jsonDataStr);
    firstNode = jsonData.firstNode;
    header = jsonData.header;
    initializeHeader();

    let conditionsMatrix = [{"sequence" : "", "condition" : ""}];

    //call the recursive method creation:
    output = generateMethodsFromBaseConditionRecursive(firstNode, conditionsMatrix, "");
    outputTextarea.value = output;
}

function initializeHeader(){
    flgCarryOneResult = document.getElementById('flgCarryOneResult').checked;

    commonHeader = header.commonHeader!= null ? header.commonHeader : "";
    methodName = header.methodName!= null ? header.methodName : "";
    callOfTheMethodStr = header.callOfTheMethodStr != null ? header.callOfTheMethodStr : "";
    throwsStr = header.throwsStr != null ? header.throwsStr : "";
}

/** This function add the new data to the matrix */
function updateMatrix(matrixToUpdate, newConditions, caseSequence){
    //if null, I do nothing
    if(newConditions==null || newConditions.length==0){
        return [...matrixToUpdate];
    }
    let j=1;
    let matrixResult = []; 
    for(let newCondition of newConditions){
        let matrixBaseCopy = deepClone(matrixToUpdate); //matrix to update must not change!
        for(let i=0; i<matrixBaseCopy.length; i++){
            matrixBaseCopy[i]["condition"] += newCondition + "\n";
            matrixBaseCopy[i]["sequence"] += caseSequence + j;
            matrixResult.push(matrixBaseCopy[i]);
        }
        j++;
    }
    return matrixResult;
}


  

/** This funciton create a matrix useful to proceed for new methods if flgCarryOneResult is flagged */
function updateMatrixOnlyWithCase1(matrixToUpdate, newCondition, caseSequence){
    //in this case, matrixToUpdate must have just one element:
    let matrixBaseCopy = deepClone(matrixToUpdate);
    for(let i=0; i<matrixBaseCopy.length; i++){
        matrixBaseCopy[i]["condition"] += newCondition[0];
        matrixBaseCopy[i]["sequence"] += caseSequence + 1;    
    }
    return matrixBaseCopy;
}

function generateMethodsFromBaseConditionRecursive(currentNode, currentConditionMatrix, resultStr){
    let trueConditions = currentNode.trueConditions;
    let falseConditions = currentNode.falseConditions;
    let assertTrue = currentNode.assertTrue;
    let assertFalse = currentNode.assertFalse;

    let matrixTrue = updateMatrix(currentConditionMatrix, trueConditions, "True");
    let matrixFalse = updateMatrix(currentConditionMatrix, falseConditions, "False");
    let matrixFollowingNode = updateMatrix(currentConditionMatrix, falseConditions, "Following");


    resultStr +=createMethodsForAssignedNode(matrixTrue, matrixFalse, assertTrue, assertFalse);

    //after generating the new code for this node, if flgCarryOneResult is cheked, I must go on with just the first condition for every case:
    if(flgCarryOneResult==true){
        matrixTrue = updateMatrixOnlyWithCase1(currentConditionMatrix, trueConditions, "True");
        matrixFalse = updateMatrixOnlyWithCase1(currentConditionMatrix, falseConditions, "False");
        matrixFollowingNode = updateMatrixOnlyWithCase1(currentConditionMatrix, falseConditions, "Following");    
    }
    
    //Then, I think about other conditional nodes:
    let caseTrueNode = currentNode.caseTrueNode;
    let caseFalseNode = currentNode.caseFalseNode;
    let caseFollowingNode = currentNode.caseFollowingNode;

    if(caseTrueNode!=null){
        resultStr = generateMethodsFromBaseConditionRecursive(caseTrueNode, matrixTrue, resultStr);
    }
    if(caseFalseNode!=null){
        resultStr = generateMethodsFromBaseConditionRecursive(caseFalseNode, matrixFalse, resultStr);
    }
    if(caseFollowingNode!=null){
        resultStr = generateMethodsFromBaseConditionRecursive(caseFollowingNode, matrixFollowingNode, resultStr);
    }

    return resultStr;
}

/** This funciton creates the testing method of the node */
function createMethodsForAssignedNode(matrixTrue, matrixFalse, assertTrue, assertFalse){
    let result="";
    //if the assert is null, it means you should not create a method for that node but only for the nested and followers nodes
    //if the user wants the method, the assert will be "" instead of null
    if(assertTrue!=null){
        let i=1;
        for(matrixElement of matrixTrue){
            let thisCondition = matrixElement["condition"] + "\n";
            let thisSequence = matrixElement["sequence"];
            result+=createMethod(thisCondition, assertTrue, thisSequence)
        }
    }

    if(assertFalse!=null){
        i=1;
        for(matrixElement of matrixFalse){
            let thisCondition = matrixElement["condition"] + "\n";
            let thisSequence = matrixElement["sequence"];
            result+=createMethod(thisCondition, assertFalse, thisSequence)
        }
    }

    return result;
}

/** This method write the code: */
function createMethod(conditions, assert, suffixSequence) {
    if (assert == null) {
        assert = "";
    }
    conditions = deleteDuplicatesJUnit(conditions);
    let result = '';
    result += "@Test\n";
    result += 'public void ' + methodName + '_Test_Sequence' + suffixSequence + '() ' + throwsStr + ' {\n';
    result += commonHeader + '\n';
    result += conditions + '\n';
    result += callOfTheMethodStr + '\n';
    result += assert + '\n}\n\n';
    return result;
}


function deleteDuplicated(){
    //TODO: must be done a funciton to delete duplications in the code of the method
}


