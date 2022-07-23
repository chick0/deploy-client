<script>
    import { push } from "svelte-spa-router";
    import { PROJECT_LIST } from "../url.js";
    import { getToken, getPayload } from "../token.js";
    import { getLabel, getColor } from "../type.js";

    let projectList = [];

    if (getPayload() == undefined) {
        alert("인증 토큰이 없습니다!");
        push("/");
    } else {
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
        <h1 class="title is-1">내 프로젝트</h1>
        <p class="subtitle">
            <a href="#/dashboard">대시보드로 이동</a>
        </p>

        <div class="block">
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
