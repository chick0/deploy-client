<script>
    import { push } from "svelte-spa-router";
    import { PROJECT } from "../url.js";
    import { getToken } from "../token.js";
    import { TYPE, getTypeId } from "../type.js";

    let title = "";
    let selected_type = "";

    let path = "";
    let command = "";

    let create_button;

    function getPayload() {
        return {
            title,
            type: getTypeId(selected_type),
            path,
            command,
        };
    }
</script>

<section class="section">
    <div class="container">
        <h1 class="title is-1">프로젝트 생성</h1>
        <p class="subtitle">
            <a href="#/dashboard">대시보드로 이동</a>
        </p>

        <div class="box">
            <div class="notification is-danger">
                <b>경고!</b> 프로젝트 제목과 형식은 변경 할 수 없습니다.
            </div>

            <div class="field">
                <label class="label" for="title">프로젝트 제목</label>
                <div class="control">
                    <input id="title" class="input" type="text" bind:value="{title}" />
                </div>
            </div>

            <div class="field">
                <label class="label" for="type">프로젝트 형식</label>
                <div class="control">
                    <div class="select is-fullwidth">
                        <select id="type" bind:value="{selected_type}">
                            {#each Object.values(TYPE) as type}
                                <option selected="{type == selected_type}" value="{type}">
                                    {type}
                                </option>
                            {/each}
                        </select>
                    </div>
                </div>
            </div>
        </div>

        {#if getTypeId(selected_type) === 0}
            <div class="box">프론트엔드 프로젝트는 프로젝트 경로를 설정 할 수 없습니다.</div>
        {:else if getTypeId(selected_type) === 1 || getTypeId(selected_type) === 2}
            <div class="box">
                <div class="notification is-warning">
                    <b>주의!</b> 해당 프로젝트가 <code>git</code>을 이용해 버전 관리를 해야합니다.
                </div>

                <div class="field">
                    <label class="label" for="path">프로젝트 파일 경로</label>
                    <div class="control">
                        <input id="path" class="input" type="text" bind:value="{path}" />
                    </div>
                </div>

                <div class="field">
                    <label class="label" for="command">서비스 재시작 명령어</label>
                    <div class="control">
                        <input id="command" class="input" type="text" bind:value="{command}" />
                    </div>
                </div>
            </div>
        {/if}

        {#if !isNaN(getTypeId(selected_type))}
            <div class="block">
                <button
                    class="button is-large is-info is-fullwidth"
                    bind:this="{create_button}"
                    on:click="{() => {
                        create_button.classList.add('is-loading');
                        fetch(PROJECT, {
                            method: 'POST',
                            headers: {
                                Authorization: getToken(),
                                'Content-Type': 'application/json',
                            },
                            body: JSON.stringify(getPayload()),
                        })
                            .then((resp) => resp.json())
                            .then((json) => {
                                if (json.detail != undefined) {
                                    alert(json.detail.msg);
                                    create_button.classList.remove('is-loading');
                                } else {
                                    alert(`"${json.title}" 프로젝트가 생성되었습니다.`);
                                    push(`/project/${json.uuid}`);
                                }
                            })
                            .catch(() => {
                                alert('네트워크 오류가 발생했습니다.');
                                create_button.classList.remove('is-loading');
                            });
                    }}">프로젝트 생성</button>
            </div>
        {/if}
    </div>
</section>
