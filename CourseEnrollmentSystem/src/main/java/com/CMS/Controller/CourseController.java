package com.CMS.Controller;

import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

import com.CMS.entities.Course;
import com.CMS.interfaceImpl.CourseService;

@RestController
@RequestMapping("/api/course")
public class CourseController {
//	public String uploadDir="C:\\Users\\GANESH\\Documents\\workspace-spring-tool-suite-4-4.21.0.RELEASE\\restapiupload\\src\\main\\resources\\static\\videos";
	public String uploadDir=System.getProperty("user.dir")+ "/src/main/resources/static/videos";
    
	@Autowired
    private CourseService courseService;
    
  
    
   

    @PostMapping("/create")
    public ResponseEntity<Course> createCourse(
    		@RequestParam("name") String name,
            @RequestParam("price") String price,
            @RequestParam("description") String description,
            @RequestParam(value = "file", required = false) MultipartFile video){
    	
    	Course course= new Course();
    	course.setName(name);
    	course.setPrice(price);
    	course.setDescription(description);

    	
    	if(video != null) {
    	
    		    System.out.println("Uploaded file name: " + video.getOriginalFilename());
    		    System.out.println("Uploaded file size: " + video.getSize());
    		
    	String originalfilename= video.getOriginalFilename();
    	Path fileNameAndPath= Paths.get(uploadDir,originalfilename );
    	try {
			Files.write(fileNameAndPath, video.getBytes());
			course.setVideo(originalfilename);
			System.out.print("success");
			} catch (IOException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}
    	
    	}
    	if(video== null) {
    		System.out.println("video not found");
    	}
    	
    	
    	
    	
        Course createdCourse = courseService.saveCourse(course);
        return new ResponseEntity<>(createdCourse, HttpStatus.CREATED);
    }

    
    @GetMapping("/{id}")
    public ResponseEntity<Optional<Course>> getCourseById(@PathVariable Long id) {
    	
        Optional<Course> course = courseService.getCourseById(id);
        return ResponseEntity.ok(course);
    }

    @GetMapping("/")
    public List<Course> getAllCourses() {
        return courseService.getAllCourses();
    }

    @PutMapping("/update/{id}")
    public ResponseEntity<?> updateCourse(
    		@PathVariable Long id, 
    		@RequestParam("name") String name,
    	    @RequestParam("price") String price,
    	    @RequestParam("description") String description,
    	    @RequestParam(value = "video", required = false) MultipartFile video) {
    	
        Optional<Course> updatedCourse = courseService.updateCourse(id, name,price,description,video);
        if (updatedCourse.isPresent()) {
            return ResponseEntity.ok(updatedCourse);
        } else {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body("Course not found");
        }
    }

    @DeleteMapping("/delete/{id}")
    public ResponseEntity<?> deleteCourse(@PathVariable Long id) {
    	 courseService.deleteCourse(id);
        return new ResponseEntity<>("Course deleted successfully", HttpStatus.OK);
    }
    
    @GetMapping("/search")
    public ResponseEntity<List<Course>> search(@RequestParam("name") String keyword) {
        if (keyword == null || keyword.trim().isEmpty()) {
            return ResponseEntity.badRequest().body(null);  // Return 400 Bad Request if keyword is missing
        }
        System.out.println("Searching for keyword: " + keyword);
        List<Course> courses = courseService.SearchByName(keyword);
        return ResponseEntity.ok(courses);  // Return the search results
    }


    @GetMapping("/instructor/{instructorId}")
    public List<Course> getCoursesByInstructor(@PathVariable Long instructorId) {
        return courseService.getCoursesByInstructor(instructorId);
    }
}

