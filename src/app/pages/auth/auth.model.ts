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
    phone: string;
    dob: Date | string;
    gender: 'male' | 'female' | 'other';
    bio?: string;
    avatar?: string | null;
}
