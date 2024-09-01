const { Ideas } = require("../models/models")
const ApiError = require("../exceptions/api-error")


class IdeasService {
    async getIdeas() {
        const ideasData = await Ideas.findAll({
        })
        return ideasData
    }
    async getIdea(id) {
        const ideaData = await Ideas.findOne({
            where: { id },
        })
        return ideaData
    }
    async createIdea(title, text = "") {
        const checkIdea = await Ideas.findOne({ where: { title } });
        if (checkIdea) {
            throw ApiError.BadRequest(`Такой загаловок существует ${title}`);
        }
        const idea = await Ideas.create({ title, text });
        return { idea };
    }
    

    async updateIdea(id,) {
        const ideaData = await Ideas.update(
            { title, text },
            { where: { id } },
        )
        return ideaData
    }
    async deleteIdea(id) {
        const ideaData = await Ideas.destroy(
            { where: { id } },
        )
        return ideaData
    }




}

module.exports = new IdeasService()