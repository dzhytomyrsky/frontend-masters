const WORD_URL = 'https://words.dev-apis.com/word-of-the-day'
const IS_WORD_CHECKING_URL = 'https://words.dev-apis.com/validate-word'
const WORD_LENGTH = 5
const ATTEMPTS_ALLOWED = 6;
let word = ''
let buffer = ''
let lettersCount = 0
let attempsCount = 0
let isLoading = false;
const wordObj = {}

const letterElements = document.getElementsByClassName('letter')
const loadingElement = document.querySelector('.loading')
const winningElement = document.querySelector('h1')

const setLoadingStatus = (value) => {
    isLoading = value
    loadingElement.classList.toggle('active', value)
}

const setWordObj = (word) => {
    for (let i = 0; i < word.length; i++) {
        wordObj[word[i]] = !wordObj[word[i]] ? 1 : wordObj[word[i]] + 1
    }
}

const getWord = async (url) => {
    setLoadingStatus(true)

    const res = await fetch(url)
    const json = await res.json()
    word = json.word.toUpperCase()
    setWordObj(word)

    setLoadingStatus(false)
}

getWord(WORD_URL);

const renderLetter = (index, key) => {
    letterElements[index].innerText = key;
}

const validateForLetter = (letter) => /^[a-zA-Z]$/.test(letter);

const validateForWord = async (wordForCheck) => {
    setLoadingStatus(true)

    const res =  await fetch(IS_WORD_CHECKING_URL, {
        method: 'POST',
        body: JSON.stringify({word: wordForCheck}) 
    })
    const json = await res.json();

    setLoadingStatus(false)
    return json.validWord
}

const submitWord = () => {
    const baseIndex = WORD_LENGTH * attempsCount
    const localWordObj = { ...wordObj }

    for (let i = 0; i < buffer.length; i++) {
        if (buffer[i] === word[i]) {
            letterElements[baseIndex + i].classList.add('correct')
            localWordObj[buffer[i]] -= 1;
        }
    }

    for (let i = 0; i < buffer.length; i++) {
        if (localWordObj[buffer[i]] && localWordObj[buffer[i]] > 0) {
            letterElements[baseIndex + i].classList.add('included')
            localWordObj[buffer[i]] -= 1;
        } else if (buffer[i] !== word[i]) {
            letterElements[baseIndex + i].classList.add('wrong')
        }
    }

    if (buffer === word) {
        alert('You win!')
        winningElement.classList.add('active')
        document.removeEventListener('keyup', handleKeyUp)
        return
    }

    attempsCount += 1
    buffer = ''

    if (attempsCount >= ATTEMPTS_ALLOWED) {
        alert('You lose!')
        document.removeEventListener('keyup', handleKeyUp)
        return
    }
}

const handleKeyUp = (e) => {
    const key = e.key.toUpperCase();

    if (validateForLetter(key)) {
        if (buffer.length >= WORD_LENGTH) {
            buffer = buffer.slice(0, buffer.length - 1) + key
        } else {
            buffer += key
            lettersCount += 1
        }

        renderLetter(lettersCount - 1, key);
    }

    if (key === 'BACKSPACE') {
        if (buffer.length <= 0) return

        buffer = buffer.slice(0, buffer.length - 1)
        lettersCount -= 1

        renderLetter(lettersCount, '');
    }

    if (key === 'ENTER') {
        if (buffer.length < WORD_LENGTH) return
        
        validateForWord(buffer)
            .then((responce) => {
                if (responce === true) {
                    submitWord()
                } else {
                    alert('Not a valid word!')
                }
            })
    }
}

document.addEventListener('keyup', handleKeyUp)



