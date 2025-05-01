export interface Iuser {
    _id: string;
    firstName: string;
    lastName: string;
    email: string;
    phone: string;
    password: string;
    city: string;
    country: string;
    category: string;
    skills: string[];
    experienceLevel: string;
    desiredJobType: string;
    qualifications: string;
    isActive: boolean;
    profilePhoto?: string;
    overview?: string;
    __v: number;
}
