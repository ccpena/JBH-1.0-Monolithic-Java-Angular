package com.kkpa.jbh.service.impl;

import com.kkpa.jbh.service.UserGroupCategoriesService;
import com.kkpa.jbh.domain.UserGroupCategories;
import com.kkpa.jbh.repository.UserGroupCategoriesRepository;
import com.kkpa.jbh.service.dto.UserGroupCategoriesDTO;
import com.kkpa.jbh.service.mapper.UserGroupCategoriesMapper;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.LinkedList;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;
/**
 * Service Implementation for managing UserGroupCategories.
 */
@Service
@Transactional
public class UserGroupCategoriesServiceImpl implements UserGroupCategoriesService {

    private final Logger log = LoggerFactory.getLogger(UserGroupCategoriesServiceImpl.class);

    private final UserGroupCategoriesRepository userGroupCategoriesRepository;

    private final UserGroupCategoriesMapper userGroupCategoriesMapper;

    public UserGroupCategoriesServiceImpl(UserGroupCategoriesRepository userGroupCategoriesRepository, UserGroupCategoriesMapper userGroupCategoriesMapper) {
        this.userGroupCategoriesRepository = userGroupCategoriesRepository;
        this.userGroupCategoriesMapper = userGroupCategoriesMapper;
    }

    /**
     * Save a userGroupCategories.
     *
     * @param userGroupCategoriesDTO the entity to save
     * @return the persisted entity
     */
    @Override
    public UserGroupCategoriesDTO save(UserGroupCategoriesDTO userGroupCategoriesDTO) {
        log.debug("Request to save UserGroupCategories : {}", userGroupCategoriesDTO);
        UserGroupCategories userGroupCategories = userGroupCategoriesMapper.toEntity(userGroupCategoriesDTO);
        userGroupCategories = userGroupCategoriesRepository.save(userGroupCategories);
        return userGroupCategoriesMapper.toDto(userGroupCategories);
    }

    /**
     * Get all the userGroupCategories.
     *
     * @return the list of entities
     */
    @Override
    @Transactional(readOnly = true)
    public List<UserGroupCategoriesDTO> findAll() {
        log.debug("Request to get all UserGroupCategories");
        return userGroupCategoriesRepository.findAll().stream()
            .map(userGroupCategoriesMapper::toDto)
            .collect(Collectors.toCollection(LinkedList::new));
    }


    /**
     * Get one userGroupCategories by id.
     *
     * @param id the id of the entity
     * @return the entity
     */
    @Override
    @Transactional(readOnly = true)
    public Optional<UserGroupCategoriesDTO> findOne(Long id) {
        log.debug("Request to get UserGroupCategories : {}", id);
        return userGroupCategoriesRepository.findById(id)
            .map(userGroupCategoriesMapper::toDto);
    }

    /**
     * Delete the userGroupCategories by id.
     *
     * @param id the id of the entity
     */
    @Override
    public void delete(Long id) {
        log.debug("Request to delete UserGroupCategories : {}", id);
        userGroupCategoriesRepository.deleteById(id);
    }
}
