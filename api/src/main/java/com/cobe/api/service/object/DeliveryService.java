package com.cobe.api.service.object;

import com.cobe.api.mapper.DeliveryMapper;
import com.cobe.api.model.dto.DeliveryDto;
import com.cobe.api.model.dto.PostDeliveryDto;
import com.cobe.api.model.entity.Delivery;
import com.cobe.api.repository.DeliveryRepository;
import com.cobe.api.service.AbstractCrudService;
import jakarta.mail.internet.MimeMessage;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.cache.CacheManager;
import org.springframework.cache.annotation.CacheConfig;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.mail.javamail.MimeMessageHelper;
import org.springframework.stereotype.Service;
import org.thymeleaf.context.Context;
import org.thymeleaf.spring6.SpringTemplateEngine;

import java.time.Instant;
import java.util.UUID;
import jakarta.persistence.EntityNotFoundException;
import com.cobe.api.model.entity.TransportSupplier;
import com.cobe.api.model.entity.Contact;
import com.cobe.api.config.exception.BusinessException;

@Service
@CacheConfig(cacheNames = "deliveries")
public class DeliveryService extends AbstractCrudService<Delivery, DeliveryDto, PostDeliveryDto, UUID> {

    @Value("${app.mail.from}")
    private String emailSender;

    private final JavaMailSender mailSender;
    private final DeliveryRepository repository;
    private final DeliveryMapper mapper;
    private final SpringTemplateEngine templateEngine;

    public DeliveryService(
            DeliveryRepository repository,
            CacheManager cacheManager,
            JavaMailSender mailSender,
            DeliveryMapper mapper,
            SpringTemplateEngine templateEngine
    ) {
        super(
                repository,
                cacheManager,
                mapper::toDto,
                mapper::toEntity,
                mapper::updateDeliveryFromDto

        );
        this.repository = repository;
        this.mailSender = mailSender;
        this.mapper = mapper;
        this.templateEngine = templateEngine;
    }

    @Override
    protected boolean dataValidatorControl(PostDeliveryDto dto) {
        return true;
    }

    @Override
    protected String getEntityName() {
        return "delivery";
    }

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
