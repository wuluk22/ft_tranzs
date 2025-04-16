declare const BABYLON: any; // Babylon.js is loaded via CDN
const IMG_PATH='./dist/img'

export class Ground {
  private width: number = 50;
  private height: number = 30; // Babylon.js uses "height" for ground, not depth
  private z_min: number = -15;
  private z_max: number = 15;
  private x_min: number = -25;
  private x_max: number = 25;

  private groundMesh: any = null;
  private material: any = null;

  constructor(private scene: any) {
    this.init(); // Automatically initialize when created
  }

  private init(): void {
    if (this.groundMesh) return; // Prevent duplicate creation

    const options = { width: this.width, height: this.height };
    this.groundMesh = BABYLON.MeshBuilder.CreateGround("ground", options, this.scene);

    // Apply a Standard Material with stone texture
    this.material = new BABYLON.StandardMaterial("stoneMaterial", this.scene);
    const uvScale = 4;
    const texArray: any[]= [];

    // Load Textures
    const diffuseTex = new BABYLON.Texture(`${IMG_PATH}/grass/01_grass_diffuse.jpg`, this.scene);
    this.material.diffuseTexture = diffuseTex;
    texArray.push(diffuseTex);

    const normalTex = new BABYLON.Texture(`${IMG_PATH}/grass/01_grass_normal.jpg`, this.scene);
    this.material.bumpTexture = normalTex;
    this.material.invertNormalMapX = true;
    this.material.invertNormalMapY = true;
    texArray.push(normalTex);

    const aoTex = new BABYLON.Texture(`${IMG_PATH}/grass/01_grass_ao.jpg`, this.scene);
    this.material.ambientTexture = aoTex;
    texArray.push(aoTex);

    // Adjust texture tiling
    texArray.forEach((tex) => {
      tex.uScale = uvScale;
      tex.vScale = uvScale;
    });

    this.groundMesh.material = this.material;
    this.groundMesh.receiveShadows = true;

  //  this.createTribune();
  }

  private createTribune(): void {
    // Create a cylinder
    const cylinder = BABYLON.MeshBuilder.CreateCylinder(
      "cylinder",
      { diameter: 2, height: 5, tessellation: 16 },
      this.scene
    );

    // Position the cylinder
    cylinder.position.y = 2;

    // Create a Standard Material for the cylinder
    const cylinderMaterial = new BABYLON.StandardMaterial("cylinderMaterial", this.scene);

    // Apply a texture to the cylinder
    const texture = new BABYLON.Texture(`${IMG_PATH}/asset/01_asset_diffuse.jpg`, this.scene);
    cylinderMaterial.diffuseTexture = texture;

    // Apply the material to the cylinder
    cylinder.material = cylinderMaterial;
  }

  // Getter methods
  public getWidth(): number {
    return this.width;
  }

  public getHeight(): number {
    return this.height;
  }

  public displayBoundaries(): void {
    console.log(
      "z_min:", this.z_min, "z_max:", this.z_max,
      "\nx_min:", this.x_min, "x_max:", this.x_max
    );
  }
  public getXBoundaries():number[]
  {
    return [this.x_min,this.x_max];
  }
  public getZBoundaries():number[]
  {
    return [this.z_min,this.z_max];
  }

  public display(): void
  {
    console.log("Ground :",this.groundMesh?.position );
    this.displayBoundaries();
  }
}
