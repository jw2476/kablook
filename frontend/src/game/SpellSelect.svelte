<section class="section">
    <div class="container">
        <div class="columns">
            {#each spells as s}
                <div class="column">
                    <div class="box has-text-centered">
                        <p class="spellname">{s.name}</p>
                        <p class="description">{s.description}</p>
                        <button class="button is-primary" on:click={() => {spell.set(s); page.set("question")}}>Select
                        </button>
                    </div>
                </div>
            {/each}
        </div>
    </div>
</section>

<script lang="ts">
    import {page, spell, uuid} from "../stores"
    import {onMount} from "svelte";

    let width;

    type Spell = {
        baseDamage: number,
        name: string,
        description: string
    }

    let spells: Spell[] = []

    onMount(async () => {
        spells = await fetch(`/api/spells?uuid=${$uuid}`).then(res => res.json())
    })
</script>

<style lang="sass">
  .spellname
    font-size: 48px
</style>