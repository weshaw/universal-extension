import './style.css'
console.log("options Loaded");
document.querySelector('#app').innerHTML = `
  <div>
    <h1>Options</h1>
    <div class="card">
      <button id="addScript" type="button">Start Script</button>
    </div>
    <p class="read-the-docs">
      Add stuff here..
    </p>
  </div>
`
