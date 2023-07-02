const request = require("supertest");
const server = require("../index");

describe("Probando GET", () => {
  it("Obtener OK (Status 200)", async () => {
    const response = await request(server).get("/cafes").send();
    const status = response.statusCode;
    expect(status).toBe(200);
  });
  it("Comprobar que el tipo de dato obtenido es un arreglo", async () => {
    const response = await request(server).get("/cafes").send();
    let cafes = response.body;        
    expect(cafes).toBeInstanceOf(Array);
  });
  it("Recibir arreglo con al menos un objeto", async () => {
    const response = await request(server).get("/cafes").send();
    let cafes = response.body;    
    const registros = cafes.length;
    expect(registros).toBeGreaterThan(0);
  });
});



describe("Probando DELETE", () => {
  it("Obtener 404 si id de café no existe", async () => {

    const response = await request(server).delete("/cafes/9").send();
    const status = response.statusCode;
    expect(status).toBe(404);
  }); 
});


describe("Probando POST", () => {
  it("Obtener OK (Status 201)", async () => {
    const body={id:4,nombre:'Expreso'}
    const response = await request(server).post("/cafes",body).send();
    const status = response.statusCode;
    expect(status).toBe(200);
  });  
});

describe("Probando PUT", () => {
  it("Obtener 400 si id de café no existe", async () => {
    const cafe={id:9,nombre:'Espresso'}    
    const response = await request(server).put("/cafes/9").send(cafe);
    const status = response.statusCode;
    expect(status).toBe(400);
  }); 
});