// Funciones de dibujado


function inContainer (text, type, selectcontainer, attributes=false) {

    // Define el contenedor existente donde se introducirá la etiqueta
    let container= document.getElementById(selectcontainer); 

    // Crea un elemento con la etiqueta definida 
    let newLabel = document.createElement(type); 

    // Introduce el texto dentro de la etiqueta
    newLabel.textContent = text;

    // Incrusta la etiqueta en el contenedor previamente definido.
    container.appendChild (newLabel); // Indicando así el contenido

    // Asociar los atributos
    if (attributes) {
        for (let i=0; i<attributes.length; i++) {
            newLabel.setAttribute (attributes[i][0], attributes [i][1] )
        }
    }
}

function inContainerBefore(text, type, selectcontainer, attributes = false) {
    // Define el contenedor existente donde se introducirá la etiqueta
    let container = document.getElementById(selectcontainer);

    // Crea un elemento con la etiqueta definida
    let newLabel = document.createElement(type);

    // Introduce el texto dentro de la etiqueta
    newLabel.textContent = text;

    // Incrusta la etiqueta al principio del contenedor previamente definido.
    if (container.firstChild) {
        container.insertBefore(newLabel, container.firstChild);
    } else {
        container.appendChild(newLabel); // Si el contenedor está vacío, usa appendChild
    }

    // Asociar los atributos
    if (attributes) {
        for (let i = 0; i < attributes.length; i++) {
            newLabel.setAttribute(attributes[i][0], attributes[i][1]);
        }
    }
}

function createTable(tableContent, container, idRef, classRef = "table") {

    // Convertir todos los elementos del contenido de la tabla en Strings
    tableContent = tableContent.map(subArray => {
        return subArray.map(element => element.toString());
    });

    // Etiquetas <table> 
    inContainer("", "table", container, [["id", idRef], ["class", classRef]]);
    // Etiquetas <thead> 
    inContainer("", "thead", idRef, [["id", idRef + "head"]]);

    // Etiqueta <thead>
    inContainer("", "tr", idRef + "head", [["id", idRef + "trhead"]]);
    // El modificador adaptará a partir de que fila se mostrará el thead 
    let modifier = 0;
    // Si el primer array solo contiene un string...y a su vez este es el tamaño anormal con respecto a otros elementos de la tabla
    if (tableContent[0].length == 1 && tableContent[0].length < tableContent[1].length) {
        modifier = 1;
        // ...Se considerará que este es el título de la tabla, ocupando el thead...
        inContainer(tableContent[0][0], "th", idRef + "trhead", [["colspan", tableContent[1].length]])
        // ... siendo el siguiente espacio en el array el thead inferior
        inContainer("", "tr", idRef + "head", [["id", idRef + "trtrhead"]])
        for (let i = 0; i < tableContent[1].length; i++) {
            inContainer(tableContent[1][i], "th", idRef + "trtrhead")
        }
    }
    else {
        // De lo contrario, escribir el thead normalmente
        for (let i = 0; i < tableContent[0].length; i++) {
            inContainer(tableContent[0][i], "th", idRef + "trhead")
        }
    }

    // Etiqueta <tbody> 
    inContainer("", "tbody", idRef, [["id", idRef + "body"]])

    // Si el ultimo elemento del array empieza con un espacio en blanco, considera que es el footer

    if (String(tableContent[tableContent.length - 1][0].charAt(0)) == " ") {

        // Rellena todos los elementos hasta llegar al footer
        for (let i = 1 + modifier; i < tableContent.length - 1; i++) {
            inContainer("", "tr", idRef + "body", [["id", idRef + "tr" + i]]);
            for (let j = 0; j < tableContent[i].length; j++) {
                inContainer(tableContent[i][j], "td", idRef + "tr" + i)
            }
        }

        // Etiqueta <footer>
        inContainer("", "tfoot", idRef, [["id", idRef + "foot"]]);
        for (let i = 0; i < tableContent[tableContent.length - 1].length; i++) {
            inContainer(tableContent[tableContent.length - 1][i], "td", idRef + "foot")
        }
    }
    else {
        // Rellena todos los elementos restantes
        for (let i = 1 + modifier; i < tableContent.length; i++) {
            inContainer("", "tr", idRef + "body", [["id", idRef + "tr" + i]]);
            for (let j = 0; j < tableContent[i].length; j++) {
                inContainer(tableContent[i][j], "td", idRef + "tr" + i)
            }
        }
    }
}


// Funciones lexicográficas

function findSimilarWords(json, targetWord, maxResults = 5) {
    if (json) {
        const words = Object.keys(json);
        const similarWords = words.filter(word => word.startsWith(targetWord.substring(0, 99)));
        return similarWords.slice(0, maxResults);
    }
}

function findSimilarWordsByFinal (allWords, targetWord) {
    return allWords.filter(word => word.endsWith(targetWord));
}

function wordSchema (word) {
    const schema = {};

    for (let i = 0; i < word.length; i++) {
        const character = word[i];
        
        if (schema[character]) {
            schema[character]++;
        } else {
            schema[character] = 1;
        }
    }

    return schema;
}

function compareSchemas(word1, word2) {

    schema1 = wordSchema(word1)
    schema2= wordSchema (word2)
    
    const keys1 = Object.keys(schema1);
    const keys2 = Object.keys(schema2);
  
    if (keys1.length !== keys2.length) {
      return false;
    }
  
    for (const key of keys1) {
      if (schema1[key] !== schema2[key]) {
        return false;
      }
    }
  
    return true;
}

function findAnagrams (word, allWords, data) {
    let auxWord = word;
    // Eliminación de acentos de la palabra, canonizandola. 
    word = word.normalize('NFD').replace(/[\u0300-\u036f]/g, '');
    
    let anagrams = [];
    for (let i=0; i<allWords.length; i++) {
        if (compareSchemas (word, allWords[i])) anagrams.push(allWords[i]);
    }

    let combinations = floatingAccent (word, data)
    if (combinations.length>0) {
        for (let i=0; i<combinations.length; i++) {
            for (let j=0; j<allWords.length; j++) {
                if (compareSchemas (combinations[i], allWords[j])) anagrams.push(allWords[j]);
            }
        }
    };


    return removeWordFromArray (anagrams, auxWord); 
}

function findByContains (word, allWords) {
    let output = [];
    for (let i=0; i<allWords.length;i++) {
        if (allWords[i].includes(word)) output.push(allWords[i])
    }

    return output; 
} 

function randomWord (allWords) {
    let randomNumber = Math.floor(Math.random() * (allWords.length + 1));
    return allWords[randomNumber]
}

