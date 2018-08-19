package com.kkpa.jbh.web.rest;

import com.codahale.metrics.annotation.Timed;
import com.kkpa.jbh.service.AccountTypesService;
import com.kkpa.jbh.web.rest.errors.BadRequestAlertException;
import com.kkpa.jbh.web.rest.util.HeaderUtil;
import com.kkpa.jbh.service.dto.AccountTypesDTO;
import io.github.jhipster.web.util.ResponseUtil;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.net.URI;
import java.net.URISyntaxException;

import java.util.List;
import java.util.Optional;

/**
 * REST controller for managing AccountTypes.
 */
@RestController
@RequestMapping("/api")
public class AccountTypesResource {

    private final Logger log = LoggerFactory.getLogger(AccountTypesResource.class);

    private static final String ENTITY_NAME = "accountTypes";

    private final AccountTypesService accountTypesService;

    public AccountTypesResource(AccountTypesService accountTypesService) {
        this.accountTypesService = accountTypesService;
    }

    /**
     * POST  /account-types : Create a new accountTypes.
     *
     * @param accountTypesDTO the accountTypesDTO to create
     * @return the ResponseEntity with status 201 (Created) and with body the new accountTypesDTO, or with status 400 (Bad Request) if the accountTypes has already an ID
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PostMapping("/account-types")
    @Timed
    public ResponseEntity<AccountTypesDTO> createAccountTypes(@RequestBody AccountTypesDTO accountTypesDTO) throws URISyntaxException {
        log.debug("REST request to save AccountTypes : {}", accountTypesDTO);
        if (accountTypesDTO.getId() != null) {
            throw new BadRequestAlertException("A new accountTypes cannot already have an ID", ENTITY_NAME, "idexists");
        }
        AccountTypesDTO result = accountTypesService.save(accountTypesDTO);
        return ResponseEntity.created(new URI("/api/account-types/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * PUT  /account-types : Updates an existing accountTypes.
     *
     * @param accountTypesDTO the accountTypesDTO to update
     * @return the ResponseEntity with status 200 (OK) and with body the updated accountTypesDTO,
     * or with status 400 (Bad Request) if the accountTypesDTO is not valid,
     * or with status 500 (Internal Server Error) if the accountTypesDTO couldn't be updated
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PutMapping("/account-types")
    @Timed
    public ResponseEntity<AccountTypesDTO> updateAccountTypes(@RequestBody AccountTypesDTO accountTypesDTO) throws URISyntaxException {
        log.debug("REST request to update AccountTypes : {}", accountTypesDTO);
        if (accountTypesDTO.getId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        AccountTypesDTO result = accountTypesService.save(accountTypesDTO);
        return ResponseEntity.ok()
            .headers(HeaderUtil.createEntityUpdateAlert(ENTITY_NAME, accountTypesDTO.getId().toString()))
            .body(result);
    }

    /**
     * GET  /account-types : get all the accountTypes.
     *
     * @return the ResponseEntity with status 200 (OK) and the list of accountTypes in body
     */
    @GetMapping("/account-types")
    @Timed
    public List<AccountTypesDTO> getAllAccountTypes() {
        log.debug("REST request to get all AccountTypes");
        return accountTypesService.findAll();
    }

    /**
     * GET  /account-types/:id : get the "id" accountTypes.
     *
     * @param id the id of the accountTypesDTO to retrieve
     * @return the ResponseEntity with status 200 (OK) and with body the accountTypesDTO, or with status 404 (Not Found)
     */
    @GetMapping("/account-types/{id}")
    @Timed
    public ResponseEntity<AccountTypesDTO> getAccountTypes(@PathVariable Long id) {
        log.debug("REST request to get AccountTypes : {}", id);
        Optional<AccountTypesDTO> accountTypesDTO = accountTypesService.findOne(id);
        return ResponseUtil.wrapOrNotFound(accountTypesDTO);
    }

    /**
     * DELETE  /account-types/:id : delete the "id" accountTypes.
     *
     * @param id the id of the accountTypesDTO to delete
     * @return the ResponseEntity with status 200 (OK)
     */
    @DeleteMapping("/account-types/{id}")
    @Timed
    public ResponseEntity<Void> deleteAccountTypes(@PathVariable Long id) {
        log.debug("REST request to delete AccountTypes : {}", id);
        accountTypesService.delete(id);
        return ResponseEntity.ok().headers(HeaderUtil.createEntityDeletionAlert(ENTITY_NAME, id.toString())).build();
    }
}
