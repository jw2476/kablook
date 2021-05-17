<section class="section">
    <div class="container">
        <p class="title">Login</p>
        {#if success}
            <div class="notification is-primary">
                <button class="delete" on:click={() => success = false}></button>
                Logged in as: {username}!
            </div>
        {/if}

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
            {#if usernameIncorrect}
                <p class="help is-danger">Username Incorrect</p>
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
            {#if passwordIncorrect}
                <p class="help is-danger">Password Incorrect</p>
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
    import {uuid} from '../stores'

    let username = "";
    let password = "";
    let usernameEmpty = false;
    let passwordEmpty = false;
    let usernameIncorrect = false;
    let passwordIncorrect = false;
    let success = false;

    enum LoginStatus {
        ErrUsernameIncorrect = -2,
        ErrPasswordIncorrect,
        Success,
    }

    type LoginResult = {
        status: LoginStatus,
        uuid: string
    }

    async function submit() {
        usernameEmpty = !username;
        passwordEmpty = !password;
        usernameIncorrect = false;
        passwordIncorrect = false;

        if (usernameEmpty || passwordEmpty) return;

        fetch("/api/auth/login", {
            method: "POST",
            body: JSON.stringify({
                username,
                password
            }),
            headers: {
                'Content-Type': 'application/json'
            }
        }).then(res => res.json()).then(res => {
            const result = res as LoginResult

            switch (result.status) {
                case LoginStatus.ErrUsernameIncorrect: {
                    usernameIncorrect = true
                    break
                }
                case LoginStatus.ErrPasswordIncorrect: {
                    passwordIncorrect = true
                    break
                }
                case LoginStatus.Success: {
                    success = true;
                    uuid.set(result.uuid);
                }
            }
        })
    }
</script>