// "use strict";

import { UndirectedGraph, DirectedGraph } from "./Components/Graph.js";
let Header = document.getElementById("Header");
let height = Header.offsetHeight; // return the height of the header
let sideBar = document.getElementById("sideBar");
sideBar.style.height = String(window.innerHeight - height) + "px"; // viewport height - height of header
// console.log(sideBar.style.height)
let graphSheet = document.getElementById("graphSheet");
graphSheet.style.height = String(window.innerHeight - height) + "px";
window.undirectedGraph = new UndirectedGraph();
window.directedGraph = new DirectedGraph();
document.getElementById("DFSOption").addEventListener("click", () => {
  if (window.undirectedGraph.animation.array !== undefined) {
    clearInterval(window.undirectedGraph.animation.intervalId);
    window.undirectedGraph.animation.reset();
  }
  window.undirectedGraph.setMode(3, 1);
});
document.getElementById("BFSOption").addEventListener("click", () => {
  if (window.undirectedGraph.animation.array !== undefined) {
    clearInterval(window.undirectedGraph.animation.intervalId);
    window.undirectedGraph.animation.reset();
  }
  window.undirectedGraph.setMode(2, 1);
});
window.graphMode = "Undirected";

// Switching between directed and undirected
document.getElementById("Undirected").addEventListener("click", () => {
  if (window.directedGraph.animation.array !== undefined) {
    clearInterval(window.directedGraph.animation.intervalId);
    window.directedGraph.animation.reset();
  }
  window.graphMode = "Undirected";
  document.getElementById(
    "graphSheet"
  ).innerHTML = `    <svg id="graph" height="85vh" width="80vw" xmlns="http://www.w3.org/2000/svg">
    <defs>
    <marker id="arrow" refX="5" refY="5" markerWidth="10" markerHeight="10" orient="auto-start-reverse">
    <path d="M 0 0 L 10 5 L 0 10 z" />
    </marker>
    </defs>
    
  </svg>
  <div class = "AnimationButtons" id = "AnimationButtons">
      
        <div className = "NoAlgo" style = "height: auto;width: 100%;text-align:center" id = "NoAlgo">
          <h1>Animation buttons will appear here</h1>
        </div>
      </div>`;
  document.getElementById(
    "AlgoList"
  ).innerHTML = `  <div class="optiondecoration">
    <li  style="font-size: 23px; cursor: pointer" id = "BFSOption">
    BFS
    </li>
    </div>
    <div class="optiondecoration">
<li  style="font-size: 23px; cursor: pointer" id = "DFSOption">
DFS
</li>
</div>`;
  window.undirectedGraph.setMode(
    window.undirectedGraph.mode,
    window.undirectedGraph.root
  );
  document.getElementById("DFSOption").addEventListener("click", () => {
    if (window.undirectedGraph.animation.array !== undefined) {
      clearInterval(window.undirectedGraph.animation.intervalId);
      window.undirectedGraph.animation.reset();
    }
    window.undirectedGraph.setMode(3, 1);
  });
  document.getElementById("BFSOption").addEventListener("click", () => {
    if (window.undirectedGraph.animation.array !== undefined) {
      clearInterval(window.undirectedGraph.animation.intervalId);
      window.undirectedGraph.animation.reset();
    }
    window.undirectedGraph.setMode(2, 1);
  });

  window.undirectedGraph.reset();
});

document.getElementById("Directed").addEventListener("click", () => {
  if (window.undirectedGraph.animation.array !== undefined) {
    clearInterval(window.undirectedGraph.animation.intervalId);
    window.undirectedGraph.animation.reset();
  }
  window.graphMode = "Directed";
  document.getElementById(
    "graphSheet"
  ).innerHTML = `    <svg id="graph" height="85vh" width="80vw" xmlns="http://www.w3.org/2000/svg">
    <defs>
  <marker id="arrow" refX="5" refY="5" markerWidth="10" markerHeight="10" orient="auto-start-reverse">
  <path d="M 0 0 L 10 5 L 0 10 z" />
  </marker>
  </defs>
  
  </svg>
  <div class = "AnimationButtons" id = "AnimationButtons">
      
        <div className = "NoAlgo" style = "height: auto;width: 100%;text-align:center" id = "NoAlgo">
          <h1>Animation buttons will appear here</h1>
        </div>
      </div>
`;
  document.getElementById(
    "AlgoList"
  ).innerHTML = `  <div class="optiondecoration">
  <li  style="font-size: 23px; cursor: pointer" id = "BFSOption">
  BFS
  </li>
  </div>
  <div class="optiondecoration">
  <li  style="font-size: 23px; cursor: pointer" id = "DFSOption">
  DFS
  </li>
  </div>`;
  window.directedGraph.setMode(
    window.directedGraph.mode,
    window.directedGraph.root
  );
  document.getElementById("DFSOption").addEventListener("click", () => {
    if (window.directedGraph.animation.array !== undefined) {
      clearInterval(window.directedGraph.animation.intervalId);
      window.directedGraph.animation.reset();
    }
    window.directedGraph.setMode(3, 1);
  });
  document.getElementById("BFSOption").addEventListener("click", () => {
    if (window.directedGraph.animation.array !== undefined) {
      clearInterval(window.directedGraph.animation.intervalId);
      window.directedGraph.animation.reset();
    }
    window.directedGraph.setMode(2, 1);
  });
  // console.log("Hii")
  window.directedGraph.reset();
});

