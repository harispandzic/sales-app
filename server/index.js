const express = require('express');
const cors = require('cors')
const app = express();
const router = express.Router();
const shoesController = require('./Controllers/shoes.controller')
const usersController = require('./Controllers/users.controller')

//let data = require('./data');
//let products = require('./products');

app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.use(cors());

const db = require("./Models");//baza
db.sequelize.sync();

//Products 
router.post("/createShoe", shoesController.create);
router.patch("/updateShoe/:id", shoesController.update);//put kad postoji //patch kad ne postoji
router.get("/findAll", shoesController.findAll);
router.get("/findOne/:id", shoesController.findOne);
router.delete("/delete/:id", shoesController.delete);
router.delete("/deleteAll", shoesController.deleteAll);

router.post("/usersshoes",usersController.addUsersShoes)
router.get("/usersshoes/:id", usersController.getUsersShoes);
//Users
router.post("/signUp", usersController.create);
router.patch("/updateUser/:id", usersController.update);
router.post("/login", usersController.login);
router.get("/findAllUsers", usersController.findAll);
router.get("/findOneUser/:id", usersController.findOne);
router.delete("/deleteUser/:id", usersController.delete);
router.delete("/deleteAll", usersController.deleteAll);

app.use(router);
app.listen(process.env.PORT || 3001);
console.log(`Server runinng on ${process.env.PORT || 3001}`);
