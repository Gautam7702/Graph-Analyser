
function Node(x,y){
    this.x_cor = x;
    this.y_cor =y;
    // this.update = 0; 
};

function MouseEvents()
{
    this.onMouseOver = function(Mode,e,obj){
        if(Mode == 1)   
        {
            let className = obj.getAttribute("class");
            let classes = document.getElementsByClassName(className);
            console.log(e);
            classes[0].setAttributeNS(null,"fill","black");
            classes[1].setAttributeNS(null,"stroke","white");
        }

    }
    this.onMouseMove = function(Mode,e,obj){
        if(Mode == 1)   
        {
            if(dragObject ==  null) return;
            let className = dragObject.getAttribute("class");
            className  = className.replace("node","");
            // console.log(e.pageX,e.pageY);   
            let bodyRect = document.body.getBoundingClientRect();
            let Rect = document.getElementById("graph").getBoundingClientRect();
            let pos  = Rect.top - bodyRect.top ;
            // pos = e.pageY - pos;
            // console.log(pos,e.pageX,e.pageY-pos-20); 
            graph.updateNode(e.pageX,e.pageY-pos,className);

        }
    }
    this.onClick = function(Mode,e,obj){

            // console.log(e);
            if(Mode == 1)   
            {
                console.log(obj,dragObject);
        
                if(dragObject!=null)
                {
                    if(dragObject.getAttribute("class") == obj.getAttribute("class")){
                        dragObject = null;
                        return;
                    }
                }
                else    
                {
                    dragObject  = obj;
                }
                let className = obj.getAttribute("class");
                let classes = document.getElementsByClassName(className);
                // console.log(classes);
                classes[0].setAttributeNS(null,"fill","black");
                classes[1].setAttributeNS(null,"stroke","white");
        }
    }
    this.onMouseOut = function(Mode,e,x){
        if(Mode == 1)   
        {
                let className = x.getAttribute("class");
                let classes = document.getElementsByClassName(className);
                // console.log(classes);
                classes[0].setAttributeNS(null,"fill","white");
                classes[1].setAttributeNS(null,"stroke","black");
        }
    }
}
function Graph(){
    let vertices = [];
    let noOfVertice;
    let mode =1;
    let edgeList = [];
    // let update = 0;
    let mouseEvent = new MouseEvents;
    this.setVertices  = function(n)
        {
            noOfVertice = n;
            createNodes();
        }
    function createNodes(){ 
        for(let i=1;i<=noOfVertice;i++)
        {
            let v;
            if(i%2==1){
                let x = parseInt((i/2));
                v = new Node(100,(x+1)*100);
            }
            else{
                let x = parseInt(i/2);
                v = new Node(200,x*100);  
            }     
            vertices.push(v);
        }
    }
    this.addEdge = function(a,b){
        let arr = [a,b];
        let flag=0;
        for(let i=0;i<edgeList.length;i++)
            {
                if(edgeList[i]==arr){
                    console.log("MultiEdge");
                    flag=1;
                }
            }
        if(flag==0)
            edgeList.push(arr);
    }

    
    this.updateNode = function(x,y,pos){
        if(x<0||y<0||x>1000||y>600)
            return;
        vertices[pos].x_cor  = x;
        vertices[pos].y_cor  = y;
        this.show();
    }
    this.show = function()
    {
        document.getElementById('graph').innerHTML = "";
        for(let i =0;i<noOfVertice;i++)
        {
            const el = document.getElementById("graph");
            const ver = document.createElementNS('http://www.w3.org/2000/svg',"circle");
            const txt  =document.createElementNS('http://www.w3.org/2000/svg',"text");
            txt.innerHTML  =  i+1;
            // ver.innerHTML ="hello";
            x_ver  = vertices[i].x_cor;   
            y_ver  = vertices[i].y_cor;
            x_text= x_ver-3;
            y_text = y_ver+6;
            id_cir = "cir" +i;
            id_text = "txt" + i;
            className = "node"+i;
            // console.log(x);

            ver.setAttributeNS(null,"stroke","black");
            ver.setAttributeNS(null,"stroke-width","2");
            ver.setAttributeNS(null,"fill","white");
            ver.setAttributeNS(null,"cx",x_ver);
            ver.setAttributeNS(null,"cy",y_ver);
            txt.style["font-size"]="16";
            txt.setAttributeNS(null,"x",x_text);
            txt.setAttributeNS(null,"y",y_text);
            txt.setAttributeNS(null,"stroke","black");
            ver.setAttributeNS(null,"r","15");
            ver.setAttributeNS(null,"id",id_cir);
            ver.setAttributeNS(null,"class",className);
            txt.setAttributeNS(null,"class",className);
            ver.addEventListener('click', function () {
                mouseEvent.onClick(mode,event,ver);
              }, false);
            txt.addEventListener('click', function () {
                mouseEvent.onClick(mode,event,ver);
              }, false);
            
            ver.addEventListener('mouseover', function () {
                mouseEvent.onMouseOver(mode,event,ver);
              }, false);
            txt.addEventListener('mouseover', function () {
                mouseEvent.onMouseOver(mode,event,ver);
              }, false);

            
            ver.addEventListener('mousemove', function () {
                mouseEvent.onMouseMove(mode,event,ver);
              }, false);
            txt.addEventListener('mousemove', function () {
                mouseEvent.onMouseMove(mode,event,ver);
              }, false);
            

            ver.addEventListener('mouseout', function () {
                mouseEvent.onMouseOut(mode,event,ver);
              }, false);
            txt.addEventListener('mouseout', function () {
                mouseEvent.onMouseOut(mode,event,ver);
              }, false);


            // ver.setAttributeNS(null,"onmouseover","onMouseOver(this)");
            // txt.setAttributeNS(null,"onmouseover","onMouseOver(this)");
            // ver.setAttributeNS(null,"onmousemove","onMouseMove(event,this)");
            // txt.setAttributeNS(null,"onmousemove","onMouseMove(event,this)");
            // ver.setAttributeNS(null,"onclick","onClick(event,this)");
            // txt.setAttributeNS(null,"onclick","onClick(event,this)");
            // ver.setAttributeNS(null,"onmouseout","onMouseOut(event,this)");
            // txt.setAttributeNS(null,"onmouseout","onMouseOut(event,this)");

            txt.setAttributeNS(null,"id",id_text);
            txt.setAttribute("style","z-index:10;");
            ver.setAttribute("style","z-index:10;");
            el.appendChild(ver);
            el.append(txt);
        }
        let err=0;

    for(let i =0;i<edgeList.length;i++)
        {

            let x = edgeList[i][0]-1;
            let y = edgeList[i][1]-1;
            if(x>(noOfVertice-1)||y>(noOfVertice-1)||x<0||y<0)
                {
                   err =1;
                   continue;
                }
            console.log(x);
            console.log(y);
            let x1 = vertices[x].x_cor-2;
            let y1 = vertices[x].y_cor-2;
            let x2 = vertices[y].x_cor-2;
            let y2 = vertices[y].y_cor-2;
            const el = document.getElementById("graph");
            const line = document.createElementNS('http://www.w3.org/2000/svg',"line");
            line.setAttributeNS(null,"x1",x1);
            line.setAttributeNS(null,"x2",x2);
            line.setAttributeNS(null,"y1",y1);
            line.setAttributeNS(null,"y2",y2);
            // line.setAttributeNS(null,"style","z-index : -1;")
            line.setAttributeNS(null,"style","stroke:rgb(255,0,0);stroke-width:2");
            el.appendChild(line);
        }
        if(err)
        alert("Some Edges were out of bounds! ");
    }
}
let dragObject;

