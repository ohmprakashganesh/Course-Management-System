//package com.CMS.security2;
//
//import java.util.Collection;
//import java.util.List;
//
//import org.springframework.security.core.GrantedAuthority;
//import org.springframework.security.core.authority.SimpleGrantedAuthority;
//import org.springframework.security.core.userdetails.UserDetails;
//
//import com.CMS.entities.Instructor;
//
//public class UserDetailsImpl implements UserDetails {
//
//	private Instructor user;
//
//	public UserDetailsImpl(Instructor user) {
//		super();
//		this.user = user;
//	}
//
//	private List<SimpleGrantedAuthority> authorities;
//
//	@Override
//	public Collection<? extends GrantedAuthority> getAuthorities() {
//		return authorities;
//	}
//
//	public Instructor getUser() {
//		return user;
//	}
//
//	public void setUser(Instructor user) {
//		this.user = user;
//	}
//
//	public void setAuthorities(List<SimpleGrantedAuthority> authorities) {
//		this.authorities = authorities;
//	}
//
//	@Override
//	public String getPassword() {
//		return user.getPassword();
//	}
//
//	@Override
//	public String getUsername() {
//		return user.getEmail();
//	}
//
//}
