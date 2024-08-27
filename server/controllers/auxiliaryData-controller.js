const AuxiliaryDataService = require("../service/auxiliaryData-service")

class AuxiliaryDataController {
    async getCategorys(req, res, next) {
        try {
            const data = await AuxiliaryDataService.getCategorys()
            res.json(data)
        } catch (error) {
            next(error)
        }
    }
    async getCountrys(req, res, next) {
        try {
            const data = await AuxiliaryDataService.getCountrys()
            res.json(data)
        } catch (error) {
            next(error)
        }
    }

// 


    async getCategory(req, res, next) {
        try {
            const { id } = req.params
            const data = await AuxiliaryDataService.getCategory(id)
            res.json(data)
        } catch (error) {
            next(error)
        }
    }
    async getCountry(req, res, next) {
        try {
            const { id } = req.params
            const data = await AuxiliaryDataService.getCountry(id)
            res.json(data)
        } catch (error) {
            next(error)
        }
    }
    async getImageOfItem(req, res, next) {
        try {
            const { id } = req.params
            const data = await AuxiliaryDataService.getImageOfItem(id)
            res.json(data)
        } catch (error) {
            next(error)
        }
    }
// 



    async createCategory(req, res) {
        try {
            const { title } = req.body
            const data = await AuxiliaryDataService.createCategory(title)
            return res.json(data)
        } catch (error) {
            console.log(error)
        }
    }
    async createCountry(req, res) {
        try {
            const { title } = req.body
            const data = await AuxiliaryDataService.createCountry(title)
            return res.json(data)
        } catch (error) {
            console.log(error)
        }
    }
// 


    async deleteCategory(req, res, next) {
        try {
            const { id } = req.params;
            if (!id) {
                return next(ApiError.BadRequest("ID не передан"))
            }
            await AuxiliaryDataService.deleteCategory(id)
            res.json(`Удалено`)
        } catch (error) {
            next(error)
        }
    }
    async deleteCountry(req, res, next) {
        try {
            const { id } = req.params;
            if (!id) {
                return next(ApiError.BadRequest("ID не передан"))
            }
            await AuxiliaryDataService.deleteCountry(id)
            res.json(`Удалено`)
        } catch (error) {
            next(error)
        }
    }


}
module.exports = new AuxiliaryDataController()