package com.CMS.interfaceImpl;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.CMS.Interface.InstructorInterface;
import com.CMS.entities.Instructor;
import com.CMS.repositories.InstructorRepo;
@Service
public class InstructorImpl  implements InstructorInterface{
	@Autowired
	private InstructorRepo insRepo;

	@Override
	public Instructor saveInstructor(Instructor instructor) {

	    String temail = instructor.getEmail();
	    
	    if(temail == null || temail.isEmpty()) {
	        // If email is empty or null, return null or throw an exception.
	        return null;
	    }
	    
	    // Check if an instructor with the same email already exists.
	    Instructor existingInstructor = insRepo.findByName(temail);  // Assuming you implement case-insensitive query
	    
	    // If an instructor with the same email is found, do not save and return null.
	    if (existingInstructor != null) {
	        return null;
	    }

	    // Save the new instructor
	    insRepo.save(instructor);
	    return instructor;
	}


	@Override
	public Optional<Instructor>  getInstructorById(Long id) {
		
		return  insRepo.findById(id);	
			
	}

	@Override
	public List<Instructor> getAllInstructors() {
	return  insRepo.findAll();

		
	}

	public Optional<Instructor> updateInstructor(Long id, Instructor vobj) {
	    // Fetch the instructor from the repository, handle Optional
	    Optional<Instructor> optionalObj = insRepo.findById(id);

	    // Check if the instructor is present
	    if (optionalObj.isPresent()) {
	        Instructor obj = optionalObj.get();  // Unwrap the Optional

	        // Update the instructor fields
	        obj.setPassword(vobj.getPassword());
	        obj.setEmail(vobj.getEmail());
	        obj.setName(vobj.getName());
	        obj.setRole(vobj.getRole());

	        // Save the updated instructor back to the repository
	        Instructor updated = insRepo.save(obj);

	        // Return the updated instructor wrapped in an Optional
	        return Optional.ofNullable(updated);
	    } else {
	        // Handle the case when the instructor is not found (Optional is empty)
	        return Optional.empty();  // Or throw an exception depending on your use case
	    }
	}

	@Override
	public void deleteInstructor(Long id) {
		// TODO Auto-generated method stub
		insRepo.deleteById(id);
		System.out.println("sucessful delete");
		
	}

}
