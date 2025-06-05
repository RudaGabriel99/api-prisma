import { prisma } from "../database/prisma.client";
import { ContactCreate, ContactRepository, Contacts } from "../interfaces/contacts.interface";

class repositoryContactsPrisma implements ContactRepository {
    async create(data: ContactCreate): Promise<Contacts> {
        const result = await prisma.contacts.create({
            data: {
                email: data.email,
                name: data.name,
                phone: data.phone,
                userId: data.userId
            }
        });
        return result;
    }

    async findByEmailOrPhone(email: string, phone: string): Promise<Contacts | null> {
        const result = await prisma.contacts.findFirst({
            where: {
                OR: [{
                    email
                },
                { phone },
                ]
            }
        });
        return result || null;
    }

    async getAllContacts(userId: string): Promise<Contacts[]> {
        const result = await prisma.contacts.findMany({
            where: {
                userId
            }
        });
        return result;
    }

    async updateContact({ id, name, email, phone }: Contacts): Promise<Contacts> {
        const result = await prisma.contacts.update({
            where: {
                id
            },
            data: {
                name,
                email,
                phone
            }
        });
        return result;
    }

    async deleteContact(id: string): Promise<boolean> {
        const result = await prisma.contacts.delete({
            where: {
                id
            }
        });
        return result ? true : false;
    }

}

export { repositoryContactsPrisma };
