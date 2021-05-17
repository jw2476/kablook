<section class="hero has-text-centered is-medium is-primary">
    <div class="hero-body">
        <p class="title has-text-dark">
            Kablook
        </p>
        <p class="subtitle has-text-dark">
            By Jack W
        </p>
        {#if !userUUID}
            <button class="button is-dark" on:click={() => {page.set("signup")}}>
                Sign up
            </button>
            <button class="button is-dark" on:click={() => {page.set("login")}}>
                Log in
            </button>
        {:else}
            <button class="button is-dark" on:click={() => {page.set("joingame")}}>
                Join a Game
            </button>
            <button class="button is-dark" on:click={() => {page.set("hostgame")}}>
                Host a Game
            </button>
        {/if}
    </div>
</section>

<style lang="sass">
  .title
    font-size: 96px
</style>

<script lang="ts">
    import {page, uuid} from './stores';

    let userUUID;

    uuid.subscribe(uuid => userUUID = uuid)
</script>