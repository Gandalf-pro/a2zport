const vowels = new Set(["e", "o", "a", "i", "u"]);

/**
 * Using this method with set is more performant because we are not creating objects unlike the below regex version
 * which then have to be garbage collected
 * @param {string} str
 */
function getAmountOfVowelsWithSet(str) {
    let count = 0;
    for (const tmp of str) {
        if (vowels.has(tmp)) {
            count++;
        }
    }
    return count;
}

/**
 *
 * @param {string} str
 */
function getAmountOfVowelsWithRegex(str) {
    return (str.match(/[aeiou]/g) || []).length;
}

/**
 *
 * @param {string} str
 */
function removeNonEnglishCharacters(str) {
    return str.replace(/([^a-z\s])+/g, "");
}

/**
 *
 * @param {string} str
 */
function getLongestWord(str) {
    // Instructions says "Given a sentence with multiple lowercase words separated by spaces" but the given example starts with a capital letter so i used toLowerCase method
    // Get the words array split by spaces having only english lowercase letters
    const wordsArray = removeNonEnglishCharacters(str.toLowerCase()).split(" ").filter(Boolean);
    if (wordsArray.length <= 0) {
        return null;
    }

    let longestWordLength = 0;
    let longestWords = [];
    // Get longest word/s
    for (const word of wordsArray) {
        if (word.length > longestWordLength) {
            longestWordLength = word.length;
            longestWords = [word];
        } else if (word.length === longestWordLength) {
            longestWords.push(word);
        }
    }

    // Have more then one longest word
    if (longestWords.length > 1) {
        const vowelsCounts = longestWords.map(getAmountOfVowelsWithSet);
        let mostVowelCount = 0;
        let mostVowelElement = undefined;
        for (let i = 0; i < longestWords.length; i++) {
            const word = longestWords[i];
            const vowelCount = vowelsCounts[i];

            if (vowelCount > mostVowelCount) {
                mostVowelCount = vowelCount;
                mostVowelElement = word;
            }
        }

        return mostVowelElement;
    }

    return longestWords[0];
}

function main() {
    const testData = [
        {
            // Given test
            input: "smart people learn from everything and everyone, average people from their experience, stupid people already, have all the answers",
            answer: "experience",
        },
        {
            // No input
            input: "",
            answer: null,
        },
        {
            // No valid words
            input: "123 *!#",
            answer: null,
        },
        {
            // One long word with some non english characters at the end
            input: "GandalfTheGrayUsingHisMagic!!",
            answer: "gandalfthegrayusinghismagic",
        },
        {
            // Vowel counting
            input: "apple banana cherry date",
            answer: "banana",
        },
        {
            // Turkish characters with specials characters
            input: "ÇömpÜt3r PrÖgr@mm1ng",
            answer: "prgrmmng",
        },
    ];

    const answerData = [];

    // Heat up the functions so they become optimized for more accurate time calc
    for (let i = 0; i < 100; i++) {
        for (const data of testData) {
            getLongestWord(data.input);
        }
    }

    const programStart = performance.now();

    for (let i = 0; i < testData.length; i++) {
        const data = testData[i];
        const start = performance.now();
        const answer = getLongestWord(data.input);
        const timeTookMs = performance.now() - start;
        const isAnswerCorrect = answer === data.answer;
        answerData.push({
            timeMs: timeTookMs,
            correct: isAnswerCorrect,
        });
        console.log(`Test ${i} - ${isAnswerCorrect ? "Correct" : "Wrong"}, took: ${timeTookMs}ms`);
    }

    console.table(answerData);
    const correctAnswerCount = answerData.reduce((total, cur) => total + cur.correct, 0);
    const wrongAnswerCount = answerData.length - correctAnswerCount;
    console.log(`Program took ${performance.now() - programStart}ms`);
    console.log(`Correct/Wrong answer count: ${correctAnswerCount}/${wrongAnswerCount}`);
}
main();
