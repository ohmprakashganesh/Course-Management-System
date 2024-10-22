//package com.CMS.Security;
//
//import java.util.Optional;
//
//import org.springframework.beans.factory.annotation.Autowired;
//import org.springframework.security.core.userdetails.UserDetails;
//import org.springframework.security.core.userdetails.UserDetailsService;
//import org.springframework.security.core.userdetails.UsernameNotFoundException;
//import org.springframework.stereotype.Service;
//
//import com.CMS.entities.Admin;
//import com.CMS.entities.Instructor;
//import com.CMS.repositories.AdminRepo;
//import com.CMS.repositories.InstructorRepo;
//
//@Service
//public class CustomUserDetailsService implements UserDetailsService {
//
//    @Autowired
//    private AdminRepo arepo;
//
//    @Autowired
//    private InstructorRepo teacherRepository;
//
//    @Override
//    public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
//        // Try to load as student first
//        Optional<Admin> student = Optional.ofNullable(arepo.findByName(username));
//        if (student.isPresent()) {
//            return new CustomUserDetails(student.get().getEmail(), student.get().getPassword(), "ROLE_STUDENT");
//        }
//
//        // If not found as student, try to load as teacher
//        Optional<Instructor> teacher = Optional.ofNullable(teacherRepository.findByName(username));
//        if (teacher.isPresent()) {
//            return new CustomUserDetails(teacher.get().getEmail(), teacher.get().getPassword(), "ROLE_INSTRUCTOR");
//        }
//
//        throw new UsernameNotFoundException("User not found with email: " + username);
//    }
//}
