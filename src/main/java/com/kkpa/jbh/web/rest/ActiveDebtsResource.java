package com.kkpa.jbh.web.rest;

import com.codahale.metrics.annotation.Timed;
import com.kkpa.jbh.service.ActiveDebtsService;
import com.kkpa.jbh.web.rest.errors.BadRequestAlertException;
import com.kkpa.jbh.web.rest.util.HeaderUtil;
import com.kkpa.jbh.service.dto.ActiveDebtsDTO;
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
 * REST controller for managing ActiveDebts.
 */
@RestController
@RequestMapping("/api")
public class ActiveDebtsResource {

    private final Logger log = LoggerFactory.getLogger(ActiveDebtsResource.class);

    private static final String ENTITY_NAME = "activeDebts";

    private final ActiveDebtsService activeDebtsService;

    public ActiveDebtsResource(ActiveDebtsService activeDebtsService) {
        this.activeDebtsService = activeDebtsService;
    }

    /**
     * POST  /active-debts : Create a new activeDebts.
     *
     * @param activeDebtsDTO the activeDebtsDTO to create
     * @return the ResponseEntity with status 201 (Created) and with body the new activeDebtsDTO, or with status 400 (Bad Request) if the activeDebts has already an ID
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PostMapping("/active-debts")
    @Timed
    public ResponseEntity<ActiveDebtsDTO> createActiveDebts(@RequestBody ActiveDebtsDTO activeDebtsDTO) throws URISyntaxException {
        log.debug("REST request to save ActiveDebts : {}", activeDebtsDTO);
        if (activeDebtsDTO.getId() != null) {
            throw new BadRequestAlertException("A new activeDebts cannot already have an ID", ENTITY_NAME, "idexists");
        }
        ActiveDebtsDTO result = activeDebtsService.save(activeDebtsDTO);
        return ResponseEntity.created(new URI("/api/active-debts/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * PUT  /active-debts : Updates an existing activeDebts.
     *
     * @param activeDebtsDTO the activeDebtsDTO to update
     * @return the ResponseEntity with status 200 (OK) and with body the updated activeDebtsDTO,
     * or with status 400 (Bad Request) if the activeDebtsDTO is not valid,
     * or with status 500 (Internal Server Error) if the activeDebtsDTO couldn't be updated
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PutMapping("/active-debts")
    @Timed
    public ResponseEntity<ActiveDebtsDTO> updateActiveDebts(@RequestBody ActiveDebtsDTO activeDebtsDTO) throws URISyntaxException {
        log.debug("REST request to update ActiveDebts : {}", activeDebtsDTO);
        if (activeDebtsDTO.getId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        ActiveDebtsDTO result = activeDebtsService.save(activeDebtsDTO);
        return ResponseEntity.ok()
            .headers(HeaderUtil.createEntityUpdateAlert(ENTITY_NAME, activeDebtsDTO.getId().toString()))
            .body(result);
    }

    /**
     * GET  /active-debts : get all the activeDebts.
     *
     * @return the ResponseEntity with status 200 (OK) and the list of activeDebts in body
     */
    @GetMapping("/active-debts")
    @Timed
    public List<ActiveDebtsDTO> getAllActiveDebts() {
        log.debug("REST request to get all ActiveDebts");
        return activeDebtsService.findAll();
    }

    /**
     * GET  /active-debts/:id : get the "id" activeDebts.
     *
     * @param id the id of the activeDebtsDTO to retrieve
     * @return the ResponseEntity with status 200 (OK) and with body the activeDebtsDTO, or with status 404 (Not Found)
     */
    @GetMapping("/active-debts/{id}")
    @Timed
    public ResponseEntity<ActiveDebtsDTO> getActiveDebts(@PathVariable Long id) {
        log.debug("REST request to get ActiveDebts : {}", id);
        Optional<ActiveDebtsDTO> activeDebtsDTO = activeDebtsService.findOne(id);
        return ResponseUtil.wrapOrNotFound(activeDebtsDTO);
    }

    /**
     * DELETE  /active-debts/:id : delete the "id" activeDebts.
     *
     * @param id the id of the activeDebtsDTO to delete
     * @return the ResponseEntity with status 200 (OK)
     */
    @DeleteMapping("/active-debts/{id}")
    @Timed
    public ResponseEntity<Void> deleteActiveDebts(@PathVariable Long id) {
        log.debug("REST request to delete ActiveDebts : {}", id);
        activeDebtsService.delete(id);
        return ResponseEntity.ok().headers(HeaderUtil.createEntityDeletionAlert(ENTITY_NAME, id.toString())).build();
    }
}
