package com.CMS.Controller;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.CMS.entities.Instructor;
import com.CMS.interfaceImpl.InstructorImpl;

@RestController
@RequestMapping("/api")
public class InstructorController {

    @Autowired
    private InstructorImpl insimpl;

//    @PostMapping("/create")
//    public ResponseEntity<Instructor> createInstructor(@RequestBody Instructor instructor) {
//    	
//        Instructor createdInstructor = insimpl.saveInstructor(instructor);
//        return new ResponseEntity<>(createdInstructor, HttpStatus.CREATED);
//    	
//    }

    @GetMapping("/instructor/{id}")
    public ResponseEntity<Optional<Instructor>> getInstructorById(@PathVariable Long id) {
        Optional<Instructor> instructor = insimpl.getInstructorById(id);
        return ResponseEntity.ok(instructor);
    }

    @GetMapping("/instructor")
    public List<Instructor> getAllInstructors() {
        return insimpl.getAllInstructors();
    }

    @PutMapping("/instructor/update/{id}")
    public ResponseEntity<Optional<Instructor>> updateInstructor(@PathVariable Long id, @RequestBody Instructor instructor) {
        Optional<Instructor> updatedInstructor = insimpl.updateInstructor(id, instructor);
        return ResponseEntity.ok(updatedInstructor);
    }

    @DeleteMapping("/instructor/delete/{id}")
    public ResponseEntity<String> deleteInstructor(@PathVariable Long id) {
    	insimpl.deleteInstructor(id);
        return new ResponseEntity<>("Instructor deleted successfully", HttpStatus.OK);
    }
}
