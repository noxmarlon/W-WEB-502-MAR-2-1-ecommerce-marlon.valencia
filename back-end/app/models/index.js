const dbConfig = require("../config/db.config");
const Sequelize = require("sequelize");

const sequelize = new Sequelize(dbConfig.DB, dbConfig.USER, dbConfig.PASSWORD, {
  host: dbConfig.HOST,
  dialect: dbConfig.dialect,
  port: dbConfig.port,
  operatorsAliases: 0,
  pool: {
    max: dbConfig.pool.max,
    min: dbConfig.pool.min,
    acquire: dbConfig.pool.acquire,
    idle: dbConfig.pool.idle
  }
});

const db = {};

db.Sequelize = Sequelize;
db.sequelize = sequelize;
db.user = require("./user/user.model.js")(sequelize, Sequelize);
db.refreshToken = require("./auth/refreshToken.model.js")(sequelize, Sequelize);
db.role = require("./auth/role.model.js")(sequelize, Sequelize);
db.product = require("./product/product.model.js")(sequelize, Sequelize);
db.product_picture = require("./product/product_picture.model.js")(sequelize, Sequelize);
db.product_reference = require("./product/product_reference.model.js")(sequelize, Sequelize);
db.rate = require("./product/rate.model.js")(sequelize, Sequelize);
db.category = require("./category/category.model.js")(sequelize, Sequelize);
db.under_category = require("./category/under_category.model.js")(sequelize, Sequelize);
db.country = require("./country/country.model.js")(sequelize, Sequelize);
db.order = require("./order/order.model.js")(sequelize, Sequelize);
db.order_items = require("./order/order_item.model.js")(sequelize, Sequelize);
db.cart = require("./cart/cart.model.js")(sequelize, Sequelize);
db.cart_items= require("./cart/cart_items.model.js")(sequelize, Sequelize);

db.role.belongsToMany(db.user, {
  through: "user_roles",
  foreignKey: "roleId",
  otherKey: "userId"
});

db.user.belongsToMany(db.role, {
  through: "user_roles",
  foreignKey: "userId",
  otherKey: "roleId"
});

db.Pictures = db.product.hasMany(db.product_picture, {
  as: "pictures",
  foreignKey: "product_id"
})

db.product_picture.belongsTo(db.product, {
  as: "product",
  foreignKey: "product_id",
  targetKey: "id"
})

db.product.hasMany(db.country, {
  foreignKey: "product_id",
})

db.country.belongsTo(db.product, {
  foreignKey: "product_id",
  targetKey: "id"
});

db.ROLES = ["user", "admin"];

db.refreshToken.belongsTo(db.user, {
  foreignKey: "userId",
  targetKey: "id"
});
db.user.hasOne(db.refreshToken, {
  foreignKey: "userId",
  targetKey: "id"
});

db.category.hasMany(db.under_category, {
  as: "under_categories",
  foreignKey: "category_id"
});
db.under_category.belongsTo(db.category, {
  as: "categories",
  foreignKey: "category_id",
  targetKey: "id"
});

db.under_category.hasMany(db.product, {
  as: "products",
  foreignKey: "under_category_id"
});
db.product.belongsTo(db.under_category, {
  as: "under_categories",
  foreignKey: "under_category_id",
  targetKey: "id"
});

db.product.hasMany(db.product_reference, { as: "references", onDelete: "cascade" });
db.product_reference.belongsTo(db.product, { as: "product" });

db.user.hasMany(db.order, { as: "orders"});
db.order.belongsTo(db.user, { as: "user"});

db.product.belongsToMany(db.order, {
  through: "order_items",
  as: "orders",
  foreignKey: "product_id"
});
db.order.belongsToMany(db.product, {
  through: "order_items",
  as: "products",
  foreignKey: "order_id"
});

db.product.belongsToMany(db.cart, {
  through: "cart_items",
  as: "carts",
  foreignKey: "product_id"
});
db.cart.belongsToMany(db.product, {
  through: "cart_items",
  as: "products",
  foreignKey: "cart_id"
})

module.exports = db;