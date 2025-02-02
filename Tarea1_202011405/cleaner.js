function reflex_agent(location, state){
    if (state == "DIRTY") return "CLEAN";
    else if (location == "A") return "RIGHT";
    else if (location == "B") return "DOWN";
    else if (location == "D") return "LEFT";
    else if (location == "C") return "UP";
  }
  
  function generateStateKey(states) {
    return `${states["A"]}-${states["B"]}-${states["C"]}-${states["D"]}`;
  }
  
  function randomizeDirt(states) {
    for (let loc of ["A", "B", "C", "D"]) {
      //Probabilidad de que se ensucie
        if (Math.random() < 0.3) {  
            states[loc] = "DIRTY";
        }
    }
  }
  
  function test(states, visitedStates){
    var location = states["pos"];		
    var state = states[location];  
    var action_result = reflex_agent(location, state);
  
    document.getElementById("log").innerHTML += `<br>Location: ${location} | Action: ${action_result}`;
  
    if (action_result == "CLEAN") {
        states[location] = "CLEAN";
    } 
    else if (action_result == "RIGHT") states["pos"] = "B";
    else if (action_result == "DOWN") states["pos"] = "D";
    else if (action_result == "LEFT") states["pos"] = "C";
    else if (action_result == "UP") states["pos"] = "A";
  
    //Simular que las ubicaciones se puedan ensuciar
    randomizeDirt(states);  
  
    var currentStateKey = generateStateKey(states);
    //Marcar que estados han sido visitados
    visitedStates.add(currentStateKey);
  
    // Si el robot ha visitado los ocho estados se termina la ejecucion
    if (visitedStates.size >= 8) {
        document.getElementById("log").innerHTML += "<br><b>FIN DEL PROCESO: SE HAN VISITADO LOS 8 ESTADOS</b>";
        return;
    }
  
    setTimeout(function(){ test(states, visitedStates); }, 2000);
  }
  
  // Inicializar estados con random
  var states = { 
    "A": Math.random() < 0.5 ? "DIRTY" : "CLEAN", 
    "B": Math.random() < 0.5 ? "DIRTY" : "CLEAN", 
    "C": Math.random() < 0.5 ? "DIRTY" : "CLEAN", 
    "D": Math.random() < 0.5 ? "DIRTY" : "CLEAN", 
    "pos": "A" 
  };
  
  var visitedStates = new Set();
  test(states, visitedStates);
  