export interface LoginModel {
    username: string;
    password: string;
}

export interface SignUpModel {
    email: string;
    password: string;
}

export interface IProfileModel {
    email: string;
    fullName: string;
    phoneNumber: string;
    dateOfBirth: Date | string;
    gender: 'male' | 'female' | 'other';
    bio?: string;
    id: string | null;
}
