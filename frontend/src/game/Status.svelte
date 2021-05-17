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
        socket.on("attack", (attack: Attack) => {
            messages = [...messages, (`${attack.username} attacked with an action charge of ${attack.actionCharge}`)]
        })
    })


</script>

