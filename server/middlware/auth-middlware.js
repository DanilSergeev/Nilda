const ApiError = require("../exceptions/api-error")
const tokenService = require('../service/token-service');


module.exports = function (req, res, next) {
    try {
        const authorizationHeader = req.headers.authorization
        if (!authorizationHeader) {
            next(ApiError.UnauthorizedError())
        }
        const accessToken = authorizationHeader.split(" ")[1]
        if(!accessToken){
            next(ApiError.UnauthorizedError())
        }
        const userData = tokenService.validateAccessToken(accessToken)
        if(!userData){
            next(ApiError.UnauthorizedError())
        }
        req.user = userData
        next()
    } catch (error) {
        next(ApiError.UnauthorizedError())
    }
}