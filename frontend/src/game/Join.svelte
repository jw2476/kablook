<section class="section">
    <div class="container">
        <div class="field">
            <label class="label">Code</label>
            <div class="control">
                <input class="input" type="text" placeholder="123456" bind:value={code}>
            </div>
        </div>
        <div class="field">
            <div class="control">
                <button class="button is-primary" on:click={submit}>Submit</button>
            </div>
        </div>
    </div>
</section>

<script lang="ts">
    import {socket, page} from "../stores"

    let code;

    function submit() {
        socket.emit("join game", code)

        socket.on("join game success", () => page.set("waiting"))
    }
</script>