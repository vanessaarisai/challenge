/* 
Iterate through Insurance-Terms.txt, which contains several insurance terms and their meanings, 
to create a JSON object, inside of termsJSON.json, that can be used in the coding challenge.

It will also create a text file, termOptions.txt, with all the terms (acceptable solutions).

Terms are from: https://content.naic.org/consumer_glossary.htm
*/
const fs = require('fs') 
var file = 'Insurance-Terms.txt'

fs.readFile(file, (err, data) => { 
    if (err) throw err 
    var termsData = {}
    var termSolutions = ''
    data.toString().split("\n").forEach(function(line, index, arr) {
        if (index === arr.length - 1 && line === "") { 
            return; 
        }
        //separate term and meaning by '-'
        var linesSpace = line.split('-')

        var solTerms = linesSpace[0]

        var term = {
        term: linesSpace[0].replace(/\s+$/g, ''),
        meaning: linesSpace[1],
        };  

        termsData[index] = term
        termSolutions += solTerms + '\n'
    });
    var termsJSON = JSON.stringify(termsData)
    fs.writeFile('./termsJSON.json', termsJSON, () => {})
    fs.writeFile('./termOptions.txt', termSolutions, () => {})
}) 
