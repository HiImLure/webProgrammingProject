
const el = {};
const ui = {};
ui.inputSection = document.querySelector('section.inputs');
ui.fields = ui.inputSection.querySelectorAll('.forpayload')



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

  const payload = {};
  for (const field of ui.fields) {
    payload[field.id] = field.value;
    console.log(field)
  }

   

  console.log(payload);

  const response = await fetch('logs', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(payload),
  });

  if (response.ok) {
    // looping through each value in el.log object //
    console.log("success!")
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

