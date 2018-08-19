package com.kkpa.jbh.service;

import com.kkpa.jbh.service.dto.SubCategoriesDTO;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

import java.util.Optional;

/**
 * Service Interface for managing SubCategories.
 */
public interface SubCategoriesService {

    /**
     * Save a subCategories.
     *
     * @param subCategoriesDTO the entity to save
     * @return the persisted entity
     */
    SubCategoriesDTO save(SubCategoriesDTO subCategoriesDTO);

    /**
     * Get all the subCategories.
     *
     * @param pageable the pagination information
     * @return the list of entities
     */
    Page<SubCategoriesDTO> findAll(Pageable pageable);


    /**
     * Get the "id" subCategories.
     *
     * @param id the id of the entity
     * @return the entity
     */
    Optional<SubCategoriesDTO> findOne(Long id);

    /**
     * Delete the "id" subCategories.
     *
     * @param id the id of the entity
     */
    void delete(Long id);
}
