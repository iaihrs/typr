const numberOfWords          = document.getElementById('numberOfWords').value
const wordPopularity         = document.getElementById('wordPopularity').value
const quoteDisplayElement    = document.getElementById('quoteDisplay')
const quoteInputElement      = document.getElementById('quoteInput')
const numberOfWordsElement   = document.getElementById('numberOfWords')
const wordPopularityElement  = document.getElementById('wordPopularity')
const timerElement           = document.getElementById('timer')
const wordList               = './english_10k.json'

numberOfWordsElement.addEventListener('input', () => {                                             //listens for change in numberOfWords
    location.reload();                                                                             //reloads page
})

wordPopularityElement.addEventListener('input', () => {                                            //listens for change in wordPopularity
    location.reload();                                                                             //reloads page
})

quoteInputElement.addEventListener('input', () => {                                                // Looks for any change to the quoteInputElement textarea
    const arrayQuote = quoteDisplayElement.querySelectorAll('span')
    const arrayValue = quoteInputElement.value.split('')
    let correct = true
    arrayQuote.forEach((characterSpan, index) => {
        const character = arrayValue[index]
        if (character == null) {
            characterSpan.classList.remove('incorrect')
            characterSpan.classList.remove('correct')
            correct = false
        }
        else if (character === characterSpan.innerText) {
            characterSpan.classList.add('correct')
            characterSpan.classList.remove('incorrect')
        }
        else {
            characterSpan.classList.remove('correct')
            characterSpan.classList.add('incorrect')
            correct = false
        }
    })

    if (correct) renderNewQuote()
})

function getWordList() {
    return fetch(wordList)
    .then((response) => response.json())
}

async function renderNewQuote() {
    const words = await getWordList()
    var test = ""
    for (let i = 0; i < numberOfWords; i++) { 
        
        const randNum = (min, max) => {                                                            //picks random number between min and max - usage: randNum(x, y)
            minCeiled = Math.ceil(min)
            maxFloored = Math.floor(max)
            return Math.floor(Math.random() * (maxFloored - minCeiled + 1) + minCeiled )
        }
        
        //var randNum = Math.random(1, wordPopularity)                                             //obsolete (leaving for archival just in case)
        test+=(words[randNum(0, wordPopularity)]+" ")                                              //oh my fucking god
        console.log(randNum(0, wordPopularity))
        console.log(test)
        console.log(words[0])
    }
    const quote = test.slice(0,-1)
    quoteDisplayElement.innerHTML = ''
    quote.split('').forEach(character => {
        const characterSpan = document.createElement('span')
        if (character != null) {                                                                   // does not fix anything, stupid fucking bug, thank you @hawkins for the suggestions anyway
            characterSpan.innerText = character
            quoteDisplayElement.appendChild(characterSpan)
        }
    })
    quoteInputElement.value = null
    startTimer()
}

let startTime

function startTimer() {
    timerElement.innerText = 0
    startTime = new Date()
    setInterval(() => {
        timer.innerText = getTimerTime()
    }, 100)

}

function getTimerTime() {
    ms = Math.round((new Date() - startTime) / 100)
    return (ms/10).toFixed(1)
}

renderNewQuote()