// Globals (lol)
const NUM_RANDOM_TOOLS = 3;
const HIDDEN_CLASS_NAME = 'hidden';

let tools = undefined;
let topics = undefined;
let studentTools = undefined;
let teacherTools = undefined;


function getRandomInt(max) {
  return Math.floor(Math.random() * max);
}

function getTools() {
  if (!tools) {
    alert('Tools not loaded!');
    return;
  }
  // Initialize tools if not loaded
  if (!studentTools) {
    studentTools = tools.filter((tool) => tool.level ?? 1 <= 0);
  }
  if (!teacherTools) {
    teacherTools = tools.filter((tool) => tool.level ?? 0 >= 0);
  }

  const studentCheckbox = document.getElementById('student-box');
  return studentCheckbox.checked ? studentTools : teacherTools;
}

function initializeState(toolsData, topicsData) {
  if (!toolsData || !topicsData) {
    alert('unable to retrieve json data!');
  }
  tools = toolsData;
  topics = topicsData

  document.getElementById('topic-card').classList.remove(HIDDEN_CLASS_NAME);

  // Finally, populate the content for first load
  populateContent();
}

function getRandomTopic() {
  return topics[getRandomInt(topics.length)].content;
}

function getRandomTools(numTools) {
  const currentTools = getTools();
  const baseIndex = getRandomInt(currentTools.length)
  const randomTools = [];
  const indices = [];

  let runningIndex = baseIndex;

  for (let i = 0; i < numTools; i++) {
    indices.push(runningIndex);
    randomTools.push(currentTools[runningIndex])
    do {
      runningIndex = getRandomInt(currentTools.length);
    } while (indices.includes(runningIndex))
  }

  return randomTools;
}

function setTopicText(topicText) {
  document.getElementById('topic-text').innerText = topicText;
}

function clearTools() {
  document.getElementById('tools-container').innerHTML = '';
}

function addTool(tool) {
  const parent = document.getElementById('tools-container');

  // Add the main tool title
  const toolContainer = document.createElement('div');
  toolContainer.classList.add('tool-card', 'card');
  const toolText = document.createElement('p');
  toolText.classList.add('tool-text');
  toolText.innerText = tool.title;

  toolContainer.appendChild(toolText);
  parent.appendChild(toolContainer);

  // Add the description and example container
  const detailsWrapper = document.createElement('div');
  detailsWrapper.classList.add('tool-details', 'tool-text', 'hidden');
  detailsWrapper.appendChild(document.createElement('hr'));

  const descriptionText = document.createElement('p');
  descriptionText.innerText = `Description: \n\n${tool.description}\n\n`;
  descriptionText.classList.add('tool-text');
  const exampleText = document.createElement('p');
  exampleText.innerText = `Example: \n\n${tool.example}`;
  exampleText.classList.add('tool-text');

  detailsWrapper.appendChild(descriptionText);
  detailsWrapper.appendChild(exampleText);

  toolContainer.appendChild(detailsWrapper);

  toolContainer.addEventListener('click', () => detailsWrapper.classList.toggle('hidden'));
}

function populateContent() {
  const randomTopic = getRandomTopic();
  const randomTools = getRandomTools(NUM_RANDOM_TOOLS);

  setTopicText(randomTopic);
  clearTools();

  for (let tool of randomTools) {
    addTool(tool);
  }
}


function initializeDOMContent() {
  // Let' hook up some fancy listeners (it's just one)
  document.getElementById('reroll-button').addEventListener('click', populateContent);
  document.getElementById('student-box').addEventListener('change', populateContent);
}


fetch("res/data.json")
  .then((response) => response.json())
  .then(json => initializeState(json['tools'], json['topics']));


document.addEventListener('DOMContentLoaded', initializeDOMContent);