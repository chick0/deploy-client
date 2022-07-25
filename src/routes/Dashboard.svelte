<script>
    import { push } from "svelte-spa-router";
    import { PROJECT_LIST } from "../url.js";
    import { clearToken, getToken, getPayload } from "../token.js";
    import { getLabel, getColor } from "../type.js";

    let payload = getPayload();
    let end_of_session = "...";
    let projectList = [];

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

        fetch(PROJECT_LIST, {
            method: "GET",
            headers: {
                Authorization: getToken(),
            },
        })
            .then((resp) => resp.json())
            .then((json) => {
                if (json.detail != undefined) {
                    alert(json.detail.msg);
                } else {
                    projectList = json.projectList;
                }
            })
            .catch(() => {
                alert("네트워크 오류가 발생했습니다.");
            });
    }
</script>

<section class="section">
    <div class="container">
        <h1 class="title is-1">안녕하세요!</h1>
        <p class="subtitle">세션 만료 시간 : <b>{end_of_session}</b></p>

        <div class="box">
            <h5 class="title is-5">계정 관리</h5>
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

<section class="section">
    <div class="container">
        <h2 class="title is-2">내 프로젝트</h2>
        <div class="block">
            <a class="button is-link" href="#/project/create">프로젝트 생성</a>
        </div>

        <div class="block">
            {#if projectList.length == 0}
                <div class="notification is-warning">
                    <b>경고!</b> 등록된 프로젝트가 없습니다.
                </div>
            {/if}

            {#each projectList as project}
                <div
                    class="box is-clickable"
                    on:click="{() => {
                        push(`/project/${project.uuid}`);
                    }}">
                    <b class="tag {getColor(project.type)}" style="width: 86px;">{getLabel(project.type)}</b>
                    {project.title}

                    <div class="block"></div>
                </div>
            {/each}
        </div>
    </div>
</section>
