const el = {};


/* removes text contents from an element */
function free(filled) {
  filled.textContent = '';
}

/* Takes each item in log, and appends it into a template body */

const addItem = (entry) => {
  const tbody = document.querySelector("ul#logList")
  const template = document.querySelector("#entryrow")

  const clone = template.content.cloneNode(true)
  let listelem = clone.querySelector("li")

  listelem.textContent = `${entry.date}, ${entry.work}, ${entry.exp}, ${entry.comp}`

  tbody.appendChild(clone)
}




/* Add an array of messages to the page */
async function showLogs(logs) {
  const response = await fetch('logs/');
  if (response.ok) {
    const details = await response.json();

    for (const log of logs) {
     
      const work = `work: ${log.work}`
      const exp = `exp: ${log.exp}`
      const comp = `comp: ${log.comp}`;
      const date = `${log.date}`

      addItem({date, work, exp, comp })

    }

    // const edit = document.createElement('a');
    // edit.textContent = 'edit me';
    // edit.href = `/message#${message.id}`;
    // li.append(' (', edit, ')');

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

  free(el.logList);
  showLogs(logs, el.logList);
}



/**
 * Page elements used in the program are
 * setup here for convenience.
 */
function prepareHandles() {
  el.logList = document.querySelector('#logList');
  el.log = {
    work: document.querySelector('#work'),
    exp: document.querySelector('#exp'),
    comp: document.querySelector('#comp')
  }

  el.send = document.querySelector('#send');

}




function pageLoaded() {
  prepareHandles();
  loadLogs();
}

// deprecated in favour of using defer in the script tag
// window.addEventListener('load', pageLoaded);
pageLoaded();
