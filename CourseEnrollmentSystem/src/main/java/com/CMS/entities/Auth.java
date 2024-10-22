package com.CMS.entities;

import lombok.Data;

@Data
public class Auth {
	
	private String email;
	private String role;
	private String password;
}
