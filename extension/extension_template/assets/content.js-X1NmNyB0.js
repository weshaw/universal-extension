const e=`
<div class="crx">
Works
</div>
`;console.log("content Loaded");const o=new DOMParser().parseFromString(e,"text/html");console.log(o.body.firstElementChild);document.body.append(o.body.firstElementChild);
