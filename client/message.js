
const el = {};







async function showContent(e) {
  const response = await fetch('logs/' + e.target.dataset.id);
  if (response.ok) {
    const details = await response.json();
    const work = document.createElement("p");
    const exp = document.createElement("p");
    const comp = document.createElement("p");

    work.textContent = `Work: ${details.work}`
    exp.textContent = `Experience: ${details.exp}`
    comp.textContent = `Competencies: ${details.comp}`;

    free(el.details)
    el.details.append(work, exp, comp);
  }
}

async function loadLogs() {
  const response = await fetch("logs");
  let logs;
  if (response.ok) {
    logs = await response.json();
  } 
  
  else {
    logs = ["Logs could not be loaded"];

  }
}

/* add a message if enter pressed */
function checkKeys(e) {
  if (e.key === 'Enter') {
    submitLog();
    window.location.href="/";
  };
}



/** Use fetch to post a JSON message to the server */
async function submitLog() {

  let payloadWork = document.querySelector('#work').value;
  let payloadExp = document.querySelector('#exp').value;
  let payloadComp = document.querySelector('#comp').value;


  const payload = { 
    work: payloadWork,
    exp: payloadExp,
    comp: payloadComp
   };

   

  console.log(payload);

  const response = await fetch('logs', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(payload),
  });

  if (response.ok) {
    // looping through each value in el.log object //
    for (const entry in el.log) {
      let elem = el.log[entry]
      elem.value = ""
    }
    const updatedLogs = await response.json();
  } 
  
  else {
    console.log('failed to send message', response);
  }
}

/**
 * Page elements used in the program are
 * setup here for convenience.
 */
function prepareHandles() {
  el.logList = document.querySelector('#logList');
  el.details = document.querySelector('#log-details');
  el.log = {
    work: document.querySelector('#work'),
    exp: document.querySelector('#exp'),
    comp: document.querySelector('#comp')
  }

  el.send = document.querySelector('#send');

}

/**
 * Connect listeners for button clicks,
 * keyboard input, etc.
 */

function addEventListeners() {
  el.send.addEventListener("click", submitLog);


  for (const key in el.log) {
    let elem = el.log[key]
    elem.addEventListener('keyup', checkKeys);
  }
}


function pageLoaded() {
  prepareHandles();
  addEventListeners()
  loadLogs();
}

// deprecated in favour of using defer in the script tag
// window.addEventListener('load', pageLoaded);
pageLoaded();

