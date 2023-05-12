const el = {};
const ui = {};
ui.inputSection = document.querySelector('section.inputs');
ui.fields = ui.inputSection.querySelectorAll('.forpayload')

function showLog(log) {
    el.work.value = log.work;
    el.exp.value = log.exp;
    el.comp.value = log.comp;
  }

//retrieves log from URL through removing # symbol from begginging of hash
function getLogID() {
    return window.location.hash.substring(1);
}

// uses fetch to make a get request to obtain the logs from
// the logs endpoint in server, obtaining a specific log through ID

async function loadLog() {
    const id = getLogID();
    const response = await fetch(`logs/${id}`);
    let log;
    if (response.ok) {
        log = await response.json();
     } else {
        log = ["Logs could not be loaded"];
  }
  showLog(log);
}



/** Use fetch to update a JSON log to the server by ID **/

async function submitLog() {
  const id = getLogID();
  const payload = {id };
  for (const field of ui.fields) {
    payload[field.id] = field.value;
  }

  const response = await fetch(`logs/${id}`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(payload),
  });

  if (response.ok) {
    const updatedLogs = await response.json();
    showLog(updatedLogs, el.logList)
  } else {
    console.log('failed to update log', response);
  }
}

function checkKeys(e) {
    if (e.key === 'Enter') {
      submitLog();
      window.location.href="/";
    };
  }



function prepareHandles() {
    el.logList = document.querySelector('#logList');
    el.log = {
      work: document.querySelector('#work'),
      exp: document.querySelector('#exp'),
      comp: document.querySelector('#comp')
    }
    el.send = document.querySelector('#send');

    el.work = document.querySelector('#work'),
    el.exp = document.querySelector('#exp'),
    el.comp = document.querySelector('#comp')
  }
  
    // Connect listeners for button clicks,
    // keyboard input, etc.
  function addEventListeners() {
    el.send.addEventListener("click", submitLog);
  
    for (const key in el.log) {
      let elem = el.log[key]
      elem.addEventListener('keyup', checkKeys);
    }
  }

/**
 * Page elements used in the program are
 * set up here for convenience.
 */
function pageLoaded() {
prepareHandles();
addEventListeners()
loadLog();
}

pageLoaded();