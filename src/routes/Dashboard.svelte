<script>
    import { push } from "svelte-spa-router";
    import { clearToken, getPayload } from "../token.js";

    let payload = getPayload();
    let end_of_session = "...";

    if (payload == undefined) {
        clearToken();
        push("/");
    } else {
        let now = new Date().getTime() / 1000;

        if (payload.exp - now <= 0) {
            clearToken();
            push("/");
        } else {
            end_of_session = new Date(payload.exp * 1000).toLocaleTimeString();
        }
    }
</script>

<section class="section">
    <div class="container">
        <h1 class="title is-1">안녕하세요!</h1>
        <p class="subtitle">세션 만료 시간 : <b>{end_of_session}</b></p>

        <div class="box">
            <h5 class="title is-5">프로젝트</h5>
            <div class="buttons">
                <button
                    class="button is-info"
                    on:click="{() => {
                        push('/projects');
                    }}">내 프로젝트</button>

                <button
                    class="button is-primary"
                    on:click="{() => {
                        push('/project/create');
                    }}">프로젝트 생성</button>
            </div>
        </div>

        <div class="box">
            <h5 class="title is-5">배포 토큰</h5>
            <div class="buttons">
                <button
                    class="button is-success"
                    on:click="{() => {
                        push('/deploy-token/create');
                    }}">배포 토큰 생성</button>
                <button
                    class="button is-warning"
                    on:click="{() => {
                        push('/deploy-token');
                    }}">배포 토큰 삭제</button>
            </div>
        </div>

        <div class="box">
            <h5 class="title is-5">계정</h5>
            <div class="buttons">
                <button
                    class="button is-light"
                    on:click="{() => {
                        clearToken();
                        push('/');
                    }}">로그아웃</button>
            </div>
        </div>
    </div>
</section>
