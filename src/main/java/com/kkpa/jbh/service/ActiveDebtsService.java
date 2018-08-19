package com.kkpa.jbh.service;

import com.kkpa.jbh.service.dto.ActiveDebtsDTO;

import java.util.List;
import java.util.Optional;

/**
 * Service Interface for managing ActiveDebts.
 */
public interface ActiveDebtsService {

    /**
     * Save a activeDebts.
     *
     * @param activeDebtsDTO the entity to save
     * @return the persisted entity
     */
    ActiveDebtsDTO save(ActiveDebtsDTO activeDebtsDTO);

    /**
     * Get all the activeDebts.
     *
     * @return the list of entities
     */
    List<ActiveDebtsDTO> findAll();


    /**
     * Get the "id" activeDebts.
     *
     * @param id the id of the entity
     * @return the entity
     */
    Optional<ActiveDebtsDTO> findOne(Long id);

    /**
     * Delete the "id" activeDebts.
     *
     * @param id the id of the entity
     */
    void delete(Long id);
}
