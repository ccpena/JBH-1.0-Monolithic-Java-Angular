package com.kkpa.jbh.service;

import com.kkpa.jbh.service.dto.UsersGroupDTO;

import java.util.List;
import java.util.Optional;

/**
 * Service Interface for managing UsersGroup.
 */
public interface UsersGroupService {

    /**
     * Save a usersGroup.
     *
     * @param usersGroupDTO the entity to save
     * @return the persisted entity
     */
    UsersGroupDTO save(UsersGroupDTO usersGroupDTO);

    /**
     * Get all the usersGroups.
     *
     * @return the list of entities
     */
    List<UsersGroupDTO> findAll();


    /**
     * Get the "id" usersGroup.
     *
     * @param id the id of the entity
     * @return the entity
     */
    Optional<UsersGroupDTO> findOne(Long id);

    /**
     * Delete the "id" usersGroup.
     *
     * @param id the id of the entity
     */
    void delete(Long id);
}
