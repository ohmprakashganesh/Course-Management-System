//package com.CMS.security2;
//
//import org.springframework.beans.factory.annotation.Autowired;
//import org.springframework.context.annotation.Bean;
//import org.springframework.context.annotation.Configuration;
//import org.springframework.http.HttpMethod;
//import org.springframework.security.authentication.AuthenticationManager;
//import org.springframework.security.authentication.dao.DaoAuthenticationProvider;
//import org.springframework.security.config.Customizer;
//import org.springframework.security.config.annotation.authentication.configuration.AuthenticationConfiguration;
//import org.springframework.security.config.annotation.method.configuration.EnableMethodSecurity;
//import org.springframework.security.config.annotation.web.builders.HttpSecurity;
//import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
//import org.springframework.security.core.userdetails.UserDetailsService;
//import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
//import org.springframework.security.web.SecurityFilterChain;
//
//@Configuration
//@EnableWebSecurity
//@EnableMethodSecurity
//public class SecurityConfig {
//
//	@Autowired
//	private UserDetailsService userDetailsService;
//
//	@Bean
//	public BCryptPasswordEncoder passwordEncoder() {
//		return new BCryptPasswordEncoder();
//	}
//
//	@Bean
//	public DaoAuthenticationProvider daoAuthenticationProvider() {
//		DaoAuthenticationProvider provider = new DaoAuthenticationProvider();
//		provider.setUserDetailsService(userDetailsService);
//		provider.setPasswordEncoder(passwordEncoder());
//		return provider;
//	}
//
//	@Bean
//	public AuthenticationManager authenticationManager(AuthenticationConfiguration configuration) throws Exception {
//		return configuration.getAuthenticationManager();
//	}
//
//	@Bean
//	public SecurityFilterChain filterChain(HttpSecurity http) throws Exception {
//		
//		http.csrf(csrf->csrf.disable())
//		.authorizeHttpRequests(reqest->
//				reqest.requestMatchers("/admin/**").hasRole("ADMIN")
//				.requestMatchers(HttpMethod.GET).hasAuthority("READ")
//				.requestMatchers(HttpMethod.POST).hasAuthority("CREATE")
//				.requestMatchers(HttpMethod.PUT).hasAuthority("UPDATE")
//				.requestMatchers(HttpMethod.DELETE).hasAuthority("DELETE")
//				
//				.requestMatchers("/product/**").hasAnyRole("ADMIN","SELLER","CUSTOMER")
//				.requestMatchers(HttpMethod.GET).hasAuthority("READ")
//				.requestMatchers(HttpMethod.POST).hasAuthority("CREATE")
//				.requestMatchers(HttpMethod.PUT).hasAuthority("UPDATE")
//				.requestMatchers(HttpMethod.DELETE).hasAuthority("DELETE")
//				)
//		.httpBasic(Customizer.withDefaults());
//		
//		return http.build();
//	}
//
//}
