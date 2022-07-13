"use strict";

import Graph from "./Components/Graph.js";

let Header = document.getElementById("Header");
let height = Header.offsetHeight; // return the height of the header
let sideBar = document.getElementById("sideBar");
sideBar.style.height = String(window.innerHeight - height) + "px"; // viewport height - height of header
// console.log(sideBar.style.height)
let graphSheet = document.getElementById("graphSheet");
graphSheet.style.height = String(window.innerHeight - height) + "px";
window.graph = new Graph("My graph","Undirected");
window.graphMode = "Undirected";
// console.log(window.graph);

// Switching between directed and undirected
document.getElementById("Undirected").addEventListener("click", () => {
  window.graphMode = "Undirected";
  window.graph = new Graph("My graph","Undirected");
  window.makeGraph([],0);
  // console.log(window.graphMode);
});
document.getElementById("Directed").addEventListener("click", () => {
  window.graphMode = "Directed";
  window.graph = new Graph("My graph","Directed");
  window.makeGraph([],0);
  // console.log(window.graphMode);
});
window.funcType = {
  Undirected: {
    show: () => {
      window.graph.showUndirected();
    },
    deleteEdge: (a, b) => {
      window.graph.deleteEdgeUndirected(a, b);
    },
    addEdge: (a, b) => {
      window.graph.addEdgeUndirected(a, b);
    },
  },
  Directed: {
    show: () => {
      window.graph.showDirected();
    },
    deleteEdge: (a,b) => {
      window.graph.deleteEdgeDirected(a,b);
    },
    addEdge: (a,b) => {
      window.graph.addEdgeDirected(a,b);
    },
  },
};

/*****************************************Functions for making a new graph **************************/
window.makeGraph = (edge_list, number_of_nodes) => {
  // this functions forms a new graph of the validated data
  window.graph.setVertices(number_of_nodes);
  for (let i = 0; i < edge_list.length; i++) {
    let edgeNodes = edge_list[i].split(" ");
    let a = Number(edgeNodes[0]),
      b = Number(edgeNodes[1]);
    console.log(a,b)
    window.funcType[window.graphMode].addEdge(a - 1, b - 1);
  }
  window.funcType[window.graphMode].show();
  // setInterval(graph.show(),100);
};

window.validate = (event) => {
  event.preventDefault();
  let number_of_nodes = document.getElementById("vertices").value;
  let desiredNumberPattern = /^\d+$/,
    desiredEdgePattern = /^\d+\s+\d+$/;
  if (!desiredNumberPattern.test(number_of_nodes)) {
    // validating number of nodes
    swal("Invalid Input", "Number of vertices must be an Integer", "error");
    return;
  }
  let edge_list = [];
  edge_list = document.getElementById("edges").value.split("\n");
  let filteredEdgeList = [];
  for (let i in edge_list) {
    // this loop removes extra whitespaces and stores the edges in filteredEdgeList
    let edge = edge_list[i];
    let extraSpace = /^\s+|\s+$/; // space at the beginning or end
    edge.replace(extraSpace, "");
    if (edge === "") continue;
    if (!desiredEdgePattern.test(edge)) {
      swal("Invalid Input", "Edges are not in valid form", "error");
      return;
    }
    filteredEdgeList.push(edge);
  }
  window.graph = new Graph("My Graph",window.graphMode);
  window.makeGraph(filteredEdgeList, Number(number_of_nodes));
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

/********************************************Modifying edges ****************************************/
window.setMode = (mode, graph) => {
  graph.setMode(mode);
};

window.newEdge = () => {
  let m = document.getElementById("insertEdge").value;
  let desiredEdge = /^\s*\d+\s+\d+\s*$/;
  if (!desiredEdge.test(m)) {
    swal("Invalid Input", "Edges are not in valid form", "error");
    return;
  }
  m = m.split(" ");
  for (let i = 0; i < m.length; i += 2) {
    window.funcType[window.graphMode].addEdge(m[i] - 1, m[i + 1] - 1);
  }
  window.funcType[window.graphMode].show();
};

window.deleteEdge = () => {
  let m = document.getElementById("deleteEdge").value;
  let desiredEdge = /^\s*\d+\s+\d+\s*$/;
  if (!desiredEdge.test(m)) {
    swal("Invalid Input", "Edges are not in valid form", "error");
    return;
  }
  m = m.split(" ");
  for (let i = 0; i < m.length; i += 2) {
    console.log(window.graphMode)
    window.funcType[window.graphMode].deleteEdge(m[i] - 1, m[i + 1] - 1);
  }
  window.funcType[window.graphMode].show();
};
/************************************************************************************************/