function accentLastVowel(str) {
    // Dictionary of vowels and their accented versions
    const vowels = {
      'a': 'á',
      'e': 'é',
      'i': 'í',
      'o': 'ó',
      'u': 'ú',
      'A': 'Á',
      'E': 'É',
      'I': 'Í',
      'O': 'Ó',
      'U': 'Ú'
    };
    
    for (let i = str.length - 1; i >= 0; i--) {
      if (vowels[str[i]]) {
        return str.slice(0, i) + vowels[str[i]] + str.slice(i + 1);
      }
    }
    
    return str;
  }

function floatingAccent (targetWord, data) {
    const vowelsToAccent = { 'a': 'á', 'e': 'é', 'i': 'í', 'o': 'ó', 'u': 'ú', 'A': 'Á', 'E': 'É', 'I': 'Í', 'O': 'Ó', 'U': 'Ú' };
    const accentToVowels = { 'á': 'a', 'é': 'e', 'í': 'i', 'ó': 'o', 'ú': 'u', 'Á': 'A', 'É': 'E', 'Í': 'I', 'Ó': 'O', 'Ú': 'U' };
    
    function wordVowels (word) {
        let output = [];
        for (let i=0; i<word.length; i++) {
            if (vowelsToAccent[word[i]]) output.push([word[i],i])
            if (accentToVowels[word[i]]) return false;
        }
        return output;
    } 

    let floatingAccent = []; 
    let floatingAccentOutput = [];
    if (wordVowels (targetWord)) {

        for (let i=0; i<wordVowels(targetWord).length; i++) {
           floatingAccent.push (
            targetWord.substring(0,(wordVowels(targetWord)[i][1]))
            + vowelsToAccent[wordVowels(targetWord)[i][0]] 
            + targetWord.substring (wordVowels(targetWord)[i][1]+1, targetWord.length)
            )
        }

        if (floatingAccent.length>0) {
           
            for (let i=0; i<floatingAccent.length; i++) {
                if (data[floatingAccent[i][0]][floatingAccent[i]]) {
                    floatingAccentOutput.push (floatingAccent[i])
                }
            }
        }
    }

    return floatingAccentOutput;


}

function incorrectSugerences (json, targetWord, data, allWords) {

    ///////////////////////////////////////////////
    // Acento flotante 

    if (floatingAccent(targetWord, data).length>0) return floatingAccent(targetWord, data)

    ///////////////////////////////////////////////
    // Por similitud de schemas

    // Recorrer todas las palabras hasta encontrar una en la que solo uno o dos campos no correspondan
    // haya dos diferencias
    /*
    Una funcion que reciba dos arrays de string, y un parametro numerico de tolerancia. Ese parametro numerico significa el numero de caracteres no iguales que ha de haber. Por ejemplo, 
    para  "a" "m" "i" "j" "o", que al compararla con "a" "m" "i" "g" "o"  y el parametro de tolerancia a "1" de true
    */

    function compareWordSchema (word1, word2, tolerance, lenghtDifferenceTolerance=3) {
        tolerance = tolerance+1;
    
        // Apuntamos la diferencia, para que cuando ambas palabras se descompensen por las incorrecciones, puedan volver a encuadrarse
        // p.ej
        // etrimología
        // etimología
    
        let lenghtDifference =0;
        if (word2.length<3 || word1.length<3) return false;
        if (word1.length>word2.length) lenghtDifference = word1.length-word2.length
        if (word2.length>word1.length) lenghtDifference = word2.length-word1.length
    
        if (lenghtDifference>=lenghtDifferenceTolerance) return false;
    
        let errors =0;
        let modificator=0;
        for (let i=0; i<word1.length; i++) {
            if (word1[i] != word2[i+modificator]) {
                errors++;
                if (lenghtDifference>0) {
                    modificator++
                    lenghtDifference--;
                }
            }
            if (errors>=tolerance) return false;
        }

        return true;
    }

    let similarSchema = []
    for (let i=0; i<allWords.length; i++) {
        if (compareWordSchema(allWords[i],targetWord ,1)) similarSchema.push(allWords[i])
    }
    
    if (similarSchema.length>0) return similarSchema;

    ///////////////////////////////////////////////
    // Por cercanía 
    while (findSimilarWords(json, targetWord, 10).length ==0) {
        targetWord = targetWord.slice(0, -1);
    }

    return (findSimilarWords(json, targetWord, 10))

 
}


// Funciones para la BBDD

function veryfyOneOrMoreRedir (word, data) {
    // Verificación de la palabra para conocer su salida - acepciones y redir 
    let oneOnlyRedir = true; // La palabra solo redirige a otra.
    let moreOnlyRedir = true; // La palabra tiene varias redirecciones, pero ningún campo que presentar en pantalla. 
    let numberOfRedir =0; 
    //

    // Recorrer las acepciones de la palabra. 
    for (let i=0; i<data[word[0]][word].length; i++) {
        if ("redir" in data[word[0]][word][i]) numberOfRedir++;
        if (! ("redir" in data[word[0]][word][i])) {
            oneOnlyRedir = false;
            moreOnlyRedir = false; 
        }
    }

    if (oneOnlyRedir & moreOnlyRedir) {
        if (numberOfRedir>1) oneOnlyRedir = false; 
        else moreOnlyRedir = false; 
    }

    if (oneOnlyRedir) return "oneOnlyRedir"
    if (moreOnlyRedir) return "moreOnlyRedir"
    return "noRedir"
    
    
} 

// Otras funciones que sería preferible no recordar 

function onlyAsterisk(str) {
    return /^[*]+$/.test(str);
}

function truncateString(str, maxLength) {
    if (str.length > maxLength) {
        return str.slice(0, maxLength) + "...";
    }
    return str;
}

function removeWordFromArray(arr, word) {
    return arr.filter(item => item !== word);
}

function numberToSuperscript(number) {
    const superscriptMap = {
        '0': '⁰',
        '1': '¹',
        '2': '²',
        '3': '³',
        '4': '⁴',
        '5': '⁵',
        '6': '⁶',
        '7': '⁷',
        '8': '⁸',
        '9': '⁹'
    };

    return number.toString().split('').map(digit => superscriptMap[digit] || '').join('');
}

// -------------------------------------------------------------------------- //
// Carga del fichero JSON 

var request = new XMLHttpRequest();

request.responseType = "json";
request.open("GET", "database/diccionario_sin_etiquetas_con_conjugaciones_sinonimos_redirecciones_sin_redundancias.json", true);


// Mostrar barra de carga al cargar el archivo
request.onloadstart = function() {
    document.getElementById("loading-bar").style.display = "block";
};

// Mostrar la carga
request.onprogress = function(event) {
    if (event.lengthComputable) {
        var percentComplete = (event.loaded / event.total) * 100;
        document.getElementById("loading-progress").style.width = percentComplete + "%";
    }
};

