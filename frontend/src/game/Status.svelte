<section class="section">
    <div class="container">
        <div class="box">
            {#each messages as message}
                <p class="subtitle">{message}</p>
            {/each}
        </div>
    </div>
</section>

<script lang="ts">
    import {socket} from "../stores"
    import {onMount} from "svelte";

    let messages = [];

    type Attack = {
        actionCharge: number,
        username: string
    }

    onMount(() => {
        socket.on("player finished", perc => messages = [...messages, (`${perc*100}% of players have finished`)])
        socket.on("attack", (attack: Attack) => {
            messages = [...messages, (`${attack.username} with an action charge of ${attack.actionCharge}`)]
        })
        socket.on("round over", () => messages = [...messages, "The round is over"])
    })


</script>

