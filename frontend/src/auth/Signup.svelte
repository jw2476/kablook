<section class="section">
    <div class="container">
        <p class="title">Sign Up</p>
        {#if success}
            <div class="notification is-primary">
                <button class="delete" on:click={() => success = false}></button>
                Account Created for: {username}!
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
    let usernameTaken = false;
    let success = false;

    enum SignUpStatus {
        ErrUsernameTaken = -1,
        Success
    }

    type SignUpResult = {
        status: SignUpStatus,
        uuid: string
    }

    async function submit() {
        usernameEmpty = !username;
        passwordEmpty = !password;
        usernameTaken = false;

        if (usernameEmpty || passwordEmpty) return;

        fetch(`/api/auth/signup?username=${username}&password=${password}`).then(res => res.json()).then(res => {
            const result = res as SignUpResult
            switch (result.status) {
                case SignUpStatus.ErrUsernameTaken: {
                    usernameTaken = true
                    break
                }
                case SignUpStatus.Success: {
                    success = true;
                    uuid.set(result.uuid);
                }
            }
        })
    }
</script>