request.send();

// -------------------------------------------------------------------------- //
// CARGA DE LA PÁGINA

request.onload = function() {
    if (request.status === 200) {
        // Eliminar barra de progreso
        document.getElementById("loading-bar").style.display = "none"

        const data = request.response;
        document.getElementById ("container_loaded").style.display="block"
        document.getElementById ("container_loaded").style.opacity="1"
        
        // Todas las palabras en un solo Array:

        const allWords = []
        for (let letter in data) {
            for (word in data[letter])
                allWords.push (word)
        }

        /*
        const allWordsWithDefinition = [];
        for (let letter in data) {
            for (let word in data[letter]){
                let wordInJson = data [letter][word] 
                for (let meaning in wordInJson) {
                    var definitionForWord =""
                    let definitionInJson = data[letter][word][meaning]["definicion"]
                    if (typeof(definitionInJson) == "string") {
                        definitionForWord = definitionForWord+" "+definitionInJson
                    }
                    else if (typeof(definitionInJson)=="object") {
                        for (let i=0; i<definitionInJson.length; i++) {
                            definitionForWord = definitionForWord+" "+definitionInJson[i]
                        }
                    }

                   
                }
                allWordsWithDefinition.push ([word, definitionForWord ])
            }

        }

        console.log (allWordsWithDefinition[322])
        */

        // -------------------------------------------------------------------------- //
        // DECLARACIÓN DE VARIABLES
        
        // VARIABLES DE ETIQUETAS LOADED
        // Barra de búsqueda.
        const inputBox = document.getElementById("input_box_loaded");
        // Predicciones (similarword)
        const autocompleteResults = document.getElementById ("autocomplete_results_loaded")
        // Selector (solo puede arrojar autocompletado cuando es exacta)
        const searchType = document.getElementById("search_type_loaded")
        
        // VARIABLES DE ETIQUETAS SEARCHING
        // Barra de búsqueda.
        const inputBoxSearching = document.getElementById ("input_box_searching")
        // Predicciones (similarword)
        const autocompleteResultsSearching = document.getElementById ("autocomplete_results_searching")
        // Selector (solo puede arrojar autocompletado cuando es exacta)
        const searchTypeSearching = document.getElementById("search_type_searching")

        // -------------------------------------------------------------------------- //
        // AUTOCOMPLETADO
        
        // Manejar el evento de cambio (select) para obtener el registro de búsquedas limpio. 
        searchType.addEventListener('change', function() {
            
            if (searchType.value!="exacta") {
                autocompleteResults.innerHTML=""
            }   
            else {
                
                let input = inputBox.value.trim();
                console.log (input)
                if (findSimilarWords (data[input[0]], input) != null) {
                    let similarWords = findSimilarWords (data[input[0]], input)
                    for (let i=0; i<similarWords.length; i++) {
                        inContainer (similarWords[i], "li","autocomplete_results")
                    }
                } 
            }
            
        });

        // Autorrellenado a partir de la función de similarWords
        inputBox.onkeyup = function () {
            if (searchType.value=="exacta") {
                autocompleteResults.innerHTML=""
                let input = inputBox.value.trim();
                if (findSimilarWords (data[input[0]], input) != null) {
                    let similarWords = findSimilarWords (data[input[0]], input)
                    
                    for (let i=0; i<similarWords.length; i++) {
                        inContainer (similarWords[i], "li","autocomplete_results_loaded", [["id","similarwords"+i]])
                        let liElement = document.getElementById("similarwords"+i)
                
                        // Entrar por sugerencia de palabra
                        liElement.onclick = function() {
                            dictionarySearch (searchType.value, liElement.innerHTML)
                        };
                    
                    }
                } 
            }
            else {
                autocompleteResults.innerHTML=""
            }
        }

        // -------------------------------------------------------------------------- //
        // EN PANTALLA DE BÚSQUEDA 
        
        // Salir de la ventana de búsqueda
        const titleSearching = document.getElementById ("title_searching")
        titleSearching.onclick = function () {
            document.getElementById ("container_loaded").style.display="block"
            document.getElementById ("container_search").style.display="none"
            inputBox.value=""  
            autocompleteResults.innerHTML=""
        }
 
        // Entrar por botón
        const searchButton = document.getElementById ("search_button_loaded")
        searchButton.onclick = function () {
            if (searchType.value =="aleatoria") {
                dictionarySearch ("exacta", randomWord(allWords))
                searchTypeSearching.value="aleatoria"
            } 
            else if (inputBox.value) {
                if (!onlyAsterisk (inputBox.value.replaceAll(" ","*"))) {
                    dictionarySearch (searchType.value, inputBox.value.trim())
                }
            }
        }

        const searchButtonSearching = document.getElementById ("search_button_searching")
        searchButtonSearching.onclick = function () {
            if (searchTypeSearching.value =="aleatoria") {
                dictionarySearch ("exacta", randomWord(allWords))
                searchTypeSearching.value="aleatoria"
            }
            else if (inputBoxSearching.value) {
                dictionarySearch (searchTypeSearching.value, inputBoxSearching.value.trim())
            }
        }

        // Por ENTER
        inputBox.onkeydown = function (event) {
            if (event.key == "Enter") {
                if (searchType.value =="aleatoria") {
                    dictionarySearch ("exacta", randomWord(allWords))
                    searchTypeSearching.value="aleatoria"
                }
                else if (!onlyAsterisk (inputBox.value.replaceAll(" ","*"))) {
                    if (inputBox.value) { 
                        dictionarySearch (searchType.value, inputBox.value.trim())
                    }
                }
            }
        }

        // Función que ejecuta la búsqueda desde la barra superior (redundante)

        inputBoxSearching.onkeyup = function () {
            if (searchTypeSearching.value=="exacta") {
                autocompleteResultsSearching.innerHTML=""
                let input = inputBoxSearching.value.trim();
                if (findSimilarWords (data[input[0]], input) != null) {
                    let similarWords = findSimilarWords (data[input[0]], input)
                    
                    for (let i=0; i<similarWords.length; i++) {
                        inContainer (similarWords[i], "li","autocomplete_results_searching", [["id","similarwords_searching"+i]])
                        let liElement = document.getElementById("similarwords_searching"+i)
                
                        // Añadir el evento para reiniciar el proceso 
                        liElement.onclick = function() {
                            dictionarySearch (searchTypeSearching.value, liElement.innerHTML)
                        };
                    
                    }
                } 
            }
            else {
                autocompleteResults.innerHTML=""
            }
        }

        inputBoxSearching.onkeydown = function (event) {
            if (event.key == "Enter") {
                
                if (searchTypeSearching.value =="aleatoria") {
                    
                    dictionarySearch ("exacta", randomWord(allWords))
                    searchTypeSearching.value="aleatoria"
                }
                else if (!onlyAsterisk (inputBoxSearching.value.replaceAll(" ","*"))) {
                    if (inputBoxSearching.value) {
                        // Eliminar el autocompletado
                        autocompleteResultsSearching.style.display="none"
                        autocompleteResults.style.display="none"
                        // Arrancar la consulta
                        dictionarySearch (searchTypeSearching.value, inputBoxSearching.value.trim())
                    }
                }
            }
        }

        // Comprueba los clicks en el body, para quitar las palabras sugeridas de la barra de búsqueda

        document.body.onclick = function () {
            let clickedElement = event.target;
            if (clickedElement.id == "input_box_searching" && searchTypeSearching.value=="exacta" 
                || clickedElement.id == "input_box_loaded" && searchType.value=="exacta" 
            ) {
                autocompleteResults.style.display="block"
                autocompleteResultsSearching.style.display="block"
            } else {
                autocompleteResultsSearching.style.display="none"
                autocompleteResults.style.display="none"
            }
        }

        // Procesamiento de las búsquedas, a donde redirigen los botones, el buscador, las palabras sugeridas, el historial...

        function dictionarySearch (searchType, word) {
           
            // Activar el modo de búsqueda
            document.getElementById ("container_loaded").style.display="none"
            document.getElementById ("container_search").style.display="block"
            
            // Iniciar el nuevo buscador con la palabra anteriormente introducida
            inputBoxSearching.value=word  
            autocompleteResultsSearching.innerHTML=""

            document.getElementById("filter_results").innerHTML ="";
            document.getElementById("filter_results_synonyms").innerHTML ="";
            document.getElementById("filter_results_sends").innerHTML ="";

            var filterWarning = document.getElementById("filter_warning") 
            var filterSends = document.getElementById("filter_sends") 
            var filterSynonyms = document.getElementById("filter_synonyms") 

            filterWarning.style.display ="none";
            filterSends.style.display ="none";
            filterSynonyms.style.display ="none";

            var wordBody = document.getElementById("word_body");
            wordBody.innerHTML=""

            var wordState = "incorrect"; // Condición para proseguir con la búsqueda: incorrect, waiting, correct
            var auxWord = word; // Auxiliar para guardar la palabra en el historial 

            // En base a las búsquedas 
            switch (searchType) {
                case "empieza por":
                    wordState ="startsBy"
                    searchTypeSearching.value ="empieza por"
                    filterWarning.style.display ="none"

                    let startsBy = findSimilarWords (data[word[0]], word, allWords.length)

                    if (startsBy.length <=0) {
                        filterWarning.style.display ="block"
                        filterWarning.className ="filter-warning incorrect"
                        filterWarning.innerHTML = `No se ha encontrado ningún lema que empiece por «${truncateString(word,80)}».`
                    }
                    else {
                        for (let i=0; i<startsBy.length; i++) {
                            inContainer (startsBy[i], "li", "filter_results", [["id", "startsBy"+i+startsBy[i]]] );
                            let liElement = document.getElementById("startsBy"+i+startsBy[i])
                            liElement.onclick = function() {
                                dictionarySearch ("exacta", startsBy[i])
                            };
                        }
                    }
                    
                    break;
                
                case "termina en":
                    wordState ="endsBy"
                    searchTypeSearching.value ="termina en"
                    filterWarning.style.display ="none"

                    let endsBy= findSimilarWordsByFinal(allWords, word);

                    if (endsBy.length <=0) {
                        filterWarning.style.display ="block"
                        filterWarning.className ="filter-warning incorrect"
                        filterWarning.innerHTML = `No se ha encontrado ningún lema que termine por «${truncateString(word,80)}».`
                    }
                    else {
                        for (let i=0; i<endsBy.length; i++) {
                            inContainer (endsBy[i], "li", "filter_results", [["id", "endsBy"+i+endsBy[i]]] );
                            let liElement = document.getElementById("endsBy"+i+endsBy[i])
                            liElement.onclick = function() {
                                dictionarySearch ("exacta", endsBy[i])
                            };
                        }
                    }

                    break; 

                case "contiene":
                    wordState ="contains"
                    searchTypeSearching.value ="contiene"
                    filterWarning.style.display ="none"
                    let contains = findByContains (word, allWords); 
                    if (contains.length <=0) {
                        filterWarning.style.display ="block"
                        filterWarning.className ="filter-warning incorrect"
                        filterWarning.innerHTML = `No se ha encontrado ningún lema que contenga «${truncateString(word,80)}».`
                    }
                    else {
                        for (let i=0; i<contains.length; i++) {
                            inContainer (contains[i], "li", "filter_results", [["id", "contains"+i+contains[i]]] );
                            let liElement = document.getElementById("contains"+i+contains[i])
                            liElement.onclick = function() {
                                dictionarySearch ("exacta", contains[i])
                            };
                        }
                    }
                    
                    break;

                case "anagramas":
                    wordState = "anagrams"
                    searchTypeSearching.value ="anagramas"
                    filterWarning.style.display ="none"
                    
                    let anagrams = findAnagrams (word, allWords, data)

                    if (anagrams.length <=0) {
                        filterWarning.style.display ="block"
                        filterWarning.className ="filter-warning incorrect"
                        filterWarning.innerHTML = `La palabra «${truncateString(word,80)}» no tiene anagramas en el diccionario.`
                    }
                    else {
                        for (let i=0; i<anagrams.length; i++) {
                            inContainer (anagrams[i], "li", "filter_results", [["id", "anagrams"+i+anagrams[i]]] );
                            let liElement = document.getElementById("anagrams"+i+anagrams[i])
                            liElement.onclick = function() {
                                dictionarySearch ("exacta", anagrams[i])
                            };
                        }
                    }

                    break;
                
                case "exacta":
                    // PRIMERA FASE: 
                    // - Si la palabra es singular o plural, eliminar "s" y "es" de la palabra.
                    // - Si es un verbo conjugado femenino, pasarlo a masculino y acudir a la redirección
                    // - La función se llama a sí misma para iterar tantas veces como redirecciones y nodos haya en cada término
                    // - Es posible que haya conflictos entre maś palabras, por lo que tendremos que pedirle al usuario que las 
                    // verifique antes de continuar (p.ej, entremeses)
                    // SI NO SE VERIFICA que la palabra exista (hay 0 conflictos), arrojará un error. 
                    // SI SE VERIFICA y hay un solo conflicto, la palabra se resolverá con ese conflicto (correct)
                    // Si hay conflictos que deben verificarse, el estado será "waiting" 

                    searchTypeSearching.value ="exacta"

                    let wordsInConflict = []; // Aquí se depositarán todas las palabras en conflicto.

                    // Verificar corrección de la (palabra para plural) 
                        if (data[word[0]][word]) {
                            wordsInConflict.push(word)
                        }
                        if (/s$/.test(word)) {
                            if (data[word[0]][word.slice(0, -1)]) {
                                wordsInConflict.push (word.slice(0, -1))
                            }
                            if (data[word[0]][accentLastVowel(word.slice(0, -1))]) {
                                wordsInConflict.push (accentLastVowel(word.slice(0, -1)))
                            }
                        }
                        if (/es$/.test(word)) {
                            if (data[word[0]][word.slice(0, -2)])  {
                                wordsInConflict.push (word.slice(0, -2))
                            }
                            if (data[word[0]][accentLastVowel(word.slice(0, -2))]) {
                                wordsInConflict.push (accentLastVowel(word.slice(0, -2)))
                            }
                        }
                        // Verificar corrección de la (palabra para verbo femenino)
                        if (/a$/.test(word)) {
                            // Si la palabra termina en "a", cambiar su última letra por una "o".
                            // Si dicha palabra (con la ultima letra "o") contiene un registro que a la vez tiene ["formas_verbales"]
                            // entonces añadir esa palabra a las palabras en conflicto (wordsInClonflict)
                            if (data[word[0]][word.slice(0, -1)+"o"]) {
                                if ("redir" in data[word[0]][word.slice(0, -1)+"o"][0]){
                                    let masculineVerb = data[word[0]][word.slice(0, -1)+"o"][0]["redir"]
                                    if ("formas_verbales" in data[masculineVerb[0]][masculineVerb][0]) {
                                        wordsInConflict.push (masculineVerb)
                                    }
                                }
                            }
                        }

                        // Esta primera condición verifica que la palabra no es una redirección. ESi esta condición no existiera, cuando
                        // la palabra se introduce en un bloque de elección, ocasionará un bucle infinito porque el proceso se llama a sí mismo
                        // constantemente inhabilitando la búsqueda de ese término concreto (p.ej: reseña, que bifurca en "reseña" y "reseñar")

                        if (data[auxWord[0]][auxWord] && ("palabra" in data[auxWord[0]][auxWord][0]) ) {
                            wordState ="correct"
                        }
                        /*
                        else if (wordsInConflict.length==1) {
                            word = wordsInConflict[0]
                            wordState = "correct";
                        }
                        */
                        else if (wordsInConflict.length<=0) {
                            wordState ="incorrect"
                        }
                        else {
                            // Filtrar para evitar redundancias - es decir, contemplar las redundancias. 

                            let redirFilterResultsForPlural = new Set ([])
                            
                            console.log (wordsInConflict)

                            for (let i=0; i<wordsInConflict.length; i++) {

                                switch (veryfyOneOrMoreRedir (wordsInConflict[i], data)) {
                                    case "oneOnlyRedir":
                                        console.log ("A1",data[wordsInConflict[i][0]][wordsInConflict[i]][0]["redir"])
                                        let wordInConflict = data[wordsInConflict[i][0]][wordsInConflict[i]][0]["redir"]
                                        //redirFilterResultsForPlural.add(data[wordsInConflict[i][0]][wordsInConflict[i]][0]["redir"])
                                        
                                        // Verificar que, si la redirección corresponde a un verbo, alguna de sus formas verbales correspondan a lo buscado
                                        if (!("formas_verbales" in data[wordInConflict[0]][wordInConflict][0])){
                                            redirFilterResultsForPlural.add(wordInConflict)
                                        }
                                        else {
                                            for (let mode in data[wordInConflict[0]][wordInConflict][0]["formas_verbales"]) {
                                               let modeInJson = (data[wordInConflict[0]][wordInConflict][0]["formas_verbales"][mode])
                                               for (let tense in modeInJson) {
                                                let tenseInJson = (data[wordInConflict[0]][wordInConflict][0]["formas_verbales"][mode][tense])
                                                if (typeof(tenseInJson) == "string") {
                                                    if (tenseInJson.includes(word)) redirFilterResultsForPlural.add(wordInConflict)
                                                }
                                                else {
                                                    for (let person in tenseInJson) {
                                                        personInJson = data[wordInConflict[0]][wordInConflict][0]["formas_verbales"][mode][tense][person]
                                                        if (personInJson.includes (word)) redirFilterResultsForPlural.add(wordInConflict)
                                                    }
                                                }
                                               }
                                            }
                                        }
                                        
                                        break; 
                                    case "noRedir":
                                        console.log ("A2",data[wordsInConflict[i][0]][wordsInConflict[i]][0]["palabra"])
                                        redirFilterResultsForPlural.add(wordsInConflict[i])
                                        break;
                                    case "moreOnlyRedir": 
                                        for (let j=0; j<data[wordsInConflict[i][0]][wordsInConflict[i]].length; j++) {
                                            let wordInConflict = data[wordsInConflict[i][0]][wordsInConflict[i]][j]["redir"]
                                            if (!("formas_verbales" in data[wordInConflict[0]][wordInConflict][0])){
                                                redirFilterResultsForPlural.add(wordInConflict)
                                            }
                                            else {
                                                for (let mode in data[wordInConflict[0]][wordInConflict][0]["formas_verbales"]) {
                                                    let modeInJson = (data[wordInConflict[0]][wordInConflict][0]["formas_verbales"][mode])
                                                    for (let tense in modeInJson) {
                                                     let tenseInJson = (data[wordInConflict[0]][wordInConflict][0]["formas_verbales"][mode][tense])
                                                     if (typeof(tenseInJson) == "string") {
                                                         if (tenseInJson.includes(word)) redirFilterResultsForPlural.add(wordInConflict)
                                                     }
                                                     else {
                                                        for (let person in tenseInJson) {
                                                            personInJson = data[wordInConflict[0]][wordInConflict][0]["formas_verbales"][mode][tense][person]
                                                            if (personInJson.includes (word)) redirFilterResultsForPlural.add(wordInConflict)
                                                        }
                                                     }
     
                                                    }
                                                 }
                                                
                                            }
                                            //redirFilterResultsForPlural.add(data[wordsInConflict[i][0]][wordsInConflict[i]][j]["redir"])
                                            console.log ("A3",data[wordsInConflict[i][0]][wordsInConflict[i]][j]["redir"] )
                                        }

                                        break;

                                }

                            }

                            // Hechas las verificaciones pertinentes, es necesario verificar si el conjunto tiene un solo registro. 
                            // De ser así, redirigir nuevamente a esa única entrada. 
                            var redirFilterResultsForPluralArray = Array.from (redirFilterResultsForPlural);

                            if (redirFilterResultsForPluralArray.length==1){
                                word = redirFilterResultsForPluralArray [0]
                                wordState = "correct"
                            }
                            else {
                                wordState = "waiting"
                                wordBody.innerHTML=""
                                filterWarning.style.display ="block"
                                filterWarning.className ="filter-warning"
                                filterWarning.innerHTML = `Entradas que contienen la forma «${word}»:`
                                // Buscar las palabras. Si contienen un redir, entonces colocar su correspondiente redirección. Si no, colocar solo la palabra. 
                                
                                for (let i=0; i<redirFilterResultsForPluralArray.length; i++) {
                                    inContainer (data[redirFilterResultsForPluralArray[i][0]][redirFilterResultsForPluralArray[i]][0]["palabra"], "li", "filter_results", [["id", "redirfilterresultsforplural"+i+redirFilterResultsForPluralArray[i]]])
                                    let liElement = document.getElementById("redirfilterresultsforplural"+i+redirFilterResultsForPluralArray[i])
                
                                    // Añadir el evento para reiniciar el proceso 
                                    liElement.onclick = function() {
                                        dictionarySearch ("exacta", redirFilterResultsForPluralArray[i])
                                    };
                                }

                                
                            }

                        }
                                       
                    // SEGUNDA FASE: Introducir los campos necesarios si la palabra se concluye como CORRECT (directamente presente en la base de datos)

                    if (wordState == "incorrect") {
                        wordBody.innerHTML=""
                        filterWarning.style.display ="block"
                        filterWarning.className ="filter-warning incorrect"
                        filterWarning.innerHTML = `La palabra «${truncateString(auxWord,80)}» no está en el diccionario. Las entradas que se muestran a continuación podrían estar relacionadas:`
                        sugerences = (incorrectSugerences(data[auxWord[0]], auxWord, data, allWords));

                        for (let i=0; i<sugerences.length; i++) {
                            inContainer (sugerences[i], "li", "filter_results", [["id", "incorrectwordsugerence"+i+sugerences[i]]] );
                            let liElement = document.getElementById("incorrectwordsugerence"+i+sugerences[i])
                            liElement.onclick = function() {
                                dictionarySearch ("exacta", sugerences[i])
                            };
                        }
                    }
                    else if (wordState =="correct") {
                        wordBody.innerHTML=""
                        inContainer ("", "div", "word_body", [["id", "meanings_body"], ["class", "meanings-body"]])
                        let meaningsJson = data[word[0]][word]; 

                        let numberOfMeanings =0;
                        for (let i=0; i<meaningsJson.length;i++) {
                            if ("palabra" in meaningsJson[i]) numberOfMeanings++; 
                        }
                        

                        // Lista de acepciones, en cada cual deben ir todos los campos que no contengan "redir"

                        for (let i=0; i<meaningsJson.length; i++) {
                            
                            let meaningInJson = meaningsJson[i]
                            if ("palabra" in meaningInJson) {
                                // Bloque contenedor
                                inContainer ("", "div", "meanings_body", [["id","meaning"+i], ["class", "meaning"]])
                                    // Palabra
                                    if (numberOfMeanings==1) {
                                        inContainer (meaningInJson["palabra"], "div", "meaning"+i, [["class", "word"]])
                                    }
                                    else{
                                        inContainer (meaningInJson["palabra"]+numberToSuperscript(1+i), "div", "meaning"+i, [["class", "word"]])
                                    }
                                    
                                    // Origen 

                                    if (meaningInJson["origen"].length>0) {
                                        inContainer  ("", "div", "meaning"+i, [["id", "origins"+i], ["class", "origins"]] )
                                        for (let j=0; j<meaningInJson["origen"].length; j++) {
                                            inContainer (meaningInJson["origen"][j],"div", "origins"+i, [["class", "origin"], ["id","origin"+j]])
                                        }
                                    }

                                    // Definiciones 
                                    if (meaningInJson["definicion"]!="") {
                                        inContainer  ("", "div", "meaning"+i, [["id", "definitions"+i], ["class", "definitions"]] )
                                        if (typeof (meaningInJson["definicion"]) =="string") {
                                            inContainer (meaningInJson["definicion"],"div", "definitions"+i, [["class", "definition"], ["id","definition"+i]] )
                                            inContainerBefore ("1. ", "span", "definition"+i, [["class", "number-of-definition"]] )
                                        }
                                        else {
                                            for (let j=0; j<meaningInJson["definicion"].length; j++) {
                                                inContainer (meaningInJson["definicion"][j],"div", "definitions"+i, [["class", "definition"], ["id",i+"definition"+j]])
                                                inContainerBefore ((1+j)+". ", "span", i+"definition"+j, [["class", "number-of-definition"]] )
                                            }
                                        }

                                    }
                                    
                            }

                        }

                        // Formas compuestas (TODO: Formas compuestas en una sola línea)
                        let compoudFormsInJson = data[word[0]][word][0]["formas_compuestas"]; 
                        inContainer ("", "div", "word_body", [["id", "compoud_forms"], ["class", "compoud-forms"]]);

                        for (let i=0; i<compoudFormsInJson.length; i++) {

                            inContainer ("", "div", "compoud_forms", [["id", "compoud_form"+i], ["class", "compoud-form"]])
                            
                            inContainer (compoudFormsInJson[i]["expresion"], "div", "compoud_form"+i, [["class", "compoud-form-expression"]] )
                           
                            inContainer ("", "div", "compoud_form"+i, [["id", "compoud_form_meanings"+i],["class", "compoud-form-meanings"]] )
                            
                            for (let j=0; j<compoudFormsInJson[i]["significado"].length; j++) {
                                if (compoudFormsInJson[i]!="") {
                                    inContainer (compoudFormsInJson[i]["significado"][j], "div", "compoud_form_meanings"+i, [["class", "compoud-form-meaning"], ["id", j+"compoud_form_meaning"+i]]  )
                                    inContainerBefore ((1+j)+". ", "span", j+"compoud_form_meaning"+i , [["class", "number-of-definition"]] )
                                }
                               
                            }
                        }

                        // Lista de envíos

                        let sendingWords = data[word[0]][word][0]["envios"]; 

                        if (sendingWords.length>0) {
                            filterSends.style.display ="block"
                            filterSends.className ="filter-warning"
                            filterSends.innerHTML = `Palabras cuyas expresiones contienen «${data[word[0]][word][0]["palabra"]}»:`
                        }

                        for (let i=0; i<sendingWords.length; i++) {

                            let sendingWord = sendingWords[i].split(" ")[0]

                            inContainer (sendingWords[i], "li", "filter_results_sends", [["id", "sendingWord"+i+sendingWord]])
                            let liElement = document.getElementById("sendingWord"+i+sendingWord)
        
                            // Añadir el evento para reiniciar el proceso 
                            liElement.onclick = function() {
                                dictionarySearch ("exacta", sendingWord)
                            };
                        }


                        // Lista de sinónimos (solo en la primera acepción)

                        let synonymsToRedirect = data[word[0]][word][0]["sinonimos"]

                        if (synonymsToRedirect.length>0) {
                            filterSynonyms.style.display ="block"
                            filterSynonyms.className ="filter-warning"
                            filterSynonyms.innerHTML = `Sinónimos o afines de «${data[word[0]][word][0]["palabra"]}»:`
                        }

                        for (let i=0; i<synonymsToRedirect.length; i++) {
                            inContainer (synonymsToRedirect[i], "li", "filter_results_synonyms", [["id", "synonymsToRedirect"+i+synonymsToRedirect[i]]])
                            let liElement = document.getElementById("synonymsToRedirect"+i+synonymsToRedirect[i])
        
                            // Añadir el evento para reiniciar el proceso 
                            liElement.onclick = function() {
                                dictionarySearch ("exacta", synonymsToRedirect[i])
                            };
                        }

                        // Lista de redirecciones (recorrer nuevamente la palabra)

                        let wordsToRedirect = []
                        for (let i=0; i<meaningsJson.length; i++) {
                            let meaningInJson = meaningsJson[i]
                            if ("redir" in meaningInJson) { 
                                wordsToRedirect.push(meaningInJson["redir"])
                            }
                        }

                        if (wordsToRedirect.length>0) {
                            filterWarning.style.display ="block"
                            filterWarning.className ="filter-warning"
                            filterWarning.innerHTML = `También contiene las mismas formas:`
                        }

                        for (let i=0; i<wordsToRedirect.length; i++) {
                            inContainer (data[wordsToRedirect[i][0]][wordsToRedirect[i]][0]["palabra"], "li", "filter_results", [["id", "wordsToRedirect"+i+wordsToRedirect[i]]])
                            let liElement = document.getElementById("wordsToRedirect"+i+wordsToRedirect[i])
        
                            // Añadir el evento para reiniciar el proceso 
                            liElement.onclick = function() {
                                dictionarySearch ("exacta", wordsToRedirect[i])
                            };
                        }

                        // Verbos 

                        // Verbos 

                        if (data[word[0]][word][0]["formas_verbales"]) {
                            
                            let vfNoPersonales =  data[word[0]][word][0]["formas_verbales"]["no-personales"]
                            inContainer ("", "div", "word_body", [["id", "verb_forms_container"], ["class", "verb_forms_container"]])


                            let formasNoPersonales =  [
                                ["Formas no personales"], 
                                ["Infinitivo", "Gerundio", "Participio", "Infinitivo compuesto", "Gerundio compuesto"],
                                [vfNoPersonales["infinitivo"], vfNoPersonales["gerundio"], vfNoPersonales["participio"], vfNoPersonales["infinitivo-compuesto"], vfNoPersonales["gerundio-compuesto"]]
                            ]

                            createTable (formasNoPersonales,"verb_forms_container","formas-no-personales" )

                            function crearTablaVerbo (encabezado1, encabezado2, modo1, modo2, vf,  encabezado0=false) {
                                
                                if (encabezado0=="Indicativo") {
                                    let output =  [
                                        [encabezado0], 
                                        ["Número", "Persona", "Pronombre", encabezado1, encabezado2],
                                        ["Singular", "Primera", "yo", vf[modo1]["yo"], vf[modo2]["yo"]],
                                        ["", "Segunda", "tú/vos", vf[modo1]["tú/vos"], vf[modo2]["tú/vos"]],
                                        ["", "", "usted", vf[modo1]["él/ella"], vf[modo2]["él/ella"]],
                                        ["", "Tercera", "él/ella", vf[modo1]["él/ella"], vf[modo2]["él/ella"]],
                                        ["Plural", "Primera", "nosotros/nosotras", vf[modo1]["nosotros/nosotras"], vf[modo2]["nosotros/nosotras"]],
                                        ["", "Segunda", "vosotros/vosotras", vf[modo1]["vosotros/vosotras"], vf[modo2]["vosotros/vosotras"]],
                                        ["", "", "ustedes", vf[modo1]["ustedes"], vf[modo2]["ustedes"]],
                                        ["", "Tercera", "ellos/ellas", vf[modo1]["ellos/ellas"], vf[modo2]["ellos/ellas"]]
                                    ]
                                    return output; 
                                }
                                else if (encabezado0==false) {
                                    let output =  [
                                        ["", "", "", encabezado1, encabezado2],
                                        ["Singular", "Primera", "yo", vf[modo1]["yo"], vf[modo2]["yo"]],
                                        ["", "Segunda", "tú/vos", vf[modo1]["tú/vos"], vf[modo2]["tú/vos"]],
                                        ["", "", "usted", vf[modo1]["él/ella"], vf[modo2]["él/ella"]],
                                        ["", "Tercera", "él/ella", vf[modo1]["él/ella"], vf[modo2]["él/ella"]],
                                        ["Plural", "Primera", "nosotros/nosotras", vf[modo1]["nosotros/nosotras"], vf[modo2]["nosotros/nosotras"]],
                                        ["", "Segunda", "vosotros/vosotras", vf[modo1]["vosotros/vosotras"], vf[modo2]["vosotros/vosotras"]],
                                        ["", "", "ustedes", vf[modo1]["ustedes"], vf[modo2]["ustedes"]],
                                        ["", "Tercera", "ellos/ellas", vf[modo1]["ellos/ellas"], vf[modo2]["ellos/ellas"]]
                                    ]
                                    return output; 
                                }
                                else if (encabezado0=="Subjuntivo") {
                                    let output =  [
                                        [encabezado0], 
                                        ["", "", "", encabezado1, encabezado2],
                                        ["Singular", "Primera", "yo", vf[modo1]["yo"], vf[modo2]["yo"]],
                                        ["", "Segunda", "tú/vos", vf[modo1]["tú/vos"], vf[modo2]["tú/vos"]],
                                        ["", "", "usted", vf[modo1]["él/ella"], vf[modo2]["él/ella"]],
                                        ["", "Tercera", "él/ella", vf[modo1]["él/ella"], vf[modo2]["él/ella"]],
                                        ["Plural", "Primera", "nosotros/nosotras", vf[modo1]["nosotros/nosotras"], vf[modo2]["nosotros/nosotras"]],
                                        ["", "Segunda", "vosotros/vosotras", vf[modo1]["vosotros/vosotras"], vf[modo2]["vosotros/vosotras"]],
                                        ["", "", "ustedes", vf[modo1]["ustedes"], vf[modo2]["ustedes"]],
                                        ["", "Tercera", "ellos/ellas", vf[modo1]["ellos/ellas"], vf[modo2]["ellos/ellas"]]
                                    ]
                                    return output; 
                                }

                                
                            }

                            let vfIndicativo =  data[word[0]][word][0]["formas_verbales"]["indicativo"]
                            createTable ( crearTablaVerbo("Presente", "Pretérito perfecto compuesto / Antepresente", "presente", "pretérito perfecto compuesto", vfIndicativo, "Indicativo" ),"verb_forms_container","indicativo1" )
                            createTable ( crearTablaVerbo("Pretérito imperfecto / Copretérito", "Pretérito pluscuamperfecto / Antecopretérito", "pretérito imperfecto", "pretérito pluscuamperfecto", vfIndicativo),"verb_forms_container","indicativo2" )
                            createTable ( crearTablaVerbo("Pretérito perfecto simple / Pretérito", "Pretérito anterior / Antepretérito", "pretérito perfecto simple", "pretérito anterior", vfIndicativo),"verb_forms_container","indicativo3" )
                            createTable ( crearTablaVerbo("Futuro simple / Futuro", "Futuro compuesto / Antefuturo", "futuro simple", "futuro compuesto", vfIndicativo),"verb_forms_container","indicativo4" )
                            createTable ( crearTablaVerbo("Condicional simple / Pospretérito", "Condicional compuesto / Antepospretérito", "condicional simple", "condicional compuesto", vfIndicativo),"verb_forms_container","indicativo5" )

                            let vfSubjuntivo =  data[word[0]][word][0]["formas_verbales"]["subjuntivo"]
                            createTable ( crearTablaVerbo("Presente", "Pretérito perfecto compuesto / Antepresente", "presente", "pretérito perfecto compuesto", vfSubjuntivo, "Subjuntivo" ),"verb_forms_container","subjuntivo1" )
                            createTable ( crearTablaVerbo("Pretérito imperfecto / Pretérito", "Pretérito pluscuamperfecto / Antepretérito", "pretérito imperfecto", "pretérito pluscuamperfecto", vfSubjuntivo),"verb_forms_container","subjuntivo2" )
                            createTable ( crearTablaVerbo("Futuro simple / Futuro", "Futuro compuesto / Antefuturo", "futuro simple", "futuro compuesto", vfSubjuntivo),"verb_forms_container","subjuntivo3" )

                            let vfImperativo =  data[word[0]][word][0]["formas_verbales"]["imperativo"]

                            let formasImperativo =  [
                                ["Imperativo"], 
                                ["","","","", "Imperativo afirmativo"], 
                                ["Singular","Segunda","tú/vos", "",vfImperativo["tú/vos"]],
                                ["", "", "usted","",vfImperativo["usted"]],
                                ["Plural", "", "vosotros/vosotras","",vfImperativo["vosotros/vosotras"]],
                                ["", "", "ustedes","",vfImperativo["ustedes"] ],
                            ]

                            createTable (formasImperativo,"verb_forms_container","imperativo" )


                        }

                    }
          
                    break; 
            }

            // TERCERA FASE: Una vez todo se haya comprobado, añadir palabra al historial. 

                    // Ingresar palabra al historial
                    // Verificar que la palabra no ha sido introducida antes
                    let searchHistory = document.getElementById("search_history")
                    let historyItems = Array.from(searchHistory.children)
                    let historyItemIds = historyItems.map(function(item) {
                        return item.id
                    })

                    if(historyItemIds.includes("historysearch_"+word+"_"+searchType)) {
                        searchHistory.removeChild(document.getElementById("historysearch_"+word+"_"+searchType))
                    }
                    console.log (searchType)
                    switch (wordState) {
                        case "correct": 
                            inContainerBefore (data[word[0]][word][0]["palabra"], "li", "search_history", [["id", "historysearch_"+word+"_"+searchType]] )
                            break
                        case "incorrect":
                            inContainerBefore (truncateString(auxWord,22), "li", "search_history", [["id", "historysearch_"+word+"_"+searchType], ["class","not-exist"]] )
                            break; 
                        case "waiting":
                            inContainerBefore (auxWord, "li", "search_history", [["id", "historysearch_"+word+"_"+searchType], ["class","waiting"]] )
                            break;  
                        case "startsBy":
                            inContainerBefore (auxWord, "li", "search_history", [["id", "historysearch_"+word+"_"+searchType], ["class","waiting"]] )
                            break;
                        case "endsBy":
                            console.log("A")
                            inContainerBefore (auxWord, "li", "search_history", [["id", "historysearch_"+word+"_"+searchType], ["class","waiting"]] )
                            break;
                        case "contains":
                            inContainerBefore (auxWord, "li", "search_history", [["id", "historysearch_"+word+"_"+searchType], ["class","waiting"]] )
                            break;
                        case "anagrams":
                            inContainerBefore (auxWord, "li", "search_history", [["id", "historysearch_"+word+"_"+searchType], ["class","waiting"]] )
                            break; 
                        
                        

                    }

                    let liElement = document.getElementById("historysearch_"+word+"_"+searchType)

                    liElement.onclick = function() {

                        dictionarySearch (liElement.id.split("_")[2], liElement.id.split("_")[1])
                           
                    };

            // CUARTA FASE: POSTPROCESADO DEL DOCUMENTO: 
            function highlightWords() {
                // Clases a las que queremos aplicar la función
                var classes = ["origin", "definition", "compoud-form-meaning"];
                
                // Itera a través de cada clase
                for (var j = 0; j < classes.length; j++) {
                    // Obtén todos los elementos con la clase actual
                    var elements = document.getElementsByClassName(classes[j]);
                    
                    // Itera a través de cada elemento
                    for (var i = 0; i < elements.length; i++) {
                        // Obtén el contenido del elemento
                        var content = elements[i].innerHTML;
                        
                        // Reemplaza las palabras entre ** con las mismas palabras envueltas en <b> y </b>
                        var modifiedContent = content.replace(/\*\*(.*?)\*\*/g, '<b>$1</b>');
                        
                        // Reemplaza las palabras entre * con las mismas palabras envueltas en <i> y </i>
                        modifiedContent = modifiedContent.replace(/\*(.*?)\*/g, '<i>$1</i>');
                        
                        // Actualiza el contenido del elemento
                        elements[i].innerHTML = modifiedContent;
                    }
                }
            }
            
            // Llama a la función para resaltar las palabras
            highlightWords();
            
            
            
            


        }

    }
};


//Soli Deo Gloria.
         /*
    ----/----
       /
      /
     /
   */
