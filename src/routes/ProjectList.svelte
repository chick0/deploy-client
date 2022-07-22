<script>
    import { getLabel, getColor } from "../type.js";
</script>

<section class="section">
    <div class="container">
        <h1 class="title is-1">내 프로젝트</h1>
        <p class="subtitle">
            <a href="#/dashboard">대시보드로 이동</a>
        </p>

        <div class="content box">
            <ul>
                <li class="py-1">
                    <b class="tag {getColor(0)}" style="width: 86px;">{getLabel(0)}</b> title
                </li>
                <li class="py-1">
                    <b class="tag {getColor(1)}" style="width: 86px;">{getLabel(1)}</b> title
                </li>
                <li class="py-1">
                    <b class="tag {getColor(2)}" style="width: 86px;">{getLabel(2)}</b> title
                </li>
            </ul>
        </div>
    </div>
</section>

<style>
    ul {
        margin: 0;
    }
    li {
        padding: 0;
        list-style: none;
    }
</style>
