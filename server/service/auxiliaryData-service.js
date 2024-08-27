
const { Category, Country, ImageOfItem } = require("../models/models")
const ApiError = require("../exceptions/api-error")
const uuid = require("uuid")
const path = require("path");

class AuxiliaryDataService {
    async getCategorys() {
        const data = await Category.findAll()
        return data
    }
    async getCountrys() {
        const data = await Country.findAll()
        return data
    }


    async getCategory(id) {
        const data = await Category.findOne({
            where: { id },
        })
        return data
    }
    async getCountry(id) {
        const data = await Country.findOne({
            where: { id },
        })
        return data
    }
    async getImageOfItem(id) {
        const data = await ImageOfItem.findOne({
            where: { id },
        })
        return data
    }




    async createCategory(name) {
        const check = await Category.findOne({ where: { name } })
        if (check) {
            return ApiError.BadRequest(400,`Такой загаловок существует ${name}`)
        }
        const data = await Category.create({ name })
        return { data }
    }
    async createCountry(name) {
        const check = await Country.findOne({ where: { name } })
        if (check) {
            return ApiError.BadRequest(400,`Такой загаловок существует ${name}`)
        }
        const data = await Country.create({ name })
        return { data }
    }




    async deleteCategory(id) {
        const data = await Category.destroy(
            { where: { id } },
        )
        return data
    }
    async deleteCountry(id) {
        const data = await Country.destroy(
            { where: { id } },
        )
        return data
    }

}

module.exports = new AuxiliaryDataService()