package com.beco.api.controller.object;

import com.beco.api.config.sse.SseService;
import com.beco.api.controller.AbstractCrudController;
import com.beco.api.model.dto.ProductDto;
import com.beco.api.model.entity.Product;
import com.beco.api.service.AbstractCrudService;
import com.beco.api.service.object.ProductService;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/products")
@CrossOrigin(origins = "http://localhost:4200")
public class ProductController extends AbstractCrudController<Product, ProductDto, ProductDto, Integer> {

    private final ProductService service;

    public ProductController(
            ProductService service,
            SseService sseService
    ) {
        super(sseService);
        this.service = service;
    }

    @Override
    protected AbstractCrudService<Product, ProductDto, ProductDto, Integer> getService() {

        return service;
    }
}
