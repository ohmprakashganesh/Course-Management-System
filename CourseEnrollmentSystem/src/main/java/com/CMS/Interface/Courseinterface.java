package com.CMS.Interface;

import java.util.List;
import java.util.Optional;

import org.springframework.web.multipart.MultipartFile;

import com.CMS.entities.Course;

public interface Courseinterface {

	Course saveCourse(Course course);
    Optional<Course> getCourseById(Long id);
    List<Course> getAllCourses();
    List<Course> getCoursesByInstructor(Long instructorId);
//    Optional<Course> updateCourse(Long id, Course course);
    void deleteCourse(Long id);
	Optional<Course> updateCourse(Long id, String name, String price, String description, MultipartFile video);
	List<Course> SearchByKeyword(String name);
	List<Course> SearchByName(String name);
	
}
