

// Globals (lol)
let tools = undefined;



fetch("res/data.json")
  .then((response) => response.json())
  .then(json => initializeState(json['tools']));

// Then we do some cool stuff

function initializeState(toolsData) {
  if (!toolsData) {
    alert('unable to retrieve json data!');
  }
  tools = toolsData;
}