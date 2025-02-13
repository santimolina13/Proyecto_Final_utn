import User from "../models/users.model.js"

class UserRepository {

    async createUser  ({ username, email, password, verificationToken })  {
        const new_user = new User({
            username,
            email,
            password,
            verificationToken
        })
        return await new_user.save()
    }

    async findUserByEmail (email) {
        return await User.findOne({email})
    }
    async findById(id){
        return await User.findById(id).populate("contacts","username email")
    }
    async verifyUser (user_id){
        const user=await this.findById(user_id)
        user.verified=true
        user.save()
    }
}
export default new UserRepository()
