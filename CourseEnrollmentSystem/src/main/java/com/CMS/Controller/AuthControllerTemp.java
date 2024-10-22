package com.CMS.Controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.bind.annotation.SessionAttributes;

import com.CMS.entities.Admin;
import com.CMS.entities.Auth;
import com.CMS.entities.Instructor;
import com.CMS.interfaceImpl.CourseService;
import com.CMS.repositories.AdminRepo;
import com.CMS.repositories.InstructorRepo;

import jakarta.servlet.http.HttpSession;

@RestController
@RequestMapping("/auth")
public class AuthControllerTemp {
	@Autowired
    private CourseService courseService; // Use dependency injection
    
    @Autowired
    private AdminRepo arepo;
    
    @Autowired
    private InstructorRepo irepo;

    // Response DTO to return role and ID
    class LoginResponse {
        private String role;
        private Long id;

        public LoginResponse(String role, Long id) {
            this.role = role;
            this.id = id;
        }

        public String getRole() {
            return role;
        }

        public void setRole(String role) {
            this.role = role;
        }

        public Long getId() {
            return id;
        }

        public void setId(Long id) {
            this.id = id;
        }
    }

   
    @PostMapping("/login")
    public Object login(@RequestBody Auth auth) {    
        String email = auth.getEmail();
        String password = auth.getPassword();
        System.out.println("Email: " + email + ", Password: " + password);
        
        if (email != null && password != null) {
            // Check if the user is an admin
            Admin admin = arepo.findByName(email);
            if (admin != null && admin.getPassword().equals(password)) {
                // Return role as "admin" and admin ID
            	 LoginResponse obj= new LoginResponse("admin", admin.getSid());
                 System.out.println(obj.getRole()+ obj.getId());
                 return obj;         
                 }

            // Check if the user is an instructor
            Instructor instructor = irepo.findByName(email);
            if (instructor != null && instructor.getPassword().equals(password)) {
            	System.out.println("login id is "+ instructor.getIid());
            	
            	
                courseService.getid(instructor.getIid()); // Set the instructor ID in the service

                 LoginResponse obj= new LoginResponse("instructor", instructor.getIid());
                 System.out.println( "this is login sucess"+obj.getRole()+ obj.getId());
                 return obj;

            }
        }

        // If no user is found or incorrect password, return an error message
        return "Please insert correct user email or password";
    }
}
