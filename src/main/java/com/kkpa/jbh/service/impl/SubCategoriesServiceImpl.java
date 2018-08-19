package com.kkpa.jbh.service.impl;

import com.kkpa.jbh.service.SubCategoriesService;
import com.kkpa.jbh.domain.SubCategories;
import com.kkpa.jbh.repository.SubCategoriesRepository;
import com.kkpa.jbh.service.dto.SubCategoriesDTO;
import com.kkpa.jbh.service.mapper.SubCategoriesMapper;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;


import java.util.Optional;
/**
 * Service Implementation for managing SubCategories.
 */
@Service
@Transactional
public class SubCategoriesServiceImpl implements SubCategoriesService {

    private final Logger log = LoggerFactory.getLogger(SubCategoriesServiceImpl.class);

    private final SubCategoriesRepository subCategoriesRepository;

    private final SubCategoriesMapper subCategoriesMapper;

    public SubCategoriesServiceImpl(SubCategoriesRepository subCategoriesRepository, SubCategoriesMapper subCategoriesMapper) {
        this.subCategoriesRepository = subCategoriesRepository;
        this.subCategoriesMapper = subCategoriesMapper;
    }

    /**
     * Save a subCategories.
     *
     * @param subCategoriesDTO the entity to save
     * @return the persisted entity
     */
    @Override
    public SubCategoriesDTO save(SubCategoriesDTO subCategoriesDTO) {
        log.debug("Request to save SubCategories : {}", subCategoriesDTO);
        SubCategories subCategories = subCategoriesMapper.toEntity(subCategoriesDTO);
        subCategories = subCategoriesRepository.save(subCategories);
        return subCategoriesMapper.toDto(subCategories);
    }

    /**
     * Get all the subCategories.
     *
     * @param pageable the pagination information
     * @return the list of entities
     */
    @Override
    @Transactional(readOnly = true)
    public Page<SubCategoriesDTO> findAll(Pageable pageable) {
        log.debug("Request to get all SubCategories");
        return subCategoriesRepository.findAll(pageable)
            .map(subCategoriesMapper::toDto);
    }


    /**
     * Get one subCategories by id.
     *
     * @param id the id of the entity
     * @return the entity
     */
    @Override
    @Transactional(readOnly = true)
    public Optional<SubCategoriesDTO> findOne(Long id) {
        log.debug("Request to get SubCategories : {}", id);
        return subCategoriesRepository.findById(id)
            .map(subCategoriesMapper::toDto);
    }

    /**
     * Delete the subCategories by id.
     *
     * @param id the id of the entity
     */
    @Override
    public void delete(Long id) {
        log.debug("Request to delete SubCategories : {}", id);
        subCategoriesRepository.deleteById(id);
    }
}
