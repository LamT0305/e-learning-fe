export const GET_API = (id) => {
  return {
    getAllStudents: "/student/get-all-students",
    getAllTutors: "/tutor/get-all-tutors",
    viewTutorStudentList: "/tutor/view-tutor-student-list",
    getStudentDashBoard: `/tutor/get-student-dashboard/${id}`,
    getStaffs: `/staff/get-all-staffs/${id}`,
    viewAllocations: "/staff/allocation",
    viewScheduleRequest: "/schedule/view-schedule-request",
    getAllRoles: "/role/",
    getRoleById: `/role/${id}`,
    getListOfMessengers: "/message/all-conversations",
    getMessagesBetweenUsers: `/message/conversation/${id}`,
    getAllCmts: "/comment/get-all-comments",
    getAllBlog: "/blog/get-all-blog",
    getBlogById: `/blog/get-blog/${id}`,
    getBlogWaitingApproval: "/blog/get-list-blogs-pending",
  };
};

export const POST_API = () => {
  return {
    createStudent: "/student/create-student",
    createTutor: "/tutor/create-tutor",
    login: "/user/login",
    createStaff: "/staff/create-staff",
    allocateTutors: "/staff/allocation",
    createSchedule: "/schedule/create-schedule",
    filterScheduleByStatus: "/schedule/filter-schedule-by-status",
    createRole: "/role/",
    sendMessage: "/message/send-message",
    commentBlog: `/comment/comment-on-blog/${id}`,
    uploadBlog: "/blog/upload-blog",
  };
};

export const PUT_API = (id) => {
  return {
    updateStudent: `/student/update-student/${id}`,
    updateTutor: `/tutor/update-tutor/${id}`,
    updateMessage: `/message/update-message/${id}`,
    updateComment: `/comment/update-comment/${id}`,
    updateBlog: "/blog/update-blog",
    blogApproval: `/blog/approval/${id}`,
  };
};

export const DELETE_API = (id) => {
  return {
    deleteStudent: `/student/delete-student/${id}`,
    deleteTutor: `/tutor/delete-tutor/${id}`,
    deleteAllocation: `/staff/delete-allocation/${id}`,
    deleteSchedule: `/schedule/delete-schedule/${id}`,
    deleteMessage: `/message/delete-message/${id}`,
    deleteComment: `/comment/delete-comment/${id}`,
    deleteBlog: `/blog/delete-blog`,
  };
};
