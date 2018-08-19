package com.kkpa.jbh.service.impl;

import com.kkpa.jbh.service.ActiveDebtsService;
import com.kkpa.jbh.domain.ActiveDebts;
import com.kkpa.jbh.repository.ActiveDebtsRepository;
import com.kkpa.jbh.service.dto.ActiveDebtsDTO;
import com.kkpa.jbh.service.mapper.ActiveDebtsMapper;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.LinkedList;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;
/**
 * Service Implementation for managing ActiveDebts.
 */
@Service
@Transactional
public class ActiveDebtsServiceImpl implements ActiveDebtsService {

    private final Logger log = LoggerFactory.getLogger(ActiveDebtsServiceImpl.class);

    private final ActiveDebtsRepository activeDebtsRepository;

    private final ActiveDebtsMapper activeDebtsMapper;

    public ActiveDebtsServiceImpl(ActiveDebtsRepository activeDebtsRepository, ActiveDebtsMapper activeDebtsMapper) {
        this.activeDebtsRepository = activeDebtsRepository;
        this.activeDebtsMapper = activeDebtsMapper;
    }

    /**
     * Save a activeDebts.
     *
     * @param activeDebtsDTO the entity to save
     * @return the persisted entity
     */
    @Override
    public ActiveDebtsDTO save(ActiveDebtsDTO activeDebtsDTO) {
        log.debug("Request to save ActiveDebts : {}", activeDebtsDTO);
        ActiveDebts activeDebts = activeDebtsMapper.toEntity(activeDebtsDTO);
        activeDebts = activeDebtsRepository.save(activeDebts);
        return activeDebtsMapper.toDto(activeDebts);
    }

    /**
     * Get all the activeDebts.
     *
     * @return the list of entities
     */
    @Override
    @Transactional(readOnly = true)
    public List<ActiveDebtsDTO> findAll() {
        log.debug("Request to get all ActiveDebts");
        return activeDebtsRepository.findAll().stream()
            .map(activeDebtsMapper::toDto)
            .collect(Collectors.toCollection(LinkedList::new));
    }


    /**
     * Get one activeDebts by id.
     *
     * @param id the id of the entity
     * @return the entity
     */
    @Override
    @Transactional(readOnly = true)
    public Optional<ActiveDebtsDTO> findOne(Long id) {
        log.debug("Request to get ActiveDebts : {}", id);
        return activeDebtsRepository.findById(id)
            .map(activeDebtsMapper::toDto);
    }

    /**
     * Delete the activeDebts by id.
     *
     * @param id the id of the entity
     */
    @Override
    public void delete(Long id) {
        log.debug("Request to delete ActiveDebts : {}", id);
        activeDebtsRepository.deleteById(id);
    }
}
