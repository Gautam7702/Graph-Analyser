import MouseEvents from "./MouseEvents.js";
import Animate from "./Animate.js";
class Vertex {
  constructor(x, y) {
    this.x_cor = x;
    this.y_cor = y;
  }
}

export class UndirectedGraph {
  constructor() {
    // let orderofbfs = [];
    // let orderofdfs = [];
    let vertices = [];
    let noOfVertices = 0;
    this.mode = 1;
    this.root = 1;
    this.animation = {};
    let temp_edge;
    let adjacencyList = [];
    let animationArray = [];
    let edges = 0;
    let vis = [];
    let mouseEvent = new MouseEvents(this);
    this.setVertices = (n) => {
      noOfVertices = n;
      for (let i = 0; i < n; i++) {
        adjacencyList.push([]);
      }
      createNodes();
    };
    // let cnt1 = 0,
    //   cnt2 = 0,
    //   cnt3 = 0;
    this.setMode = function (m, r) {
      this.mode = m;
      this.root = r;
      let algo = document.getElementById("AnimationButtons");
      let children = algo.children;
      while (children.length > 0) {
        algo.removeChild(algo.lastElementChild);
      }
      switch (this.mode) {
        case 1: {
          let newChild = document.createElement("div");
          newChild.className = "NoAlgo";
          newChild.style = "height:auto;width:100%;text-align:center";
          newChild.id = "NoAlgo";
          newChild.innerHTML = `<h1>Animation buttons will appear here</h1>`;
          algo.appendChild(newChild);
          break;
        }
        case 2: {
          let newChild = document.createElement("div");
          newChild.className = "border border-dark BFSAlgo";
          // newChild.style = "height:auto;width:100%";
          newChild.id = "BFS";
          newChild.style =
            "height:100%;width:100%;text-align:center;";
          newChild.innerHTML = `    
          <h3>BFS MODE</h3>
          <div style = "display:grid;grid-template-columns:30% 70%;">
          <div class = "Root" style:"text-align:center"><h4><b>Root : ${r}</b></h4></div>
          <div style = "display:flex;justify-content:space-evenly">
          <button type = "button" class="btn btn-primary" id = "undirectedStart">Start</button>
          <button type = "button" class="btn btn-primary" id = "undirectedPause">Pause</button>
          <button type = "button" class="btn btn-primary" id = "undirectedResume">Resume</button>
          <button type = "button" class="btn btn-primary" id = "undirectedPrev">Prev</button>
          <button type = "button" class="btn btn-primary" id = "undirectedNext">Next</button>
          <button type = "button" class="btn btn-primary" id = "undirectedReset">Reset</button>
          <button type = "button" class="btn btn-primary" id = "Exit">Exit</button>
          </div>
          </div>
          `;
          algo.appendChild(newChild);
          this.bfs();
          document.getElementById("Exit").addEventListener("click", () => {
            if (this.animation.array !== undefined) {
              clearInterval(this.animation.intervalId);
              this.animation.reset();
            }
            this.setMode(1, 1);
          });
          document
            .getElementById("undirectedReset")
            .addEventListener("click", () => {
              this.reset();
            });
          document
            .getElementById("undirectedNext")
            .addEventListener("click", () => {
              this.animation.next();
            });
          document
            .getElementById("undirectedPrev")
            .addEventListener("click", () => {
              this.animation.prev();
            });
          document
            .getElementById("undirectedResume")
            .addEventListener("click", () => {
              this.animation.resume();
            });
          document
            .getElementById("undirectedPause")
            .addEventListener("click", () => {
              this.animation.pause();
            });
          document
            .getElementById("undirectedStart")
            .addEventListener("click", () => {
              this.animation.start();
            });
          break;
        }
        case 3: {
          let newChild = document.createElement("div");
          newChild.className = "border border-dark DFSAlgo";
          // newChild.style = "height:auto;width:100%";
          newChild.id = "DFS";
          newChild.style =
            "height:100%;width:100%;text-align:center;";
          newChild.innerHTML = `    
          <h3>DFS MODE</h3>
          <div style = "display:grid;grid-template-columns:30% 70%;">
          <div class = "Root"><h4><b>Root : ${r}</b></h4></div>
          <div style = "display:flex;justify-content:space-evenly">
          <button type = "button" class="btn btn-primary" id = "undirectedStart">Start</button>
          <button type = "button" class="btn btn-primary" id = "undirectedPause">Pause</button>
          <button type = "button" class="btn btn-primary" id = "undirectedResume">Resume</button>
          <button type = "button" class="btn btn-primary" id = "undirectedPrev">Prev</button>
          <button type = "button" class="btn btn-primary" id = "undirectedNext">Next</button>
          <button type = "button" class="btn btn-primary" id = "undirectedReset">Reset</button>
          <button type = "button" class="btn btn-primary" id = "Exit">Exit</button>
          </div>
          </div>
          `;
          algo.appendChild(newChild);
          this.dfs(); // this functions makes the animation object of dfs walk
          document.getElementById("Exit").addEventListener("click", () => {
            if (this.animation.array !== undefined) {
              clearInterval(this.animation.intervalId);
              this.animation.reset();
            }
            this.setMode(1, 1);
          });
          document
            .getElementById("undirectedReset")
            .addEventListener("click", () => {
              this.reset();
            });
          document
            .getElementById("undirectedNext")
            .addEventListener("click", () => {
              this.animation.next();
            });
          document
            .getElementById("undirectedPrev")
            .addEventListener("click", () => {
              this.animation.prev();
            });
          document
            .getElementById("undirectedResume")
            .addEventListener("click", () => {
              this.animation.resume();
            });
          document
            .getElementById("undirectedPause")
            .addEventListener("click", () => {
              this.animation.pause();
            });
          document
            .getElementById("undirectedStart")
            .addEventListener("click", () => {
              this.animation.start();
            });
          break;
        }
      }
    };

    this.addVertices = function (a) {
      // console.log(this);
      a = parseInt(a);
      for (let i = 0; i < a; i++) {
        adjacencyList.push([]);
        let v = new Vertex(avgx(), avgy());
        vertices.push(v);
      }
      noOfVertices += a;
      this.reset();
      // this.show();
    };

    this.drawEdge = function (vertex) {
      let movingEdge = document.getElementById("Moving Edge");
      let el = document.getElementById("graph");
      if (movingEdge == null) {
        const line = document.createElementNS(
          "http://www.w3.org/2000/svg",
          "line"
        );
        line.setAttributeNS(null, "x1", vertices[vertex].x_cor);
        line.setAttributeNS(null, "y1", vertices[vertex].y_cor);
        line.setAttributeNS(null, "x2", vertices[vertex].x_cor);
        line.setAttributeNS(null, "y2", vertices[vertex].y_cor);
        line.setAttributeNS(null, "style", "stroke:black;stroke-width:2");

        line.setAttribute("id", "Moving Edge");
        temp_edge = vertex;
        el.appendChild(line);
      } else {
        let graphSheet = document.getElementById("graph");
        graphSheet.removeEventListener(
          "mouseleave",
          (event) => {
            mouseEvent.onMouseLeave(this.mode, event, graphSheet);
          },
          false
        );
        graphSheet.removeEventListener(
          "mousemove",
          (event) => {
            mouseEvent.onMouseMove(this.mode, event, graphSheet, this);
          },
          false
        );
        this.addEdge(temp_edge, vertex);
        el.removeChild(movingEdge);
        this.show();
      }
    };

    function createNodes() {
      let center_x = screen.width * 0.4;
      let center_y = screen.height * 0.3;
      let angle = (2 * Math.PI) / noOfVertices;
      var newvertices = [];
      for (let i = 1; i <= noOfVertices; i++) {
        let v;
        let xcor = center_x + noOfVertices * 15 * Math.sin(i * angle);
        let ycor = center_y + noOfVertices * 15 * Math.cos(i * angle);
        v = new Vertex(xcor, ycor);
        newvertices.push(v);
      }
      vertices = newvertices;
    }

    function avgx() {
      if (noOfVertices == 0) return screen.width * 0.4;
      let sum = 0;
      for (let i = 0; i < noOfVertices; i++) {
        sum += vertices[i].x_cor;
      }
      return sum / noOfVertices;
    }

    function avgy() {
      if (noOfVertices == 0) return screen.height * 0.3;
      let sum = 0;
      for (let i = 0; i < noOfVertices; i++) {
        sum += vertices[i].y_cor;
      }
      return sum / noOfVertices;
    }

    this.addEdge = function (a, b) {
      a = parseInt(a);
      b = parseInt(b);
      if (a >= adjacencyList.length || b >= adjacencyList.length) {
        swal("Invalid Input", "Edges are out of bounds", "error");
        return;
      }
      if (a == b) return;
      for (let i = 0; i < adjacencyList[a].length; i++) {
        if (adjacencyList[a][i] == b) return;
      }
      adjacencyList[a].push(b);
      adjacencyList[b].push(a);
      edges++;
    };

    this.deleteEdge = function (a, b) {
      a = parseInt(a);
      b = parseInt(b);
      if (a >= adjacencyList.length || b >= adjacencyList.length) {
        swal("Invalid Input", "Edges are out of bounds", "error");
        return;
      }
      let newList = [];
      for (let i = 0; i < adjacencyList[a].length; i++) {
        if (adjacencyList[a][i] == b) continue;
        newList.push(adjacencyList[a][i]);
      }
      adjacencyList[a] = newList;
      newList = [];
      for (let i = 0; i < adjacencyList[b].length; i++) {
        if (adjacencyList[b][i] == a) continue;
        newList.push(adjacencyList[b][i]);
      }
      adjacencyList[b] = newList;
      edges--;
    };

    this.updateNode = (x, y, pos) => {
      // console.log(this)
      vertices[pos].x_cor = x;
      vertices[pos].y_cor = y;
      this.show();
    };

    this.show = () => {
      document.getElementById("graph").innerHTML = `<defs>
			<marker id="arrow" refX="5" refY="5"
      fill = "red"
      markerWidth="10" markerHeight="10"
      orient="auto-start-reverse">
      <path d="M 0 0 L 10 5 L 0 10 z" />
			</marker>        
		  </defs>`;
      let err = 0;
      for (let i = 0; i < adjacencyList.length; i++) {
        for (let j = 0; j < adjacencyList[i].length; j++) {
          let x = i;
          let y = adjacencyList[i][j];
          if (x > noOfVertices - 1 || y > noOfVertices - 1 || x < 0 || y < 0) {
            err = 1;
            continue;
          }
          if (y > x) continue;
          let x1 = vertices[x].x_cor;
          let y1 = vertices[x].y_cor;
          let x2 = vertices[y].x_cor;
          let y2 = vertices[y].y_cor;
          const el = document.getElementById("graph");
          const line = document.createElementNS(
            "http://www.w3.org/2000/svg",
            "line"
          );
          // line.setAttributeNS(null, "x1", x1_); // for arrow
          // line.setAttributeNS(null, "y1", y1_); // for arrow
          line.setAttributeNS(null, "x1", x1);
          line.setAttributeNS(null, "y1", y1);
          // console.log(x2,y2)
          // console.log(x2_,y2_)
          line.setAttributeNS(null, "x2", x2);
          line.setAttributeNS(null, "y2", y2);
          // line.setAttributeNS(null,"style","z-index : -1;")
          // line.setAttributeNS(null, "marker-start", "url(#arrow)") // for arrow
          line.setAttributeNS(null, "style", "stroke:black;stroke-width:2");
          el.appendChild(line);
        }
      }
      if (err) alert("Some Edges were out of bounds! ");
      for (let i = 0; i < noOfVertices; i++) {
        const el = document.getElementById("graph");
        const ver = document.createElementNS(
          // it means the circle tag belongs to svg and not any other xml format
          "http://www.w3.org/2000/svg",
          "circle"
        );
        const txt = document.createElementNS(
          "http://www.w3.org/2000/svg",
          "text"
        );
        txt.innerHTML = i + 1;

        let x_ver = vertices[i].x_cor;
        let y_ver = vertices[i].y_cor;
        let x_text = x_ver;
        let y_text = y_ver;
        let id_cir = "undircir" + i;
        let id_text = "undirtxt" + i;
        let className = "node" + i;

        ver.setAttributeNS(null, "stroke", "black");
        ver.setAttributeNS(null, "stroke-width", "2");
        ver.setAttributeNS(null, "fill", "white");
        ver.setAttributeNS(null, "cx", x_ver);
        ver.setAttributeNS(null, "cy", y_ver);
        txt.style["font-size"] = "16";
        txt.setAttributeNS(null, "x", x_text);
        txt.setAttributeNS(null, "y", y_text);
        txt.setAttributeNS(null, "text-anchor", "middle"); // to put the txt inside the circle at the center
        txt.setAttributeNS(null, "alignment-baseline", "central"); // to put the txt inside the circle at the center
        txt.setAttributeNS(null, "stroke", "black");
        ver.setAttributeNS(null, "r", "15");
        ver.setAttributeNS(null, "id", id_cir);
        txt.setAttributeNS(null, "id", id_text);
        ver.setAttributeNS(null, "class", className);
        txt.setAttributeNS(null, "class", className);
        ver.setAttribute("style", "z-index:10;");
        txt.setAttribute("style", "z-index:10;");

        ver.addEventListener(
          "mousedown",
          (event) => {
            mouseEvent.onMouseDown(this.mode, event, ver, this);
          },
          false
        );
        txt.addEventListener(
          "mousedown",
          (event) => {
            mouseEvent.onMouseDown(this.mode, event, txt, this);
          },
          false
        );

        ver.addEventListener(
          "mouseup",
          (event) => {
            mouseEvent.onMouseUp(this.mode, event, ver, this);
          },
          false
        );
        txt.addEventListener(
          "mouseup",
          (event) => {
            mouseEvent.onMouseUp(this.mode, event, txt, this);
            // this points to the graph object
          },
          false
        );

        ver.addEventListener(
          "click",
          (event) => {
            mouseEvent.onClick(this.mode, event, ver, this);
          },
          false
        );
        txt.addEventListener(
          "click",
          (event) => {
            mouseEvent.onClick(this.mode, event, txt, this);
          },
          false
        );

        ver.addEventListener(
          "mouseover",
          (event) => {
            mouseEvent.onMouseOver(this.mode, event, ver);
          },
          false
        );
        txt.addEventListener(
          "mouseover",
          (event) => {
            mouseEvent.onMouseOver(this.mode, event, txt);
          },
          false
        );

        ver.addEventListener(
          "mouseout",
          (event) => {
            mouseEvent.onMouseOut(this.mode, event, ver);
          },
          false
        );
        txt.addEventListener(
          "mouseout",
          (event) => {
            mouseEvent.onMouseOut(this.mode, event, txt);
          },
          false
        );

        el.appendChild(ver);
        el.append(txt);
      }
    };

    function color(arr, index) {
      className = "node" + arr[index];
      let classes = document.getElementsByClassName(className);
      classes[0].setAttributeNS(null, "fill", "#FF5400");
      classes[1].setAttributeNS(null, "stroke", "white");
    }

    this.bfs = function () {
      if (adjacencyList.length === 0) return;
      vis = [];
      for (let i = 0; i < noOfVertices; i++) vis.push(false);
      animationArray = [];
      let queue = [];
      queue.push(this.root - 1);
      vis[this.root - 1] = true;
      animationArray.push({
        change: () => {
          document.getElementById(`undircir${this.root - 1}`).style.fill =
            "black";
          document.getElementById(`undirtxt${this.root - 1}`).style.stroke =
            "white";
        },
        reverseChange: () => {
          document.getElementById(`undircir${this.root - 1}`).style.fill =
            "white";
          document.getElementById(`undirtxt${this.root - 1}`).style.stroke =
            "black";
        },
      });
      while (queue.length > 0) {
        let parent = queue.shift();
        adjacencyList[parent].forEach((child) => {
          if (vis[child] === false) {
            queue.push(child);
            vis[child] = true;
            animationArray.push({
              change: () => {
                document.getElementById(`undircir${child}`).style.fill =
                  "black";
                document.getElementById(`undirtxt${child}`).style.stroke =
                  "white";
              },
              reverseChange: () => {
                document.getElementById(`undircir${child}`).style.fill =
                  "white";
                document.getElementById(`undirtxt${child}`).style.stroke =
                  "black";
              },
            });
          }
        });
      }
      this.animation = new Animate(animationArray);
      this.animation.reset();
    };

    this.dfs = function () {
      if (adjacencyList.length === 0) return;
      vis = [];
      for (let i = 0; i < noOfVertices; i++) vis.push(false);
      animationArray = [];
      this.dfsCall(this.root - 1);
      this.animation = new Animate(animationArray);
      this.animation.reset();
      // console.log(this.animation)
    };
    this.dfsCall = function (v) {
      // console.log(v)
      vis[v] = true;
      animationArray.push({
        change: () => {
          document.getElementById(`undircir${v}`).style.fill = "grey";
          document.getElementById(`undirtxt${v}`).style.stroke = "black";
        },
        reverseChange: () => {
          document.getElementById(`undircir${v}`).style.fill = "white";
          document.getElementById(`undirtxt${v}`).style.stroke = "black";
        },
      });
      // console.log(animationArray)
      for (let i = 0; i < adjacencyList[v].length; i++)
        if (vis[adjacencyList[v][i]] === false)
          this.dfsCall(adjacencyList[v][i]);
      animationArray.push({
        change: () => {
          document.getElementById(`undircir${v}`).style.fill = "black";
          document.getElementById(`undirtxt${v}`).style.stroke = "white";
        },
        reverseChange: () => {
          document.getElementById(`undircir${v}`).style.fill = "grey";
          document.getElementById(`undirtxt${v}`).style.stroke = "black";
        },
      });
    };

    this.reset = function () {
      if (this.animation.array !== undefined) {
        clearInterval(this.animation.intervalId);
        this.animation.reset();
      }
      this.setMode(this.mode, 1);
      this.show();
    };
  }
}

