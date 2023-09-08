const express = require("express");
const cors = require("cors");
const fileUpload = require('express-fileupload');
const bodyParser = require('body-parser');
const morgan = require('morgan');
require("dotenv").config();

var path = require('path');
var bcrypt = require("bcryptjs");

const app = express();

app.use(fileUpload({
    createParentPath: true
}));

app.use(cors({
    origin: "http://localhost:3000",
    credentials: true
}))

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(morgan('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/public", express.static(path.join(__dirname, 'public')));

const db = require("./app/models");
const Role = db.role;
const Category = db.category;
const Under_category = db.under_category;
const Order = db.order;
const User = db.user;
const Product = db.product;
const Op = db.Sequelize.Op;

// db.sequelize.sync({ force: true })
db.sequelize.sync()
    .then(() => {
        console.log("Synced db.");
        // initial();
    })
    .catch((err) => {
        console.log("Failed to sync db: " + err.message);
    });

// create roles
async function initial() {
    await Role.create({
        id: 1,
        name: "user"
    });

    await Role.create({
        id: 2,
        name: "admin"
    });

    await User.create({
        email: "admin@gmail.com",
        password: bcrypt.hashSync("12345678", 8),
        roles: ["admin"]
    })
        .then(user => {
            Role.findAll({
                where: {
                    name: {
                        [Op.or]: ["admin"]
                    }
                }
            }).then(roles => {
                user.setRoles(roles).then(() => {
                });
            });
        })

    await Category.create({
        name: "Computers"
    });
    await Category.create({
        name: "Phones"
    });

    await Under_category.create({
        name: "MacOS",
        category_id: 1
    });
    await Under_category.create({
        name: "Windows",
        category_id: 1
    });
    await Under_category.create({
        name: "IOS",
        category_id: 2
    });
    await Under_category.create({
        name: "Android",
        category_id: 2
    });

    // await Product.create({
    //     name: "MacBook Pro",
    //     description: "Description",
    //     price: 79.99,
    //     reduction: 0,
    //     size: "20x3cm",
    //     weight: "1kg",
    //     status: "on_stock",
    //     under_category_id: 1
    // });
    // await Product.create({
    //     name: "Asus Tuf Gaming",
    //     description: "Description",
    //     price: 79.99,
    //     reduction: 0,
    //     size: "20x3cm",
    //     weight: "1kg",
    //     status: "on_stock",
    //     under_category_id: 2
    // });
    // await Product.create({
    //     name: "Iphone",
    //     description: "Description",
    //     price: 79.99,
    //     reduction: 0,
    //     size: "20x3cm",
    //     weight: "1kg",
    //     status: "on_stock",
    //     under_category_id: 3
    // });
    // await Product.create({
    //     name: "Samsung S28",
    //     description: "Description",
    //     price: 79.99,
    //     reduction: 0,
    //     size: "20x3cm",
    //     weight: "1kg",
    //     status: "on_stock",
    //     under_category_id: 4
    // });
}

app.get("/", (req, res) => {
    res.set('Content-Type', 'text/html');
    // res.send('<img src="http://localhost:8000/public/27538.jpeg" />');
});

require('./app/routes/auth.routes')(app);
require('./app/routes/user.routes')(app);
require('./app/routes/product.routes')(app);
require('./app/routes/product_reference.routes')(app);
require('./app/routes/category.routes')(app);

const PORT = process.env.PORT || 8000;

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}.`);
});