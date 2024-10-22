package com.CMS.repositories;


import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import com.CMS.entities.Instructor;

public interface InstructorRepo extends JpaRepository<Instructor, Long> {
	
	 @Query("SELECT i FROM Instructor i WHERE i.email = :email")
	    Instructor findByName(@Param("email") String email);

	
	

}
