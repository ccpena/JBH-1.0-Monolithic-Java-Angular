package com.kkpa.jbh.service.impl;

import com.kkpa.jbh.service.CategoriesService;
import com.kkpa.jbh.domain.Categories;
import com.kkpa.jbh.repository.CategoriesRepository;
import com.kkpa.jbh.service.dto.CategoriesDTO;
import com.kkpa.jbh.service.mapper.CategoriesMapper;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;


import java.util.Optional;
/**
 * Service Implementation for managing Categories.
 */
@Service
@Transactional
public class CategoriesServiceImpl implements CategoriesService {

    private final Logger log = LoggerFactory.getLogger(CategoriesServiceImpl.class);

    private final CategoriesRepository categoriesRepository;

    private final CategoriesMapper categoriesMapper;

    public CategoriesServiceImpl(CategoriesRepository categoriesRepository, CategoriesMapper categoriesMapper) {
        this.categoriesRepository = categoriesRepository;
        this.categoriesMapper = categoriesMapper;
    }

    /**
     * Save a categories.
     *
     * @param categoriesDTO the entity to save
     * @return the persisted entity
     */
    @Override
    public CategoriesDTO save(CategoriesDTO categoriesDTO) {
        log.debug("Request to save Categories : {}", categoriesDTO);
        Categories categories = categoriesMapper.toEntity(categoriesDTO);
        categories = categoriesRepository.save(categories);
        return categoriesMapper.toDto(categories);
    }

    /**
     * Get all the categories.
     *
     * @param pageable the pagination information
     * @return the list of entities
     */
    @Override
    @Transactional(readOnly = true)
    public Page<CategoriesDTO> findAll(Pageable pageable) {
        log.debug("Request to get all Categories");
        return categoriesRepository.findAll(pageable)
            .map(categoriesMapper::toDto);
    }


    /**
     * Get one categories by id.
     *
     * @param id the id of the entity
     * @return the entity
     */
    @Override
    @Transactional(readOnly = true)
    public Optional<CategoriesDTO> findOne(Long id) {
        log.debug("Request to get Categories : {}", id);
        return categoriesRepository.findById(id)
            .map(categoriesMapper::toDto);
    }

    /**
     * Delete the categories by id.
     *
     * @param id the id of the entity
     */
    @Override
    public void delete(Long id) {
        log.debug("Request to delete Categories : {}", id);
        categoriesRepository.deleteById(id);
    }
}
