import Graph from "./Components/Graph.js";
window.graph = new Graph("My graph");
// console.log(window.graph);


/*****************************************Functions for making a new graph **************************/
window.makeGraph = (graph,edge_list,number_of_nodes) => {
	// this functions forms a new graph of the validated data
  graph.setVertices(number_of_nodes);
  for (let i = 0; i < edge_list.length; i ++) {
	let edgeNodes = edge_list[i].split(" ");
	let a = Number(edgeNodes[0]),b = Number(edgeNodes[1]);;
    graph.addEdge(a - 1, b - 1);
    graph.addEdge(b - 1, a - 1);
  }
  graph.show();
  // setInterval(graph.show(),100);
};

window.validate = (event) => {
  event.preventDefault();
  let number_of_nodes = document.getElementById("vertices").value;
  let desiredNumberPattern = /^\d+$/,desiredEdgePattern = /^\d+\s+\d+$/;
  if (!desiredNumberPattern.test(number_of_nodes)) { // validating number of nodes
    swal("Invalid Input", "Number of vertices must be an Integer", "error");
    return;
  }
  let edge_list = [] 
  edge_list = document.getElementById("edges").value.split("\n");
  let filteredEdgeList = []
  for(let i in edge_list)
  	{
		// this loop removes extra whitespaces and stores the edges in filteredEdgeList
		let edge = edge_list[i];
		let extraSpace = /^\s+|\s+$/ // space at the beginning or end
		edge.replace(extraSpace,"")
		if(edge === "") continue;
		if(!desiredEdgePattern.test(edge))
		{
			swal("Invalid Input","Edges are not in valid form","error");
			return;
		}
		filteredEdgeList.push(edge) 
	}
	window.graph = new Graph("My Graph")
  window.makeGraph(window.graph,filteredEdgeList,Number(number_of_nodes));
};

// to ensure that the number of vertices remains an integer
window.handleNumberOfVerticesChange = (event) => {
  event.preventDefault();
  let num = event.target.value;
  let char = num[num.length - 1];
  if (char < "0" || char > "9") {
    num = num.substring(0, num.length - 1);
  }
  document.getElementById("vertices").value = num;
};

/****************************************************************************************************/

/***************************Functions for validating input of delete option**************************/

/****************************************************************************************************/


window.setMode = (mode, graph) => {
  graph.setMode(mode);
};

window.newEdge = (graph) => {
  let m = document.getElementById("insertEdge").value;
  console.log(m);
  let desiredEdge = /^\s*\d+\s+\d+\s*$/
  if(!desiredEdge.test(m))
    {
      swal("Invalid Input","Edges are not in valid form","error")
      return;
    }
  m = m.split(" ");
  for (let i = 0; i < m.length; i += 2) {
    graph.addEdge(m[i] - 1, m[i + 1] - 1);
  }
  graph.show();
};

window.deleteEdge = (graph) => {
  let m = document.getElementById("deleteEdge").value;
  let desiredEdge = /^\s*\d+\s+\d+\s*$/
  if(!desiredEdge.test(m))
    {
      swal("Invalid Input","Edges are not in valid form","error")
      return;
    }
  m = m.split(" ");
  for (let i = 0; i < m.length; i += 2) {
    graph.deleteEdge(m[i] - 1, m[i + 1] - 1);
  }
  graph.show();
};
