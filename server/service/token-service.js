const jwt = require("jsonwebtoken")
const {TokenSchema} = require("../models/models")

class TokenService{
    generateTokens(payload) {
        const accessToken = jwt.sign(payload, process.env.JWT_ACCESS_SECRET, {expiresIn: '1d'})
        const refreshToken = jwt.sign(payload, process.env.JWT_REFRESH_SECRET, {expiresIn: '30d'})
        return {
            accessToken,
            refreshToken
        }
    }

    validateAccessToken(token){
        try {
            const userData = jwt.verify(token, process.env.JWT_ACCESS_SECRET)
            return userData
        } catch (error) {
            return null
        }        
    }
    validateRefreshToken(token){
        try {
            const userData = jwt.verify(token, process.env.JWT_REFRESH_SECRET)
            return userData
        } catch (error) {
            return null
        }        
    }


    async saveToken(userId, refreshToken) {
        const tokenData = await TokenSchema.findOne({where: {userId}})
        if (tokenData) {
            tokenData.refreshToken = refreshToken;
            return tokenData.save();
        }
        const token = await TokenSchema.create({userId, refreshToken})
        return token;
    }


    async removeToken(refreshToken){
        await TokenSchema.destroy({where: {refreshToken}}) 
    }

    async findToken(refreshToken){
        const tokenData = await TokenSchema.findOne({where: {refreshToken}}) 
        return tokenData
    }

}


module.exports = new TokenService()