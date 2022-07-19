<script>
    let email = "";
    let email_element = undefined;

    let password = "";
    let password_element = undefined;

    let login_button = undefined;
</script>

<section class="hero is-primary has-background-black is-fullheight">
    <div class="hero-body">
        <div class="container">
            <div class="columns is-centered">
                <div class="column is-5-tablet is-4-desktop is-3-widescreen">
                    <div class="box">
                        <div class="field">
                            <label for="" class="label">Email</label>
                            <div class="control">
                                <input
                                    type="email"
                                    placeholder="e.g. chick_0@icmp.kr"
                                    class="input"
                                    bind:this="{email_element}"
                                    bind:value="{email}"
                                    required />
                            </div>
                        </div>

                        <div class="field">
                            <label for="" class="label">Password</label>
                            <div class="control">
                                <input
                                    type="password"
                                    placeholder="*******"
                                    class="input"
                                    bind:this="{password_element}"
                                    bind:value="{password}"
                                    required />
                            </div>
                        </div>

                        <div class="field">
                            <button
                                class="button is-dark is-fullwidth"
                                bind:this="{login_button}"
                                on:click="{(e) => {
                                    if (email.length == 0) {
                                        email_element.classList.add('is-danger');
                                        alert('이메일을 입력해주세요.');
                                    } else if (password.length == 0) {
                                        password_element.classList.add('is-danger');
                                        alert('비밀번호를 입력해주세요.');
                                    } else {
                                        login_button.classList.add('is-loading');
                                    }
                                }}">Login</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</section>
