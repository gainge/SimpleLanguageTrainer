// Globals (lol)
let tools = undefined;
let topics = undefined;



fetch("res/data.json")
  .then((response) => response.json())
  .then(json => initializeState(json['tools'], json['topics']));

// Then we do some cool stuff

function initializeState(toolsData, topicsData) {
  if (!toolsData || !topicsData) {
    alert('unable to retrieve json data!');
  }
  tools = toolsData;
  topics = topicsData
}