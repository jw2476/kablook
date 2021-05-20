<section class="section">
    <div class="container">
        <p class="title">Sign Up</p>

        <div class="field">
            <label class="label">Username</label>
            <div class="control has-icons-left has-icons-right">
                <input class="input" type="text" placeholder="Gandalf the Lizard" bind:value={username}>
                <span class="icon is-small is-left">
                    <i class="fas fa-user"></i>
                </span>
            </div>
            {#if usernameEmpty}
                <p class="help is-danger">This cannot be empty</p>
            {/if}
            {#if usernameTaken}
                <p class="help is-danger">Username Already Taken</p>
            {/if}
        </div>
        <div class="field">
            <label class="label">Password</label>
            <div class="control has-icons-left has-icons-right">
                <input class="input" type="password" placeholder="Gandalf the Lizard's pet dog called Geoffrey"
                       bind:value={password}>
                <span class="icon is-small is-left">
                    <i class="fas fa-key"></i>
                </span>
            </div>
            {#if passwordEmpty}
                <p class="help is-danger">This cannot be empty</p>
            {/if}
        </div>
        <div class="field">
            <label class="label">Job</label>
            <br>
            <div class="columns box">
                {#each jobs as j}
                    <div class="control column">
                        <button class="button {job === j.name ? 'is-dark' : 'is-primary'} is-fullwidth" on:click={() => job = j.name}>
                            {j.name} - {j.description}
                        </button>
                    </div>
                {/each}
            </div>
            {#if jobEmpty}
                <p class="help is-danger">This cannot be empty</p>
            {/if}
        </div>
        <div class="field">
            <div class="control">
                <button class="button is-primary" on:click={submit}>Submit</button>
            </div>
        </div>
    </div>
</section>

<script lang="ts">
    import {page, uuid} from '../stores'
    import {onMount} from "svelte";

    let username = "";
    let password = "";
    let job = "";
    let jobs = [];
    let usernameEmpty = false;
    let passwordEmpty = false;
    let jobEmpty = false;
    let usernameTaken = false;

    enum SignUpStatus {
        ErrUsernameTaken = -1,
        Success
    }

    type SignUpResult = {
        status: SignUpStatus,
        uuid: string
    }

    onMount(() => fetch("/api/jobs").then(res => res.json()).then(res => jobs = res))

    async function submit() {
        usernameEmpty = !username;
        passwordEmpty = !password;
        jobEmpty = !job;

        if (usernameEmpty || passwordEmpty || jobEmpty) return;

        fetch("/api/auth/signup", {
            method: "POST",
            body: JSON.stringify({
                username,
                password,
                job
            }),
            headers: {
                'Content-Type': 'application/json'
            }
        }).then(res => res.json()).then(res => {
            const result = res as SignUpResult
            switch (result.status) {
                case SignUpStatus.ErrUsernameTaken: {
                    usernameTaken = true
                    break
                }
                case SignUpStatus.Success: {
                    uuid.set(result.uuid);
                    page.set("home")
                }
            }
        })
    }
</script>