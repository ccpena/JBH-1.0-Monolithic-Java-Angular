package com.kkpa.jbh.service.impl;

import com.kkpa.jbh.service.MovementesOutgoingsService;
import com.kkpa.jbh.domain.MovementesOutgoings;
import com.kkpa.jbh.repository.MovementesOutgoingsRepository;
import com.kkpa.jbh.service.dto.MovementesOutgoingsDTO;
import com.kkpa.jbh.service.mapper.MovementesOutgoingsMapper;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.LinkedList;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;
/**
 * Service Implementation for managing MovementesOutgoings.
 */
@Service
@Transactional
public class MovementesOutgoingsServiceImpl implements MovementesOutgoingsService {

    private final Logger log = LoggerFactory.getLogger(MovementesOutgoingsServiceImpl.class);

    private final MovementesOutgoingsRepository movementesOutgoingsRepository;

    private final MovementesOutgoingsMapper movementesOutgoingsMapper;

    public MovementesOutgoingsServiceImpl(MovementesOutgoingsRepository movementesOutgoingsRepository, MovementesOutgoingsMapper movementesOutgoingsMapper) {
        this.movementesOutgoingsRepository = movementesOutgoingsRepository;
        this.movementesOutgoingsMapper = movementesOutgoingsMapper;
    }

    /**
     * Save a movementesOutgoings.
     *
     * @param movementesOutgoingsDTO the entity to save
     * @return the persisted entity
     */
    @Override
    public MovementesOutgoingsDTO save(MovementesOutgoingsDTO movementesOutgoingsDTO) {
        log.debug("Request to save MovementesOutgoings : {}", movementesOutgoingsDTO);
        MovementesOutgoings movementesOutgoings = movementesOutgoingsMapper.toEntity(movementesOutgoingsDTO);
        movementesOutgoings = movementesOutgoingsRepository.save(movementesOutgoings);
        return movementesOutgoingsMapper.toDto(movementesOutgoings);
    }

    /**
     * Get all the movementesOutgoings.
     *
     * @return the list of entities
     */
    @Override
    @Transactional(readOnly = true)
    public List<MovementesOutgoingsDTO> findAll() {
        log.debug("Request to get all MovementesOutgoings");
        return movementesOutgoingsRepository.findAll().stream()
            .map(movementesOutgoingsMapper::toDto)
            .collect(Collectors.toCollection(LinkedList::new));
    }


    /**
     * Get one movementesOutgoings by id.
     *
     * @param id the id of the entity
     * @return the entity
     */
    @Override
    @Transactional(readOnly = true)
    public Optional<MovementesOutgoingsDTO> findOne(Long id) {
        log.debug("Request to get MovementesOutgoings : {}", id);
        return movementesOutgoingsRepository.findById(id)
            .map(movementesOutgoingsMapper::toDto);
    }

    /**
     * Delete the movementesOutgoings by id.
     *
     * @param id the id of the entity
     */
    @Override
    public void delete(Long id) {
        log.debug("Request to delete MovementesOutgoings : {}", id);
        movementesOutgoingsRepository.deleteById(id);
    }
}
