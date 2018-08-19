package com.kkpa.jbh.service.impl;

import com.kkpa.jbh.service.AccountTypesService;
import com.kkpa.jbh.domain.AccountTypes;
import com.kkpa.jbh.repository.AccountTypesRepository;
import com.kkpa.jbh.service.dto.AccountTypesDTO;
import com.kkpa.jbh.service.mapper.AccountTypesMapper;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.LinkedList;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;
/**
 * Service Implementation for managing AccountTypes.
 */
@Service
@Transactional
public class AccountTypesServiceImpl implements AccountTypesService {

    private final Logger log = LoggerFactory.getLogger(AccountTypesServiceImpl.class);

    private final AccountTypesRepository accountTypesRepository;

    private final AccountTypesMapper accountTypesMapper;

    public AccountTypesServiceImpl(AccountTypesRepository accountTypesRepository, AccountTypesMapper accountTypesMapper) {
        this.accountTypesRepository = accountTypesRepository;
        this.accountTypesMapper = accountTypesMapper;
    }

    /**
     * Save a accountTypes.
     *
     * @param accountTypesDTO the entity to save
     * @return the persisted entity
     */
    @Override
    public AccountTypesDTO save(AccountTypesDTO accountTypesDTO) {
        log.debug("Request to save AccountTypes : {}", accountTypesDTO);
        AccountTypes accountTypes = accountTypesMapper.toEntity(accountTypesDTO);
        accountTypes = accountTypesRepository.save(accountTypes);
        return accountTypesMapper.toDto(accountTypes);
    }

    /**
     * Get all the accountTypes.
     *
     * @return the list of entities
     */
    @Override
    @Transactional(readOnly = true)
    public List<AccountTypesDTO> findAll() {
        log.debug("Request to get all AccountTypes");
        return accountTypesRepository.findAll().stream()
            .map(accountTypesMapper::toDto)
            .collect(Collectors.toCollection(LinkedList::new));
    }


    /**
     * Get one accountTypes by id.
     *
     * @param id the id of the entity
     * @return the entity
     */
    @Override
    @Transactional(readOnly = true)
    public Optional<AccountTypesDTO> findOne(Long id) {
        log.debug("Request to get AccountTypes : {}", id);
        return accountTypesRepository.findById(id)
            .map(accountTypesMapper::toDto);
    }

    /**
     * Delete the accountTypes by id.
     *
     * @param id the id of the entity
     */
    @Override
    public void delete(Long id) {
        log.debug("Request to delete AccountTypes : {}", id);
        accountTypesRepository.deleteById(id);
    }
}
