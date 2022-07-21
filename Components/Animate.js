export default class Animate{
    constructor(animationArray){
        this.array = animationArray
        this.n = animationArray.length
        this.it = -1;
        this.intervalId= 0;
        this.next = function(){
            // clearInterval(this.intervalId)
            if(this.it === this.n-1) 
                {
                    clearInterval(this.intervalId)
                    return;
                }
                this.it = Math.min(this.it+1,this.n-1)
                this.array[this.it].change();
        }
        this.prev = function(){
            // clearInterval(this.intervalId)
            if(this.it === -1) return;
            // console.log(this.it);
            this.array[this.it].reverseChange();
            this.it = Math.max(this.it-1,-1);
        }
        this.reset = function(){
            clearInterval(this.intervalId)
            while(this.it > -1)
                {
                    this.array[this.it].reverseChange();
                    this.it = this.it - 1;
                }
        }
        this.start = function(){
            this.reset();
            this.intervalId = setInterval(() => {this.next()},1000);
        }
        this.pause = function(){
            clearInterval(this.intervalId)
        }
        this.resume = function(){
            this.intervalId = setInterval(() => {this.next()},1000);
        }
    }
}