
function Node(x,y){
    this.x_cor = x;
    this.y_cor =y;
};
function Graph(n){
    let vertices = [];
    let noOfVertice = n;
    let edgeList = [];
    createNodes();

    function createNodes(){ 
        for(let i=1;i<=noOfVertice;i++)
        {
            let v;
            if(i%2==1){
                let x = parseInt((i/2));
                v = new Node(10,(x+1)*10);
            }
            else{
                let x = parseInt(i/2);
                v = new Node(20,x*10);  
            }     
            vertices.push(v);
        }
    }
    this.addEdge = function(a,b){
        let arr = [a,b];
        edgeList.push(arr);
    }
   

    this.show = function()
    {
        for(let i =0;i<noOfVertice;i++)
        {
            const el = document.getElementById("graph");
            const ver = document.createElementNS('http://www.w3.org/2000/svg',"circle");
            const txt  =document.createElementNS('http://www.w3.org/2000/svg',"text");
            txt.innerHTML  =  i+1;
            // ver.innerHTML ="hello";
            x_ver  = vertices[i].x_cor*10;   
            y_ver  = 100+vertices[i].y_cor*5;
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
            ver.setAttributeNS(null,"onmouseover","onMouseOver(this)");
            ver.setAttributeNS(null,"onmouseout","onMouseOut(this)");
            txt.setAttributeNS(null,"onmouseover","onMouseOver(this)");
            txt.setAttributeNS(null,"onmouseout","onMouseOut(this)");
            txt.setAttributeNS(null,"class",className);
            txt.setAttributeNS(null,"id",id_text);
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
            let x1 = vertices[x].x_cor*10;
            let y1 = 100+ vertices[x].y_cor*5;
            let x2 = vertices[y].x_cor*10;
            let y2 = 100+vertices[y].y_cor*5;
            const el = document.getElementById("graph");
            const ver = document.createElementNS('http://www.w3.org/2000/svg',"line");
            ver.setAttributeNS(null,"x1",x1);
            ver.setAttributeNS(null,"x2",x2);
            ver.setAttributeNS(null,"y1",y1);
            ver.setAttributeNS(null,"y2",y2);
            ver.setAttributeNS(null,"style","stroke:rgb(255,0,0);stroke-width:2");
            el.appendChild(ver);
        }
        if(err)
        alert("Some Edges were out of bounds ! ");
        
   

    }
}
function onMouseOver(x)
    {
       let className = x.getAttribute("class");
       document.getElementsByClassName(className)[0].setAttribute("fill","black");
       document.getElementsByClassName(className)[1].setAttribute("stroke","white");
    //    document.getElementsByClassName(className)[0].setAttribute("r","17");

    }
function onMouseOut(x)
    {
    let className = x.getAttribute("class");
       document.getElementsByClassName(className)[0].setAttribute("fill","white");
       document.getElementsByClassName(className)[1].setAttribute("stroke","black");
    //    document.getElementsByClassName(className)[0].setAttribute("r","15");
    }
function Input(){
    let n,m;
    n = parseInt(document.getElementById('vertices').value);
    m = document.getElementById('edges').value;
    graph = new Graph(n);
    m = m.replaceAll(" ","");
    m = m.replaceAll("\n","");
    console.log(m); 
    for(let i=0;i<m.length;i+=2){
        graph.addEdge(m[i],m[i+1]);
    }
    graph.show();
}


