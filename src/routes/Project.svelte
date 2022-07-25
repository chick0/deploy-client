<script>
    import { push } from "svelte-spa-router";
    import { PROJECT_UUID, LOG_LIST, LOG_DETAIL } from "../url.js";
    import { getToken } from "../token.js";
    export let params = {};

    const URL = PROJECT_UUID(params.uuid);

    let title = "";
    let logIDList = [];

    fetch(URL, {
        method: "GET",
        headers: {
            Authorization: getToken(),
        },
    })
        .then((resp) => resp.json())
        .then((json) => {
            if (json.detail != undefined) {
                alert(json.detail.msg);
                push("/dashboard");
            } else {
                title = json.title;

                fetchLogIDList();
            }
        });

    function fetchLogIDList() {
        fetch(LOG_LIST(params.uuid), {
            method: "GET",
            headers: {
                Authorization: getToken(),
            },
        })
            .then((resp) => resp.json())
            .then((json) => {
                if (json.detail != undefined) {
                    alert(json.detail.msg);
                    push("/dashboard");
                } else {
                    logIDList = json.logIDList;
                }
            });
    }

    function getTag(return_code) {
        if (return_code == 0) {
            return `<b class="tag is-success">성공</b>`;
        } else {
            return `<b class="tag is-danger">실패</b>`;
        }
    }
</script>

<section class="section">
    <div class="container">
        <h1 class="title is-1">{title}</h1>
        <div class="subtitle">
            <a href="#/dashboard">대시보드로 이동</a>
        </div>

        {#if logIDList.length == 0}
            <div class="notification is-danger">
                <b>경고!</b> 해당 프로젝트의 배포 정보가 없습니다.
            </div>

            <div class="box">
                <b>배포 도구</b>의 사용 방법은 <a href="https://github.com/chick0/deploy-cli">여기</a>를 참고해주세요.
            </div>
        {/if}

        <div class="box">
            <h5 class="title is-5">배포 토큰 관리자</h5>
            <div class="buttons">
                <button class="button is-primary">토큰 생성</button>
                <button class="button is-danger">토큰 삭제</button>
            </div>
        </div>
    </div>
</section>

<section class="section">
    <div class="container">
        <h2 class="title is-2">배포 기록</h2>
        <p class="subtitle"><b>클릭</b>하면 자세한 정보를 확인 할 수 있습니다.</p>
        <div class="block">
            {#each logIDList as logID}
                <div
                    class="box"
                    on:click="{() => {
                        if (logID.loading === true || logID.loaded === true) {
                        } else {
                            logID.loading = true;
                            fetch(LOG_DETAIL(params.uuid, logID.id), {
                                method: 'GET',
                                headers: {
                                    Authorization: getToken(),
                                },
                            })
                                .then((resp) => resp.json())
                                .then((json) => {
                                    logID.loading = false;
                                    if (json.detail != undefined) {
                                        alert(json.detail.msg);
                                    } else {
                                        logID.loaded = true;
                                        logID.detail = json;
                                    }
                                });
                        }
                    }}">
                    <h5 class="title is-5">
                        {@html getTag(logID.return_code)}
                        {new Date(logID.created_at).toLocaleString()}
                    </h5>
                    <p class="subtitle">by <b>{logID.create_by}</b></p>

                    {#if logID.loading === true}
                        <div class="box">로그를 불러오고 있습니다...</div>
                    {/if}

                    {#if logID.loaded === true}
                        <div class="box">
                            <div class="content">
                                <pre>{logID.detail.stdout}</pre>
                            </div>

                            <div class="content">
                                <pre>{logID.detail.stderr}</pre>
                            </div>
                        </div>

                        {#if logID.detail.child != undefined}
                            <div class="box">
                                <div class="content">
                                    <pre>{logID.detail.child.stdout}</pre>
                                </div>

                                <div class="content">
                                    <pre>{logID.detail.child.stderr}</pre>
                                </div>
                            </div>
                        {/if}
                    {/if}
                </div>
            {/each}
        </div>
    </div>
</section>

<section class="section">
    <div class="container">
        <h2 class="title is-2">서비스 상태</h2>

        <div class="notification is-warning">개발중인 기능입니다.</div>
    </div>
</section>
