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
        answers: ["Virtual Memory", "Swapping", "Destroying your hard drive", "Slow"],
        correctAnswer: "Virtual Memory"
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