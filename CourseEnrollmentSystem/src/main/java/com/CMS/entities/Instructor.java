package com.CMS.entities;

import java.util.List;

import com.fasterxml.jackson.annotation.JsonIgnore;

import jakarta.persistence.CascadeType;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.OneToMany;
import lombok.Data;

@Data
@Entity
public class Instructor {
	

	 @OneToMany(mappedBy = "instructor", cascade = CascadeType.ALL)
	    @JsonIgnore  
	    private List<Course> courses;

	
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Long iid;
	private String name;
	private String email;
	private String password;
	private String role;
	
	
	
	
	
	
	
	
	
//	 @ManyToOne(cascade = CascadeType.PERSIST)
//	@JoinColumn(name = "role_id")
//	private Role role;

	

}
