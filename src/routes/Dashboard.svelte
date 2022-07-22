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
                <a class="button is-primary" href="#/project">내 프로젝트</a>
                <a class="button is-warning" href="#/project/create">프로젝트 생성</a>
            </div>
        </div>

        <div class="box">
            <h5 class="title is-5">배포 토큰</h5>
            <div class="buttons">
                <a class="button is-success" href="#/deploy-token/create">배포 토큰 생성</a>
                <a class="button is-info" href="#/deploy-token">배포 토큰 조회</a>
            </div>
        </div>

        <div class="box">
            <h5 class="title is-5">계정</h5>
            <div class="buttons">
                <button
                    class="button is-dark"
                    on:click="{() => {
                        clearToken();
                        push('/');
                    }}">로그아웃</button>
            </div>
        </div>
    </div>
</section>
