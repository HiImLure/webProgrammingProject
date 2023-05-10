const el = {};


/* removes text contents from an element */
// function free(filled) {
//   filled.textContent = '';
// }

/* Takes each item in log, and appends it into a template body */

const addItem = (entry) => {
  let logs = document.querySelector("#loglist")
  let template = document.querySelector("#entryrow")

  const clone = template.content.cloneNode(true)
  let items = clone.querySelectorAll("td")

  items[0].textContent = entry.date
  items[1].textContent = entry.work
  items[2].textContent = entry.exp
  items[3].textContent = entry.comp

  logs.appendChild(clone)
  console.log("test")
}




/* Add an array of messages to the page */
async function showLogs(logs) {
  const response = await fetch('logs/');
  if (response.ok) {
    const details = await response.json();

    for (const log of logs) {
     
      const work = `${log.work}`
      const exp = `${log.exp}`
      const comp = `${log.comp}`;
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

  // free(el.logList);
  showLogs(logs, el.logList);
}



/**
 * Page elements used in the program are
 * setup here for convenience.
 */
function prepareHandles() {
  el.loglist = document.querySelector('#logList');
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
