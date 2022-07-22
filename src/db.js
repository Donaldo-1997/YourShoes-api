require('dotenv').config();
const { Sequelize } = require('sequelize');
const fs = require('fs');
const path = require('path');

// Import enviroment variables
const { DB_USER, DB_PASSWORD, DB_HOST } = process.env;

const sequelize = new Sequelize(`postgres://${DB_USER}:${DB_PASSWORD}@${DB_HOST}/yourshoes`, {
    logging: false, // set to console.log to see the raw SQL queries
    native: false, // lets Sequelize know we can use pg-native for ~30% more speed
});

const basename = path.basename(__filename);

const modelDefiners = [];

fs.readdirSync(path.join(__dirname, '/models'))
    .filter(file => (file.indexOf('.') !== 0) && (file !== basename) && (file.slice(-3) === '.js'))
    .forEach(file => {
        modelDefiners.push(require(path.join(__dirname, '/models', file)))
    });

modelDefiners.forEach(model => model(sequelize));

let entries = Object.entries(sequelize.models);
//                                                           [N + ameModel, dataModel]
let capitalizadedEntries = entries.map(entry => [entry[0][0].toUpperCase() + entry[0].slice(1), entry[1]])
sequelize.models = Object.fromEntries(capitalizadedEntries);

// Destructuring models from sequelize.models
// here -->
const { Category, Product, Review, Order, User, Brand, Role } = sequelize.models;
// Relations of models
// here -->

Category.belongsToMany(Product, {through: 'category_product',timestamps: false})
Product.belongsTo(Category)

Product.belongsToMany(Review, {through: 'review_product',timestamps: false})
Review.belongsTo(Product)

Brand.belongsToMany(Product,{through: 'brand_product',timestamps: false})
Product.belongsTo(Brand)

User.belongsToMany(Review, {through: 'user_review',timestamps: false})
Review.belongsTo(User)

User.belongsToMany(Order, {through: 'user_order',timestamps: false})
Order.belongsTo(User)

Product.belongsToMany(Order, {through:'order_product',timestamps: false})
Order.belongsToMany(Product, {through:'order_product',timestamps: false})

Role.belongsToMany(User, {through: 'user_role', timestamps: false})


module.exports = {
    ...sequelize.models,
    conn: sequelize
}
