import {Request, Response} from "express";

type Question = {
    question: string,
    answers: string[],
    correctAnswer: string
}

const questions: Question[] = [
    {
        question: "Which kind of memory is volatile?",
        answers: ["RAM", "ROM", "Magnetic", "Optical"],
        correctAnswer: "RAM"
    },
    {
        question: "What number system do computers use?",
        answers: ["Binary", "Decimal", "Hexadecimal", "Electricity"],
        correctAnswer: "Binary"
    },
    {
        question: "What base is binary?",
        answers: ["2", "10", "16", "1"],
        correctAnswer: "2"
    },
    {
        question: "What type of memory is ROM, volatile or non-volatile?",
        answers: ["Volatile", "Non-Volatile"],
        correctAnswer: "Non-Volatile"
    },
    {
        question: "What is it called when secondary storage is used as memory?",
        answers: ["Virtual Memory", "Swapping", "Swap Partition", "Overflow"],
        correctAnswer: "Virtual Memory"
    },
    {
        question: "What number system do we use?",
        answers: ["Binary", "Decimal", "Octal", "Hexadecimal"],
        correctAnswer: "Decimal"
    },
    {
        question: "What base is decimal?",
        answers: ["2", "10", "16", "1"],
        correctAnswer: "10"
    },
    {
        question: "What number system do we use to read computer data more easily?",
        answers: ["Binary", "Decimal", "Octal", "Hexadecimal"],
        correctAnswer: "Hexadecimal"
    },
    {
        question: "What base is hexadecimal?",
        answers: ["2", "10", "16", "1"],
        correctAnswer: "16"
    },
    {
        question: "Which one of these is a form of secondary storage?",
        answers: ["Solid State", "RAM", "ROM", "CPU"],
        correctAnswer: "Solid State"
    },
    {
        question: "Is virtual memory faster or slower than RAM?",
        answers: ["Slower", "Faster"],
        correctAnswer: "Slower"
    },
    {
        question: "Which one of these is faster than RAM?",
        answers: ["Cache", "ROM", "Hard Drive", "SD Card"],
        correctAnswer: "Cache"
    },
    {
        question: "Where is cache found?",
        answers: ["CPU", "RAM", "ROM", "Clock"],
        correctAnswer: "CPU"
    },
    {
        question: "How many levels of cache is there?",
        answers: ["1", "2", "3", "4"],
        correctAnswer: "3"
    }
]

function shuffle(array) {
    let currentIndex = array.length, temporaryValue, randomIndex;

    // While there remain elements to shuffle...
    while (0 !== currentIndex) {

        // Pick a remaining element...
        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex -= 1;

        // And swap it with the current element.
        temporaryValue = array[currentIndex];
        array[currentIndex] = array[randomIndex];
        array[randomIndex] = temporaryValue;
    }

    return array;
}

export default (req: Request, res: Response) => {
    const question = questions[Math.floor(Math.random() * questions.length)]
    question.answers = shuffle(question.answers)
    res.json(question)
}