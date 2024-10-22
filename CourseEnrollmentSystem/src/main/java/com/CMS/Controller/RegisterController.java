package com.CMS.Controller;



import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.CMS.entities.Admin;
import com.CMS.entities.Instructor;
import com.CMS.entities.Register;
import com.CMS.repositories.AdminRepo;
import com.CMS.repositories.InstructorRepo;








    @RestController
    @RequestMapping("/ins")
    public class RegisterController {

    
    	Instructor  createInstructor; 
    	
    	@Autowired
    	AdminRepo arepo;
    	
        @Autowired
        private InstructorRepo irepo;

        @PostMapping("/register")
        public ResponseEntity<?> createInstructor(@RequestBody Register reg) {
            Admin admin = arepo.findByName(reg.getEmail());
            Instructor instructorobj= irepo.findByName(reg.getEmail());
            
           if(admin != null || instructorobj !=null) {
               System.out.println("already exist email");

               return new ResponseEntity<>("email already exoist", HttpStatus.CONFLICT); // Return created instructor
           }
            

            try {
                
                        Instructor instructor1 = new Instructor();
                        instructor1.setEmail(reg.getEmail());
                        instructor1.setName(reg.getName());
                        instructor1.setPassword(reg.getPassword());
                        instructor1.setRole("INSTRUCTOR");
      
                        createInstructor = irepo.save(instructor1); // Save instructor object
                }catch (Exception ex) {
                System.out.println("Exception in register: " + ex.getMessage());
            }
            return new ResponseEntity<>(createInstructor, HttpStatus.CREATED); // Return created instructor

            

        }
    
}