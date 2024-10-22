package com.CMS.entities;

import lombok.Data;

@Data
public class Register {
	private Long sid;
	private String name;
	private String email;
	private String password;
	private String role;
	
}
