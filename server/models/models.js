const sequelize = require("../db")
const { DataTypes } = require('sequelize')

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
    description: { type: DataTypes.TEXT(1024 * 1024)  },
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
    text: { type: DataTypes.TEXT(1024 * 1024)  },
});

const ItemImages = sequelize.define('itemImages', {
    itemId: { type: DataTypes.INTEGER, primaryKey: true,  },
    imageOfItemId: { type: DataTypes.INTEGER, primaryKey: true,  },
}, { timestamps: false });



Items.belongsToMany(ImageOfItem, { through: ItemImages, foreignKey: 'itemId', timestamps:false });
ImageOfItem.belongsToMany(Items, { through: ItemImages, foreignKey: 'imageOfItemId',timestamps:false });

Items.belongsTo(Category, { foreignKey: 'categoryId' });
Items.belongsTo(Country, { foreignKey: 'countryId' });



module.exports = {
    Items,
    Category,
    Country,
    ImageOfItem,
    ItemImages,
    Ideas
};