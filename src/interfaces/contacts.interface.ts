export interface Contacts {
  id: string;
  email: string;
  name: string;
  phone: string;
  userId?: string;
}

export interface ContactCreate {
  email: string;
  name: string;
  phone: string;
  userId: string;
}

export interface ContactRepository {
  create(data: ContactCreate): Promise<Contacts>;
  findByEmailOrPhone(email: string, userId: string): Promise<Contacts | null>;
  getAllContacts(userId: string): Promise<Contacts[]>;
  updateContact({id, name, email, phone}: Contacts): Promise<Contacts>;
  deleteContact(id: string): Promise<boolean>;
}