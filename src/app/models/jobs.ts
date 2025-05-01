import {User} from './User'
export interface Jobs {
    _id: string;
    companyName: string;
    JobTitle: string;
    JobCategory: string;
    description: string;
    JobType: string;
    salary: {
        from: number;
        to: number;
        _id: string;
    };
    skills: string[];
    JobHours: {
        from: number;
        to: number;
        _id: string;
    };
    status: string;
    JoblocationType: string;
    jobLevel: string;
    jobRequirements: string[];
}

