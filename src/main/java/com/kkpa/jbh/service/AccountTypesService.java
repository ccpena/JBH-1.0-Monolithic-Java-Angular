package com.kkpa.jbh.service;

import com.kkpa.jbh.service.dto.AccountTypesDTO;

import java.util.List;
import java.util.Optional;

/**
 * Service Interface for managing AccountTypes.
 */
public interface AccountTypesService {

    /**
     * Save a accountTypes.
     *
     * @param accountTypesDTO the entity to save
     * @return the persisted entity
     */
    AccountTypesDTO save(AccountTypesDTO accountTypesDTO);

    /**
     * Get all the accountTypes.
     *
     * @return the list of entities
     */
    List<AccountTypesDTO> findAll();


    /**
     * Get the "id" accountTypes.
     *
     * @param id the id of the entity
     * @return the entity
     */
    Optional<AccountTypesDTO> findOne(Long id);

    /**
     * Delete the "id" accountTypes.
     *
     * @param id the id of the entity
     */
    void delete(Long id);
}
