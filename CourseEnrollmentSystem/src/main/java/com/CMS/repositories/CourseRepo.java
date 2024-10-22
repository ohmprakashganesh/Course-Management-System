package com.CMS.repositories;

import java.util.List;
import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.web.multipart.MultipartFile;

import com.CMS.entities.Course;

public interface CourseRepo extends JpaRepository<Course, Long> {
	
	 @Query("SELECT c FROM Course c WHERE c.instructor.iid = :instructorId")
	  List<Course> findByInstructorId(Long instructorId);
	 
	 
	    List<Course> findByNameContainingIgnoreCase(String name);


		




}
