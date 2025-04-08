export const GET_API = (id, page, status) => {
  return {
    getAllUsers: `/api/v1/users/get-all-users`,
    getAllStudents: `/api/v1/students`,
    getAllTutors: "/api/v1/tutors",
    viewTutorStudentList: "/api/v1/tutors/messages",
    getStudentDashBoard: `/api/v1/students/${id}/tutors`,
    getStaffs: `/api/v1/staff`,
    viewAllocations: "/api/v1/staff/allocations",
    getListOfMessengers: "/api/v1/messages/conversations",
    getMessagesBetweenUsers: `/api/v1/messages/conversations/${id}`,
    getAllCmts: `/api/v1/comments/${id}/comments`,
    getAllBlog: "/api/v1/blogs",
    getBlogById: `/api/v1/blogs/${id}`,
    getBlogWaitingApproval: "/api/v1/blogs/pending/list",
    getMyBlogs: `/api/v1/blogs/my-blogs?status=${status}`,
    getUserProfile: "/api/v1/users/profile",
    getNotifications: "/api/v1/notifications",
    viewStudentAssigned: "/api/v1/tutors/view-student-assigned",
    viewTutorAssigned: "/api/v1/students/view-tutor-assigned",
    viewTutorSchedule: `/api/v1/schedules/tutor-schedule`,
    viewStudentSchedule: `/api/v1/schedules/student-schedule`,
    getStudentAnalytics: `/api/v1/analytics/student/${id}`,
    getAnalyticOverall: "/api/v1/analytics/overall",
  };
};

export const POST_API = (id) => {
  return {
    createStudent: "/api/v1/students",
    createTutor: "/api/v1/tutors",
    login: "/api/v1/users/login",
    createStaff: "/api/v1/staff",
    allocateTutors: "/api/v1/staff/allocate",
    createSchedule: "/api/v1/schedules",
    sendMessage: "/api/v1/messages",
    commentBlog: `/api/v1/comments/${id}/comments`,
    uploadBlog: "/api/v1/blogs",
  };
};

export const PUT_API = (id) => {
  return {
    updateProfile: `/api/v1/users/profile`,
    updateTutor: `/api/v1/tutors/${id}`,
    updateMessage: `/api/v1/messages/${id}`,
    updateComment: `/api/v1/comments/comments/${id}`,
    updateBlog: `/api/v1/blogs/${id}`,
    blogApproval: `/api/v1/blogs/approve/${id}`,
    updateSchedule: `/api/v1/schedules/${id}`,
  };
};

export const DELETE_API = (id) => {
  return {
    deleteStudent: `/api/v1/students/${id}`,
    deleteTutor: `/api/v1/tutors/${id}`,
    deleteAllocation: `/api/v1/staff/allocations/${id}`,
    deleteMessage: `/api/v1/messages/${id}`,
    deleteComment: `/api/v1/comments/comments/${id}`,
    deleteBlog: `/api/v1/blogs/${id}`,
    deleteNotifications: `/api/v1/notifications/${id}`,
  };
};
