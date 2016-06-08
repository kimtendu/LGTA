/**
 * Created by kimtendu on 07.06.2016.
 */


var objCar = { //create object car
    posX: 0,
    posY: 0 //get start position of object
};


var objMap = { //create object map. map its contains fields
    config: {
        patchID     :   "Map",
        freeBlock   :   "road",
        filledBlock :   "wall"
    },
    fields:{
        width   :   5,
        height  :   5,
        blocks  :   []
    }

};

//generation of blocks
for (var i = 0; i < objMap.fields.width; i++){
    objMap.fields.blocks[i] = [i];
    //console.log(i, objMap.fields.blocks[i]);
    for (var j = 0; j < objMap.fields.height; j++){
        var randBrick = Math.random();
        //console.log(randBrick);
        //randBrick = randBrick<0.51 ? randBrick = objMap.config.freeBlock : randBrick = objMap.config.filledBlock;
        objMap.fields.blocks[i][j] = { i : i, j: j, bCheak: 0, sClassName: objMap.config.filledBlock };
        //console.log(i, j, objMap.fields.blocks[i][j]);
    }
}


var arrStock = [];  //array for stock
//function getNeborhoods create for getting all posible brick in area
function getNeborhoods(i, j ){
    //var i = input.i;
    //console.log('i - ', i)
    //var j = input.j;
    //console.log('j - ', j)
    var arrOutput = [];
    var imin = i-1 <0 ? imin = 0 : imin = i-1;
    var iplus = i+1 > objMap.fields.height -1  ? iplus = objMap.fields.height -1 : iplus=i+1 ;
    var jmin = j-1<0 ? jmin = 0 : jmin = j-1
    var jplus = j+1  > objMap.fields.width -1 ? jplus = objMap.fields.width -1 : jplus=j+1  ;
    var q=0;
    //var test = typeof objMap.fields.blocks[imin][j];
console.log( objMap.fields.blocks[iplus][j].bCheak);
    if (typeof objMap.fields.blocks[imin][j]!=="undefined"  && objMap.fields.blocks[imin][j].bCheak == 0 )  { arrOutput[q] =  objMap.fields.blocks[imin][j]; q++; }
    if (typeof objMap.fields.blocks[iplus][j]!=="undefined" && objMap.fields.blocks[iplus][j].bCheak == 0)  { arrOutput [q] =  objMap.fields.blocks[iplus][j]; q++;}
    if (typeof objMap.fields.blocks[i][jmin]!=="undefined"  && objMap.fields.blocks[i][jmin].bCheak == 0)   { arrOutput [q] =  objMap.fields.blocks[i][jmin]; q++;}
    if (typeof objMap.fields.blocks[i][jplus]!=="undefined" && objMap.fields.blocks[i][jmin].bCheak == 0)  { arrOutput [q] =  objMap.fields.blocks[i][jplus]; q++;}

    return arrOutput;

}
//console.log(objMap.fields.blocks[3][5]);

function createLabirint(objBlocks) {
    var i = objBlocks.i;
    console.log('i - ', i);
    var j = objBlocks.j;
    console.log('j - ', j);

    var arrNeiborStack = getNeborhoods(i, j); //get array of neiborhoods
    objBlocks.bCheak = 1;
    console.log (objBlocks);
    objBlocks.sClassName = objMap.config.freeBlock;
    if (arrNeiborStack) {
        console.log(arrNeiborStack);
        var item = arrNeiborStack[Math.floor(Math.random() * arrNeiborStack.length)]; //get one of item from array
        createLabirint(item);
    }

    return true;
}

//console.log(objMap.fields.blocks[0][0].i);
createLabirint(objMap.fields.blocks[0][0]);

console.log( objMap.fields.blocks[3][3].bCheak);

//console.log(objMap.config.patchID);

var MapDom = document.getElementById(objMap.config.patchID);
//MapDom.innerHtml = ''; //clear the list
//lets paint it black
for ( var i = 0; i < objMap.fields.width; i++){
    var newRow = document.createElement('div')
    newRow.classList.add('row');
    MapDom.appendChild(newRow);
    for (var j = 0; j < objMap.fields.height; j++){
        var newCell = document.createElement('div');
        newCell.classList.add(objMap.fields.blocks[i][j].sClassName);
        newRow.appendChild(newCell);
       // MapDom.innerHTML += objMap.fields.blocks[i][j]? objMap.config.filledBlock :objMap.config.freeBlock;
    }
}


//console.log(objMap.fields.blocks);