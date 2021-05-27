<section class="section">
    <div class="container">
        <div class="box has-text-centered">
            <p class="title">Code: {$code}</p>
        </div>
        <div class="box">
            <p class="title">Boss Health</p>
            <progress class="progress is-danger is-large" value={$bossHealth} max="{maxBossHealth}"></progress>
            {#each messages as message}
                <p class="subtitle {message.style ? message.style : ''}">{message.content}</p>
            {/each}
        </div>
    </div>
</section>

<script lang="ts">
    import {socket, uuid, code} from "../stores"
    import {onMount} from "svelte";
    import {tweened} from "svelte/motion";

    type Message = {
        content: string
        style?: string
    }

    let messages: Message[] = [];
    let bossHealth = tweened(100);
    let maxBossHealth = 100

    type Attack = {
        actionCharge: number,
        username: string,
        damage: number
    }

    onMount(() => {
        socket.on("message", async (message: string) => {
            messages = [...messages, {
                content: message,
            }]
        })

        socket.on("styled message", async (message: Message) => {
            messages = [...messages, message]
        })
    })

    socket.on("set boss health", async (health: number) => {
        await bossHealth.set(health)
    })

    fetch(`/api/game/boss?uuid=${$uuid}`).then(res => res.json()).then(res => {
        bossHealth.set(res.health)
        maxBossHealth = res.max
    })


</script>

