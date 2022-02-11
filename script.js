
function Node(x,y){
    this.x_cor = x;
    this.y_cor =y;
    // this.update = 0; 
};

graph = new Graph();
function MouseEvents()
{
    this.onMouseOver = function(Mode,e,obj){
        if(Mode == 1)   
        {
            let className = obj.getAttribute("class");
            let classes = document.getElementsByClassName(className);
            // console.log(e);
            classes[0].setAttributeNS(null,"fill","#FF5400");
            classes[1].setAttributeNS(null,"stroke","black");
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

            console.log(e);
            if(Mode == 1)   
            {
                // console.log(obj,dragObject);
              
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
                classes[0].setAttributeNS(null,"fill","#FF5400");
                classes[1].setAttributeNS(null,"stroke","black");
        }


        if(Mode  == 2)
            {
                let className = obj.getAttribute("class");
                className = className.replace("node" ,"");
                console.log(className);
                graph.show();
                graph.bfs(className);
            }
        if(Mode ==  3)  
            {
                let className = obj.getAttribute("class");
                className = className.replace("node" ,"");
                console.log(className);
                className = parseInt(className);
                graph.show();
                graph.dfs(className);
            }
    }
    this.onMouseOut = function(Mode,e,x){
        if(Mode == 1)   
        {
                let className = x.getAttribute("class");
                let classes = document.getElementsByClassName(className);
                // console.log(classes);
                classes[0].setAttributeNS(null,"fill","black");
                classes[1].setAttributeNS(null,"stroke","white");
        }
    }
}
function Graph(){
    let orderofbfs = [];
    let orderofdfs = [];
    let vertices = [];
    let noOfVertice;
    let mode =0;
    let edgeList = [];
    let adjacencyList = [];
    // let update = 0;
    let mouseEvent = new MouseEvents;
    this.setVertices  = function(n)
        {
            noOfVertice = n;
            vertices = [];
            edgeList= [];
            createNodes();
        }
    let cnt1=0,cnt2=0,cnt3=0;
    this.setMode = function(m)
        {
            mode = m;
            if(m==1)
                {
                    if(cnt1==0)
                        alert("You have entered edit mode! Click on the node you want to move and then move it.");
                    cnt1++;
                }
            if(m==2)
                {
                    if(cnt2==0)
                        {
                            alert("Click on the node you want to start BFS on!");
                        }
                    cnt2++;
                }
            if(m==3)
                {
                    if(cnt3==0)
                    {
                        alert("click on the node you want to start dfs on!");
                    }
                }
        }

    function createNodes(){ 


        console.log(vertices);
        center_x  = screen.width*0.4 + noOfVertice*5;
        center_y = screen.height*0.3 + noOfVertice*5;
        angle = 2*Math.PI/noOfVertice;
        newvertices = [];
        for(let i=1;i<=noOfVertice;i++)
        {
            let v;
            xcor = center_x + noOfVertice*15*Math.sin(i*angle);
            ycor = center_y + noOfVertice*15*Math.cos(i*angle);
            v = new Node(xcor,ycor);
            newvertices.push(v);
        }
        vertices = newvertices;
    }
    this.addEdge = function(a,b){
        let arr = [a,b];
        let flag=0;
        for(let i=0;i<edgeList.length;i++)
            {
                if(edgeList[i]==arr){
                    // console.log("MultiEdge");
                    flag=1;
                }
            }
        if(flag==0)
            edgeList.push(arr);
    }
    this.deleteEdge = function(a,b){
        a =parseInt(a);
        b= parseInt(b); 
        let newEdge = [];
        for(let i=0;i<edgeList.length;i++)
            {
                if(!((edgeList[i][0]==a&&edgeList[i][1]==b) || (edgeList[i][0]==b&&edgeList[i][1]==a)))
                    newEdge.push(edgeList[i]);
            }
        edgeList = newEdge;
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
            // console.log(x);
            // console.log(y);
            let x1 = vertices[x].x_cor;
            let y1 = vertices[x].y_cor;
            let x2 = vertices[y].x_cor;
            let y2 = vertices[y].y_cor;
            const el = document.getElementById("graph");
            const line = document.createElementNS('http://www.w3.org/2000/svg',"line");
            line.setAttributeNS(null,"x1",x1);
            line.setAttributeNS(null,"x2",x2);
            line.setAttributeNS(null,"y1",y1);
            line.setAttributeNS(null,"y2",y2);
            // line.setAttributeNS(null,"style","z-index : -1;")
            line.setAttributeNS(null,"style","stroke:white;stroke-width:2");
            el.appendChild(line);
        }
        if(err)
        alert("Some Edges were out of bounds! ");
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
            ver.setAttributeNS(null,"fill","black");
            ver.setAttributeNS(null,"cx",x_ver);
            ver.setAttributeNS(null,"cy",y_ver);
            txt.style["font-size"]="16";
            txt.setAttributeNS(null,"x",x_text);
            txt.setAttributeNS(null,"y",y_text);
            txt.setAttributeNS(null,"stroke","white");
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
    }
    function color(arr,index)
    {
         
        className = "node"+arr[index];
        let classes = document.getElementsByClassName(className);
        classes[0].setAttributeNS(null,"fill","#FF5400");  
        classes[1].setAttributeNS(null,"stroke","white");
        // color(arr,index);
    }
    function algoReady()
    {
        adjacencyList = [];
        for(let i=0;i<noOfVertice;i++)
            {
                adjacencyList.push([]);
            }
        for(let i=0;i<edgeList.length;i++)
            {
                let temp = edgeList[i];
                adjacencyList[temp[0]-1].push(temp[1]-1);
                adjacencyList[temp[1]-1].push(temp[0]-1);
            }
        // console.log(adjacencyList)
    }

    this.bfs = function(x)
    {
        algoReady();
        orderofbfs = [];
        let queue = [];
        let cur = 0;
        let visit = [];     
        for(let i=0;i<noOfVertice;i++)
            visit.push(0);
        queue.push(x);
        while(cur < queue.length)
            {   
                let u  = parseInt(queue[cur]);
                if(visit[u] == 1)
                    {
                        cur++;
                        continue;
                    }
                orderofbfs.push(u);
                visit[u] = 1;
                cur++;
                console.log(u);
                for(let i=0;i<adjacencyList[u].length;i++)
                    {
                        v = adjacencyList[u][i];
                        // console.log(v);
                        v= parseInt(v);
                        if(visit[v]==0)
                            {

                                queue.push(v);  
                            }
                    }
            }
        index =0;
        myInterval = setInterval(function(){color(orderofbfs,index);index++;if(index==orderofbfs.length){
            clearInterval(myInterval);
           return;}},1000);
        // color(orderofbfs,index);
        console.log(orderofbfs);
    }

    this.dfs  = function(x)
        {
            orderofdfs = [];
            algoReady();
            let visit  = [];
            for(let i=0;i<noOfVertice;i++) 
            {
                visit.push(0);
            }
            doDfs(visit,x);
            index =0;
            myInterval = setInterval(function(){color(orderofdfs,index);index++;if(index==orderofdfs.length){
            clearInterval(myInterval);
           return;}},1000);
            console.log(orderofdfs);
        }
    function doDfs(visit,x)
        {
            console.log("yes");
            if(visit[x]==0)
                {
                    visit[x]=1;
                    orderofdfs.push(x);
                    for(let i =0;i<adjacencyList[x].length;i++)
                        {
                            if(visit[adjacencyList[x][i]]==0)
                                doDfs(visit,adjacencyList[x][i]);
                        }
                }
        }


}
let dragObject;

// setInterval(graph.show(),100);
function Input(){
    let n,m;
    n = parseInt(document.getElementById('vertices').value);
    m = document.getElementById('edges').value;
    graph.setVertices(n);
    m = m.replaceAll(" ","");
    m = m.replaceAll("\n","");
    // console.log(m); 
    for(let i=0;i<m.length;i+=2){
        graph.addEdge(m[i],m[i+1]);
    }
    graph.show();
    // setInterval(graph.show(),100);
}

function setMode(mode)
{
    graph.setMode(mode);
}
function newEdge()
    {
        m  = document.getElementById('newEdge').value;
        m = m.replace(" ","");
        m = m.replaceAll("\n","");
        for(let i=0;i<m.length;i+=2){
            graph.addEdge(m[i],m[i+1]);
        }
        graph.show();
    }
function deleteEdge()
    {
        m  = document.getElementById('deleteEdge').value;
        m = m.replace(" ","");
        m = m.replaceAll("\n","");
        for(let i=0;i<m.length;i+=2){
            graph.deleteEdge(m[i],m[i+1]);
        }
        graph.show();
    }


