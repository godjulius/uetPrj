export interface ICourse {
    id: number | undefined;
    title: string | undefined;
    headline: string | undefined;
    description: any | undefined;
    price: number | undefined;
    rating: number | undefined; // Trung bình số sao đánh giá
    students: number | undefined; // Số lượng học viên đã đăng ký
    numStudent: number | undefined; // Số lượng học viên đã đăng ký
    lessons: number | undefined; // Số bài học
    thumbnail: string | undefined; // Ảnh đại diện khóa học
    categories: string[] | undefined; // Danh mục khóa học
    instructor: string | undefined; // Tên giảng viên
    level: ('beginner' | 'intermediate' | 'advanced') | undefined; // Trình độ khóa học
    language: string | undefined; // Ngôn ngữ giảng dạy
    duration: number | undefined; // Tổng thời gian học (VD: "10h 30m")
    requirements: string[] | undefined; // Yêu cầu đầu vào (VD: ["Biết lập trình cơ bản", "Cài đặt Node.js"])
    whatYouWillLearn: string[] | undefined; // Những gì học viên sẽ học được
    lastUpdated: string | undefined; // Ngày cập nhật gần nhất
    contents: {
        id: string | undefined;
        sectionTitle: string | undefined;
        sectionContents: {
            quiz?: {
                id: string | undefined;
                orderInSection: number | undefined;
                title: string | undefined;
            },
            lesson?: {
                id: string | undefined;
                orderInSection: number | undefined;
                title: string | undefined;
                freePreview?: boolean | undefined;
                duration?: number | undefined;
            }
        }[]
    }[] | undefined; // Nội dung khóa học theo từng phần
}
