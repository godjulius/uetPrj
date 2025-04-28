import {ICourse} from '../../courses/courses.model';

export interface ICourseSearchModel {
    keyword: string;
    filter: {
        category: string;
        level: string;
        language: string;
        price: string;
        rating: string;
        duration: string;
        sort: string;
    };
    page: number;
    size: number;
}

export interface ICourseSearchResponse {
    items: ICourse[];
    total: number,
    page: number;
    size: number;
    pages: number;
}
