//package com.CMS.security2;
//
//import java.util.List;
//import java.util.stream.Collectors;
//
//import org.springframework.beans.factory.annotation.Autowired;
//import org.springframework.security.core.authority.SimpleGrantedAuthority;
//import org.springframework.security.core.userdetails.UserDetails;
//import org.springframework.security.core.userdetails.UserDetailsService;
//import org.springframework.security.core.userdetails.UsernameNotFoundException;
//import org.springframework.stereotype.Service;
//
//import com.CMS.entities.Instructor;
//import com.CMS.repositories.InstructorRepo;
//
//
//@Service
//public class UserDetailsServiceImpl implements UserDetailsService {
//
//	@Autowired
//	private InstructorRepo userRepo;
//
//	@Override
//	public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
//Instructor user = userRepo.findByName(username);
//
//		if (user == null) {
//			throw new UsernameNotFoundException("user not found");
//		}
//		UserDetailsImpl userDetails = new UserDetailsImpl(user);
//
//		List<SimpleGrantedAuthority> authorities = user.getRole().getPrivilleges().stream()
//				.map(priv -> new SimpleGrantedAuthority(priv.getName())).collect(Collectors.toList());
//		authorities.add(new SimpleGrantedAuthority("ROLE_" + user.getRole().getName()));
//		userDetails.setAuthorities(authorities);
//		return userDetails;
//	}
//
//}
