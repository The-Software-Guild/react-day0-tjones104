const chaiHttp = require("chai-http");
const chai = require("chai");
const server = require("../server");

chai.should();

chai.use(chaiHttp);

// Describe tests
describe("Api Tests", function () {
  // Test GET
  describe("GET /api/itemsIntake", function () {
    it("Should GET all the items", (done) => {
      chai
        .request(server)
        .get("/api/itemsIntake")
        .end((err, res) => {
          res.should.have.status(200);
          res.body.should.be.a("array");
          res.body.length.should.be.eq(2);
          done();
        });
    });
    it("Should NOT GET any items", (done) => {
      chai
        .request(server)
        .get("/api/items")
        .end((err, res) => {
          res.should.have.status(404);
          done();
        });
    });
  });

  // Test GET QUERY
  describe("GET ONE /api/itemsIntake/:id", function () {
    it("Should GET item/s with query", (done) => {
      const param = "?description=Cardboard";
      chai
        .request(server)
        .get("/api/itemsIntake" + param)
        .end((err, res) => {
          res.should.have.status(200);
          res.body[0].should.be.a("object");
          res.body[0].should.have.property("name").eq("Pizza Box");
          res.body[0].should.have.property("description").eq("Cardboard");
          res.body[0].should.have.property("recyclable").eq(true);
          res.body[0].should.have.property("quantity").eq(1);
          res.body[0].should.have.property("ppu").eq(2);
          res.body[0].should.have.property("_id").eq("123");
          done();
        });
    });
    it("Should NOT GET item/s with incorrect query", (done) => {
      const param = "?descrip=Cardboard";
      chai
        .request(server)
        .get("/api/itemsIntake" + param)
        .end((err, res) => {
          console.log(res.body);
          res.should.have.status(200);
          done();
        });
    });
  });

  // Test GET ONE
  describe("GET ONE /api/itemsIntake/:id", function () {
    it("Should GET ONE item passing id param", (done) => {
      const _id = "123";
      chai
        .request(server)
        .get("/api/itemsIntake/" + _id)
        .end((err, res) => {
          res.should.have.status(200);
          res.body.should.be.a("object");
          res.body.should.have.property("name").eq("Pizza Box");
          res.body.should.have.property("description").eq("Cardboard");
          res.body.should.have.property("recyclable").eq(true);
          res.body.should.have.property("quantity").eq(1);
          res.body.should.have.property("ppu").eq(2);
          res.body.should.have.property("_id").eq("123");
          done();
        });
    });
    it("Should NOT GET ONE item passing incorrect id param", (done) => {
      const _id = "abc";
      chai
        .request(server)
        .get("/api/itemsIntake/" + _id)
        .end((err, res) => {
          res.should.have.status(404);
          res.text.should.be.eq("The id was not found");
          done();
        });
    });
  });

  // Test POST
  describe("POST /api/itemsIntake", function () {
    it("Should POST a new item", (done) => {
      const item = {
        name: "Milk Jug",
        description: "Plastic",
        recyclable: true,
        quantity: 4,
        ppu: 10,
      };
      chai
        .request(server)
        .post("/api/itemsIntake")
        .send(item)
        .end((err, res) => {
          res.should.have.status(200);
          res.body[2].should.be.a("object");
          res.body[2].should.have.property("name").eq("Milk Jug");
          res.body[2].should.have.property("description").eq("Plastic");
          res.body[2].should.have.property("recyclable").eq(true);
          res.body[2].should.have.property("quantity").eq(4);
          res.body[2].should.have.property("ppu").eq(10);
          res.body[2].should.have.property("_id");
          res.body.length.should.be.eq(3);
          done();
        });
    });
    it("Should NOT POST a new item", (done) => {
      const item = {
        name: "Milk Jug",
        description: "Plastic",
        recyclable: true,
        quantity: 4,
      };
      chai
        .request(server)
        .post("/api/itemsIntake")
        .send(item)
        .end((err, res) => {
          res.should.have.status(404);
          res.text.should.be.eq("Incorrect number of properties");
          done();
        });
    });
  });

  // Test PUT
  describe("PUT /api/itemsIntake/:id", function () {
    it("Should PUT an existing item passing id param", (done) => {
      const _id = "123";
      const item = {
        name: "Can",
        description: "Aluminum",
        recyclable: true,
        quantity: 10,
        ppu: 0.5,
      };
      chai
        .request(server)
        .put("/api/itemsIntake/" + _id)
        .send(item)
        .end((err, res) => {
          res.should.have.status(200);
          res.body.should.be.a("object");
          res.body.should.have.property("name").eq("Can");
          res.body.should.have.property("description").eq("Aluminum");
          res.body.should.have.property("recyclable").eq(true);
          res.body.should.have.property("quantity").eq(10);
          res.body.should.have.property("ppu").eq(0.5);
          res.body.should.have.property("_id");
          done();
        });
    });
    it("Should NOT PUT an existing item passing incorrect id param", (done) => {
      const _id = "abc";
      const item = {
        name: "Can",
        description: "Aluminum",
        recyclable: true,
        quantity: 10,
        ppu: 0.5,
      };
      chai
        .request(server)
        .put("/api/itemsIntake/" + _id)
        .send(item)
        .end((err, res) => {
          res.should.have.status(404);
          res.text.should.be.eq("The id was not found");
          done();
        });
    });
  });
  //   // Test DELETE
  describe("DELETE /api/itemsIntake/:id", function () {
    it("Should DELETE an existing item passing id param", (done) => {
      const _id = "123";
      chai
        .request(server)
        .delete("/api/itemsIntake/" + _id)
        .end((err, res) => {
          res.should.have.status(200);
          res.body.should.be.a("array");
          res.body.length.should.be.eq(2);
          done();
        });
    });
    it("Should NOT DELETE an existing item passing incorrect id param", (done) => {
      const _id = "abc";
      chai
        .request(server)
        .delete("/api/itemsIntake/" + _id)
        .end((err, res) => {
          res.should.have.status(404);
          res.text.should.be.eq("The id was not found");
          done();
        });
    });
  });
});
