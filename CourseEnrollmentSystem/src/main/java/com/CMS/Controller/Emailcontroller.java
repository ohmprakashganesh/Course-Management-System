package com.CMS.Controller;


import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.mail.javamail.MimeMessageHelper;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import jakarta.mail.MessagingException;
import jakarta.mail.internet.MimeMessage;

@RestController
public class Emailcontroller {

    @Autowired
    private JavaMailSender mailSender;

    @PostMapping("/send-email")
    public String sendEmail(@RequestParam("username") String username) throws MessagingException {
        // Log the received username
        System.out.println("Received username: " + username);

        // Send email
        sendMail(username);
        return "success";
    }

    private void sendMail(String username) throws MessagingException {
        MimeMessage message = mailSender.createMimeMessage();  // Correct MimeMessage
        MimeMessageHelper helper = new MimeMessageHelper(message);
        helper.setFrom(username); // This will use the actual username as the sender's email without a custom name

        helper.setTo("recipient@example.com"); // recipient's email address
        helper.setSubject("Test Email");
       
        helper.setText("This is a test email from " + username);

        mailSender.send(message);  // Send the email
    }
}
