
function node(x,y){
    this.x_cor = x;
    this.y_cor =y;
}
const vertices = [];
var n,m;
function Input(){
    n = parseInt(document.getElementById('vertices').value);
    m = document.getElementById('edges').value;
    for(let i=1;i<=n;i++)
        {
            let v;
            if(i%2==1){
                let x = parseInt((i/2));
                 v = new node(10,(x+1)*10);
            }
            else{
                let x = parseInt(i/2);
                v = new node(20,x*10);  
            }     
            vertices.push(v);
        }
    // console.log(vertices);
    drawGraph();    
}
function drawGraph()
{ 
    for(let i =0;i<n;i++)
        {
            const el = document.getElementById("hey");
            const ver = document.createElementNS('http://www.w3.org/2000/svg',"circle");
            const txt  =document.createElementNS('http://www.w3.org/2000/svg',"text");
            txt.innerHTML  =  i+1;
            // ver.innerHTML ="hello";
            x  = String(vertices[i].x_cor*10);   
            y  =String(100+vertices[i].y_cor*5);
            console.log(x);
            ver.setAttributeNS(null,"cx",x);
            ver.setAttributeNS(null,"cy",y);
            txt.setAttributeNS(null,"x",x);
            txt.setAttributeNS(null,"y",y);
            txt.setAttributeNS(null,"stroke","white");
            ver.setAttributeNS(null,"r","15");
            el.appendChild(ver);
            el.append(txt);
        }
    for(let i =0;i<m.length;i+=4)
        {

            let x = m[i]-1;
            let y = m[i+2]-1;
            console.log(x);
            console.log(y);
            let x1 = vertices[x].x_cor*10;
            let y1 = 100+ vertices[x].y_cor*5;
            let x2 = vertices[y].x_cor*10;
            let y2 = 100+vertices[y].y_cor*5;
            const el = document.getElementById("hey");
            const ver = document.createElementNS('http://www.w3.org/2000/svg',"line");
            ver.setAttributeNS(null,"x1",x1);
            ver.setAttributeNS(null,"x2",x2);
            ver.setAttributeNS(null,"y1",y1);
            ver.setAttributeNS(null,"y2",y2);
            ver.setAttributeNS(null,"style","stroke:rgb(255,0,0);stroke-width:2");
            el.appendChild(ver);
        }   
}



