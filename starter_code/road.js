function Road (){
    this.version = '1.0';
    this.canvasDOM = undefined;
    this.ctx = undefined;
    this.w = 400;
    this.h = 500;
    //this.car = new Car(200, 370, 70, 100)
    this.carPosX = 200;
    this.carPosY = 370;
    this.obstacles = []
} 

Road.prototype._setCanvasDimensions = function () {
    this.canvasDOM.setAttribute("width", this.w);
    this.canvasDOM.setAttribute("height", this.h)
}


Road.prototype._drawGrass = function(){
    this.ctx.fillStyle = "#008100";
    this.ctx.fillRect(0, 0, this.w, this.h);
}

Road.prototype._drawRoad = function(){
    this.ctx.fillStyle = "#808080";
    this.ctx.fillRect(30, 0, 10, this.h);
    this.ctx.fillRect(360, 0, 10, this.h);
    this.ctx.fillRect(50, 0, 300, this.h);
}

Road.prototype._drawContLines = function(){
    this.ctx.fillStyle = "#FFFFFF";
    this.ctx.fillRect(40, 0, 10, this.h);
    this.ctx.fillRect(350, 0, 10, this.h);
}

Road.prototype._drawDiscLines = function(){
    // this.ctx.fillStyle = "#FFFFFF";
    // this.ctx.fillRect(195, 0, 10, this.h);
    this.ctx.beginPath();
    this.ctx.strokeStyle = "#FFFFFF";
    this.ctx.lineWidth = 5;
    this.ctx.setLineDash([30, 30]);
    this.ctx.moveTo(200, 0);
    this.ctx.lineTo(200, this.h);
    this.ctx.stroke();
}

Road.prototype.moveDiscLines = function(){
    var yPos = -600;
    var that = this;
    intervalID = setInterval(function () {
        that.ctx.clearRect(0, 0, that.w, that.h);
        that._drawGrass()
        that._drawRoad()
        that._drawContLines()
        that.ctx.beginPath();
        that.ctx.strokeStyle = "#FFFFFF";
        that.ctx.lineWidth = 5;
        that.ctx.setLineDash([30, 30]);
        that.ctx.moveTo(200, yPos);
        that.ctx.lineTo(200, that.h);
        that.ctx.stroke();
        that.ctx.closePath();
        that.drawCar(that.carPosX, that.carPosY)
        that.drawObstacle()
        that.detectCollision(this.intervalID);
        if(yPos == 0){
            yPos = -600;
        }
        that.obstacles.forEach(function(obs){
            obs.posY += 4;
        })
        yPos+=4;
    }, 20)
}

Road.prototype.drawCar = function(posX, posY){
    var img = document.querySelector("#car");
    this.ctx.drawImage(img, this.carPosX, this.carPosY, 70, 100);
}

Road.prototype.drawObstacle = function(){
    var that = this;
    this.obstacles.forEach(function(obs){
        that.ctx.fillStyle = "#FF0000";
        that.ctx.fillRect(obs.posX, obs.posY, obs.width, obs.height);
    })
    
}

Road.prototype.detectCollision = function(intervalID){
    //console.log(this.carPosX+"/"+this.carPosY+"   obs1: "+this.obstacles[0].posX+"/"+this.obstacles[0].posY);
    // console.log(this.carPosX+" - "+this.obstacles[0].posX+"  ,  "+this.carPosY+" - "+this.obstacles[0].posY)
    if (
        this.carPosX + 70 >= this.obstacles[0].posX &&
        this.obstacles[0].posX + this.obstacles[0].width >= this.carPosX &&
        this.carPosY + 100 >= this.obstacles[0].posY &&
        this.obstacles[0].posY + this.obstacles[0].height >= this.carPosY
        ){
            console.log("crash")
            clearInterval(intervalID)
        }
}

Road.prototype.init = function(canvasSelector) {
    this.canvasDOM = document.querySelector(canvasSelector)
    this.ctx = this.canvasDOM.getContext('2d');

    this._setCanvasDimensions()
    this._drawGrass()
    this._drawRoad()
    this._drawContLines()
    this._drawDiscLines()
    this.drawCar()
    // this._drawDiscLines()
}



function Obstacle( posX, posY, width, height) {
    this.posX = posX;
    this.posY = posY;
    this.width = width;
    this.height = height;
}

function Car (posX, posY, width, height) {
    this.posX = posX;
    this.posY = posY;
    this.width = width;
    this.height = height;
}
