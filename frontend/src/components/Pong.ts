import { Paddle } from "./Paddle.js";  // Import Paddle class
import { Ball } from "./Ball.js";      // Import Ball class
import { Ground } from "./Ground.js";  // Import Ground class
//import { Loop } from "./Loop.js";      // Import Loop class

class Pong {
  private scene: any;
  private paddle: Paddle | null;
  private ball: Ball | null;
  private ground: Ground | null ;
  private x_boundaries:number[] | null;
  private z_boundaries:number[] | null;
  public collisionState:boolean = false;
 
 
  constructor(scene: any) {
    this.scene = scene;
    this.paddle = null;
    this.ball = null;
    this.ground = null;
    this.x_boundaries = null;
    this.z_boundaries = null;
    this.init();
  }

  public init(): void {
    // Initialize Ground
    this.ground = new Ground(this.scene);
    this.x_boundaries=this.ground?.getXBoundaries(); 
    this.z_boundaries=this.ground?.getZBoundaries();
    // Initialize Paddle with ground width
   // const groundWidth = Ground.getWidth();
    this.paddle = new Paddle(this.scene); // Pass scene

    // set boundarie : 
    this.paddle.setBoundaries(this?.x_boundaries,this?.z_boundaries);
    // Initialize Ball
    this.ball = new Ball(this.scene, { x: 0, y: 1, z: 0 });

    // Initialize any loops or additional game mechanics
   // Loop.start(this.scene); // Assuming Loop is a class managing the game loop
  }

  // Optionally, add an update method if you need to update game objects on each frame
   public update(): void {
    if( !this.ball || !this.paddle)
        return;
    this.paddle!.update();
   // this.display();
    this.collision();
  } 

   public collision():void{
    
      const isColliding =
          this.ball?.mesh?.intersectsMesh!(this.paddle?.leftPaddle, false) ||
          this.ball?.mesh?.intersectsMesh!(this.paddle?.rightPaddle, false) 
    

          // if we assume x_boundaries! exist , we need to check it before 
      const ballGroundCollision_x =  
          this.ball?.mesh?.position.x <= this.x_boundaries![0] ||
          this.ball?.mesh?.position.x >= this.x_boundaries![1]
    
      const ballGroundCollision_z =  
          this.ball?.mesh?.position.z <=this.z_boundaries![0] ||
          this.ball?.mesh?.position.z >= this.z_boundaries![1];

      if (isColliding && !this.collisionState)
        {
          // Collision just started
           console.log(" Paddle Colliding");
          this.collisionState = true;
          // we check before so it must exist 
         this.ball!.ballVector.x*=-1;  
        }

      if (ballGroundCollision_x && !this.collisionState) 
        {
            // Collision just started
            this.collisionState = true;
            this.ball!.reset();
            console.log("ballGroundCollision_x  /  this.ball!.mesh.x : ", this.ball!.mesh.position.x);
        } 
      
      if (ballGroundCollision_z && !this.collisionState) 
        {
          // Collision just started
          console.log("ballGroundCollision_z");
          this.collisionState = true;
          this.ball!.ballVector.z *=-1; 
        }
      else if (!isColliding)
        {
          // No collision, reset state
          this.collisionState = false;
        } 
      this.ball!.update(this.ball!.ballVector);

   }

  public display():void {

      this.ground?.display();
      this.ball?.display();
      this.paddle?.display();
    }

  public print(item:any,msg:String):void
  {
    console.log(" element : ",msg," - ",item); 
  }
  public debug(isColliding:any,ballGroundCollision_x:any,ballGroundCollision_z:any):void 
  {
        if(isColliding)
          console.log("isColliding : ",isColliding);
        if(ballGroundCollision_x)
          console.log("ballGroundCollision_x : ",ballGroundCollision_x);
        if(ballGroundCollision_z)
          console.log("ballGroundCollision_z : ",ballGroundCollision_z);

  }
}

export { Pong };
