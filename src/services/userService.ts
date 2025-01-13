import UserRepository from '../repositories/userRepository';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

export const login = async (email: string, password: string) => {
    try{
        const user = await UserRepository.findByEmail(email);
        if(!user || !bcrypt.compareSync(password, user.password)){
            throw new Error('Invalid credentials');
        }
        if(!process.env.JWT_SECRET){
            throw new Error('JWT secret is not defined');
        }
        const token = jwt.sign({ email: user.email }, process.env.JWT_SECRET, { expiresIn: '1h' });
        return token;
    }
    catch(error){
        throw new Error('Failed to login');
    }
}

export const getUser = async (email: string) => {
    try{
        const user = await UserRepository.findByEmail(email);
        return user;
    }
    catch(error){
        throw new Error('Failed to get user');
    }
}