// function onMouseDown(e,obj)
//     {
//         let className = obj.getAttribute("class");
//         dragObject = obj;
//         className  = className.replace("node","");
//         console.log(e.pageX,e.pageY);    
//         // document.addEventListener('mousemove', console.log("hello"));
//     }
// function onMouseUp(obj)
//     {
//         dragObject = null;
//     }
// function onMouseMove(e,obj)
//     {
//         if(dragObject ==  null) return;
//         let className = dragObject.getAttribute("class");
//         className  = className.replace("node","");
//         // console.log(e.pageX,e.pageY);   
//         let bodyRect = document.body.getBoundingClientRect();
//         let Rect = document.getElementById("graph").getBoundingClientRect();
//         let pos  = Rect.top - bodyRect.top ;
//         // pos = e.pageY - pos;
//         // console.log(pos,e.pageX,e.pageY-pos-20); 
//         graph.updateNode(e.pageX,e.pageY-pos,className);
//     }

// function onMouseOver(obj){
//     let className = obj.getAttribute("class");
//     let classes = document.getElementsByClassName(className);
//     // console.log(classes);
//     classes[0].setAttributeNS(null,"fill","black");
//     classes[1].setAttributeNS(null,"stroke","white");
// }

// function onMouseOut(e,x){
//     // console.log(x);
//     let className = x.getAttribute("class");
//     let classes = document.getElementsByClassName(className);
//     // console.log(classes);
//     classes[0].setAttributeNS(null,"fill","white");
//     classes[1].setAttributeNS(null,"stroke","black");

// }



// function onClick(e,obj){    
//     console.log(obj,dragObject);
    
//     if(dragObject!=null)
//     {
//         if(dragObject.getAttribute("class") == obj.getAttribute("class")){
//             dragObject = null;
//             return;
//         }
//     }
//     else    
//     {
//         dragObject  = obj;
//     }
//     let className = obj.getAttribute("class");
//     let classes = document.getElementsByClassName(className);
//     // console.log(classes);
//     classes[0].setAttributeNS(null,"fill","black");
//     classes[1].setAttributeNS(null,"stroke","white");

// }
graph = new Graph();
// setInterval(graph.show(),100);
function Input(){
    let n,m;
    n = parseInt(document.getElementById('vertices').value);
    m = document.getElementById('edges').value;
    graph.setVertices(n);
    m = m.replaceAll(" ","");
    m = m.replaceAll("\n","");
    console.log(m); 
    for(let i=0;i<m.length;i+=2){
        graph.addEdge(m[i],m[i+1]);
    }
    graph.show();
    // setInterval(graph.show(),100);
}


