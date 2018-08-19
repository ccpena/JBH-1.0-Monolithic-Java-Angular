package com.kkpa.jbh.service;

import com.kkpa.jbh.service.dto.MovementesOutgoingsDTO;

import java.util.List;
import java.util.Optional;

/**
 * Service Interface for managing MovementesOutgoings.
 */
public interface MovementesOutgoingsService {

    /**
     * Save a movementesOutgoings.
     *
     * @param movementesOutgoingsDTO the entity to save
     * @return the persisted entity
     */
    MovementesOutgoingsDTO save(MovementesOutgoingsDTO movementesOutgoingsDTO);

    /**
     * Get all the movementesOutgoings.
     *
     * @return the list of entities
     */
    List<MovementesOutgoingsDTO> findAll();


    /**
     * Get the "id" movementesOutgoings.
     *
     * @param id the id of the entity
     * @return the entity
     */
    Optional<MovementesOutgoingsDTO> findOne(Long id);

    /**
     * Delete the "id" movementesOutgoings.
     *
     * @param id the id of the entity
     */
    void delete(Long id);
}
