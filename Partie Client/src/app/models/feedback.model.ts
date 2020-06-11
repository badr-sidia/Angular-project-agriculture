export class Feedback {
    firstname: string;
    lastname: string;
    telnum: number;
    email: string;
    agree: boolean;
    contacttype: string;
    message: string;
    id_leader:string;
    emailLeader:string;
    mdpLeader:string;
};

export const ContactType = ['None', 'Tel', 'Email'];