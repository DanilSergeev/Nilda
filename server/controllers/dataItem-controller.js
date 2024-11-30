const ItemsService = require("../service/items-service")

class DataItemController {
    async getItems(req, res, next) {
        try {
            const data = await ItemsService.getItems()
            res.json(data)
        } catch (error) {
            next(error)
        }
    }
    async getItemsByHero(req, res, next) {
        try {
            const data = await ItemsService.getItemsByHero()
            res.json(data)
        } catch (error) {
            next(error)
        }
    }
    async getItemsByItem(req, res, next) {
        try {
            const data = await ItemsService.getItemsByItem()
            res.json(data)
        } catch (error) {
            next(error)
        }
    }

    async getItem(req, res, next) {
        try {
            const { id } = req.params
            const data = await ItemsService.getItem(id)
            res.json(data)
        } catch (error) {
            next(error)
        }
    }
    async creatItem(req, res, next) {
        try {
            const { title, description = "", categoryId = 1, countryId = 1 } = req.body;
            if (!title) {
                return next(ApiError.BadRequest("title не передан"));
            }
            if (!description) {
                return next(ApiError.BadRequest("description не передан"));
            }
            if (!countryId) {
                return next(ApiError.BadRequest("countryId не передан"));
            }
            if (!categoryId) {
                return next(ApiError.BadRequest("categoryId не передан"));
            }

            let images = req.files;

            if (!images || images.length === 0) {
                return next(ApiError.BadRequest("Изображение не передано"));
            }
            const data = await ItemsService.createItem(title, description, Number(categoryId), Number(countryId), images);
            res.json(data);
        } catch (error) {
            next(error)
        }
    }


    async updateItem(req, res, next) {
        try {
            const { id } = req.params;
            if (!id) {
                return next(ApiError.BadRequest("ID не передан"));
            }
            const { title, description, categoryId, countryId } = req.body;

            const data = await ItemsService.updateItem(id, title, description, categoryId, countryId);
            res.json(data);
        } catch (error) {
            next(error);
        }
    }

    async deleteImagesOfItem(req, res, next) {
        try {
            const { id } = req.params;
            if (!id) {
                return next(ApiError.BadRequest("ID не передан"));
            }
            const { idImages } = req.body;

            if (idImages.length<1) {
                return next(ApiError.BadRequest("Изображения не переданы"));
            }
            const data = await ItemsService.deleteImagesOfItem(id, idImages);
            res.json(data);
        } catch (error) {
            next(error);
        }
    }


    async updateItemImages(req, res, next) {
        try {
            const { id } = req.params;
            if (!id) {
                return next(ApiError.BadRequest("ID не передан"));
            }
            let images = req.files;

            if (!images || images.length === 0) {
                return next(ApiError.BadRequest("Изображение не передано"));
            }

            const data = await ItemsService.updateItemImages( id, images);
            res.json(data);
        } catch (error) {
            next(error);
        }
    }

    async deleteItem(req, res, next) {
        try {
            const { id } = req.params;
            if (!id) {
                return next(ApiError.BadRequest("ID не передан"))
            }
            await ItemsService.deleteItem(id)
            res.json(`Удалено`)
        } catch (error) {
            next(error)
        }
    }



}
module.exports = new DataItemController()