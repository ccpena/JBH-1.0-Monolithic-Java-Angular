package com.kkpa.jbh.web.rest;

import com.codahale.metrics.annotation.Timed;
import com.kkpa.jbh.service.MovementesOutgoingsService;
import com.kkpa.jbh.web.rest.errors.BadRequestAlertException;
import com.kkpa.jbh.web.rest.util.HeaderUtil;
import com.kkpa.jbh.service.dto.MovementesOutgoingsDTO;
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
 * REST controller for managing MovementesOutgoings.
 */
@RestController
@RequestMapping("/api")
public class MovementesOutgoingsResource {

    private final Logger log = LoggerFactory.getLogger(MovementesOutgoingsResource.class);

    private static final String ENTITY_NAME = "movementesOutgoings";

    private final MovementesOutgoingsService movementesOutgoingsService;

    public MovementesOutgoingsResource(MovementesOutgoingsService movementesOutgoingsService) {
        this.movementesOutgoingsService = movementesOutgoingsService;
    }

    /**
     * POST  /movementes-outgoings : Create a new movementesOutgoings.
     *
     * @param movementesOutgoingsDTO the movementesOutgoingsDTO to create
     * @return the ResponseEntity with status 201 (Created) and with body the new movementesOutgoingsDTO, or with status 400 (Bad Request) if the movementesOutgoings has already an ID
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PostMapping("/movementes-outgoings")
    @Timed
    public ResponseEntity<MovementesOutgoingsDTO> createMovementesOutgoings(@RequestBody MovementesOutgoingsDTO movementesOutgoingsDTO) throws URISyntaxException {
        log.debug("REST request to save MovementesOutgoings : {}", movementesOutgoingsDTO);
        if (movementesOutgoingsDTO.getId() != null) {
            throw new BadRequestAlertException("A new movementesOutgoings cannot already have an ID", ENTITY_NAME, "idexists");
        }
        MovementesOutgoingsDTO result = movementesOutgoingsService.save(movementesOutgoingsDTO);
        return ResponseEntity.created(new URI("/api/movementes-outgoings/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * PUT  /movementes-outgoings : Updates an existing movementesOutgoings.
     *
     * @param movementesOutgoingsDTO the movementesOutgoingsDTO to update
     * @return the ResponseEntity with status 200 (OK) and with body the updated movementesOutgoingsDTO,
     * or with status 400 (Bad Request) if the movementesOutgoingsDTO is not valid,
     * or with status 500 (Internal Server Error) if the movementesOutgoingsDTO couldn't be updated
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PutMapping("/movementes-outgoings")
    @Timed
    public ResponseEntity<MovementesOutgoingsDTO> updateMovementesOutgoings(@RequestBody MovementesOutgoingsDTO movementesOutgoingsDTO) throws URISyntaxException {
        log.debug("REST request to update MovementesOutgoings : {}", movementesOutgoingsDTO);
        if (movementesOutgoingsDTO.getId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        MovementesOutgoingsDTO result = movementesOutgoingsService.save(movementesOutgoingsDTO);
        return ResponseEntity.ok()
            .headers(HeaderUtil.createEntityUpdateAlert(ENTITY_NAME, movementesOutgoingsDTO.getId().toString()))
            .body(result);
    }

    /**
     * GET  /movementes-outgoings : get all the movementesOutgoings.
     *
     * @return the ResponseEntity with status 200 (OK) and the list of movementesOutgoings in body
     */
    @GetMapping("/movementes-outgoings")
    @Timed
    public List<MovementesOutgoingsDTO> getAllMovementesOutgoings() {
        log.debug("REST request to get all MovementesOutgoings");
        return movementesOutgoingsService.findAll();
    }

    /**
     * GET  /movementes-outgoings/:id : get the "id" movementesOutgoings.
     *
     * @param id the id of the movementesOutgoingsDTO to retrieve
     * @return the ResponseEntity with status 200 (OK) and with body the movementesOutgoingsDTO, or with status 404 (Not Found)
     */
    @GetMapping("/movementes-outgoings/{id}")
    @Timed
    public ResponseEntity<MovementesOutgoingsDTO> getMovementesOutgoings(@PathVariable Long id) {
        log.debug("REST request to get MovementesOutgoings : {}", id);
        Optional<MovementesOutgoingsDTO> movementesOutgoingsDTO = movementesOutgoingsService.findOne(id);
        return ResponseUtil.wrapOrNotFound(movementesOutgoingsDTO);
    }

    /**
     * DELETE  /movementes-outgoings/:id : delete the "id" movementesOutgoings.
     *
     * @param id the id of the movementesOutgoingsDTO to delete
     * @return the ResponseEntity with status 200 (OK)
     */
    @DeleteMapping("/movementes-outgoings/{id}")
    @Timed
    public ResponseEntity<Void> deleteMovementesOutgoings(@PathVariable Long id) {
        log.debug("REST request to delete MovementesOutgoings : {}", id);
        movementesOutgoingsService.delete(id);
        return ResponseEntity.ok().headers(HeaderUtil.createEntityDeletionAlert(ENTITY_NAME, id.toString())).build();
    }
}
