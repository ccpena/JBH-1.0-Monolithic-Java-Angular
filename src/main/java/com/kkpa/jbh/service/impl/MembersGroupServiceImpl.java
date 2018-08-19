package com.kkpa.jbh.service.impl;

import com.kkpa.jbh.service.MembersGroupService;
import com.kkpa.jbh.domain.MembersGroup;
import com.kkpa.jbh.repository.MembersGroupRepository;
import com.kkpa.jbh.service.dto.MembersGroupDTO;
import com.kkpa.jbh.service.mapper.MembersGroupMapper;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.LinkedList;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;
/**
 * Service Implementation for managing MembersGroup.
 */
@Service
@Transactional
public class MembersGroupServiceImpl implements MembersGroupService {

    private final Logger log = LoggerFactory.getLogger(MembersGroupServiceImpl.class);

    private final MembersGroupRepository membersGroupRepository;

    private final MembersGroupMapper membersGroupMapper;

    public MembersGroupServiceImpl(MembersGroupRepository membersGroupRepository, MembersGroupMapper membersGroupMapper) {
        this.membersGroupRepository = membersGroupRepository;
        this.membersGroupMapper = membersGroupMapper;
    }

    /**
     * Save a membersGroup.
     *
     * @param membersGroupDTO the entity to save
     * @return the persisted entity
     */
    @Override
    public MembersGroupDTO save(MembersGroupDTO membersGroupDTO) {
        log.debug("Request to save MembersGroup : {}", membersGroupDTO);
        MembersGroup membersGroup = membersGroupMapper.toEntity(membersGroupDTO);
        membersGroup = membersGroupRepository.save(membersGroup);
        return membersGroupMapper.toDto(membersGroup);
    }

    /**
     * Get all the membersGroups.
     *
     * @return the list of entities
     */
    @Override
    @Transactional(readOnly = true)
    public List<MembersGroupDTO> findAll() {
        log.debug("Request to get all MembersGroups");
        return membersGroupRepository.findAll().stream()
            .map(membersGroupMapper::toDto)
            .collect(Collectors.toCollection(LinkedList::new));
    }


    /**
     * Get one membersGroup by id.
     *
     * @param id the id of the entity
     * @return the entity
     */
    @Override
    @Transactional(readOnly = true)
    public Optional<MembersGroupDTO> findOne(Long id) {
        log.debug("Request to get MembersGroup : {}", id);
        return membersGroupRepository.findById(id)
            .map(membersGroupMapper::toDto);
    }

    /**
     * Delete the membersGroup by id.
     *
     * @param id the id of the entity
     */
    @Override
    public void delete(Long id) {
        log.debug("Request to delete MembersGroup : {}", id);
        membersGroupRepository.deleteById(id);
    }
}
