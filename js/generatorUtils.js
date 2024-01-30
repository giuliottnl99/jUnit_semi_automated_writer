/** Prende una riga e la pulisce dai commenti*/
function pulisciDaCommenti(javacode) {
  let righe = javacode.split("\n");
  let codicePulito = "";
  for (let i = 0; i < righe.length; i++) {
    let riga = righe[i];
    const index = riga.indexOf("//");
    if (index == 0) {
      continue;
    }
    if (index !== -1) {
      riga = riga.substring(0, index);
    }
    //in ogni caso, aggiungo nel risultato
    codicePulito += riga + "\n";
  }
  return codicePulito;
}

/**Questa funzione ritorna il valore tra le parentesi degli assert [(]es. assertTrue(form.isFlgT()) -> ritorna form.isFlgT() ] */
function prendiParentesiAssert(riga) {
  if (riga == null || riga == "" || !riga.includes("assert")) {
    return riga;
  }
  let setIndex = riga.indexOf("assert");
  let aperte = 0;
  let chiuse = 0;
  let aperturaIndex = -1;
  let chiusuraIndex = -1;

  for (let i = setIndex + 6; i < riga.length; i++) {
    if (riga[i] == '(') {
      aperte++;
      if (aperturaIndex == -1) {
        aperturaIndex = i;
      }
    } else if (riga[i] == ')') {
      chiuse++;
      if (aperturaIndex !== -1 && chiuse == aperte) {
        chiusuraIndex = i;
        break;
      }
    }
    //c'è un altro caso da considerare per chiudere: quello che le chiuse sono una in meno delle aperte ma c'è una "," e la riga contiene assertEquals:
    else if (aperturaIndex !== -1 && (chiuse == aperte - 1) && riga[i] == "," && riga.includes("AssertEquals")) {
      chiusuraIndex = i;
      break;
    }

  }

  if (aperturaIndex == -1 || chiusuraIndex == -1) {
    throw new Error('Parentesi non bilanciate');
  }

  return riga.substring(aperturaIndex + 1, chiusuraIndex);
}

function deleteNotAllowedCharacters(idDoc) {
  // Usa una regular expression per rimuovere i caratteri speciali e i newline
  let textareaToChange = document.getElementById(idDoc);
  let badText = textareaToChange.value;
  var cleanText = badText.replace(/\n/g, "\\n").replace(/\t/g, "\\t").replace(/\\/g, "\\\\").replace(/"/g, '\\"').replace(/\\\\/g, "\\");
  textareaToChange.value = cleanText;
}

