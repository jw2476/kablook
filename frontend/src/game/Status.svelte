<section class="section">
    <div class="container">
        <div class="box">
            <p class="title">Boss Health</p>
            <progress class="progress is-danger is-large" value={$bossHealth} max="{maxBossHealth}"></progress>
            {#each messages as message}
                <p class="subtitle">{message}</p>
            {/each}
        </div>
    </div>
</section>

<script lang="ts">
    import {socket, uuid} from "../stores"
    import {onMount} from "svelte";
    import {tweened} from "svelte/motion";

    let messages = [];
    let bossHealth = tweened(100);
    let maxBossHealth = 100

    type Attack = {
        actionCharge: number,
        username: string,
        damage: number
    }

    onMount(() => {
        socket.on("attack", async (attack: Attack) => {
            messages = [...messages, (`${attack.username} attacked with an action charge of ${attack.actionCharge} dealing ${attack.damage} damage`)]
            await bossHealth.set($bossHealth-attack.damage)
        })

        fetch(`/api/game/boss?uuid=${$uuid}`).then(res => res.json()).then(res => {
            bossHealth.set(res.health)
            maxBossHealth = res.max
        })
    })


</script>

