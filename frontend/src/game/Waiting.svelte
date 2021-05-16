<section class="section">
    <div class="container">
        <div class="box has-text-centered">
            <p class="title">Successfully joined game! Your name should be on the host's screen!</p>
        </div>
    </div>
</section>

<script lang="ts">
    import {socket, page} from "../stores"
    import {onMount} from "svelte";

    onMount(() => {
        socket.on("start game", () => page.set("question"))
    })
</script>