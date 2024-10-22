package com.CMS.Interface;

import java.util.List;
import java.util.Optional;

import com.CMS.entities.Instructor;

public interface InstructorInterface {
	
	 Instructor saveInstructor(Instructor instructor);
	   Optional<Instructor>  getInstructorById(Long id);
	    List<Instructor> getAllInstructors();
	   Optional<Instructor>  updateInstructor(Long id, Instructor instructor);
	    void deleteInstructor(Long id);

}
