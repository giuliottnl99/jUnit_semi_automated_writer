    let languages = {
        data: {
            langChosen: "en",
            labels: [],
            allLabels: {
                //index fields:
                "nodePrefixName": { "en": "This is the node", "it": "Questo \u00E8 il nodo" },
                "addTrueNode": { "en": "Add true node", "it": "Aggiungi nodo true" },
                "addFalseNode": { "en": "Add false node", "it": "Aggiungi nodo false" },
                "addFollowingNode": { "en": "Add node for following code", "it": "Aggiungi nodo codice seguente" },
                "previousConditionsReadonly": { "en": "Generated previous conditions", "it": "Condizioni precedenti generate:" },
                "previousConditionsDesidered": { "en": "Desidered previous conditions", "it": "Condizioni precedenti desiderate:" },
                "trueConditions": { "en": "True conditions", "it": "Condizioni true" },
                "trueConditionNTime": { "en": "True condition", "it": "Condizione true:" },
                "falseConditions": { "en": "False conditions", "it": "Condizioni false" },
                "falseConditionNTime": { "en": "False condition:", "it": "condizione false:" },
                "assertTrue": { "en": "Things to assert in case of true:", "it": "Cose da asserire se true:" },
                "assertFalse": { "en": "Things to assert in case of false:", "it": "Cose da asserire se false:" },
                "associatedGenerated": { "en": "Methods associated:", "it": "Metodi associati:" },
                "commonHeader": { "en": "Common code for every test method:", "it": "Codice comune a ogni metodo di test:" },
                "methodName": { "en": "Method name:", "it": "Nome del metodo:" },
                "callOfTheMethodStr": { "en": "Method call string:", "it": "Stringa chiamata del metodo:" },
                "throwsStr": { "en": "Exceptions to be thrown:", "it": "Eccezioni da lanciare:" },
                "generateOutput": { "en": "Generate output:", "it": "Genera output:" },
                "confirmNodeDeletion": { "en": "Are you sure you want to delete this node and all the followings?", "it": "Sei sicuro di voler cancellare questo nodo e tutti i suoi figli?" },
                "confirmFieldDeletion": { "en": "Are you sure you want to delete the last condition?", "it": "Sei sicuro di voler cancellare l'ultima condizione?"},

                //helper fields:
                "toTransformInAssert": { "en": "Enter here the entries to transform into Assert: ", "it": "Inserisci qui le voci da trasformare in Assert: " },
                "toTransformCondition": { "en": "Enter here the conditions to transform (not working perfectly yet):", "it": "Inserisci qui le condizioni da trasformare (non funziona perfettamente ancora):" },
                "deleteNotALlowedCharacters": { "en": "Enter text here to remove all \n and non-allowed characters in the JSON", "it": "Inserisci qui il testo per rimuovere tutti i caratteri \n e i caratteri non consentiti nel JSON" },
                "deleteDuplicates": { "en": "Enter text here to remove duplicates", "it": "Inserisci qui il testo per rimuovere i duplicati" },
                "tranformInAssert": { "en": "Transform into assert", "it": "Trasformare in assert" },
                "transformTrue": { "en": "Make it True", "it": "Rendilo vero" },
                "transformFalse": { "en": "Make it False", "it": "Rendilo falso" },
                "deleteUnallowedCharsButton": { "en": "Delete unallowed characters in json", "it": "Eliminare caratteri non consentiti nel json" },
                "deleteDuplicatesButton": { "en": "Delete duplicated lines", "it": "Eliminare righe duplicate" },

            }

        },
        methods: {
            setLanguage(lang) {
                this.langChosen = lang;
                this.labels = [];
                for (const key in this.allLabels) {
                    this.labels[key] = this.allLabels[key][lang] != null ? this.allLabels[key][lang] : "";
                }
            }
        },
        mounted() {
            this.setLanguage("en");
        }
    }