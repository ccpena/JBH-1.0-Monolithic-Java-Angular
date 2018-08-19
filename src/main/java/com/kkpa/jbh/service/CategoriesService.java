package com.kkpa.jbh.service;

import com.kkpa.jbh.service.dto.CategoriesDTO;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

import java.util.Optional;

/**
 * Service Interface for managing Categories.
 */
public interface CategoriesService {

    /**
     * Save a categories.
     *
     * @param categoriesDTO the entity to save
     * @return the persisted entity
     */
    CategoriesDTO save(CategoriesDTO categoriesDTO);

    /**
     * Get all the categories.
     *
     * @param pageable the pagination information
     * @return the list of entities
     */
    Page<CategoriesDTO> findAll(Pageable pageable);


    /**
     * Get the "id" categories.
     *
     * @param id the id of the entity
     * @return the entity
     */
    Optional<CategoriesDTO> findOne(Long id);

    /**
     * Delete the "id" categories.
     *
     * @param id the id of the entity
     */
    void delete(Long id);
}
