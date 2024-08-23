var numberOfWords            = 10
var wordPopularity           = 100
const quoteDisplayElement    = document.getElementById('quoteDisplay')
const quoteInputElement      = document.getElementById('quoteInput')
const timerElement           = document.getElementById('timer')
const wordList               = 'resources/english_10k.json'

const words10Element         = document.getElementById('wordcount10')
const words25Element         = document.getElementById('wordcount25')
const words50Element         = document.getElementById('wordcount50')
const words100Element        = document.getElementById('wordcount100')

const modeTimerElement       = document.getElementById('modeTimer')
const modeWordsElement       = document.getElementById('modeWords')
const modeQuotesElement      = document.getElementById('modeQuotes')

const wordPop100Element      = document.getElementById('pop100')
const wordPop1kElement       = document.getElementById('pop1k')
const wordPop5kElement       = document.getElementById('pop5k')
const wordPop10kElement      = document.getElementById('pop10k')

function reloadOnChange(element) {                                                                 // adds an eventListener on any element and reloads the page if it hears anything
    element.addEventListener('input', () => {                                                      // usage: reloadOnChange(element_name_here)
        location.reload()
    })
}

function words(element, wordNum, owe1, owe2, owe3) {
    element.addEventListener('click', () => {
        numberOfWords = wordNum
        renderNewQuote()
        element.classList.add('active')
        owe1.classList.remove('active')
        owe2.classList.remove('active')
        owe3.classList.remove('active')
    })
}

function popularity(element, popNum, ope1, ope2, ope3) {
    element.addEventListener('click', () => {
        wordPopularity = popNum
        renderNewQuote()
        element.classList.add('active')
        ope1.classList.remove('active')
        ope2.classList.remove('active')
        ope3.classList.remove('active')
    })
}

words(words10Element, 10, words25Element, words50Element, words100Element)
words(words25Element, 25, words10Element, words50Element, words100Element)
words(words50Element, 50, words25Element, words10Element, words100Element)
words(words100Element, 100, words25Element, words50Element, words10Element)

popularity(wordPop100Element, 100, wordPop1kElement, wordPop5kElement, wordPop10kElement)
popularity(wordPop1kElement, 1000, wordPop100Element, wordPop5kElement, wordPop10kElement)
popularity(wordPop5kElement, 5000, wordPop1kElement, wordPop100Element, wordPop10kElement)
popularity(wordPop10kElement, 10000, wordPop1kElement, wordPop5kElement, wordPop100Element)

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

quoteInputElement.addEventListener("focusout", function() {                                        // Refuses to let the textArea lose focus, this is probably a bad idea
    _this = this
    setTimeout(function () {
        _this.focus()
    }, 0)
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

        test+=(words[randNum(0, wordPopularity)]+" ")                                              //oh my fucking god, +=" " caused it to add a " " every time a duplicate word appeared
    }
    const quote = test.slice(0,-1)                                                                 //this cuts the space off of the last word
    quoteDisplayElement.innerHTML = ''
    quote.split('').forEach(character => {
        const characterSpan = document.createElement('span')
        if (character != null) {                                                                   // kind of obsolete, was originally meant to be a fix to the null span bug but im too scared to remove it so it's staying,
            characterSpan.innerText = character                                                    // surely a check to make sure the character isnt null cant hurt... right?
            quoteDisplayElement.appendChild(characterSpan)                                         // https://i.imgur.com/fD2mgsp.gif
        }
    })
    quoteInputElement.value = null
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