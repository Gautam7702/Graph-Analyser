import Graph from "./Components/Graph.js";

window.Input = (graph) => {
  let n, m;
  n = Number(document.getElementById("vertices").value);
  if(n !== Math.floor(n))
	{
		swal("Error","Number of vertices must be an Integer","error")
		return;
	}
  m = document.getElementById("edges").value;
  graph.setVertices(n);
  m = m.replaceAll(" ", "");
  m = m.replaceAll("\n", "");

  for (let i = 0; i < m.length; i += 2) {
    graph.addEdge(m[i] - 1, m[i + 1] - 1);
    graph.addEdge(m[i + 1] - 1, m[i] - 1);
  }
  graph.show();
  // setInterval(graph.show(),100);
}

window.setMode = (mode,graph) => {
  graph.setMode(mode);
}
window.newEdge = (graph) => {
  m = document.getElementById("newEdge").value;
  m = m.replace(" ", "");
  m = m.replaceAll("\n", "");
  for (let i = 0; i < m.length; i += 2) {
    graph.addEdge(m[i] - 1, m[i + 1] - 1);
  }
  graph.show();
}

window.deleteEdge = (graph)=> {
  let m = document.getElementById("deleteEdge").value;
  m = m.replace(" ", "");
  m = m.replaceAll("\n", "");
  for (let i = 0; i < m.length; i += 2) {
    graph.deleteEdge(m[i] - 1, m[i + 1] - 1);
  }
  graph.show();
}



window.graph = new Graph("My graph");
console.log(window.graph);

