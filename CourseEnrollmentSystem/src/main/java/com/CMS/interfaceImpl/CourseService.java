package com.CMS.interfaceImpl;

import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import com.CMS.Interface.Courseinterface;
import com.CMS.entities.Course;
import com.CMS.entities.Instructor;
import com.CMS.repositories.CourseRepo;
import com.CMS.repositories.InstructorRepo;

import jakarta.servlet.http.HttpSession;

@Service
public class CourseService implements Courseinterface {
	
	@Autowired
	private CourseRepo repo;
	
	@Autowired
	private InstructorRepo irepo;
	
	public String uploadDir=System.getProperty("user.dir")+ "/src/main/resources/static/videos";

	private Long instructorId;

	 public void getid(Long id) {
	        this.instructorId = id;    
	        System.out.println("Instructor ID set to to the jfdjfkldjf  " + id);
	    }
	
	
	@Override
	public Course saveCourse(Course course) {
	    // Hardcode the instructor ID (e.g., using 1L)
		
		if (instructorId == null) {
			  System.out.println("id must not be null" );
	        throw new IllegalArgumentException("Instructor ID must not be null.");
	      

	    }

	    // Fetch the instructor by hardcoded ID
	    Optional<Instructor> instructorOpt = irepo.findById(instructorId);

	    if (instructorOpt.isPresent()) {
	        Instructor instructor = instructorOpt.get();
	        
	        // Set the retrieved Instructor to the Course
	        course.setInstructor(instructor);
	    } else {
	        throw new RuntimeException("Instructor not found!");
	    }

	    // Save the course with the associated instructor
	    Course savedCourse = repo.save(course);

	    return savedCourse;
	}


	@Override
	public Optional<Course> getCourseById(Long id) {
		Optional<Course> savecourse= repo.findById(id);
		return savecourse;
	}

	
	
	@Override
	public List<Course> getAllCourses() {
		List<Course> savecourse= repo.findAll();
		return savecourse;
	}

	@Override
	public List<Course> getCoursesByInstructor(Long instructorId) {
		return repo.findByInstructorId(instructorId);
	}
	
	@Override
	public List<Course>SearchByName(String name) {
		return repo.findByNameContainingIgnoreCase(name);
	}


	
	
	@Override
	public Optional<Course> updateCourse(Long id, String name, String price, String description, MultipartFile video) {
	    // Find the course by id
	    Optional<Course> optionalObj = repo.findById(id);

	    // Check if the course is present
	    if (optionalObj.isPresent()) {
	        Course obj = optionalObj.get();  // Unwrap the Optional

	        // Update the fields
	        obj.setName(name);
	        obj.setPrice(price);
	        obj.setDescription(description);
	        
	        // Handle the video upload if present
	        if (video != null && !video.isEmpty()) {
	            // Logic to save the video file (e.g., to a specific directory or cloud storage)
	            // Example: obj.setVideoPath(saveVideo(video));
	        	
	            	String originalfilename= video.getOriginalFilename();
	            	Path fileNameAndPath= Paths.get(uploadDir,originalfilename );
	            	try {
	        			Files.write(fileNameAndPath, video.getBytes());
	        			obj.setVideo(originalfilename);
	        			System.out.println("file is saved in "+originalfilename);
	        		} catch (IOException e) {
	        			// TODO Auto-generated catch block
	        			e.printStackTrace();
	        		}
	        	
	        	
	        }

	        // Save the updated course back to the repository
	        Course updated = repo.save(obj);

	        // Return the updated course wrapped in an Optional
	        return Optional.of(updated);
	    } else {
	        // Return an empty Optional if the course was not found
	        return Optional.empty();
	    }
	}

		
		
	

	@Override
	public void deleteCourse(Long id) {
		
		repo.deleteById(id);
		System.out.println("sucess full delted");
	}


	@Override
	public List<Course> SearchByKeyword(String name) {
		// TODO Auto-generated method stub
		return null;
	}




}
