let dragObject;

export default class MouseEvents {
	constructor(graph) {
		// passing graph object on which mouseevents will work
		this.funcType = {
			Undirected:{
			  updateNode : (a,b,c) => {graph.updateNodeUndirected(a,b,c)},
			  drawEdge : (v) => {graph.drawEdgeUndirected(v)}
			}
			,Directed:{
				updateNode : (a,b,c) => {graph.updateNodeDirected(a,b,c)},
				drawEdge : (v) => {graph.drawEdgeDirected(v)}
			}
		  }
		// console.log(graph.graphVerticie);
		this.onMouseOver = (mode, event, obj) => {
			let className = obj.getAttribute("class");
			let classes = document.getElementsByClassName(className);
			classes[0].setAttributeNS(null, "fill", "#FF5400"); // circle is by default black but on hover it becomes #FF5400 color
			classes[1].setAttributeNS(null, "stroke", "black"); // text is by default white but on hover it becomes black color
		};
		
		this.onMouseMove =  (mode, event, obj) => { // this function is only called on mousedown event
			let bodyRect = document.body.getBoundingClientRect();
			let Rect = document.getElementById("graph").getBoundingClientRect();
			let diff = Rect.top - bodyRect.top;
			switch (mode) {
				case 1: {
					let el = document.getElementById("Moving Edge");
					if (el != null) {
						let x2, y2;
						if (el.getAttribute(null, "x1") > event.pageX)
						x2 = event.pageX + 10;
						else
						x2 = event.pageX - 5;
						if (el.getAttribute(null, "y1") < event.pageY)
						y2 = event.pageY + 10 - diff;
						else
						x2 = event.pageY - 5 - diff;
						el.setAttributeNS(null, "x2", x2);
						el.setAttributeNS(null, "y2", y2);
					}
				}
				default: {
					if (dragObject == null) {
						return;
					}
					let className = dragObject.getAttribute("class");
					let nodeValue = parseInt(className.replace("node", "")); 
					// finds the node number and updates its position corresponding to the mouse
					if (event.pageX >= Rect.right || event.pageY <= Rect.top) {
						return;
					}
					// graph.updateNode(event.pageX, event.pageY - diff, nodeValue);
					// console.log(graph.graphmode)
					this.funcType[graph.graphmode].updateNode(event.pageX, event.pageY - diff, nodeValue);
				}
			}
		};

		this.onMouseDown = (mode, event, obj)=> {
			dragObject = obj;

			let graphSheet = document.getElementById("graph");
			graphSheet.addEventListener(
				"mouseleave",
				(event) => {
					this.onMouseLeave(mode, event, graphSheet);
				},
				false
			);
			graphSheet.addEventListener(
				"mousemove",
				(event) => {
					this.onMouseMove(mode, event, graphSheet);
				},
				false
			);
		};

		this.onMouseUp = function (mode, event, obj) {
			dragObject = null;

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
		};

		this.onClick = function (mode, event, obj) {
			let className = obj.getAttribute("class");
			className = className.replace("node", "");
			var classname = parseInt(className);
			switch (mode) {
				case 1: {
					let graphSheet = document.getElementById("graph");
					graphSheet.addEventListener(
						"mouseleave",
						(event) => {
							this.onMouseLeave(mode, event, graphSheet);
						},
						false
					);
					graphSheet.addEventListener(
						"mousemove",
						(event) => {
							this.onMouseMove(mode, event, graphSheet);
						},
						false
					);
					console.log(graph.graphmode)
					this.funcType[graph.graphmode].drawEdge(className);
					break;
				}
				case 2: {
					console.log(className);
					graph.show();
					graph.bfs(className);
					break;
				}
				case 3: {
					console.log(className);
					className = parseInt(className);
					graph.show();
					graph.dfs(className);
					break;
				}
			}
		};
		this.onMouseOut = function (mode, event, obj) {
			let className = obj.getAttribute("class");
			let classes = document.getElementsByClassName(className);
			classes[0].setAttributeNS(null, "fill", "black");
			classes[1].setAttributeNS(null, "stroke", "white");
		};
		this.onMouseLeave = function (mode, event, obj) {
			dragObject = null;
		};
	}
}