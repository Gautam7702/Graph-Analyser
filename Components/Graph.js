import MouseEvents from "./MouseEvents.js";
class Vertex {
  constructor(x, y) {
    this.x_cor = x;
    this.y_cor = y;
  }
}

export default class Graph {
  constructor(name,Mode) {
    this.name = name;
    this.graphmode = Mode
    let orderofbfs = [];
    let orderofdfs = [];
    let vertices = [];
    let noOfVertice = 0;
    let mode = 1;
    let temp_edge;
    let adjacencyList = [];
    let edges = 0;
    
    // let update = 0;
    let mouseEvent = new MouseEvents(this);
    this.setVertices = (n) => {
      noOfVertice = n;
      for (let i = 0; i < n; i++) {
        adjacencyList.push([]);
      }
      createNodes();
    };
    let cnt1 = 0,
      cnt2 = 0,
      cnt3 = 0;
    this.setMode = function (m) {
      mode = m;
      switch (mode) {
        case 1: {
          if (cnt1 == 0) {
            // alert(
            // 	"You have entered edit mode! Click on the node you want to move and then move it."
            // );
            swal(
              "EDIT MODE",
              "Click on the node you want to move and then move it.",
              "info"
            );
            // console.log(cnt1)
          }
          cnt1++;
          break;
        }
        case 2: {
          if (cnt2 == 0) {
            swal(
              "BFS MODE",
              "Click on the node from where you want to start BFS.",
              "info"
            );
          }
          cnt2++;
          break;
        }
        case 3: {
          if (cnt3 == 0) {
            swal(
              "DFS MODE",
              "Click on the node from where you want to start DFS.",
              "info"
            );
          }
          cnt3++;
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
      noOfVertice += a;
      if(this.graphmode === "Undirected")
      this.showUndirected();
      if(this.graphmode === "Directed")
      this.showDirected();
    };

    this.drawEdgeDirected = function (vertex) {
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
            this.onMouseLeave(mode, event, graphSheet);
          },
          false
        );
        graphSheet.removeEventListener(
          "mousemove",
          (event) => {
            this.onMouseMove(mode, event, graphSheet);
          },
          false
        );
        this.addEdgeDirected(temp_edge, vertex);
        el.removeChild(movingEdge);
        this.showDirected();
      }
    };
    this.drawEdgeUndirected = function (vertex) {
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
            this.onMouseLeave(mode, event, graphSheet);
          },
          false
        );
        graphSheet.removeEventListener(
          "mousemove",
          (event) => {
            this.onMouseMove(mode, event, graphSheet);
          },
          false
        );
        this.addEdgeUndirected(temp_edge, vertex);
        el.removeChild(movingEdge);
        this.showUndirected();
      }
    };

    function createNodes() {
      let center_x = screen.width * 0.4;
      let center_y = screen.height * 0.3;
      let angle = (2 * Math.PI) / noOfVertice;
      var newvertices = [];
      for (let i = 1; i <= noOfVertice; i++) {
        let v;
        let xcor = center_x + noOfVertice * 15 * Math.sin(i * angle);
        let ycor = center_y + noOfVertice * 15 * Math.cos(i * angle);
        v = new Vertex(xcor, ycor);
        newvertices.push(v);
      }
      vertices = newvertices;
    }

    function avgx() {
      if (noOfVertice == 0) return screen.width * 0.4;
      let sum = 0;
      for (let i = 0; i < noOfVertice; i++) {
        sum += vertices[i].x_cor;
      }
      return sum / noOfVertice;
    }

    function avgy() {
      if (noOfVertice == 0) return screen.height * 0.3;
      let sum = 0;
      for (let i = 0; i < noOfVertice; i++) {
        sum += vertices[i].y_cor;
      }
      return sum / noOfVertice;
    }

    this.addEdgeUndirected = function (a, b) {
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

    this.addEdgeDirected = function (a, b) {
      a = parseInt(a);
      b = parseInt(b);
      console.log(a,b)
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
    this.deleteEdgeUndirected = function (a, b) {
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

    this.deleteEdgeDirected = function (a, b) {
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

    this.updateNodeUndirected = (x, y, pos) => {
      vertices[pos].x_cor = x;
      vertices[pos].y_cor = y;
      this.showUndirected();
    };
    this.updateNodeDirected = (x, y, pos) => {
      vertices[pos].x_cor = x;
      vertices[pos].y_cor = y;
      this.showDirected();
    };
    this.showUndirected = () => {
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
          if (x > noOfVertice - 1 || y > noOfVertice - 1 || x < 0 || y < 0) {
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
      for (let i = 0; i < noOfVertice; i++) {
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
        let id_cir = "cir" + i;
        let id_text = "txt" + i;
        let className = "node" + i;

        ver.setAttributeNS(null, "stroke", "black");
        ver.setAttributeNS(null, "stroke-width", "2");
        ver.setAttributeNS(null, "fill", "black");
        ver.setAttributeNS(null, "cx", x_ver);
        ver.setAttributeNS(null, "cy", y_ver);
        txt.style["font-size"] = "16";
        txt.setAttributeNS(null, "x", x_text);
        txt.setAttributeNS(null, "y", y_text);
        txt.setAttributeNS(null, "text-anchor", "middle"); // to put the txt inside the circle at the center
        txt.setAttributeNS(null, "alignment-baseline", "central"); // to put the txt inside the circle at the center
        txt.setAttributeNS(null, "stroke", "white");
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
            mouseEvent.onMouseDown(mode, event, ver);
          },
          false
        );
        txt.addEventListener(
          "mousedown",
          (event) => {
            mouseEvent.onMouseDown(mode, event, txt);
          },
          false
        );

        ver.addEventListener(
          "mouseup",
          (event) => {
            mouseEvent.onMouseUp(mode, event, ver);
          },
          false
        );
        txt.addEventListener(
          "mouseup",
          (event) => {
            mouseEvent.onMouseUp(mode, event, txt);
          },
          false
        );

        ver.addEventListener(
          "click",
          (event) => {
            mouseEvent.onClick(mode, event, ver);
          },
          false
        );
        txt.addEventListener(
          "click",
          (event) => {
            mouseEvent.onClick(mode, event, txt);
          },
          false
        );

        ver.addEventListener(
          "mouseover",
          (event) => {
            mouseEvent.onMouseOver(mode, event, ver);
          },
          false
        );
        txt.addEventListener(
          "mouseover",
          (event) => {
            mouseEvent.onMouseOver(mode, event, txt);
          },
          false
        );

        ver.addEventListener(
          "mouseout",
          (event) => {
            mouseEvent.onMouseOut(mode, event, ver);
          },
          false
        );
        txt.addEventListener(
          "mouseout",
          (event) => {
            mouseEvent.onMouseOut(mode, event, txt);
          },
          false
        );

        el.appendChild(ver);
        el.append(txt);
      }
    };
    this.endpoint = (a, b, c, d) => {
      let dis = Math.sqrt((c - a) * (c - a) + (d - b) * (d - b));
      let newx = ((dis - 25) * c + 25 * a) / dis;
      let newy = ((dis - 25) * d + 25 * b) / dis;
      return { newx, newy };
    };
    this.showDirected = () => {
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
          if (x > noOfVertice - 1 || y > noOfVertice - 1 || x < 0 || y < 0) {
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
      for (let i = 0; i < noOfVertice; i++) {
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
        let id_cir = "cir" + i;
        let id_text = "txt" + i;
        let className = "node" + i;

        ver.setAttributeNS(null, "stroke", "black");
        ver.setAttributeNS(null, "stroke-width", "2");
        ver.setAttributeNS(null, "fill", "black");
        ver.setAttributeNS(null, "cx", x_ver);
        ver.setAttributeNS(null, "cy", y_ver);
        txt.style["font-size"] = "16";
        txt.setAttributeNS(null, "x", x_text);
        txt.setAttributeNS(null, "y", y_text);
        txt.setAttributeNS(null, "text-anchor", "middle"); // to put the txt inside the circle at the center
        txt.setAttributeNS(null, "alignment-baseline", "central"); // to put the txt inside the circle at the center
        txt.setAttributeNS(null, "stroke", "white");
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
            mouseEvent.onMouseDown(mode, event, ver);
          },
          false
        );
        txt.addEventListener(
          "mousedown",
          (event) => {
            mouseEvent.onMouseDown(mode, event, txt);
          },
          false
        );

        ver.addEventListener(
          "mouseup",
          (event) => {
            mouseEvent.onMouseUp(mode, event, ver);
          },
          false
        );
        txt.addEventListener(
          "mouseup",
          (event) => {
            mouseEvent.onMouseUp(mode, event, txt);
          },
          false
        );

        ver.addEventListener(
          "click",
          (event) => {
            mouseEvent.onClick(mode, event, ver);
          },
          false
        );
        txt.addEventListener(
          "click",
          (event) => {
            mouseEvent.onClick(mode, event, txt);
          },
          false
        );

        ver.addEventListener(
          "mouseover",
          (event) => {
            mouseEvent.onMouseOver(mode, event, ver);
          },
          false
        );
        txt.addEventListener(
          "mouseover",
          (event) => {
            mouseEvent.onMouseOver(mode, event, txt);
          },
          false
        );

        ver.addEventListener(
          "mouseout",
          (event) => {
            mouseEvent.onMouseOut(mode, event, ver);
          },
          false
        );
        txt.addEventListener(
          "mouseout",
          (event) => {
            mouseEvent.onMouseOut(mode, event, txt);
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

    this.bfs = function (x) {
      orderofbfs = [];
      orderofbfs.push(parseInt(x));
      let cur = 0;
      let visit = [];
      for (let i = 0; i < noOfVertice; i++) {
        visit.push(0);
      }

      start = setInterval(function () {
        color(orderofbfs, 0);
        clearInterval(start);
      }, 1000);

      Iterator = setInterval(function () {
        if (cur == orderofbfs.length) {
          reset = setInterval(function () {
            for (let i = 0; i < noOfVertice; i++) {
              document
                .getElementsByClassName("node" + i)[0]
                .setAttribute("fill", "black");
              clearInterval(reset);
            }
          }, 1000);
          clearInterval(Iterator);
          return;
        }
        let u = parseInt(orderofbfs[cur]);
        let prev = orderofbfs.length - 1;
        document
          .getElementsByClassName("node" + orderofbfs[cur])[0]
          .setAttributeNS(null, "stroke", "black");
        visit[u] = 1;
        for (let i = 0; i < adjacencyList[u].length; i++) {
          v = parseInt(adjacencyList[u][i]);
          if (visit[v] == 0) {
            orderofbfs.push(v);
            visit[v] = 1;
          }
        }
        cur++;
        for (let i = prev + 1; i < orderofbfs.length; i++) {
          color(orderofbfs, i);
        }
        document
          .getElementsByClassName("node" + orderofbfs[cur])[0]
          .setAttributeNS(null, "stroke", "white");
      }, 1000);
      console.log(orderofbfs);
    };

    this.dfs = function (x) {
      orderofdfs = [];
      algoReady();
      let visit = [];
      for (let i = 0; i < noOfVertice; i++) {
        visit.push(0);
      }
      doDfs(visit, x);
      index = 0;
      myInterval = setInterval(function () {
        color(orderofdfs, index);
        index++;
        if (index == orderofdfs.length) {
          clearInterval(myInterval);
          return;
        }
      }, 1000);
      console.log(orderofdfs);
    };
    function doDfs(visit, x) {
      console.log("yes");
      if (visit[x] == 0) {
        visit[x] = 1;
        orderofdfs.push(x);
        for (let i = 0; i < adjacencyList[x].length; i++) {
          if (visit[adjacencyList[x][i]] == 0)
            doDfs(visit, adjacencyList[x][i]);
        }
      }
    }
  }
}
