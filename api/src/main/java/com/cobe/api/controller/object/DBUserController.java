package com.cobe.api.controller.object;

import com.cobe.api.config.sse.SseService;
import com.cobe.api.controller.AbstractCrudController;
import com.cobe.api.model.dto.DBUserDto;
import com.cobe.api.model.dto.PostDBUserDto;
import com.cobe.api.model.entity.DBUser;
import com.cobe.api.service.AbstractCrudService;
import com.cobe.api.service.object.DBUserService;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.UUID;

@RestController
@RequestMapping("/users")
@CrossOrigin(origins = "http://localhost:4200")
public class DBUserController extends AbstractCrudController<DBUser, DBUserDto, PostDBUserDto, UUID> {

    private final DBUserService service;

    public DBUserController(
            DBUserService service,
            SseService sseService
    ) {
        super(sseService);
        this.service = service;
    }

    @Override
    protected AbstractCrudService<DBUser, DBUserDto, PostDBUserDto, UUID> getService() {

        return service;
    }
}
