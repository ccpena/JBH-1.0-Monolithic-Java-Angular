package com.kkpa.jbh.service;

import com.kkpa.jbh.service.dto.AccountsDTO;

import java.util.List;
import java.util.Optional;

/**
 * Service Interface for managing Accounts.
 */
public interface AccountsService {

    /**
     * Save a accounts.
     *
     * @param accountsDTO the entity to save
     * @return the persisted entity
     */
    AccountsDTO save(AccountsDTO accountsDTO);

    /**
     * Get all the accounts.
     *
     * @return the list of entities
     */
    List<AccountsDTO> findAll();


    /**
     * Get the "id" accounts.
     *
     * @param id the id of the entity
     * @return the entity
     */
    Optional<AccountsDTO> findOne(Long id);

    /**
     * Delete the "id" accounts.
     *
     * @param id the id of the entity
     */
    void delete(Long id);
}
