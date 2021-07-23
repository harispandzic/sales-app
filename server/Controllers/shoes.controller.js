const db = require('../Models');
const { shoes } = require('../Models');

const Shoes = db.shoes;
const Op = db.Sequelize.Op;

//kreira i spašava novi Shoe u bazu
exports.create = (req, res) => {
    if(!req.body.title || req.body.title === ''){
        res.status(400).send({
           message: "Title can't be empty!"
        });
        return;
    }
    const shoe = {
        title: req.body.title,
        description: req.body.description,
        image: req.body.image,
        price: req.body.price,
        rating: req.body.rating
    }

    Shoes.create(shoe).then(data => {res.status(200).send(data)}).catch(err => {
        res.status(500).send({
            message: "Neka poruka!"
         });
    })
};

exports.findAll = (req, res) =>{
    //query params
    const title = req.query.title;
    var condition = title ? {title :{[Op.iLike]: `%${title}%`}} : null;
    console.log("asdfasd",condition)
    shoes.findAll({where : condition})
        .then(data => {res.status(200).send(data)}).catch(err => {
        res.status(500).send({
            message: "Neka poruka!"
         });
    });
};

exports.findOne = (req, res) =>{
    const id = req.params.id;

    shoes.findByPk(id).then(data => {res.status(200).send(data)}).catch(err => {
        res.status(500).send({
            message: "Neka poruka!"
         });
    });;
};

exports.update = (req, res) =>{
    const id = req.params.id;
    Shoes.update(req.body,{where:{id:id}}).then(res.send("Updated")).catch(err => {
        res.status(500).send({
            message: err.message + "Neka poruka!"
         });
    });
}

exports.delete = (req, res) =>{
    const id = req.params.id;
    console.log(id);

    Shoes.destroy({where:{id:id}}).then(data => {console.log("Deleted", data); res.send("Deleted " + data)}).catch(err => {
        res.status(500).send({
            message: "Neka poruka!"
         });
    });
    
}

exports.deleteAll= (req, res) =>{
    Shoes.destroy({where: {}, truncate: false}).then(res.send("Deleted all")).catch(err => {
        res.status(500).send({
            message: err.message + "Neka poruka!"
         });
    });
}