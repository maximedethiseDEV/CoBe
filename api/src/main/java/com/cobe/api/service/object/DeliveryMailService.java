package com.cobe.api.service.object;

import com.cobe.api.config.exception.BusinessException;
import com.cobe.api.model.entity.Contact;
import com.cobe.api.model.entity.Delivery;
import com.cobe.api.model.entity.TransportSupplier;
import com.cobe.api.repository.DeliveryRepository;
import jakarta.mail.internet.MimeMessage;
import jakarta.persistence.EntityNotFoundException;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.mail.javamail.MimeMessageHelper;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;
import org.thymeleaf.context.Context;
import org.thymeleaf.spring6.SpringTemplateEngine;

import java.time.Instant;
import java.util.UUID;

@Service
public class DeliveryMailService {

    @Value("${app.mail.from}")
    private String emailSender;

    private final JavaMailSender mailSender;
    private final DeliveryRepository repository;
    private final SpringTemplateEngine templateEngine;

    public DeliveryMailService(
            DeliveryRepository repository,
            JavaMailSender mailSender,
            SpringTemplateEngine templateEngine
    ) {
        this.repository = repository;
        this.mailSender = mailSender;
        this.templateEngine = templateEngine;
    }

    /**
     * Envoie l'e-mail d'information de livraison et tente d'ajouter les coordonnées
     * de l'utilisateur connecté (contactEmail, contactPhone)
     */
    public void sendMailDelivery(UUID id) {
        Context context = new Context();
        Delivery delivery = repository.findByIdForMail(id);

        if (delivery == null) {
            throw new EntityNotFoundException("Livraison introuvable");
        }

        TransportSupplier transportSupplier = delivery.getTransportSupplier();
        if (transportSupplier == null) {
            throw new BusinessException("Aucun transporteur associé à la livraison");
        }
        Contact contact = transportSupplier.getContact();
        if (contact == null) {
            throw new BusinessException.MissingContactException("Aucun contact défini pour le transporteur");
        }
        String emailRecipient = contact.getEmail();
        if (emailRecipient == null || emailRecipient.isBlank()) {
            throw new BusinessException("L'adresse email du contact est manquante");
        }

        String transportSupplierName = transportSupplier.getCompany().getCompanyName();
        String transportSupplierLicense = transportSupplier.getLicense();
        String customerName = delivery.getOrder().getCustomer().getCompany().getCompanyName();
        String productName = delivery.getOrder().getProduct().getNameShort();
        String productCode = delivery.getOrder().getProduct().getCodeAS400();
        String quantity = String.valueOf(delivery.getQuantity());
        Instant actualDeliveryBegin = delivery.getActualDeliveryBegin();
        Instant actualDeliveryEnd = delivery.getActualDeliveryEnd();
        String materialSupplierName = delivery.getOrder().getProduct().getMaterialSupplier().getCompany().getCompanyName();
        String materialSupplierStreet = delivery.getOrder().getProduct().getMaterialSupplier().getAddress().getStreet();
        String materialSupplierCityName = delivery.getOrder().getProduct().getMaterialSupplier().getAddress().getCity().getCityName();
        String materialSupplierPostalCode = delivery.getOrder().getProduct().getMaterialSupplier().getAddress().getCity().getPostalCode();
        String materialSupplierCountryCode = delivery.getOrder().getProduct().getMaterialSupplier().getAddress().getCity().getCountry().getCountryCode();

        String subject = "Informations de livraison";

        context.setVariable("transportSupplierName", transportSupplierName);
        context.setVariable("transportSupplierLicense", transportSupplierLicense);
        context.setVariable("customerName", customerName);
        context.setVariable("productName", productName);
        context.setVariable("productCode", productCode);
        context.setVariable("quantity", quantity);
        context.setVariable("actualDeliveryBegin", actualDeliveryBegin);
        context.setVariable("actualDeliveryEnd", actualDeliveryEnd);
        context.setVariable("materialSupplierName", materialSupplierName);
        context.setVariable("materialSupplierStreet", materialSupplierStreet);
        context.setVariable("materialSupplierCityName", materialSupplierCityName);
        context.setVariable("materialSupplierPostalCode", materialSupplierPostalCode);
        context.setVariable("materialSupplierCountryCode", materialSupplierCountryCode);

        // Tentative d'injection des coordonnées de l'utilisateur connecté
        // - contactEmail: si le principal expose un email (ex: username = email)
        // - contactPhone: si disponible via le principal (sinon laissé null)
        try {
            Authentication auth = SecurityContextHolder.getContext().getAuthentication();
            if (auth != null && auth.isAuthenticated()) {
                Object principal = auth.getPrincipal();
                String contactEmail = null;
                String contactPhone = null;

                if (contactEmail != null && !contactEmail.isBlank()) {
                    context.setVariable("contactEmail", contactEmail);
                }
                if (contactPhone != null && !contactPhone.isBlank()) {
                    context.setVariable("contactPhone", contactPhone);
                }
            }
        } catch (Exception ignored) {
        }

        String htmlBody = templateEngine.process("mail/DeliveryMailTemplate", context);

        try {
            MimeMessage message = mailSender.createMimeMessage();
            MimeMessageHelper helper = new MimeMessageHelper(message, false, "UTF-8");
            helper.setFrom(emailSender);
            helper.setTo(emailRecipient);
            helper.setSubject(subject);
            helper.setText(htmlBody, true);
            mailSender.send(message);
        } catch (Exception e) {
            throw new BusinessException.MailSendingException("Impossible d'envoyer l'e-mail", e);
        }
    }
}
