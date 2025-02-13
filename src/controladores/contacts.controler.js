
import ContactsRepository from "../repository/contacts.repository.js"

import UserRepository from "../repository/user.repository.js"





export const inviteContactsControler = async (req, res) => {
    try {
        const { id } = req.user
        const { email } = req.body

        // Verificar si el usuario invitado existe
        const isExistUserInvited = await UserRepository.findUserByEmail(email)
        if (!isExistUserInvited) {
            return res.json({
                ok: false,
                status: 404,
                message: 'El usuario no existe',
            })
        }
        if (!isExistUserInvited.verified) {  // <-- Ahora usa "verified" como en tu modelo
            return res.status(400).json({
                ok: false,
                message: 'El usuario aún no ha verificado su cuenta.',
            })
        }
        // Verificar si el contacto ya existe en la lista del usuario
        const contacts = await ContactsRepository.getContacts(id)
        const alreadyExists = contacts.some(contact => contact.email === email)

        if (alreadyExists) {
            return res.json({ // 400 (Bad Request) porque ya existe el contacto
                ok: false,
                status: 400,
                message: 'El usuario ya es tu contacto',
            })
        }

        // Agregar contacto a ambos usuarios
        await ContactsRepository.addContact(id, email)
        const user = await UserRepository.findById(id)
        const usuario_invitado = await UserRepository.findUserByEmail(email)
        const usuario_invitadoId = usuario_invitado._id.toString();
        await ContactsRepository.addContact(usuario_invitadoId, user.email)

        const user_modified = await UserRepository.findById(id)
        return res.json({
            ok: true,
            status: 201,
            message: 'Invitado correctamente',
            data: { user_modified },
        })

    } catch (error) {
        console.error(error)
        res.status(500).json({
            ok: false,
            message: "Error al invitar al contacto",
        })
    }
};


export const getContactsControler = async (req, res) => {

    try{
        const {id, name} = req.user
        

        
        const listaContactos= (await ContactsRepository.getContacts(id))
        return res.json({
            ok: true,
            status:201,
            message: 'mis contactos',
            data: {
                listaContactos
            }
        })
    }
    catch(error){
        console.error(error)
        res.json(
            {
                ok:false,
                status:500,
                message:"error al obtener los contactos"
            })
    }
    }




