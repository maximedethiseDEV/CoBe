package com.cobe.api.service;

import jakarta.mail.internet.MimeMessage;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.mail.javamail.MimeMessageHelper;
import org.springframework.stereotype.Service;

@Service
public class MailService {

    private final JavaMailSender mailSender;

    @Value("${app.mail.from}")
    private String from;

    public MailService(JavaMailSender mailSender) {
        this.mailSender = mailSender;
    }

    /*
    public void sendSimpleMail(String to, String subject, String htmlBody) throws Exception {
        try{
            MimeMessage message = mailSender.createMimeMessage();
            MimeMessageHelper helper = new MimeMessageHelper(message, false, "UTF-8");
            helper.setFrom(from);
            helper.setTo(to);
            helper.setSubject((subject != null && !subject.isBlank()) ? subject : "Message de test");
            helper.setText(htmlBody, true); // true => HTML

            mailSender.send(message);

        }
        catch (Exception e){
            throw new Exception("Impossible d'envoyer l'e-mail", e);
        }
    }

    public String sendEmailWithAttachment() {
        try {
            MimeMessage message = mailSender.createMimeMessage();
            MimeMessageHelper helper = new MimeMessageHelper(message, true);

            helper.setFrom("tutorial.genuinecoder@gmail.com");
            helper.setTo("tutorial.genuinecoder@gmail.com");
            helper.setSubject("Java email with attachment | From GC");
            helper.setText("Please find the attached documents below");

            mailSender.send(message);
            return "success!";
        } catch (Exception e) {
            return e.getMessage();
        }
    }

    public String sendHtmlEmail() {
        try {
            MimeMessage message = mailSender.createMimeMessage();
            MimeMessageHelper helper = new MimeMessageHelper(message, true);

            helper.setFrom("tutorial.genuinecoder@gmail.com");
            helper.setTo("tutorial.genuinecoder@gmail.com");
            helper.setSubject("Java email with attachment | From GC");

            try (var inputStream = Objects.requireNonNull(EmailController.class.getResourceAsStream("/templates/email-content.html"))) {
                helper.setText(
                        new String(inputStream.readAllBytes(), StandardCharsets.UTF_8),
                        true
                );
            }
            helper.addInline("logo.png", new File("C:\\Users\\Genuine Coder\\Documents\\Attachments\\logo.png"));
            mailSender.send(message);
            return "success!";
        } catch (Exception e) {
            return e.getMessage();
        }
    }

     */
}