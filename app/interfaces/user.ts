export interface User{
    uid?: string;
    nome: string;
    sobrenome: string;
    username: string;
    email: string;
    password: string;
    bio?: string;
    followers?: string[];
    following?: string[];
}