import { FastifyInstance } from "fastify";
import { ContactCreate, Contacts } from "../interfaces/contacts.interface";
import { ContactUseCase } from "../usecases/contact.usecase";

export async function contactRoutes(fastify: FastifyInstance) {
    const contactUseCase = new ContactUseCase();

    fastify.post<{ Body: ContactCreate }>('/create', async (req, reply) => {
        try {
            const sendData: ContactCreate = {
                ...req.body,
                userId: req.user!.userId
            };

            const data = await contactUseCase.create(sendData);
            return reply.send(data);
        } catch (error) {
            reply.send(error);
        }
    });



    fastify.get<{ Params: { id: string } }>('/findById/:id', async (req, reply) => {
        const { id } = req.params;
        try {
            const data = await contactUseCase.getContactsById(id);

            return reply.send(data);
        } catch (error) {
            reply.send(error);
        }
    })

    fastify.put<{ Body: Contacts, Params: { id: string } }>('/update/:id', async (req, reply) => {
        const { id } = req.params;
        const { name, email, phone } = req.body;
        try {
            const data = await contactUseCase.updateContact({ id, name, email, phone });
            return reply.send(data);
        } catch (error) {
            reply.send(error);
        }
    })

    fastify.delete<{ Params: { id: string } }>('/delete/:id', async (req, reply) => {
        const { id } = req.params;
        try {
            const data = await contactUseCase.deleteContact(id);
            return reply.send(data);
        } catch (error) {
            reply.send(error);
        }
    })
}
