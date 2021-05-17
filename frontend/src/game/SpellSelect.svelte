<section class="section">
    <div class="container">
        <div class="columns">
        {#each spells as s}
            <button class="column button is-primary box spell is-square" on:click={() => {spell.set(s); page.set("question")}}>
                <p class="spellname">{s.name}</p>
                <p>{s.description}</p>
            </button>
        {/each}
        </div>
    </div>
</section>

<script lang="ts">
    import {spell, page} from "../stores"
    import {onMount} from "svelte";

    type Spell = {
        baseDamage: number,
        name: string,
        description: string
    }

    let spells: Spell[] = []

    onMount(async () => {
        spells = await fetch("/api/spells").then(res => res.json())
    })
</script>

<style lang="sass">
    .spell
      width: 100%
      height: 100%

    .spellname
      font-size: 48px
</style>