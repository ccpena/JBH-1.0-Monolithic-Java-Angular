package com.kkpa.jbh.service;

import com.kkpa.jbh.service.dto.UserGroupCategoriesDTO;

import java.util.List;
import java.util.Optional;

/**
 * Service Interface for managing UserGroupCategories.
 */
public interface UserGroupCategoriesService {

    /**
     * Save a userGroupCategories.
     *
     * @param userGroupCategoriesDTO the entity to save
     * @return the persisted entity
     */
    UserGroupCategoriesDTO save(UserGroupCategoriesDTO userGroupCategoriesDTO);

    /**
     * Get all the userGroupCategories.
     *
     * @return the list of entities
     */
    List<UserGroupCategoriesDTO> findAll();


    /**
     * Get the "id" userGroupCategories.
     *
     * @param id the id of the entity
     * @return the entity
     */
    Optional<UserGroupCategoriesDTO> findOne(Long id);

    /**
     * Delete the "id" userGroupCategories.
     *
     * @param id the id of the entity
     */
    void delete(Long id);
}
