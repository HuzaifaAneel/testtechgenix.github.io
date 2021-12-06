import jwt from 'jsonwebtoken'

const generateToken = (id) => {
    return jwt.sign({id: id}, process.env.JWT_SECRET, {
        expiresIn: '12h'
    })
}

export default generateToken