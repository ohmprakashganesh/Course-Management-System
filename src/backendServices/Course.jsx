import { myAxios } from "./Helper";


export const createCourse = (courseData) => {
    const formData = new FormData();
    formData.append('name', courseData.name);
    formData.append('price', courseData.price);
    formData.append('description', courseData.description);
    if (courseData.video) {
        formData.append('video', courseData.video);
    }

    return myAxios.post('/api/course/create', formData, {
        headers: {
            'Content-Type': 'multipart/form-data'
        }
    })
    .then(response => response.data)
    .catch(error => {
        console.error("Error creating course", error);
        throw error;
    });
};



export const getCourseById = (courseId) => {
    return myAxios.get(`/api/course/${courseId}`)
        .then((response) => response.data)
        .catch((error) => {
            console.error("Error fetching course", error);
            throw error;
        });
};

export const getAllCourses = () => {
    return myAxios.get('/api/course/')
        .then((response) => response.data)
        .catch((error) => {
            console.error("Error fetching courses", error);
            throw error;
        });
};

export const updateCourse = (courseId, courseData) => {
    return myAxios.put(`/api/course/update/${courseId}`, courseData)
        .then((response) => response.data)
        .catch((error) => {
            console.error("Error updating course", error);
            throw error;
        });
};

export const deleteCourse = (courseId) => {
    return myAxios.delete(`/api/course/delete/${courseId}`)
        .then((response) => response.data)
        .catch((error) => {
            console.error("Error deleting course", error);
            throw error;
        });
};
