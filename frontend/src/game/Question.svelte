<section class="section">
    <div class="container">
        <div class="box">
            <p class="question" >{question.question}</p>
        </div>

        {#if !correct && !incorrect}
            <div class="columns">
                {#each question.answers as answer}
                    <div class="column">
                        <button class="button is-dark is-fullwidth" on:click={() => checkAnswer(answer)}>
                            {answer}
                        </button>
                    </div>
                {/each}
            </div>
        {/if}

        {#if correct}
            <div class="notification is-primary">
                Correct!
            </div>
        {/if}

        {#if incorrect}
            <div class="notification is-danger">
                Incorrect! Correct answer was: {question.correctAnswer}
            </div>
        {/if}
        <div id="progress">
            <p class="title">Action Charge</p>
            <progress class="progress is-primary" value={$actionCharge} max="100">15%</progress>
        </div>
    </div>
</section>

<script lang="ts">
    import {onDestroy, onMount} from "svelte";
    import {tweened} from "svelte/motion";
    import {cubicOut} from "svelte/easing";
    import {page, socket} from "../stores"

    let question: Question = {
        question: "",
        answers: [],
        correctAnswer: ""
    };
    let correct;
    let incorrect;
    let actionCharge = tweened(0, {
        easing: cubicOut,
        duration: 1000
    });
    let answered = 0;

    type Question = {
        question: string,
        answers: string[]
        correctAnswer: string
    }

    onMount(async () => {
        question = await fetch("/api/game/question").then(res => res.json())
    })

    async function checkAnswer(answer) {
        answered++

        if (question.correctAnswer == answer) {
            correct = true

            console.log($actionCharge)
            await actionCharge.set($actionCharge+25)
            console.log($actionCharge)

            setTimeout(async () => {
                correct = false
                question = await fetch("/api/game/question").then(res => res.json())
            }, 3000);

        } else {
            incorrect = true
            setTimeout(async () => {
                incorrect = false
                question = await fetch("/api/game/question").then(res => res.json())
            }, 3000);
        }

        if (answered === 4) {
            answered = 0

            socket.emit("attack", {
                actionCharge: $actionCharge
            })

            await actionCharge.set(0)

            page.set("ready")
        }
    }
</script>

<style lang="sass">
  .column
    margin: 0.75rem

  #progress
    position: sticky
    bottom: 0

</style>