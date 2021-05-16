<section class="section">
    <div class="container">
        <div class="box has-text-centered">
            <p class="code">Code to Join: {code}</p>
        </div>
        <div class="box main-box has-text-centered">
            <p class="players">Players: {players.length}</p>
            <button class="button is-primary" on:click={startGame}>Start Game</button>
            <br>
            <br>
            {#each [...Array(Math.floor(players.length / 5) + 1).keys()] as row}
                <div class="columns">
                    {#each players.slice(5 * row, (5 * row) + 5) as player}
                        <div class="column box">
                            {player}
                        </div>
                    {/each}
                </div>
            {/each}
        </div>
    </div>
</section>

<script lang="ts">
    import {onMount} from "svelte";
    import {socket, uuid, page} from '../stores';

    let code = "Loading..";
    let userUUID;
    let players = [];

    uuid.subscribe(uuid => userUUID = uuid)

    onMount(() => {
        fetch(`/api/join/createGame?host=${userUUID}`).then(res => res.json()).then(res => {
            code = res.code
            players = res.players
        })

        socket.on("user joined", username => players = [...players, username])
        socket.on("user left", username => players = players.filter(m => m !== username))
    })

    function startGame() {
        socket.emit("start game", code)
        page.set("status")
    }

</script>

<style lang="sass">
  .code
    font-size: 96px

  .players
    font-size: 48px

  .column
    margin: 0.75rem

  .main-box
    padding-bottom: 4rem
</style>