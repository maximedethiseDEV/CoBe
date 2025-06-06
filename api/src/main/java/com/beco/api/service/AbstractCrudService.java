package com.beco.api.service;

import jakarta.persistence.EntityNotFoundException;
import org.springframework.cache.CacheManager;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.Optional;
import java.util.function.BiConsumer;
import java.util.function.Function;
import java.util.stream.Collectors;

public abstract class AbstractCrudService<ENTITY, GetRequest_DTO, PostOrPutRequest_DTO, ID> {

    protected final JpaRepository<ENTITY, ID> repository;
    protected final CacheManager cacheManager;
    protected final Function<ENTITY, GetRequest_DTO> entityToDtoMapper;
    protected final Function<PostOrPutRequest_DTO, ENTITY> dtoToEntityMapper;
    protected final BiConsumer<PostOrPutRequest_DTO, ENTITY> updateEntityFromDto;

    public AbstractCrudService(
            JpaRepository<ENTITY, ID> repository,
            CacheManager cacheManager,
            Function<ENTITY, GetRequest_DTO> entityToDtoMapper,
            Function<PostOrPutRequest_DTO, ENTITY> dtoToEntityMapper,
            BiConsumer<PostOrPutRequest_DTO, ENTITY> updateEntityFromDto
    ) {
        this.repository = repository;
        this.cacheManager = cacheManager;
        this.entityToDtoMapper = entityToDtoMapper;
        this.dtoToEntityMapper = dtoToEntityMapper;
        this.updateEntityFromDto = updateEntityFromDto;
    }

    /**
     *  Test commentaire pour Swagger
     * @return
     */
    public List<GetRequest_DTO> findAll() {
        return repository.findAll()
                .stream()
                .map(entityToDtoMapper)
                .collect(Collectors.toList());
    }

    public GetRequest_DTO findById(ID id) {
        Optional<ENTITY> entity = repository.findById(id);
        if (entity.isEmpty()) {
            throw new EntityNotFoundException(getEntityName() + " n°" + id + " non trouvée");
        }
        return entityToDtoMapper.apply(entity.get());
    }

    public GetRequest_DTO create(PostOrPutRequest_DTO dto) {

        if (dataValidatorControl(dto)) {

            ENTITY savedEntity = repository.save(dtoToEntityMapper.apply(dto));
            GetRequest_DTO savedDto = entityToDtoMapper.apply(savedEntity);

            return savedDto;
        }
        else {
            throw new IllegalArgumentException("Impossible de créer " + getEntityName());
        }
    }

    public GetRequest_DTO update(ID id, PostOrPutRequest_DTO dto) {
        ENTITY existingEntity = repository.findById(id)
                .orElseThrow(() -> new EntityNotFoundException(getEntityName() + " n°" + id + " introuvable"));

        if (dataValidatorControl(dto)){

            updateEntityFromDto.accept(dto, existingEntity);
            ENTITY updatedEntity = repository.save(existingEntity);
            GetRequest_DTO updatedDto = entityToDtoMapper.apply(updatedEntity);

            return updatedDto;
        }
        else {
            throw new IllegalArgumentException("Impossible de mettre à jour " + getEntityName());
        }
    }

    public void deleteById(ID id) {
        if (!repository.existsById(id)) {
            throw new EntityNotFoundException(getEntityName() + " n°" + id + " non trouvée");
        }
        repository.deleteById(id);
    }

    /**
     * Hook pour validations métier. Overload dans les sous-classes si besoin.
     * False par défaut.
     * Retourner true si validations DTO ok.
     */
    protected abstract boolean dataValidatorControl(PostOrPutRequest_DTO dto);

    protected abstract String getEntityName();
}
