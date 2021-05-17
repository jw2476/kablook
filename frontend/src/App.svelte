<script>
    import Home from "./Home.svelte";
    import Navbar from "./Navbar.svelte";
    import {page} from "./stores";
    import {fade} from 'svelte/transition';
    import Signup from "./auth/Signup.svelte";
    import Login from "./auth/Login.svelte";
    import JoinHost from "./game/JoinHost.svelte";
    import Join from "./game/Join.svelte";
    import Waiting from "./game/Waiting.svelte";
    import Question from "./game/Question.svelte";
    import Ready from "./game/Ready.svelte";
    import Status from "./game/Status.svelte";
    import SpellSelect from "./game/SpellSelect.svelte";
    import Victory from "./game/Victory.svelte";

    let currPage;
    let width;

    page.subscribe(page => currPage = page);
</script>
<main bind:clientWidth={width}>
    {#if ["home", "signup", "login", "hostgame", "joingame"].includes(currPage)}
        <Navbar/>
    {/if}
    {#if currPage === "home"}
        <div in:fade="{{delay: 500}}" out:fade="{{duration: 500}}">
            <Home/>
        </div>
    {:else if currPage === "signup"}
        <div in:fade="{{delay: 500}}" out:fade="{{duration: 500}}">
            <Signup/>
        </div>
    {:else if currPage === "login"}
        <div in:fade="{{delay: 500}}" out:fade="{{duration: 500}}">
            <Login/>
        </div>
    {:else if currPage === "hostgame"}
        <div in:fade="{{delay: 500}}" out:fade="{{duration: 500}}">
            <JoinHost/>
        </div>
    {:else if currPage === "joingame"}
        <div in:fade="{{delay: 500}}" out:fade="{{duration: 500}}">
            <Join/>
        </div>
    {:else if currPage === "waiting"}
        <div in:fade="{{delay: 500}}" out:fade="{{duration: 500}}">
            <Waiting/>
        </div>
    {:else if currPage === "question"}
        <div in:fade="{{delay: 500}}" out:fade="{{duration: 500}}">
            <Question/>
        </div>
    {:else if currPage === "ready"}
        <div in:fade="{{delay: 500}}" out:fade="{{duration: 500}}">
            <Ready/>
        </div>
    {:else if currPage === "status"}
        <div in:fade="{{delay: 500}}" out:fade="{{duration: 500}}">
            <Status/>
        </div>
    {:else if currPage === "spellselect"}
        <div in:fade="{{delay: 500}}" out:fade="{{duration: 500}}">
            <SpellSelect/>
        </div>
    {:else if currPage === "victory"}
        <div in:fade="{{delay: 500}}" out:fade="{{duration: 500}}">
            <Victory/>
        </div>
    {/if}
</main>