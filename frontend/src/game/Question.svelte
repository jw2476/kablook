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
            <p class="title">Charge</p>
            <progress class="progress is-primary" value={$actionCharge} max="100"></progress>
        </div>
    </div>
</section>

<script lang="ts">
    import {onMount} from "svelte";
    import {tweened} from "svelte/motion";
    import {cubicOut} from "svelte/easing";
    import {page, uuid, spell, socket} from "../stores"

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
        socket.on("round over", () => page.set("spellselect"))
        socket.on("dead", () => page.set("dead"))
    })

    async function checkAnswer(answer) {
        answered++
        console.log($uuid)

        if (question.correctAnswer == answer) {
            correct = true

            await actionCharge.set($actionCharge+25)

            setTimeout(async () => {
                correct = false
                question = await fetch("/api/game/question").then(res => res.json())
            }, 1500);

        } else {
            incorrect = true
            setTimeout(async () => {
                incorrect = false
                question = await fetch("/api/game/question").then(res => res.json())
            }, 1500);
        }

        if (answered === 4) {
            answered = 0

            const last = await fetch("/api/game/attack", {
                method: "POST",
                body: JSON.stringify({
                    uuid: $uuid,
                    actionCharge: $actionCharge,
                    spell: $spell
                }),
                headers: {
                    'Content-Type': 'application/json'
                }
            }).then(res => res.json())

            await actionCharge.set(0)

            if (!last) page.set("ready")
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