# webprog_CW

<h1>PAQ (Possible Asked questions)</h1>
<h3>Why is submitting entries and showing entries in 2 different files and web pages?</h3>
<ul>easier formatting and reading of code</ul>
<h3>Why such a long piece of code for formatting time?</h3>
<ul>There could have a been a better way of formatting it, but alas, it works and shows only the values i needed to show (YY-MM-DD) (HH-MM-SS)</ul>

<h1> Api documentation</h1>
<h2> full disclaimer: i am not 100% sure how to document API but i will try my best</h2>

<h3>GET /logs</h3>

- Description: Retrieves a list of logs.
- Method: GET
- Route: /logs
- Handler Function: getLogs
- Response: JSON array of logs

<h3>GET /logs/:id</h3>

- Description: Retrieves a single log by its ID.
- Method: GET
- Route: /logs/:id
- Handler Function: getLog
- parameters: :id - The ID of the log to retrieve
- Response: JSON object representing the log

<h3>PUT /logs/:id</h3>

- Description: Updates a single log by its ID.
- Method: Put
- Route: /logs/:id
- Handler Function: putLog 
- parameters: :id - The ID of the log to update
- Request Body: JSON object containing the updated log data
- Response: JSON object representing the updated log

<h3>POST /logs</h3>

- Description: Creates a new log.
- Method: POST
- Route: /logs
- Handler Function: postLogs
- Request Body: JSON object containing the log data
- Response: JSON object representing the created log

<h3> references </h3>
[-

- database/backend/index/entry structure and function references 
- CheckKeys function, it was simple, and function, which i used from the messageboard
- prepareHandles and pageloaded functions, just kept same name 
- Much of the backend server codes were kept more or less the same from the messageboard as it was functional and that i did not have much backend experience or knowledge, included my own 'currentTime' function different the messageboard] (https://github.com/portsoc/staged-simple-message-board)

[ui.fields loop in submitLog function, function worked fine with my code along making it smoother] (https://jsfiddle.net/opLyz8qj/4/)

[template table example code, used example code as reference on how to structure template code] (https://developer.mozilla.org/en-US/docs/Web/HTML/Element/template)
