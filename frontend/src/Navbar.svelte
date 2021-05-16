<nav class="navbar is-dark" role="navigation" aria-label="main navigation" bind:clientWidth={width}>
    <div class="navbar-brand">
        <a role="button" class="navbar-burger" aria-label="menu" aria-expanded="false" data-target="navbarBasicExample"
           on:click={() => show = !show}>
            <span aria-hidden="true"></span>
            <span aria-hidden="true"></span>
            <span aria-hidden="true"></span>
        </a>
    </div>

    <div id="navbar-content" class="navbar-menu {show ? 'is-active' : ''}">
        <div class="navbar-start">
            <div class="navbar-item">
                <div class="buttons">
                    <button class="button is-primary has-text-dark" on:click={() => {page.set("home")}}>
                        Home
                    </button>
                </div>
            </div>
        </div>
        <div class="navbar-end">
            <div class="navbar-item">
                <div class="buttons">
                    {#if !userUUID}
                        <button class="button is-primary has-text-dark" on:click={() => {page.set("signup")}}>
                            Sign up
                        </button>
                        <button class="button is-primary has-text-dark" on:click={() => {page.set("login")}}>
                            Log in
                        </button>
                    {:else}
                        <button class="button is-primary has-text-dark" on:click={() => {page.set("joingame")}}>
                            Join a Game
                        </button>
                        <button class="button is-primary has-text-dark" on:click={() => {page.set("hostgame")}}>
                            Host a Game
                        </button>
                    {/if}
                </div>
            </div>
        </div>
    </div>
</nav>

<script lang="ts">
    import {page, uuid} from "./stores";

    let width;
    let userUUID;
    let show = false;

    uuid.subscribe(uuid => userUUID = uuid)
</script>

<style lang="sass">
  .navbar-menu
    background: hsl(0, 0%, 21%)
</style>