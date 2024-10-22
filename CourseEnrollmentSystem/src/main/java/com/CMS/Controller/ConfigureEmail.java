package com.CMS.Controller;

import java.util.Properties;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.mail.javamail.JavaMailSenderImpl;



public class ConfigureEmail {

	
	 @Value("${spring.mail.password}")
	    private String mailPassword;

	    public JavaMailSenderImpl getJavaMailSender(String username) {
	        JavaMailSenderImpl mailSender = new JavaMailSenderImpl();
	        mailSender.setHost("smtp.gmail.com");
	        mailSender.setPort(587);

	        mailSender.setUsername(username);  // Set the username dynamically
	        mailSender.setPassword(mailPassword);

	        Properties props = mailSender.getJavaMailProperties();
	        props.put("mail.transport.protocol", "smtp");
	        props.put("mail.smtp.auth", "true");
	        props.put("mail.smtp.starttls.enable", "true");

	        return mailSender;
	    }
}
