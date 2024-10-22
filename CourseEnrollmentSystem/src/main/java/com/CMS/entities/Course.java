package com.CMS.entities;





import java.util.Optional;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;


import lombok.Data;

@Data
@Entity
public class Course {
	
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Long cid;
	private String name;
	private String price;
	private String description;
	private String video;


	 @ManyToOne
	    @JoinColumn(name = "instructor_id")
	    private Instructor instructor;


		
		
	

	  

}