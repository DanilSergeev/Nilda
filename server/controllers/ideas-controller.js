const IdeasService = require("../service/dataIdeas-service")

class IdeasController {
    async getIdeas(req, res, next) {
        try {
            const IdeasData = await IdeasService.getIdeas()
            res.json(IdeasData)
        } catch (error) {
            next(error)
        }
    }

    async getIdea(req, res, next) {
        try {
            const { id } = req.params
            const IdeasData = await IdeasService.getIdea(id)
            res.json(IdeasData)
        } catch (error) {
            next(error)
        }
    }
    async createIdea(req, res) {
        try {
            const { title, text } = req.body
            const ideaData = await IdeasService.createIdea(title, text)
            return res.json(ideaData)
        } catch (error) {
            console.log(error)
        }
    }




    async updateIdea(req, res, next) {
        try {
            const { id } = req.params;
            if (!id) {
                return next(ApiError.BadRequest("ID не передан"))
            }
            const { title, text } = req.body


            const IdeasData = await IdeasService.updateIdea(id, title, text)
            res.json(IdeasData)
        } catch (error) {
            next(error)
        }
    }

    async deleteIdea(req, res, next) {
        try {
            const { id } = req.params;
            if (!id) {
                return next(ApiError.BadRequest("ID не передан"))
            }
            await IdeasService.deleteIdea(id)
            res.json(`Удалено`)
        } catch (error) {
            next(error)
        }
    }



}
module.exports = new IdeasController()