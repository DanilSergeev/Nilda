const sequelize = require("../db")
const { DataTypes } = require('sequelize')


const User = sequelize.define('user', {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    email: { type: DataTypes.STRING, unique: true, },
    password: { type: DataTypes.STRING },
    name: { type: DataTypes.STRING },
    file: { type: DataTypes.STRING, allowNull: false, defaultValue: "noimage.jpg" },
    role: { type: DataTypes.STRING, defaultValue: "USER" },
    isActivated: { type: DataTypes.BOOLEAN, defaultValue: false },
    activationLink: { type: DataTypes.STRING }
}, { timestamps: false })
// to do: 
// add activationLink
// add noimage
// 
// 
const TokenSchema = sequelize.define('tokenSchema', {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    refreshToken: { type: DataTypes.STRING },
}, { timestamps: false })







const Category = sequelize.define('category', {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    name: { type: DataTypes.STRING, unique: true },
}, { timestamps: false });

const Country = sequelize.define('country', {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    name: { type: DataTypes.STRING, unique: true },
}, { timestamps: false });

const ImageOfItem = sequelize.define('imageOfItem', {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    url: { type: DataTypes.STRING },
}, { timestamps: false });

const Items = sequelize.define('items', {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    title: { type: DataTypes.STRING, unique: true },
    description: { type: DataTypes.TEXT(1024 * 1024) },
    categoryId: { type: DataTypes.INTEGER, allowNull: false, references: { model: Category, key: 'id' } },
    countryId: { type: DataTypes.INTEGER, allowNull: false, references: { model: Country, key: 'id' } },
    countryId: { type: DataTypes.INTEGER, allowNull: false, references: { model: Country, key: 'id' } },
}, {
    hooks: {
        beforeDestroy: async (item) => {
            await ImageOfItem.destroy({ where: { itemId: item.id } });
        },
    },
});

const Ideas = sequelize.define('ideas', {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    title: { type: DataTypes.STRING, unique: true },
    text: { type: DataTypes.TEXT(1024 * 1024) },
});

const ItemImages = sequelize.define('itemImages', {
    itemId: { type: DataTypes.INTEGER, primaryKey: true, },
    imageOfItemId: { type: DataTypes.INTEGER, primaryKey: true, },
}, { timestamps: false });



Items.belongsToMany(ImageOfItem, { onDelete: 'CASCADE', through: ItemImages, foreignKey: 'itemId', timestamps: false });
ImageOfItem.belongsToMany(Items, { onDelete: 'CASCADE', through: ItemImages, foreignKey: 'imageOfItemId', timestamps: false });

Items.belongsTo(Category, { onDelete: 'CASCADE', foreignKey: 'categoryId' });
Items.belongsTo(Country, { onDelete: 'CASCADE', foreignKey: 'countryId' });

TokenSchema.belongsTo(User, {
    foreignKey: 'userId',
    onDelete: "cascade",
});

module.exports = {
    User,
    TokenSchema,
    Items,
    Category,
    Country,
    ImageOfItem,
    ItemImages,
    Ideas
};