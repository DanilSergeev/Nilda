const { Items, ImageOfItem, ItemImages } = require("../models/models")
const ApiError = require("../exceptions/api-error")
const uuid = require("uuid")
const path = require("path");

class ItemsService {
    async getItems() {
        const itemData = await Items.findAll()
        return itemData
    }

    async getItemsByHero() {
        const itemData = await Items.findAll({
            where: { categoryId: 1 },
            include: [{ model: ImageOfItem }],
        })
        return itemData
    }
    async getItemsByItem() {
        const itemData = await Items.findAll({
            where: { categoryId: 2 },
            include: [{ model: ImageOfItem }],

        })
        return itemData
    }


    async getItem(id) {
        const itemData = await Items.findOne({
            where: { id },
            include: [{ model: ImageOfItem }],
        });
        return itemData;
    }
    async createItem(title, description, categoryId, countryId, images) {

        const checkItem = await Items.findOne({ where: { title } });
        if (checkItem) {
            throw ApiError.BadRequest(400, `Такой заголовок существует: ${title}`);
        }
        const newItem = await Items.create({
            title,
            description,
            categoryId,
            countryId,
        });

        let imageArray = [];
       
        if (images.file) {
            imageArray = [images.file];
        } else if (images.img) {
            imageArray = Array.isArray(images.img) ? images.img : [images.img]; 
        } else if (images.files) {
            imageArray = Array.isArray(images.files) ? images.files : [images.files]; 
        }

        if (imageArray.length > 0) {

            const imageInstances = await Promise.all(
                imageArray.map(async (img) => {
                    const fileName = uuid.v4() + ".jpg";
                    const filePath = path.resolve(__dirname, "..", "static", fileName);
                    try {
                        await img.mv(filePath);
                    } catch (error) {
                        throw new Error(`Ошибка при сохранении изображения: ${error.message}`);
                    }


                    return ImageOfItem.create({ url: fileName });
                })
            );

            await newItem.addImageOfItems(imageInstances);
        }

        return newItem;
    }




    async updateItem(id, title, description, categoryId, countryId) {
        const itemData = await Items.findOne({ where: { id } });
        if (!itemData) {
            throw ApiError.BadRequest(400, `Такой id ${id} не нейден`);
        }

        await Items.update(
            { title, description, categoryId, countryId },
            { where: { id } }
        );

        // if (imagesId.length > 0) {
        //     const images = await ImageOfItem.findAll({ where: { id: imagesId } });
        //     await itemData.setImageOfItems(images);
        // }

        // return { data: await Items.findOne({ where: { id }, include: [ImageOfItem] }) };
        return { data: await Items.findOne({ where: { id }}) };
    }

    // async updateItemImages(id, imagesId = [], variant) {
    //     const itemData = await Items.findOne({ where: { id }, include: [ImageOfItem] });
    //     if (!itemData) {
    //         throw ApiError.BadRequest(400, `Такой id ${id} не нейден`);
    //     }

    //     if (variant === 'add') {
    //         const images = await ImageOfItem.findAll({ where: { id: imagesId } });
    //         await itemData.addImageOfItems(images);
    //     } else if (variant === 'update') {
    //         const images = await ImageOfItem.findAll({ where: { id: imagesId } });
    //         await itemData.setImageOfItems(images);
    //     } else {
    //         throw ApiError.BadRequest(400, `Invalid variant: ${variant}`);
    //     }

    //     return { data: await Items.findOne({ where: { id }, include: [ImageOfItem] }) };
    // }


    async deleteItem(id) {
        const data = await Items.destroy(
            { where: { id } },
        )
        return data
    }




}

module.exports = new ItemsService()