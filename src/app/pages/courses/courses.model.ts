export interface ICourse {
    id: number;
    name: string;
    description: string;
    price: number;
    rating: number; // Trung bình số sao đánh giá
    students: number; // Số lượng học viên đã đăng ký
    lessons: number; // Số bài học
    image: string; // Ảnh đại diện khóa học
    category: string; // Danh mục khóa học
    instructor: string; // Tên giảng viên
    level: 'Beginner' | 'Intermediate' | 'Advanced'; // Trình độ khóa học
    language: string; // Ngôn ngữ giảng dạy
    duration: string; // Tổng thời gian học (VD: "10h 30m")
    requirements: string[]; // Yêu cầu đầu vào (VD: ["Biết lập trình cơ bản", "Cài đặt Node.js"])
    whatYouWillLearn: string[]; // Những gì học viên sẽ học được
    lastUpdated: string; // Ngày cập nhật gần nhất
    content: {
        sectionTitle: string;
        lessons: { title: string; duration: string; freePreview?: boolean }[]
    }[]; // Nội dung khóa học theo từng phần
}
