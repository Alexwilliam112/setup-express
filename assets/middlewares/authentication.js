'use strict'
const { verifyToken } = require('../helpers/jwt')
const { User } = require('../models')
module.exports = {
    authentication: async (req, res, next) => {
        try {
            const { authorization } = req.headers
            if (!authorization) throw { name: 'Unauthorized' }

            const access_token = authorization.split(' ')[1]
            const payload = verifyToken(access_token)
            const user = await User.findByPk(payload.id)

            req.loginInfo = {
                id: user.id,
                email: user.email
            }
            next()

        } catch (err) {
            next(err)
        }
    }
}