export class DirectedGraph {
  constructor() {
    this.graphmode = "Directed";
    let orderofbfs = [];
    let orderofdfs = [];
    let vertices = [];
    let noOfVertices = 0;
    this.mode = 1;
    let temp_edge;
    let adjacencyList = [];
    let edges = 0;
    this.animation = {};
    // let update = 0;
    let mouseEvent = new MouseEvents(this);
    let vis = [];
    let animationArray = [];
    this.setVertices = (n) => {
      noOfVertices = n;
      for (let i = 0; i < n; i++) {
        adjacencyList.push([]);
      }
      createNodes();
    };

    this.setMode = function (m, r) {
      this.mode = m;
      this.root = r;
      let algo = document.getElementById("AnimationButtons");
      // console.log(algo)
      let children = algo.children;
      while (children.length > 0) {
        algo.removeChild(algo.lastElementChild);
      }
      switch (this.mode) {
        case 1: {
          let newChild = document.createElement("div");
          newChild.className = "NoAlgo";
          newChild.style = "height:auto;width:100%;text-align:center";
          newChild.id = "NoAlgo";
          newChild.innerHTML = `<h1>Animation buttons will appear here</h1>`;
          algo.appendChild(newChild);
          break;
        }
        case 2: {
          let newChild = document.createElement("div");
          newChild.className = "border border-dark BFSAlgo";
          // newChild.style = "height:auto;width:100%";
          newChild.id = "BFS";
          newChild.style =
            "height:100%;width:100%;text-align:center;";
          newChild.innerHTML = `    
          <h3>BFS MODE</h3>
          <div style = "display:grid;grid-template-columns:30% 70%;">
          <div class = "Root"><h4><b>Root : ${r}</b></h4></div>
          <div style = "display:flex;justify-content:space-evenly">
          <button type = "button" class="btn btn-primary" id = "directedStart">Start</button>
          <button type = "button" class="btn btn-primary" id = "directedPause">Pause</button>
          <button type = "button" class="btn btn-primary" id = "directedResume">Resume</button>
          <button type = "button" class="btn btn-primary" id = "directedPrev">Prev</button>
          <button type = "button" class="btn btn-primary" id = "directedNext">Next</button>
          <button type = "button" class="btn btn-primary" id = "directedReset">Reset</button>
          <button type = "button" class="btn btn-primary" id = "Exit">Exit</button>
          </div>
          </div>
          `;
          algo.appendChild(newChild);
          this.bfs();
          document.getElementById("Exit").addEventListener("click", () => {
            if (this.animation.array !== undefined) {
              clearInterval(this.animation.intervalId);
              this.animation.reset();
            }
            this.setMode(1, 1);
          });
          document
            .getElementById("directedReset")
            .addEventListener("click", () => {
              this.reset();
            });
          document
            .getElementById("directedNext")
            .addEventListener("click", () => {
              this.animation.next();
            });
          document
            .getElementById("directedPrev")
            .addEventListener("click", () => {
              this.animation.prev();
            });
          document
            .getElementById("directedResume")
            .addEventListener("click", () => {
              this.animation.resume();
            });
          document
            .getElementById("directedPause")
            .addEventListener("click", () => {
              this.animation.pause();
            });
          document
            .getElementById("directedStart")
            .addEventListener("click", () => {
              this.animation.start();
            });
          break;
        }
        case 3: {
          let newChild = document.createElement("div");
          newChild.className = "border border-dark DFSAlgo";
          // newChild.style = "height:auto;width:100%";
          newChild.id = "DFS";
          newChild.style =
            "height:100%;width:100%;text-align:center;";
          newChild.innerHTML = `    
          <h3>DFS MODE</h3>
          <div style = "display:grid;grid-template-columns:30% 70%;">
          <div class = "Root"><h4><b>Root : ${r}</b></h4></div>
          <div style = "display:flex;justify-content:space-evenly">
          <button type = "button" class="btn btn-primary" id = "directedStart">Start</button>
          <button type = "button" class="btn btn-primary" id = "directedPause">Pause</button>
          <button type = "button" class="btn btn-primary" id = "directedResume">Resume</button>
          <button type = "button" class="btn btn-primary" id = "directedPrev">Prev</button>
          <button type = "button" class="btn btn-primary" id = "directedNext">Next</button>
          <button type = "button" class="btn btn-primary" id = "directedReset">Reset</button>
          <button type = "button" class="btn btn-primary" id = "Exit">Exit</button>
          </div>
          </div>
          `;
          algo.appendChild(newChild);
          this.dfs(); // this functions makes the animation object of dfs walk
          document.getElementById("Exit").addEventListener("click", () => {
            if (this.animation.array !== undefined) {
              clearInterval(this.animation.intervalId);
              this.animation.reset();
            }
            this.setMode(1, 1);
          });
          document
            .getElementById("directedReset")
            .addEventListener("click", () => {
              this.reset();
            });
          document
            .getElementById("directedNext")
            .addEventListener("click", () => {
              this.animation.next();
            });
          document
            .getElementById("directedPrev")
            .addEventListener("click", () => {
              this.animation.prev();
            });
          document
            .getElementById("directedResume")
            .addEventListener("click", () => {
              this.animation.resume();
            });
          document
            .getElementById("directedPause")
            .addEventListener("click", () => {
              this.animation.pause();
            });
          document
            .getElementById("directedStart")
            .addEventListener("click", () => {
              this.animation.start();
            });
          break;
        }
      }
    };

    this.addVertices = function (a) {
      a = parseInt(a);
      for (let i = 0; i < a; i++) {
        adjacencyList.push([]);
        let v = new Vertex(avgx(), avgy());
        vertices.push(v);
      }
      noOfVertices += a;
      this.reset();
    };

    this.drawEdge = function (vertex) {
      let movingEdge = document.getElementById("Moving Edge");
      let el = document.getElementById("graph");
      if (movingEdge == null) {
        const line = document.createElementNS(
          "http://www.w3.org/2000/svg",
          "line"
        );
        line.setAttributeNS(null, "x1", vertices[vertex].x_cor);
        line.setAttributeNS(null, "y1", vertices[vertex].y_cor);
        line.setAttributeNS(null, "x2", vertices[vertex].x_cor);
        line.setAttributeNS(null, "y2", vertices[vertex].y_cor);
        line.setAttributeNS(null, "style", "stroke:black;stroke-width:2");

        line.setAttribute("id", "Moving Edge");
        temp_edge = vertex;
        el.appendChild(line);
      } else {
        let graphSheet = document.getElementById("graph");
        graphSheet.removeEventListener(
          "mouseleave",
          (event) => {
            mouseEvent.onMouseLeave(this.mode, event, graphSheet);
          },
          false
        );
        graphSheet.removeEventListener(
          "mousemove",
          (event) => {
            mouseEvent.onMouseMove(this.mode, event, graphSheet, this);
          },
          false
        );
        this.addEdge(temp_edge, vertex);
        el.removeChild(movingEdge);
        this.show();
      }
    };

    function createNodes() {
      let center_x = screen.width * 0.4;
      let center_y = screen.height * 0.3;
      let angle = (2 * Math.PI) / noOfVertices;
      var newvertices = [];
      for (let i = 1; i <= noOfVertices; i++) {
        let v;
        let xcor = center_x + noOfVertices * 15 * Math.sin(i * angle);
        let ycor = center_y + noOfVertices * 15 * Math.cos(i * angle);
        v = new Vertex(xcor, ycor);
        newvertices.push(v);
      }
      vertices = newvertices;
    }

    function avgx() {
      if (noOfVertices == 0) return screen.width * 0.4;
      let sum = 0;
      for (let i = 0; i < noOfVertices; i++) {
        sum += vertices[i].x_cor;
      }
      return sum / noOfVertices;
    }

    function avgy() {
      if (noOfVertices == 0) return screen.height * 0.3;
      let sum = 0;
      for (let i = 0; i < noOfVertices; i++) {
        sum += vertices[i].y_cor;
      }
      return sum / noOfVertices;
    }

    this.addEdge = function (a, b) {
      a = parseInt(a);
      b = parseInt(b);
      // console.log(a, b);
      if (a >= adjacencyList.length || b >= adjacencyList.length) {
        swal("Invalid Input", "Edges are out of bounds", "error");
        return;
      }
      if (a == b) return;
      for (let i = 0; i < adjacencyList[a].length; i++) {
        if (adjacencyList[a][i] == b) return;
      }
      adjacencyList[a].push(b);
      edges++;
    };

    this.deleteEdge = function (a, b) {
      a = parseInt(a);
      b = parseInt(b);
      if (a >= adjacencyList.length || b >= adjacencyList.length) {
        swal("Invalid Input", "Edges are out of bounds", "error");
        return;
      }
      let newList = [];
      for (let i = 0; i < adjacencyList[a].length; i++) {
        if (adjacencyList[a][i] == b) continue;
        newList.push(adjacencyList[a][i]);
      }
      adjacencyList[a] = newList;
      edges--;
    };

    this.updateNode = (x, y, pos) => {
      vertices[pos].x_cor = x;
      vertices[pos].y_cor = y;
      this.show();
    };

    this.endpoint = (a, b, c, d) => {
      let dis = Math.sqrt((c - a) * (c - a) + (d - b) * (d - b));
      let newx = ((dis - 25) * c + 25 * a) / dis;
      let newy = ((dis - 25) * d + 25 * b) / dis;
      return { newx, newy };
    };
    this.show = () => {
      document.getElementById("graph").innerHTML = `<defs>
                  <marker id="arrow" refX="5" refY="5"
                  fill = "red"
                  markerWidth="10" markerHeight="10"
                  orient="auto-start-reverse">
                  <path d="M 0 0 L 10 5 L 0 10 z" />
                  </marker>        
                  </defs>`;
      let err = 0;
      for (let i = 0; i < adjacencyList.length; i++) {
        for (let j = 0; j < adjacencyList[i].length; j++) {
          let x = i;
          let y = adjacencyList[i][j];
          if (x > noOfVertices - 1 || y > noOfVertices - 1 || x < 0 || y < 0) {
            err = 1;
            continue;
          }
          let x1 = vertices[x].x_cor;
          let y1 = vertices[x].y_cor;
          let x2 = vertices[y].x_cor;
          let y2 = vertices[y].y_cor;
          const el = document.getElementById("graph");
          const line = document.createElementNS(
            "http://www.w3.org/2000/svg",
            "line"
          );
          let { newx: x2_, newy: y2_ } = this.endpoint(x1, y1, x2, y2);
          line.setAttributeNS(null, "x1", x1); // for arrow
          line.setAttributeNS(null, "y1", y1); // for arrow
          //   line.setAttributeNS(null, "x1", x1);
          //   line.setAttributeNS(null, "y1", y1);
          // console.log(x2,y2)
          // console.log(x2_,y2_)
          line.setAttributeNS(null, "x2", x2_);
          line.setAttributeNS(null, "y2", y2_);
          // line.setAttributeNS(null,"style","z-index : -1;")
          line.setAttributeNS(null, "marker-end", "url(#arrow)"); // for arrow
          line.setAttributeNS(null, "style", "stroke:black;stroke-width:2");
          el.appendChild(line);
        }
      }
      if (err) alert("Some Edges were out of bounds! ");
      for (let i = 0; i < noOfVertices; i++) {
        const el = document.getElementById("graph");
        const ver = document.createElementNS(
          // it means the circle tag belongs to svg and not any other xml format
          "http://www.w3.org/2000/svg",
          "circle"
        );
        const txt = document.createElementNS(
          "http://www.w3.org/2000/svg",
          "text"
        );
        txt.innerHTML = i + 1;

        let x_ver = vertices[i].x_cor;
        let y_ver = vertices[i].y_cor;
        let x_text = x_ver;
        let y_text = y_ver;
        let id_cir = "dircir" + i;
        let id_text = "dirtxt" + i;
        let className = "node" + i;

        ver.setAttributeNS(null, "stroke", "black");
        ver.setAttributeNS(null, "stroke-width", "2");
        ver.setAttributeNS(null, "fill", "white");
        ver.setAttributeNS(null, "cx", x_ver);
        ver.setAttributeNS(null, "cy", y_ver);
        txt.style["font-size"] = "16";
        txt.setAttributeNS(null, "x", x_text);
        txt.setAttributeNS(null, "y", y_text);
        txt.setAttributeNS(null, "text-anchor", "middle"); // to put the txt inside the circle at the center
        txt.setAttributeNS(null, "alignment-baseline", "central"); // to put the txt inside the circle at the center
        txt.setAttributeNS(null, "stroke", "black");
        ver.setAttributeNS(null, "r", "15");
        ver.setAttributeNS(null, "id", id_cir);
        txt.setAttributeNS(null, "id", id_text);
        ver.setAttributeNS(null, "class", className);
        txt.setAttributeNS(null, "class", className);
        ver.setAttribute("style", "z-index:10;");
        txt.setAttribute("style", "z-index:10;");

        ver.addEventListener(
          "mousedown",
          (event) => {
            mouseEvent.onMouseDown(this.mode, event, ver, this);
          },
          false
        );
        txt.addEventListener(
          "mousedown",
          (event) => {
            mouseEvent.onMouseDown(this.mode, event, txt, this);
          },
          false
        );

        ver.addEventListener(
          "mouseup",
          (event) => {
            mouseEvent.onMouseUp(this.mode, event, ver, this);
          },
          false
        );
        txt.addEventListener(
          "mouseup",
          (event) => {
            mouseEvent.onMouseUp(this.mode, event, txt, this);
          },
          false
        );

        ver.addEventListener(
          "click",
          (event) => {
            mouseEvent.onClick(this.mode, event, ver, this);
          },
          false
        );
        txt.addEventListener(
          "click",
          (event) => {
            mouseEvent.onClick(this.mode, event, txt, this);
          },
          false
        );

        ver.addEventListener(
          "mouseover",
          (event) => {
            mouseEvent.onMouseOver(this.mode, event, ver);
          },
          false
        );
        txt.addEventListener(
          "mouseover",
          (event) => {
            mouseEvent.onMouseOver(this.mode, event, txt);
          },
          false
        );

        ver.addEventListener(
          "mouseout",
          (event) => {
            mouseEvent.onMouseOut(this.mode, event, ver);
          },
          false
        );
        txt.addEventListener(
          "mouseout",
          (event) => {
            mouseEvent.onMouseOut(this.mode, event, txt);
          },
          false
        );

        el.appendChild(ver);
        el.append(txt);
      }
    };
    function color(arr, index) {
      className = "node" + arr[index];
      let classes = document.getElementsByClassName(className);
      classes[0].setAttributeNS(null, "fill", "#FF5400");
      classes[1].setAttributeNS(null, "stroke", "white");
    }

    this.bfs = function () {
      if (adjacencyList.length === 0) return;
      vis = [];
      for (let i = 0; i < noOfVertices; i++) vis.push(false);
      animationArray = [];
      let queue = [];
      queue.push(this.root - 1);
      vis[this.root - 1] = true;
      animationArray.push({
        change: () => {
          document.getElementById(`dircir${this.root - 1}`).style.fill =
            "black";
          document.getElementById(`dirtxt${this.root - 1}`).style.stroke =
            "white";
        },
        reverseChange: () => {
          document.getElementById(`dircir${this.root - 1}`).style.fill =
            "white";
          document.getElementById(`dirtxt${this.root - 1}`).style.stroke =
            "black";
        },
      });
      while (queue.length > 0) {
        let parent = queue.shift();
        adjacencyList[parent].forEach((child) => {
          if (vis[child] === false) {
            queue.push(child);
            vis[child] = true;
            animationArray.push({
              change: () => {
                document.getElementById(`dircir${child}`).style.fill = "black";
                document.getElementById(`dirtxt${child}`).style.stroke =
                  "white";
              },
              reverseChange: () => {
                document.getElementById(`dircir${child}`).style.fill = "white";
                document.getElementById(`dirtxt${child}`).style.stroke =
                  "black";
              },
            });
          }
        });
      }
      this.animation = new Animate(animationArray);
      this.animation.reset();
    };

    this.dfs = function () {
      if (adjacencyList.length === 0) return;
      vis = [];
      for (let i = 0; i < noOfVertices; i++) vis.push(false);
      animationArray = [];
      this.dfsCall(this.root - 1);
      this.animation = new Animate(animationArray);
      this.animation.reset();
      // console.log(this.animation)
    };
    this.dfsCall = function (v) {
      // console.log(v)
      vis[v] = true;
      animationArray.push({
        change: () => {
          document.getElementById(`dircir${v}`).style.fill = "grey";
          document.getElementById(`dirtxt${v}`).style.stroke = "black";
        },
        reverseChange: () => {
          document.getElementById(`dircir${v}`).style.fill = "white";
          document.getElementById(`dirtxt${v}`).style.stroke = "black";
        },
      });
      // console.log(animationArray)
      for (let i = 0; i < adjacencyList[v].length; i++)
        if (vis[adjacencyList[v][i]] === false)
          this.dfsCall(adjacencyList[v][i]);
      animationArray.push({
        change: () => {
          document.getElementById(`dircir${v}`).style.fill = "black";
          document.getElementById(`dirtxt${v}`).style.stroke = "white";
        },
        reverseChange: () => {
          document.getElementById(`dircir${v}`).style.fill = "grey";
          document.getElementById(`dirtxt${v}`).style.stroke = "black";
        },
      });
    };
    this.reset = function () {
      if (this.animation.array !== undefined) {
        clearInterval(this.animation.intervalId);
        this.animation.reset();
      }
      // console.log("Hi")
      this.setMode(this.mode, 1);
      this.show();
    };  
    this.getAdjacentList = function()
    {
      return adjacencyList;
    };
  }
  
}
