<script>
    import { push } from "svelte-spa-router";
    import { AUTH } from "../url.js";
    import { setToken, getToken, clearToken } from "../token.js";

    let email = "";
    let email_element = undefined;

    let password = "";
    let password_element = undefined;

    let login_button = undefined;
    $: if (login_button != undefined) {
        check_login();
    }

    function check_login() {
        fetch(AUTH, {
            headers: {
                Authorization: getToken(),
            },
        })
            .then((resp) => resp.json())
            .then((json) => {
                if (json.result === true) {
                    push("/dashboard");
                } else {
                    clearToken();
                    login_button.classList.remove("is-loading");
                }
            })
            .catch(() => {
                login_button.classList.remove("is-loading");
            });
    }
</script>

<section class="hero is-primary has-background-light is-fullheight">
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
                                class="button is-dark is-fullwidth is-loading"
                                bind:this="{login_button}"
                                on:click="{() => {
                                    if (email.length == 0) {
                                        email_element.classList.add('is-danger');
                                        alert('이메일을 입력해주세요.');
                                    } else if (password.length == 0) {
                                        password_element.classList.add('is-danger');
                                        alert('비밀번호를 입력해주세요.');
                                    } else {
                                        login_button.classList.add('is-loading');
                                        fetch(AUTH, {
                                            method: 'POST',
                                            headers: {
                                                'Content-Type': 'application/json',
                                            },
                                            body: JSON.stringify({
                                                email,
                                                password,
                                            }),
                                        })
                                            .then((resp) => resp.json())
                                            .then((json) => {
                                                if (json.detail != undefined) {
                                                    alert(json.detail.msg);
                                                    login_button.classList.remove('is-loading');

                                                    email = '';
                                                    password = '';
                                                } else {
                                                    setToken(json.token);
                                                    push('/dashboard');
                                                }
                                            })
                                            .catch(() => {
                                                alert('네트워크 오류가 발생했습니다.');
                                                login_button.classList.remove('is-loading');
                                            });
                                    }
                                }}">Login</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</section>
