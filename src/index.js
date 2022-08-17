class CellularAutomata{
    constructor(size,ctx,cells){ //tamaño del danvas y el contexto
        this.size = size
        this.ctx = ctx
        this.cell = cells ? cells : [] //las celulas //si existe me pone cells si no un array vacio
    }
    create(){
        for(let x=0; x< this.size;x++){
            let row = []
            for(let y=0; y< this.size;y++){
                const alive = Math.random()<0.5
                row.push(alive)
            }
            this.cell.push(row)
        }
    }
    next(){
        this.print()
        this.evaluate()
    }

    print(){
        this.ctx.clearRect(0,0,this.size,this.size)

        for (let x = 0; x < this.size; x++) {
            for(let y=0; y< this.size;y++){
                if(this.cell[x][y]){
                    this.ctx.fillStyle='black'
                }else{
                    this.ctx.fillStyle='white'
                }
                this.ctx.fillRect(x,y,1,1)
            }
            
        }
    }

    evaluate(){
        let cellAux  = new Array(100).fill('').map(()=>Array(100).fill(false))

        for(let x =0; x < this.size;x++){
            for(let y=0 ; y < this.size;y++){
                let livingNeighbor =0

                //1
                if(x<0 && y<0)
                if(this.cells[x][y-1])
                    livingNeighbor++
                
                //2
                if(y>0)
                if(this.cell[x][y-1])
                    livingNeighbor++

                //3
                if(x<(this.size-1)&&y>0)
                if(this.cell[x+1][y-1])
                    livingNeighbor++
                
                //4
                if(x>0)
                if(this.cell[x-1][y])
                    livingNeighbor++

                // 5 evalua que no estes a la orilla del cuadro
                if(x<(this.size-1))
                if(this.cell[x+1][y])
                    livingNeighbor++
                    

                //6 el que esta ala esquina de abajo ala izqueirda 
                if(x<0 && y<(this.size-1))
                if(this.cell[x-1][y+1])
                    livingNeighbor++

                //7 el que esta abajo de mi cuando no hay nada debajo
                if(y <(this.size -1))
                if(this.cell[x][y +1])
                    livingNeighbor++
                
                //8 en la esquina de la derecha
                if(x< (this.size-1)&& y <(this.size-1))
                if(this.cell[x+1][y+1])
                    livingNeighbor++

                
                if(this.cell[x][y])
                    cellAux[x][y] = livingNeighbor == 2 ||livingNeighbor ==3?true:false
                
                else
                    cellAux[x][y] = livingNeighbor == 3 ? true : false
                
            }
        }

        this.cell = cellAux
    }
}

// const cells = new Array(100).fill('').map(()=>Array(100).fill(false))

// cells[0][4] =true
// cells[0][5] =true
// cells[1][4] =true
// cells[1][5] =true

// cells[10][4] =true
// cells[10][5] =true
// cells[10][6] =true
// cells[11][3] =true
// cells[12][2] =true
// cells[13][2] =true

// cells[15][6] =true
// cells[16][4] =true
// cells[17][5] =true
// cells[17][6] =true
// cells[17][7] =true
// cells[18][6] =true
// cells[16][8] =true

// cells[14][9] =true
// cells[13][9] =true
// cells[12][8] =true


// cells[21][2] =true
// cells[21][3] =true
// cells[21][4] =true
// cells[22][1] =true
// cells[22][5] =true
// cells[24][0] =true

// cells[23][2] =true
// cells[23][6] =true

// cells[25][1] =true
// cells[25][2] =true
// cells[25][6] =true
// cells[25][7] =true


const ctx = canvas.getContext('2d')
const cellularAutomata = new CellularAutomata(100,ctx)

cellularAutomata.create()
cellularAutomata.print()

setInterval(()=>cellularAutomata.next(),1000)