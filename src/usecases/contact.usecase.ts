import { ContactCreate, Contacts } from "../interfaces/contacts.interface";
import { repositoryContactsPrisma } from "../repositories/contacts.repositories";
import { UserRepositoryPrisma } from "../repositories/user.repositoriy";

class ContactUseCase {
    private contactRepository: repositoryContactsPrisma;
    private userRepository: UserRepositoryPrisma;
    constructor() {
        this.contactRepository = new repositoryContactsPrisma();
        this.userRepository = new UserRepositoryPrisma();
    }

    async create({ email, name, phone, userId }: ContactCreate) {
        const user = await this.userRepository.findByEmail(userId);
        if (!user) {
            throw new Error('usuário não encontrado');
        }

        const verifyContact = await this.contactRepository.findByEmailOrPhone(email, phone);

        if (verifyContact) {
            throw new Error('Contato já cadastrado com esse email ou telefone');
        }

        const contact = await this.contactRepository.create({
            email,
            name,
            phone,
            userId: user.id
        });

        return contact;
    }

    async getContactsById(id: string) {
        const user = await this.userRepository.findByEmail(id);
        if (!user) {
            throw new Error('Usuário não encontrado');
        }

        const contacts = await this.contactRepository.getAllContacts(user.id);
        return contacts;
    }

    async updateContact({ id, name, email, phone }: Contacts) {
        const data = await this.contactRepository.updateContact({ id, name, email, phone });

        return data;
    }

    async deleteContact(id: string) {
        const data = await this.contactRepository.deleteContact(id);

        return data;
    }

}
export { ContactUseCase };
