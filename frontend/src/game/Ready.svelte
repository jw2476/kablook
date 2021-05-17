<section class="section">
    <div class="container">
        <div class="box">
            <p class="title">You have finished you round, please wait for other players to finish</p>
        </div>
    </div>
</section>

<script lang="ts">
    import {socket, page} from "../stores"
    import {onMount} from "svelte";

    let playersFinished = 0;

    onMount(() => {
        socket.on("player finished", p => playersFinished = p)
        socket.on("round over", () => page.set("spellselect"))
    })
</script>