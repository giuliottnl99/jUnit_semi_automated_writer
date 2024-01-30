

document.addEventListener("DOMContentLoaded", (event) => {
    //languages:
    let languages = {
        data: {
            langChosen: "en",
            labels: [],
            allLabels: {
                "nodePrefixName": { "en": "This is the node", "it": "Questo è il nodo" },
                "addTrueNode": { "en": "Add true node", "it": "Aggiungi nodo true" },
                "addFalseNode": { "en": "Add false node", "it": "Aggiungi nodo false" },
                "addFollowingNode": { "en": "Add node for following code", "it": "Aggiungi nodo codice seguente" },

            }

        },
        methods: {
            setLanguage(lang) {
                this.langChosen = lang;
                this.labels = [];
                for (const key in this.allLabels) {
                    this.labels[key] = this.allLabels[key][lang] != null ? this.allLabels[key][lang] : "";
                }
            },
            getLabels(){
                return this.labels;
            }
        },
        mounted() {
            this.setLanguage("en");
        }
    }


    
    let myVue = new Vue({
      el: "#app",
      data: {
        completeJson : {
          "header" : {"commonHeader" : "int myVar=7" , "methodName" : "myMethod", "callOfTheMethodStr": "myMethod(arg1, arg2)",  "throwsStr": "throws Exception"},
          "firstNode" : { "commonConditions" : [["", ""]], "trueConditions": [""], "falseConditions": [""], "assertTrue": "", "assertFalse": "", "caseTrueNode": null, "caseFalseNode": null, "caseFollowingNode": null}
        },
        isComponentMounted : false,
        currentDataOffCanvas: [],
        currentTitleOffCanvas: "default path",
        canvasCase: "body",
        previousConditions : [ ["", ""] ],
        output : "",
        currentCanvasSuffixSequence: "",
        outputCanvas : "",
        jsonDataStr: "",
        labels: null
      },  
      methods: {
        showStructure(){
          //TODO: jsonDataStr viene passato come null
          if (this.jsonDataStr==null || this.jsonDataStr=="") this.jsonDataStr="[]"; 
          this.completeJson = JSON.parse(this.jsonDataStr)!=null ? JSON.parse(this.jsonDataStr) : [];

        },
        showChangesInJson(){
          this.jsonDataStr = JSON.stringify(this.completeJson, null, 2);
        },
        transformAssert(caseChosen){
          if(caseChosen){
            this.currentDataOffCanvas.assertTrue = creaAssert(this.currentDataOffCanvas.assertTrue);
          }
          else{
            this.currentDataOffCanvas.assertFalse = creaAssert(this.currentDataOffCanvas.assertFalse);
          }
        },
        changeCurrentDataOffCanvas(elementData, nodePath, previousConditions, suffixSequence) {
          this.currentDataOffCanvas = elementData;
          this.currentTitleOffCanvas = "nodo" + nodePath;
          this.currentCanvasSuffixSequence = suffixSequence;
          this.canvasCase = "body";
          this.previousConditions = previousConditions;
          this.showChangesInJson();
          this.generateOutputForCanvas();
          this.$forceUpdate();
        },
        changeDataOffCanvasHeader(){
          this.currentDataOffCanvas = this.completeJson.header;
          this.currentTitleOffCanvas = "header";
          this.canvasCase = "header";
          this.showChangesInJson();
          this.$forceUpdate();
        },
        addCondition(conditionsArray){
          if(conditionsArray==null) conditionsArray=[""];  
          else{
            conditionsArray.push("");
          }
          this.showChangesInJson();
        },
        deleteCondition(conditionsArray){
          if(!window.confirm("Sei sicuro di voler eliminare il campo?")) return;
          conditionsArray.splice(conditionsArray.length - 1, 1);
        },
        copyPrecedentConditions(index){
          this.currentDataOffCanvas.commonConditions[index] = this.previousConditions[index]; 
          this.showChangesInJson();
          this.$forceUpdate();
        },
        generateOutput(){
          this.output = "";
          this.generateOutputRecursive(this.completeJson.firstNode);

        },
        generateOutputRecursive(passedNode){
          if(passedNode.trueConditions!=null && passedNode.commonConditions!=null){
            for(const commonC of passedNode.commonConditions){
              for(const i in passedNode.trueConditions){
                //If the user leave the "commonConditions" fields empty, I skip
                if((commonC[0]==null || commonC[0]=="") && i>0) continue;

                const trueC = passedNode.trueConditions[i];
                const strCond = deleteDuplicatesJUnit(commonC[0] + trueC);

                if(passedNode.assertTrue!=null && passedNode.assertTrue!="")
                  this.output += this.createMethod(strCond, passedNode.assertTrue, commonC[1] + "True" + (parseInt(i)+1));
                
              }
            }
          }

          if(passedNode.falseConditions!=null && passedNode.commonConditions!=null){
            for(const commonC of passedNode.commonConditions){
              for(const i in passedNode.falseConditions){
                //If the user leave the "commonConditions" fields empty, I skip
                if((commonC[0]==null || commonC[0]=="") && i>0) continue;
                 
                const falseC = passedNode.falseConditions[i];
                const strCond = deleteDuplicatesJUnit(commonC[0] + falseC);
                
                if(passedNode.assertFalse!=null && passedNode.assertFalse!="")
                  this.output += this.createMethod(strCond, passedNode.assertFalse, commonC[1] + "False" + (parseInt(i)+1));
              }
            }
          }

          //Va gestito problema suffix nel recall
          if(passedNode.caseTrueNode!=null){
            this.generateOutputRecursive(passedNode.caseTrueNode);
          }

          if(passedNode.caseFalseNode!=null){
            this.generateOutputRecursive(passedNode.caseFalseNode);
          }

          if(passedNode.caseFollowingNode!=null){
            this.generateOutputRecursive(passedNode.caseFollowingNode);
          }
        },
        createMethod(conditions, assert, suffixSequence){
          if (assert == null) {
            assert = "";
          }
          let result = '';
          result += "@Test\n";
          result += 'public void ' + this.completeJson.header.methodName + '_Test_Sequence' + suffixSequence + '() ' + this.completeJson.header.throwsStr + ' {\n';
          result += this.completeJson.header.commonHeader + '\n';
          result += conditions + '\n';
          result += this.completeJson.header.callOfTheMethodStr + '\n';
          result += assert + '\n}\n\n';
          return result;
        },
        generateOutputForCanvas(){
          this.outputCanvas="";
          const passedNode = this.currentDataOffCanvas;
          if(passedNode.trueConditions!=null && passedNode.commonConditions!=null){
            for(const commonC of passedNode.commonConditions){
              for(const i in passedNode.trueConditions){
                //If the user leave the "commonConditions" fields empty, I skip
                if((commonC[0]==null || commonC[0]=="") && i>0) continue;

                const trueC = passedNode.trueConditions[i];
                const strCond = deleteDuplicatesJUnit(commonC[0] + trueC);
                if(passedNode.assertTrue!=null && passedNode.assertTrue!="")
                  this.outputCanvas += this.createMethod(strCond, passedNode.assertTrue, commonC[1] + "True" + (parseInt(i)+1));
              }
            }
          }

          if(passedNode.falseConditions!=null && passedNode.commonConditions!=null){
            for(const commonC of passedNode.commonConditions){
              for(const i in passedNode.falseConditions){
                //If the user leave the "commonConditions" fields empty, I skip
                if((commonC[0]==null || commonC[0]=="") && i>0) continue;

                const falseC = passedNode.falseConditions[i];
                const strCond = deleteDuplicatesJUnit(commonC[0] + falseC);
                
                if(passedNode.assertFalse!=null && passedNode.assertFalse!="")
                  this.outputCanvas += this.createMethod(strCond, passedNode.assertFalse, commonC[1] + "False" + (parseInt(i)+1));
              }
            }
          }
          this.showChangesInJson();
        }
      },
      mounted(){
        this.showChangesInJson();
        this.showStructure();
        this.isComponentMounted = true;
        this.labels = this.getLabels();
      },
      components: ["tree-element", "show-data-element"],
      mixins: [languages]
    });

    Vue.component("tree-element", {
      template: `
        <div>
          <span> {{labels.nodePrefixName}} {{ nodePath }} </span> 
          <button class="btn btn-success" type="button" data-bs-toggle="offcanvas" data-bs-target="#offcanvasWithBothOptions" aria-controls="offcanvasWithBothOptions" @click="changeDataOffCanvas">
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-bookmark-plus" viewBox="0 0 16 16" @click="changeDataOffCanvas">
              <path d="M2 2a2 2 0 0 1 2-2h8a2 2 0 0 1 2 2v13.5a.5.5 0 0 1-.777.416L8 13.101l-5.223 2.815A.5.5 0 0 1 2 15.5zm2-1a1 1 0 0 0-1 1v12.566l4.723-2.482a.5.5 0 0 1 .554 0L13 14.566V2a1 1 0 0 0-1-1z"/>
              <path d="M8 4a.5.5 0 0 1 .5.5V6H10a.5.5 0 0 1 0 1H8.5v1.5a.5.5 0 0 1-1 0V7H6a.5.5 0 0 1 0-1h1.5V4.5A.5.5 0 0 1 8 4"/>
            </svg>
          </button>
          <button class="btn btn-danger" type="button" @click="deleteNode()">
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-file-minus" viewBox="0 0 16 16">
                <path d="M5.5 8a.5.5 0 0 1 .5-.5h4a.5.5 0 0 1 0 1H6a.5.5 0 0 1-.5-.5"/>
                <path d="M4 0a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h8a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2zm0 1h8a1 1 0 0 1 1 1v12a1 1 0 0 1-1 1H4a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1"/>
              </svg>
          </button>
  
        <br/>

          <template  v-if="element.caseTrueNode!=null && Object.keys(element.caseTrueNode).length > 0">
            <tree-element :element="element.caseTrueNode" :indent-level="indentLevel+3" :style="{ marginLeft: indentLevel+3 + 'em' }" :node-path="nodePath + 'True' " :suffix-sequence="suffixSequence + 'True'" :previous-conditions="arrayConcat(element.trueConditions, previousConditions, 'True')" :labels="labels"></tree-element>
          </template>
          <template v-else>
            <span> {{labels.addTrueNode}} </span>
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-plus-square" viewBox="0 0 16 16" @click="addNode('caseTrueNode')">
              <path d="M14 1a1 1 0 0 1 1 1v12a1 1 0 0 1-1 1H2a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1zM2 0a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2z"/>
              <path d="M8 4a.5.5 0 0 1 .5.5v3h3a.5.5 0 0 1 0 1h-3v3a.5.5 0 0 1-1 0v-3h-3a.5.5 0 0 1 0-1h3v-3A.5.5 0 0 1 8 4"/>
            </svg>        
          </template>

          <br/>
          <template  v-if="element.caseFalseNode!=null && Object.keys(element.caseFalseNode).length > 0">
            <tree-element :element="element.caseFalseNode" :indent-level="indentLevel+3" :style="{ marginLeft: indentLevel+3 + 'em' }" :node-path="nodePath + 'False' " :suffix-sequence="suffixSequence + 'False'" :previous-conditions="arrayConcat(element.falseConditions, previousConditions, 'False')" :labels="labels"></tree-element>
          </template>
          <template v-else>
            <span> {{labels.addFalseNode}} </span>
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-plus-square" viewBox="0 0 16 16" @click="addNode('caseFalseNode')">
              <path d="M14 1a1 1 0 0 1 1 1v12a1 1 0 0 1-1 1H2a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1zM2 0a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2z"/>
              <path d="M8 4a.5.5 0 0 1 .5.5v3h3a.5.5 0 0 1 0 1h-3v3a.5.5 0 0 1-1 0v-3h-3a.5.5 0 0 1 0-1h3v-3A.5.5 0 0 1 8 4"/>
            </svg>        
          </template>

          <br/>
          <template  v-if="element.caseFollowingNode!=null && Object.keys(element.caseFollowingNode).length > 0">
            <tree-element :element="element.caseFollowingNode" :indent-level="indentLevel+3" :style="{ marginLeft: indentLevel+3 + 'em' }" :node-path="nodePath + 'Following' " :suffix-sequence="suffixSequence + 'Following'" :previous-conditions="arrayConcat([''], previousConditions, 'Following')" :labels="labels"></tree-element>
          </template>
          <template v-else>
            <span> {{labels.addFollowingNode}} </span>
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-plus-square" viewBox="0 0 16 16" @click="addNode('caseFollowingNode')">
              <path d="M14 1a1 1 0 0 1 1 1v12a1 1 0 0 1-1 1H2a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1zM2 0a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2z"/>
              <path d="M8 4a.5.5 0 0 1 .5.5v3h3a.5.5 0 0 1 0 1h-3v3a.5.5 0 0 1-1 0v-3h-3a.5.5 0 0 1 0-1h3v-3A.5.5 0 0 1 8 4"/>
            </svg>        
          </template>

        </div>
      `,
      props: ["element", "indentLevel", "nodePath", "previousConditions", "suffixSequence", "labels"],
      methods: {
        changeDataOffCanvas() {
          this.$parent.changeCurrentDataOffCanvas(this.element, this.nodePath, this.previousConditions, this.suffixSequence);
        },
        changeCurrentDataOffCanvas(element, nodePath, previousConditions, suffixSequence){
          this.$parent.changeCurrentDataOffCanvas(element, nodePath, previousConditions, suffixSequence);
        },
        addNode(caseNode){
          this.element[caseNode] = {
            "commonConditions" : [["", ""]],
            "trueConditions": [""],
            "falseConditions": [""],
            "assertTrue": "",
            "assertFalse": "",
            "caseTrueNode": null,
            "caseFalseNode": null,
            "caseFollowingNode": null        
          };
          this.changeDataOffCanvas();
        },
        deleteNode(){
          if(!window.confirm("Sei sicuro di voler eliminare il campo e tutti i successivi?")) return;

          if(this.$parent.element!=null && this.$parent.nodePath!=null && this.$parent.indentLevel!=null){
            let parentElement = this.$parent.element;
            if(parentElement.caseTrueNode==this.element) parentElement.caseTrueNode = null;
            if(parentElement.caseFalseNode==this.element) parentElement.caseFalseNode = null
            if(parentElement.caseFollowingNode==this.element) parentElement.caseFollowingNode = null;
            this.changeDataOffCanvas();
          }
          else{
            window.alert("Attenzione: non si può rimuovere il nodo principale");
          }
        },
        arrayConcat(newConditions, currentConditions, toAddPath){
          let result = [];
          for(i in newConditions){
            const newC = newConditions[i];
            for(currentC of currentConditions){
              const toAddStr = deleteDuplicatesJUnit(currentC[0] + newC);
              result.push([toAddStr, currentC[1]+toAddPath + (parseInt(i)+1)]);
            }
          }
          return result;
        }
      },
      mounted(){
        this.elementType = "tree-element";
      }
    });

  
  });



  