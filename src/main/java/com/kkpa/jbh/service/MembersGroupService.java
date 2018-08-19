package com.kkpa.jbh.service;

import com.kkpa.jbh.service.dto.MembersGroupDTO;

import java.util.List;
import java.util.Optional;

/**
 * Service Interface for managing MembersGroup.
 */
public interface MembersGroupService {

    /**
     * Save a membersGroup.
     *
     * @param membersGroupDTO the entity to save
     * @return the persisted entity
     */
    MembersGroupDTO save(MembersGroupDTO membersGroupDTO);

    /**
     * Get all the membersGroups.
     *
     * @return the list of entities
     */
    List<MembersGroupDTO> findAll();


    /**
     * Get the "id" membersGroup.
     *
     * @param id the id of the entity
     * @return the entity
     */
    Optional<MembersGroupDTO> findOne(Long id);

    /**
     * Delete the "id" membersGroup.
     *
     * @param id the id of the entity
     */
    void delete(Long id);
}
