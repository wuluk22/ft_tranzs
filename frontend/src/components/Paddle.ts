declare const BABYLON: any;

export class Paddle {
  private  colors: any;
  private  width: number = 1;
  private  height: number = 1;
  private  depth: number = 10;
  
  public  leftPaddle: any | null = null;
  public  rightPaddle: any | null = null;

  private  moveUpL: boolean = false;
  private  moveDownL: boolean = false;
  private  moveUpR: boolean = false;
  private  moveDownR: boolean = false;

  private z_min: number= 0;
  private z_max: number = 0;
  private x_min: number = 0;
  private x_max: number = 0;

  private  paddleSpeed: number = 1.5;

  constructor(scene:any){
    this.init(scene,50);

}

      // Initialize paddles with given scene and ground width
        init(scene:any, g_width: number): void {
          this.colors = [
              new BABYLON.Color3.Red(),
              new BABYLON.Color3.Red(),
              new BABYLON.Color3.Red(),
              new BABYLON.Color3.Red(),
              new BABYLON.Color3.Red(),
              new BABYLON.Color3.Red(),
            ];
            
            const positions = this.getPositions(g_width);
            this.leftPaddle = this?.createPaddle("Left Paddle", positions.left, scene);
            this.rightPaddle = this?.createPaddle("Right Paddle", positions.right, scene);
            

            this.setupInputControls();
        }
        
        private  getPositions(g_width: number): { left: number; right: number; } {
            return {
                left: -g_width / 2 + this.width / 2,
                right: g_width / 2 - this.width / 2,
            };
        }
        
        private  createPaddle(name: string, positionX: number, scene:any): any {
            const paddleOpt = {
                width: this.width,
                height: this.height,
                depth: this.depth,
                faceColors: this.colors,
            };
            
            const paddle = BABYLON.MeshBuilder.CreateBox(name, paddleOpt, scene);
            paddle.position = new BABYLON.Vector3(positionX, 0, 0);
            return paddle;
        }
        
        private  updatePaddlesMovement(): void {
            if (this.moveUpL && this.leftPaddle!.position.z < this.z_max! - this.depth / 2) {
                this.leftPaddle!.position.z += this.paddleSpeed;
            }
            if (this.moveDownL && this.leftPaddle!.position.z > this.z_min!  + this.depth / 2) {
                this.leftPaddle!.position.z -= this.paddleSpeed;
            }
            if (this.moveUpR && this.rightPaddle!.position.z < this.z_max!  - this.depth / 2 ) {
                this.rightPaddle!.position.z += this.paddleSpeed;
            }
            if (this.moveDownR && this.rightPaddle!.position.z >  this.z_min!+  this.depth / 2) {
                this.rightPaddle!.position.z -= this.paddleSpeed;
            }
        }
                        /// min - max
        public setBoundaries(x_bound:number[],z_bound:number[]):void
        {

            this.z_min = z_bound[0];
            this.z_max = z_bound[1];

            this.x_min = x_bound[0];
            this.x_max = x_bound[1];
            console.log("boundarie:",this.z_min);

        }
        
        public display():void{
            console.log("RightPaddle : ", this?.rightPaddle.position);
            console.log("LeftPaddle : ", this?.leftPaddle.position);
            console.log("Paddle boundaries : z_max",this.z_max!," z_min",this.z_min! )
            console.log("Paddle boundaries : x_max",this.x_max!," x_min",this.x_min! )
            console.log("Paddle depth :",this.depth!)
        }

        private  setupInputControls(): void {
            // Key Press (Start Movement)
            window.addEventListener('keydown', (e) => {
                switch (e.key) {
                    case "ArrowUp":
                        this.moveUpR = true;
                        break;
                    case "ArrowDown":
                        this.moveDownR = true;
                        break;
                    case "W":
                    case "w":
                        this.moveUpL = true;
                        break;
                    case "S":
                    case "s":
                        this.moveDownL = true;
                        break;

                    }
                });
                                    
            // Key Release (Stop Movement)
            window.addEventListener('keyup', (e) => {
                switch (e.key) {
                    case "w":
                    case "W":
                        this.moveUpL = false;
                          break;
                    case "s":
                    case "S":
                        this.moveDownL = false;
                        break;
                    case "ArrowUp":
                        this.moveUpR = false;
                        break;
                    case "ArrowDown":
                        this.moveDownR = false;
                        break;
        }
    });
  }
  
  // Optionally add an update method if the paddle needs to move during each frame
  public  update(): void {
      this.updatePaddlesMovement();
    }

}
