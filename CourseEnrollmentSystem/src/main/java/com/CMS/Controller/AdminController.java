package com.CMS.Controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.CMS.entities.Admin;
import com.CMS.interfaceImpl.AdminService;

@RestController
@RequestMapping("/admin")
public class AdminController {

    @Autowired
    private AdminService adminService;
    


    
    @PostMapping("/create")
    public ResponseEntity<?> createAdmin(@RequestBody Admin admin) {
        	 {
        		 Admin createAdmin = adminService.saveAdmin(admin);
        		 
                 return new ResponseEntity<>(createAdmin, HttpStatus.CREATED);

        	}
        	
        	
            
        }
    
    
//
//    @GetMapping("/students/{id}")
//    public ResponseEntity<Optional<Admin>> getStudentById(@PathVariable Long id) {
//        Optional<Admin> student = adminService.getStudentById(id);
//        return ResponseEntity.ok(student);
//    }
//
//    @GetMapping("/students")
//    public List<Admin> getAllStudents() {
//        return studentService.getAllStudents();
//    }
//
//    @PutMapping("/students/update/{id}")
//    public Optional<Admin> updateStudent(@PathVariable Long id, @RequestBody Student student) {
//       return adminService.updateStudent(id, student);
//      
//    }
//
//    @DeleteMapping("/students/delete/{id}")
//    public ResponseEntity<String> deleteStudent(@PathVariable Long id) {
//    	adminService.deleteStudent(id);
//        return new ResponseEntity<>("Student deleted successfully", HttpStatus.OK);
//    }
//
//    @PostMapping("/students/enroll")
//    public ResponseEntity<String> enrollStudentInCourse(@RequestParam Long studentId, @RequestParam Long courseId) {
//    	adminService.enrollInCourse(studentId, courseId);
//        return new ResponseEntity<>("Student enrolled in course successfully", HttpStatus.OK);
//    }
//
//    @GetMapping("/students/{id}/courses")
//    public List<Course> getEnrolledCourses(@PathVariable Long id) {
//        return adminService.getEnrolledCourses(id);
//    }
    
    
    
    
    
    
    
    
    
}

