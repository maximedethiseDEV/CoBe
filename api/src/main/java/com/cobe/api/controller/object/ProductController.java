package com.cobe.api.controller.object;

import com.cobe.api.config.sse.SseService;
import com.cobe.api.controller.AbstractCrudController;
import com.cobe.api.model.dto.PostProductDto;
import com.cobe.api.model.dto.ProductDto;
import com.cobe.api.model.entity.Product;
import com.cobe.api.service.AbstractCrudService;
import com.cobe.api.service.object.ProductService;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.UUID;

@RestController
@RequestMapping("/products")
@CrossOrigin(origins = "http://localhost:4200")
public class ProductController extends AbstractCrudController<Product, ProductDto, PostProductDto, UUID> {

    private final ProductService service;

    public ProductController(
            ProductService service,
            SseService sseService
    ) {
        super(sseService);
        this.service = service;
    }

    @Override
    protected AbstractCrudService<Product, ProductDto, PostProductDto, UUID> getService() {

        return service;
    }
}
