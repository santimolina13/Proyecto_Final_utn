import UserRepository from "./user.repository.js"




class ContactsRepository{
    
    async addContact(userId, email_user_invited) {
        
        const user_invited= await UserRepository.findUserByEmail(email_user_invited)
        const user= await UserRepository.findById(userId)
        user.contacts.push(user_invited)
        return await user.save()
    }
    async getContacts(userId) {
        const user= await UserRepository.findById(userId)
        console.log(user.contacts)
        return user.contacts
    }
}       
export default new ContactsRepository()