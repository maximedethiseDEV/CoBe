package com.cobe.api.service.object;

import com.cobe.api.mapper.DBUserMapper;
import com.cobe.api.config.security.UserRole;
import com.cobe.api.model.dto.DBUserDto;
import com.cobe.api.model.dto.PostDBUserDto;
import com.cobe.api.model.entity.DBUser;
import com.cobe.api.repository.DBUserRepository;
import com.cobe.api.service.AbstractCrudService;
import org.springframework.cache.CacheManager;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.UUID;

@Service
@org.springframework.cache.annotation.CacheConfig(cacheNames = "users")
public class DBUserService extends AbstractCrudService<DBUser, DBUserDto, PostDBUserDto, UUID> {

    private final DBUserRepository repository;
    private final DBUserMapper mapper;
    private final PasswordEncoder passwordEncoder;

    public DBUserService(
            DBUserRepository repository,
            CacheManager cacheManager,
            DBUserMapper mapper,
            PasswordEncoder passwordEncoder) {
        super(
                repository,
                cacheManager,
                mapper::toDto,
                mapper::toEntity,
                mapper::updateDBUserFromDto
        );
        this.repository = repository;
        this.mapper = mapper;
        this.passwordEncoder = passwordEncoder;
    }

    @Override
    protected boolean dataValidatorControl(PostDBUserDto dto) {
        // Tu peux ajouter des validations métier ici (ex: format username, permission connue, etc.)
        return true;
    }

    @Override
    protected String getEntityName() {
        return "user";
    }

    @Override
    public DBUserDto create(PostDBUserDto dto) {
        if (dto.getUsername() == null || dto.getUsername().isBlank()) {
            throw new IllegalArgumentException("Le nom d'utilisateur est requis.");
        }
        if (repository.findByUsername(dto.getUsername()) != null) {
            throw new IllegalArgumentException("Nom d'utilisateur déjà utilisé");
        }

        if (dto.getPermission() == null) {
            dto.setPermission(UserRole.USER.toString());
        }

        if (dto.getPassword() == null || dto.getPassword().isBlank()) {
            throw new IllegalArgumentException("Le mot de passe est requis.");
        }

        DBUser entity = mapper.toEntity(dto);
        entity.setPasswordHash(passwordEncoder.encode(dto.getPassword()));

        DBUser saved = repository.save(entity);
        return mapper.toDto(saved);
    }

    @Override
    public DBUserDto update(UUID id, PostDBUserDto dto) {
        DBUser existing = repository.findById(id)
                .orElseThrow(() -> new jakarta.persistence.EntityNotFoundException(getEntityName() + " n°" + id + " introuvable"));

        // Si username changé -> vérifier unicité
        if (dto.getUsername() != null && !dto.getUsername().equals(existing.getUsername())) {
            if (repository.findByUsername(dto.getUsername()) != null) {
                throw new IllegalArgumentException("Nom d'utilisateur déjà utilisé");
            }
        }

        mapper.updateDBUserFromDto(dto, existing);

        // Si mot de passe fourni -> encoder et remplacer
        if (dto.getPassword() != null && !dto.getPassword().isBlank()) {
            existing.setPasswordHash(passwordEncoder.encode(dto.getPassword()));
        }

        // Garantir un rôle par défaut si null
        if (existing.getPermission() == null) {
            existing.setPermission(UserRole.USER);
        }

        DBUser updated = repository.save(existing);
        return mapper.toDto(updated);
    }
}
