package com.kkpa.jbh.service.impl;

import com.kkpa.jbh.service.UsersGroupService;
import com.kkpa.jbh.domain.UsersGroup;
import com.kkpa.jbh.repository.UsersGroupRepository;
import com.kkpa.jbh.service.dto.UsersGroupDTO;
import com.kkpa.jbh.service.mapper.UsersGroupMapper;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.LinkedList;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;
/**
 * Service Implementation for managing UsersGroup.
 */
@Service
@Transactional
public class UsersGroupServiceImpl implements UsersGroupService {

    private final Logger log = LoggerFactory.getLogger(UsersGroupServiceImpl.class);

    private final UsersGroupRepository usersGroupRepository;

    private final UsersGroupMapper usersGroupMapper;

    public UsersGroupServiceImpl(UsersGroupRepository usersGroupRepository, UsersGroupMapper usersGroupMapper) {
        this.usersGroupRepository = usersGroupRepository;
        this.usersGroupMapper = usersGroupMapper;
    }

    /**
     * Save a usersGroup.
     *
     * @param usersGroupDTO the entity to save
     * @return the persisted entity
     */
    @Override
    public UsersGroupDTO save(UsersGroupDTO usersGroupDTO) {
        log.debug("Request to save UsersGroup : {}", usersGroupDTO);
        UsersGroup usersGroup = usersGroupMapper.toEntity(usersGroupDTO);
        usersGroup = usersGroupRepository.save(usersGroup);
        return usersGroupMapper.toDto(usersGroup);
    }

    /**
     * Get all the usersGroups.
     *
     * @return the list of entities
     */
    @Override
    @Transactional(readOnly = true)
    public List<UsersGroupDTO> findAll() {
        log.debug("Request to get all UsersGroups");
        return usersGroupRepository.findAll().stream()
            .map(usersGroupMapper::toDto)
            .collect(Collectors.toCollection(LinkedList::new));
    }


    /**
     * Get one usersGroup by id.
     *
     * @param id the id of the entity
     * @return the entity
     */
    @Override
    @Transactional(readOnly = true)
    public Optional<UsersGroupDTO> findOne(Long id) {
        log.debug("Request to get UsersGroup : {}", id);
        return usersGroupRepository.findById(id)
            .map(usersGroupMapper::toDto);
    }

    /**
     * Delete the usersGroup by id.
     *
     * @param id the id of the entity
     */
    @Override
    public void delete(Long id) {
        log.debug("Request to delete UsersGroup : {}", id);
        usersGroupRepository.deleteById(id);
    }
}