/*************************************************************************** */
window.funcType = {
  Undirected: {
    show: () => {
      window.undirectedGraph.show();
    },
    deleteEdge: (a, b) => {
      window.undirectedGraph.deleteEdge(a, b);
    },
    addEdge: (a, b) => {
      window.undirectedGraph.addEdge(a, b);
    },
    setVertices: (n) => {
      window.undirectedGraph.setVertices(n);
    },
    reset: () => {
      window.undirectedGraph.reset();
    },
  },
  Directed: {
    show: () => {
      window.directedGraph.show();
    },
    deleteEdge: (a, b) => {
      window.directedGraph.deleteEdge(a, b);
    },
    addEdge: (a, b) => {
      window.directedGraph.addEdge(a, b);
    },
    setVertices: (n) => {
      window.directedGraph.setVertices(n);
    },
    reset: () => {
      window.directedGraph.reset();
    },
  },
};

/*****************************************Functions for making a new graph **************************/
window.makeGraph = (edge_list, number_of_nodes) => {
  // this functions forms a new graph of the validated data
  let reg = /\s+/;
  window.funcType[window.graphMode].setVertices(number_of_nodes);
  for (let i = 0; i < edge_list.length; i++) {
    let edgeNodes = edge_list[i].split(reg);
    let a = Number(edgeNodes[0]),
      b = Number(edgeNodes[1]);
    // console.log(a,b)
    window.funcType[window.graphMode].addEdge(a - 1, b - 1);
  }
  window.funcType[window.graphMode].reset();
  // setInterval(graph.show(),100);
};

window.makeNewGraph = (event) => {
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
    edge = edge.replace(extraSpace, "");
    if (edge === "") continue;
    if (!desiredEdgePattern.test(edge)) {
      swal("Invalid Input", "Edges are not in valid form", "error");
      return;
    }
    filteredEdgeList.push(edge);
  }
  if (window.graphMode === "Undirected")
    window.undirectedGraph = new UndirectedGraph();
  else window.directedGraph = new DirectedGraph();
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
  graph.setMode(mode, 1);
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
  window.funcType[window.graphMode].reset();
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
    // console.log(window.graphMode)
    window.funcType[window.graphMode].deleteEdge(m[i] - 1, m[i + 1] - 1);
  }
  window.funcType[window.graphMode].reset();
};
/************************************************************************************************/

/**************************** Functions for HTML elements *****************************************************/

document.getElementById("Add Vertex").addEventListener("click", () => {
  if (window.graphMode === "Undirected") window.undirectedGraph.addVertices(1);
  else window.directedGraph.addVertices(1);
});
document.getElementById("Add Edge").addEventListener("click", () => {
  window.newEdge();
});
document.getElementById("Delete Edge").addEventListener("click", () => {
  window.deleteEdge();
});

document.getElementById("vertices").addEventListener("input", (event) => {
  window.handleNumberOfVerticesChange(event);
});

document.getElementById("submitNewGraph").addEventListener("click", (event) => {
  window.makeNewGraph(event);
});

// console.log(screen.height);
// Generate report
document.getElementById("gen_report").addEventListener("click",(event)=>{
  let report = []
  report.push("Graph Type :" +window.graphMode + "\n")
  let noOfVertices =0;
  let adjacencyList;
 
  let edges = 0
  if(window.graphMode == "Directed")
    {
      noOfVertices = window.directedGraph.getVertices();
      adjacencyList  = window.directedGraph.getAdjacentList();
      edges = window.directedGraph.getEdges();
    }
  else
    {
      noOfVertices = window.undirectedGraph.getVertices();
      adjacencyList  = window.undirectedGraph.getAdjacentList();
      edges = window.undirectedGraph.getEdges();
    }
  report.push("Number of vertices: " + noOfVertices + "\n");
  report.push("Number of edges: " + edges + "\n");
  let adjacencyMatrix = new Array(noOfVertices)
  for(let i =0;i<noOfVertices;i++)
    adjacencyMatrix[i] = new Array(noOfVertices);
  for(let i =0;i<noOfVertices;i++)
    {
      for(let j=0;j<noOfVertices;j++)
        adjacencyMatrix[i][j] = 0;
    }
  console.log(adjacencyList);
  for(let i=0;i<adjacencyList.length;i++)
    {
      for(const j of adjacencyList[i])
        {
          console.log(i,j);
          adjacencyMatrix[i][j]=1;
        }
    }
  report.push("Adjacency Matrix \n");
  for(let i=0;i<adjacencyMatrix.length;i++)
    report.push(adjacencyMatrix[i]+"\n");
  var blob = new Blob(report,{ type: "text/plain;charset=utf-8" });
  saveAs(blob, "report.txt");
}
);
