const db = require('../Models');
const { users, sequelize } = require('../Models');

const Users = db.users;
const Shoes = db.shoes;
const Op = db.Sequelize.Op;

//Metoda za kreiranje novog usera
exports.create = async (req, res) => {
  const loggingUser = {
    name: req.body.name,
    lastname: req.body.lastname,
    email: req.body.email,
    password: req.body.password,
    photo: req.body.photo,
  }
  const userList = await users.findAll();
  if (userList.some(user => user.name === loggingUser.name && user.lastname === loggingUser.lastname)) {
    console.log("User already exist!");
    res.status(500).send("User already exist!");
  }
  else {
    Users.create(loggingUser).then(data => { res.status(200).send("Created User") })
  }
}

//Metoda za logiranje korisnika
exports.login = async (req, res) => {
  const userList = await users.findAll();
  const loggingUser =
  {
    email: req.body.email,
    password: req.body.password,
  };
  var myUser = null;
  if (userList.some(user => (user.email === loggingUser.email && user.password === loggingUser.password) ? myUser = user : myUser = null)) {
    console.log("Password i email su ispravni!");
    console.log("MY USER: ", myUser);
    res.status(200).send(myUser);
  }
  else {
    console.log("User ne postoji!");
    res.status(400).send(null);
  }
  console.log(myUser);
};

exports.findAll = async (req, res) => {
  var results = await users.findAll();
  res.send(results);
};

exports.findOne = (req, res) => {
  const id = req.params.id;

  users.findByPk(id).then(data => { res.status(200).send(data) }).catch(err => {
    res.status(500).send({
      message: "Neka poruka!"
    });
  });;
};

exports.update = (req, res) => {
  const id = req.params.id;
  users.update(req.body, { where: { id: id } }).then(res.send("Updated")).catch(err => {
    res.status(500).send({
      message: err.message + "Neka poruka!"
    });
  });
}

exports.delete = (req, res) => {
  const id = req.params.id;
  console.log(id);

  users.destroy({ where: { id: id } }).then(data => { console.log("Deleted", data); res.send("Deleted " + data) }).catch(err => {
    res.status(500).send({
      message: "Neka poruka!"
    });
  });

}

exports.deleteAll = (req, res) => {
  users.destroy({ where: {}, truncate: false }).then(res.send("Deleted all")).catch(err => {
    res.status(500).send({
      message: err.message + "Neka poruka!"
    });
  });
}

exports.addUsersShoes = (req, res) => {
  const userID = req.body.id;
  const products = req.body.products;
  const productIDs = products.map(product => product.productID);
  console.log(productIDs);
  console.log(userID);

  users.findByPk(userID).then(user => {
    productIDs.map(productID => {
      Shoes.findByPk(productID).then(async (shoes) => {
        await user.addShoes(shoes);
        res.status(200);
        res.send({
          message: "Ok"
        });
      }).catch(err => {
        res.status(500).send({
          message: "Error"
        });
      });
    }).catch(err => {
      res.status(500).send({
        message: "Error"
      });
    });
  })
};

exports.getUsersShoes = (req, res) => {
  console.log("hey", req.body)
  Users.findByPk(req.params.id).then(async(user) => {
      console.log("hello",user)
     let shoes =  await user.getShoes();
     res.status(200);
     res.send(JSON.stringify(shoes));
  }).catch(err => {
      res.status(500).send({
          message: "Error"
      });
  });
};