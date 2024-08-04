function reflex_agent(location, state){
   	if (state=="DIRTY") return "CLEAN";
   	else if (location=="A") return "RIGHT";
   	else if (location=="B") return "LEFT";
}

function test(states) {		
	if(!JSON.stringify(visited).includes(JSON.stringify(states))){
		visited.push([...states]);
		if (visited.length === 8) {
			visited.map(s => document.getElementById("states").innerHTML += "<br>" + s)
			return;
		}
	}

	var location = states[0];
	var state = states[0] == "A" ? states[1] : states[2];
	var action_result = reflex_agent(location, state);
	document.getElementById("log").innerHTML += "<br>Location: ".concat(location).concat(" | Action: ").concat(action_result);
	if (action_result == "CLEAN") {
		if (location == "A") states[1] = "CLEAN";
		else if (location == "B") states[2] = "CLEAN";
	}
	else if (action_result == "RIGHT") states[0] = "B";
	else if (action_result == "LEFT") states[0] = "A";

	if (states[1] === "CLEAN" && states[2] === "CLEAN") {
		if(!JSON.stringify(visited).includes(JSON.stringify(states))){
			visited.push([...states]);
			if (visited.length === 8) {
				visited.map(s => document.getElementById("states").innerHTML += "<br>" + s)
				return;
			}
		}
		let x = Math.floor(Math.random() * 3);
		if (x === 0) {
			states[1] = "DIRTY";
			states[2] = "DIRTY";
		} else if (x === 1) {
			states[1] = "DIRTY";
			states[2] = "CLEAN";
		} else if (x === 2) {
			states[1] = "CLEAN";
			states[2] = "DIRTY";
		}
	}
	setTimeout(function () { test(states); }, 2000);
}

let visited = []
let room = Math.floor(Math.random() * 2) == 0 ? "A" : "B";
var states = [room, "DIRTY", "DIRTY"];
test(states);
