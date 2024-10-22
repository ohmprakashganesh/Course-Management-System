package com.CMS.repositories;


import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import com.CMS.entities.Admin;



public interface AdminRepo extends JpaRepository<Admin, Long> {
 
	 @Query("SELECT a FROM Admin a WHERE a.email = :email")
	    Admin findByName(@Param("email") String email);


	
}
