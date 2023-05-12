//  stores references for html elements
const el = {};


/* Takes each item in log as input, and appends it into a template body, and creates a clone of template which then gets appended to loglist
also creates link entry and appends it in last row */

function addItem(entry){
  let logs = document.querySelector("#loglist")
  let template = document.querySelector("#entryrow")

  const clone = template.content.cloneNode(true)
  let items = clone.querySelectorAll("td")

  items[0].textContent = entry.date
  items[1].textContent = entry.work
  items[2].textContent = entry.exp
  items[3].textContent = entry.comp

  const editLink = document.createElement("a");
  editLink.textContent = "Edit";
  editLink.href = `/edit#${entry.id}`;

  // Append the Edit link to the last table cell
  const lastCell = clone.querySelector("td:last-child");
  lastCell.appendChild(editLink);

  logs.appendChild(clone)
}




/* Add an array of logs to the page, and calls addItem function for each
log entry to pass log properity as entry object */
async function showLogs(logs) {
  const response = await fetch('logs/');
  if (response.ok) {
    console.log("success!")

    for (const log of logs) {
     
      const id = `${log.id}`
      const work = `${log.work}`
      const exp = `${log.exp}`
      const comp = `${log.comp}`;
      const date = `${log.date}`

      addItem({ id, date, work, exp, comp })

    }

  }
}

// uses fetch to make a get request to obtain the logs from
// the logs endpoint in server

async function loadLogs() {
  const response = await fetch("logs");
  let logs;
  if (response.ok) {
    logs = await response.json();
  } 
  
  else {
    logs = ["Logs could not be loaded"];

  }

  showLogs(logs, el.logList);
}


//opens print window when clicking print button//
const printButton = document.querySelector('#print');

printButton.addEventListener('click', function() {
  window.print()
});


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
