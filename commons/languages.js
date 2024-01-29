//You should modify this object in order to translate it

let jsonOBjectLanguages = {
    "it" : {
        "explanation_preliminary_field" : "Campi preliminari",
        "explanations_in_Language_Chosen" : "Spiegazione funzionamento",
        "explanation_assert_transformation" : "Il campo \"trasforma in Assert\" pu\u00F2 in alcuni casi trasformare un setter nel suo assert. Es: <li> myObject.setMyVar(true); -> Assert.assertTrue(myObject.isMyVar()); </li><li>myObject.setVarString(\"myValue\"); -> Assert.assertEquals(myObject.getVarString(), \"myValue\");</li> ",
        "explanation_condition_transformator" : "Il campo per sostituire le condizioni fa la medesima cosa: prende i dati dentro if e li converte. Ma non funziona ancora bene",
        "explanation_delete_duplicates" : "Se inserisci del codice java nel campo \"elimina doppioni\", eventuali righe che ripetono le stesse cose o reimpostano le stesse variabili verranno eliminate",
        "exaplanation_json_creation_title" : "Creazione del json",
        "explanation_json_first_part" : "Il json contiene due oggetti principali: header e \"firstNode\". Il primo contiene informazioni comuni, il secondo le informazioni relative ai vari nodi condizionali",
        "explanation_header_title" : "Il nodo header contiene:",
        "explanation_header_1" : "\"commonHeader\" sono eventuali stringhe di intestazione che devono essere presenti all'inizio di ogni jUnit. Compariranno pertanto all'inizio di ogni jUnit",
        "explanation_header_2" : "\"methodName\" \u00E8 la stringa con il nome del metodo. Verr\u00E0 usata per creare il suffisso del nome di ogni metodo di test",
        "explanation_header_3" : "\"callOfTheMethodStr\" \u00E8 la stringa contenente il codice necessario a chiamare il metodo. Verr\u00E0 riprodotta in ogni jUnit dopo le condizioni e prima degli assert",
        "explanation_header_4" : "\"throwsStr\" \u00E8 la stringa contenente codice che va scritto dopo la dichiarazione del metodo ma prima della graffa (tipicamente eccezioni da lanciare). Il codice apparir\u00E0 nella dichiarazione di ogni jUnit.",
        "explanation_firstNode_title" : "Il nodo firstNode invece contiene al suo interno 7 oggetti, di cui alcuni possono avere a loro volta dentro altri 7 oggetti:",
        "explanation_firstNode_subtitle" : "Ogni nodo \u00E8 da vedere come una condizione (if o switch). Ogni condizione in quanto tale pu\u00F2 essere vera a certe condizioni, falsa ad altre, a seconda che sia vera o falsa pu\u00F2 avere condizioni altre che sono accessibili oppure no e ha degli Assert da lanciare per verificare che sia entrata correttamente nella condizione giusta",
        "explanation_trueConditions" : "\"trueConditions\": contiene la stringa delle condizioni necessarie perch\u00E8 lo specifico nodo sia vero. Nel jUnit verr\u00E0 copiata la corrispondente condizione pi\u00F9 tutte quelle dei nodi precedenti, eliminando eventuali istruzioni duplicate.",
        "explanation_falseConditions" : "\"falseConditions\": contiene le informazioni perch\u00E8 sia false. Stessa regola per il nodo true",
        "explanation_assertTrue" : "\"assertTrue\": contiene gli assert. Verr\u00E0 stampata nel corrispettivo metodo del caso true del nodo dopo la chiamata al metodo. Se \u00E8 null, il metodo corrispondente al nodo non verr\u00E0 generato, ma verranno solo generati eventuali jUnit per nodi annidati/conseguenti. Se vuoi che venga generato ugualmente il jUnit ma non hai assert da lanciare, metti una \"\" al posto di null",
        "explanation_assertFalse" : "\"assertFalse\": contiene gli assert da stampare nel corrispettivo metodo dopo le condizioni che lo rendono false e la chiamata al metodo, in modo analogo a assertTrue",
        "explanation_caseTrueNode" : "\"caseTrueNode\": Il campo \u00E8 null se non ci sono altri nodi in cui i jUnit successivi possono entrare solo se la funzione \u00E8 true. Altrimenti \u00E8 valorizzato e contiene le stesse 7 informazioni per il suo nodo annidato.",
        "explanation_caseFalseNode" : "\"caseFalseNode\": Analogo al campo \"explanation_caseTrueNode\", ma per i nodi dipendenti dal nodo falso. Ricorda che i nodi annidati prendono le condizioni true/false corrispondenti e nel jUnit che entra dentro il nodo annidato vi saranno tutte le condizioni concatenate, eventualmente pulite dai doppioni",
        "explanation_caseFollowingNode" : "\"caseFollowingNode\": Anche qui sono contenuti i dati di un nodo, ma tale nodo non dipende dal risultato del nodo a cui questo oggetto appartiene (e in seguito e viene chiamato sia che il nodo precedente \u00E8 true sia che \u00E8 false). Vengono passate a questo nodo e concatenate nel jUnit le condizioni del nodo genitore, ma non quelle del nodo che lo contiene",
        "example_node_look" : "Si consiglia di utilizzare come base il json di esempio nella cartella \"base_json_creation\"",
        "example_json_generator_title" : "Esempio di JSON da creare",
        "exampleImg" : "Il metodo seguente, presente nella cartella \"base_json_creation/json for example method\", viene ad esempio coperto passando il corrispettivo json (sempre presente nella stessa cartella): ",
        "javaCode" : "codice java:",
        "jsonCode" : "codice json rispettivo al metodo java di esempio:",
        "resultCode" : "Junit tests generati passando il rispettivo jSon:",
        "toTransformInAssert" : "Inserisci qui le voci da trasformare in Assert: ",
        "toTransformCondition" : "Inserisci qui le condizioni da trasformare (non funziona ancora benissimo):",
        "deleteNotALlowedCharactersParagraph" : "Inserisci qui un testo per eliminare tutti gli \n e i caratteri non ammessi nel json",
        "deleteDuplicates" : "Inserisci qui un testo per eliminare i doppioni",
        "insertJsonToTransform" : "Inserisci qui il tuo json da trasformare: ",
        "lblCarryOneResult" : "Se spunti questa casella, verranno usati tutti i casi true/false solo per l\'ultimo caso, mentre verrà solo preso il primo caso true e il primo caso false dei metodi esterni per costruire quelli interni",
        "generateOutputButton" : "Clicca qui per generare l'output del metodo",
        "tranformInAssert" : "Trasforma in assert",
        "transformTrue" : "Rendilo True",
        "transformFalse" : "Rendilo False",
        "deletUnallowedCharsInJson" : "Clicca qui per eliminare i caratteri non ammessi",
        "deleteDuplicates" : "Clicca qui per eliminare i duplucati",
        "instructions_link" : "Hai bisogno di istruzioni?"
        

    },
    "en" : {
        "explanation_preliminary_field": "Preliminary Fields",
        "explanations_in_Language_Chosen": "Explanations of how the script works",
        "explanation_assert_transformation": "The 'Transform to Assert' field can, in some cases, transform a setter into its assert. Example: <li>myObject.setMyVar(true); -> Assert.assertTrue(myObject.isMyVar()); </li><li>myObject.setVarString(\"myValue\"); -> Assert.assertEquals(myObject.getVarString(), \"myValue\");</li>",
        "explanation_condition_transformator": "The field for replacing conditions does the same thing: it takes the data inside 'if' and converts it. However, it does not work well yet.",
        "explanation_delete_duplicates": "If you enter Java code in the 'delete duplicates' field, any lines that repeat the same things or reset the same variables will be eliminated.",
        "exaplanation_json_creation_title": "JSON Creation",
        "explanation_json_first_part": "The JSON contains two main objects: header and 'firstNode.' The first contains common information, while the second contains information about the various conditional nodes.",
        "explanation_header_title": "The header node contains:",
        "explanation_header_1": "'commonHeader' are any header strings that must be present at the beginning of each jUnit. They will appear at the beginning of each jUnit.",
        "explanation_header_2": "'methodName' is the string with the method name. It will be used to create the suffix of each test method name.",
        "explanation_header_3": "'callOfTheMethodStr' is the string containing the code necessary to call the method. It will be reproduced in each jUnit after the conditions and before the asserts.",
        "explanation_header_4": "'throwsStr' is the string containing code to be written after the method declaration but before the curly brace (typically exceptions to be thrown). The code will appear in the declaration of each jUnit.",
        "explanation_firstNode_title": "The firstNode node contains 7 objects, some of which may, in turn, contain 7 objects:",
        "explanation_firstNode_subtitle": "Each node is to be seen as a condition (if or switch). Each condition, as such, can be true under certain conditions, false under others, depending on whether it is true or false. It may have other conditions that are accessible or not, and it has Asserts to throw to verify that it has entered the correct condition.",
        "explanation_trueConditions": "'trueConditions': contains the string of conditions necessary for the specific node to be true. In the jUnit, the corresponding condition will be copied, plus all those of the previous nodes, eliminating any duplicate instructions.",
        "explanation_falseConditions": "'falseConditions': contains the information for it to be false. Same rule for the true node.",
        "explanation_assertTrue": "'assertTrue': contains the asserts. It will be printed in the corresponding method of the true case of the node after the method call. If it is null, the method corresponding to the node will not be generated, but only jUnits for nested/consequent nodes will be generated. If you want the jUnit to be generated anyway but you have no asserts to throw, put a '' instead of null.",
        "explanation_assertFalse": "'assertFalse': contains the asserts to be printed in the corresponding method after the conditions that make it false and the method call, in a manner similar to assertTrue.",
        "explanation_caseTrueNode": "'caseTrueNode': The field is null if there are no other nodes in which the subsequent jUnits can only enter if the function is true. Otherwise, it is populated and contains the same 7 pieces of information for its nested node.",
        "explanation_caseFalseNode": "'caseFalseNode': Similar to the 'caseTrueNode' field, but for nodes dependent on the false node. Remember that nested nodes take the corresponding true/false conditions, and in the jUnit that enters the nested node, all conditions will be concatenated, possibly cleaned of duplicates.",
        "explanation_caseFollowingNode": "'caseFollowingNode': Here too, the data of a node is contained, but this node does not depend on the result of the node to which this object belongs (and later it is called whether the previous node is true or false). The conditions of the parent node are passed to this node and concatenated in the jUnit, but not those of the node containing it.",
        "example_node_look": "It is recommended to use the example JSON in the 'base_json_creation' folder as a base.",
        "example_json_generator_title": "Example of JSON to create",
        "exampleImg": "The following method, found in the 'base_json_creation/json for example method' folder, is covered, for example, by passing the corresponding JSON (also found in the same folder):",
        "javaCode": "Java code:",
        "jsonCode": "JSON code corresponding to the example Java method:",
        "resultCode": "JUnit tests generated by passing the respective JSON:",
        "toTransformInAssert": "Enter here the entries to transform into Assert: ",
        "toTransformCondition": "Enter here the conditions to transform (not working perfectly yet):",
        "deleteNotALlowedCharactersParagraph": "Enter text here to remove all \n and non-allowed characters in the JSON",
        "deleteDuplicates": "Enter text here to remove duplicates",
        "insertJsonToTransform": "Enter your JSON to transform here: ",
        "lblCarryOneResult": "If you check this box, all true/false cases will be used only for the last case, while only the first true case and the first false case of external methods will be taken to build the internal ones",
        "generateOutputButton": "Click here to generate the output of the method:",
        "tranformInAssert": "Transform into assert",
        "transformTrue": "Make it True",
        "transformFalse": "Make it False",
        "deletUnallowedCharsInJson": "Click here to delete unallowed characters",
        "deleteDuplicates": "Click here to delete duplicates",
        "instructions_link" : "Need instructions?"

    }
}

let translations;
let passedElement;

function setLanguage(language, domToChange){
    translations = jsonOBjectLanguages[language];
    if(translations==null){
        throw Error("Translation not available for chosen language");
    }
    initializeLabelsValues(domToChange);
}

function getLabelValue(label){
    return translations[label];
}

function initializeLabelsValues(domElementPassed){
    if(passedElement==null){
        passedElement = domElementPassed;
    }
    if(translations==null){
        throw "Error: language not chosen";
    }
    // for(let domElement of domElementPassed){
    for(let i=0; i<domElementPassed.length; i++){
        domElement = domElementPassed[i];
        //I should watch inside the element:
        try{
            if(domElement!=null && domElement.hasChildNodes()){
            initializeLabelsValues(domElement);
            }
        }
        catch{
            continue;
        }

        if(domElement.id==null){
            continue;
        }
        if(domElement.innerHTML!=null && domElement.innerHTML!=""){
            let stopDebug = "";
        }

        let translation = translations[domElement.id];
        if(translation==null){
            continue;
        }
        else{
            domElement.innerHTML = translation;
        }
    }
}