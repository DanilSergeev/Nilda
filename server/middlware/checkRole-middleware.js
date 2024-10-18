const jwt = require("jsonwebtoken");
const ApiError = require("../exceptions/api-error")

module.exports = function (role) {
    return function (req, res, next) {
        if (req.method === "OPTIONS") {
            next()
        }
        try {
            const token = req.headers.authorization.split(' ')[1]
            if (!token) {
                throw next(ApiError.UnauthorizedError())
            }
            const decoded = jwt.verify(token, process.env.JWT_ACCESS_SECRET)
            req.user = decoded

            if (decoded.role !== role && decoded.role !== "ADMIN") {
                throw next(ApiError.BadRequest(`Нет доступа`))
            }
            next();
        } catch (e) {
            throw next(ApiError.UnauthorizedError())
        }
    }
}