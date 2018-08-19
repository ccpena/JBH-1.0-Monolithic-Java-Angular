package com.kkpa.jbh.web.rest;

import com.codahale.metrics.annotation.Timed;
import com.kkpa.jbh.service.UsersGroupService;
import com.kkpa.jbh.web.rest.errors.BadRequestAlertException;
import com.kkpa.jbh.web.rest.util.HeaderUtil;
import com.kkpa.jbh.service.dto.UsersGroupDTO;
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
 * REST controller for managing UsersGroup.
 */
@RestController
@RequestMapping("/api")
public class UsersGroupResource {

    private final Logger log = LoggerFactory.getLogger(UsersGroupResource.class);

    private static final String ENTITY_NAME = "usersGroup";

    private final UsersGroupService usersGroupService;

    public UsersGroupResource(UsersGroupService usersGroupService) {
        this.usersGroupService = usersGroupService;
    }

    /**
     * POST  /users-groups : Create a new usersGroup.
     *
     * @param usersGroupDTO the usersGroupDTO to create
     * @return the ResponseEntity with status 201 (Created) and with body the new usersGroupDTO, or with status 400 (Bad Request) if the usersGroup has already an ID
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PostMapping("/users-groups")
    @Timed
    public ResponseEntity<UsersGroupDTO> createUsersGroup(@RequestBody UsersGroupDTO usersGroupDTO) throws URISyntaxException {
        log.debug("REST request to save UsersGroup : {}", usersGroupDTO);
        if (usersGroupDTO.getId() != null) {
            throw new BadRequestAlertException("A new usersGroup cannot already have an ID", ENTITY_NAME, "idexists");
        }
        UsersGroupDTO result = usersGroupService.save(usersGroupDTO);
        return ResponseEntity.created(new URI("/api/users-groups/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * PUT  /users-groups : Updates an existing usersGroup.
     *
     * @param usersGroupDTO the usersGroupDTO to update
     * @return the ResponseEntity with status 200 (OK) and with body the updated usersGroupDTO,
     * or with status 400 (Bad Request) if the usersGroupDTO is not valid,
     * or with status 500 (Internal Server Error) if the usersGroupDTO couldn't be updated
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PutMapping("/users-groups")
    @Timed
    public ResponseEntity<UsersGroupDTO> updateUsersGroup(@RequestBody UsersGroupDTO usersGroupDTO) throws URISyntaxException {
        log.debug("REST request to update UsersGroup : {}", usersGroupDTO);
        if (usersGroupDTO.getId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        UsersGroupDTO result = usersGroupService.save(usersGroupDTO);
        return ResponseEntity.ok()
            .headers(HeaderUtil.createEntityUpdateAlert(ENTITY_NAME, usersGroupDTO.getId().toString()))
            .body(result);
    }

    /**
     * GET  /users-groups : get all the usersGroups.
     *
     * @return the ResponseEntity with status 200 (OK) and the list of usersGroups in body
     */
    @GetMapping("/users-groups")
    @Timed
    public List<UsersGroupDTO> getAllUsersGroups() {
        log.debug("REST request to get all UsersGroups");
        return usersGroupService.findAll();
    }

    /**
     * GET  /users-groups/:id : get the "id" usersGroup.
     *
     * @param id the id of the usersGroupDTO to retrieve
     * @return the ResponseEntity with status 200 (OK) and with body the usersGroupDTO, or with status 404 (Not Found)
     */
    @GetMapping("/users-groups/{id}")
    @Timed
    public ResponseEntity<UsersGroupDTO> getUsersGroup(@PathVariable Long id) {
        log.debug("REST request to get UsersGroup : {}", id);
        Optional<UsersGroupDTO> usersGroupDTO = usersGroupService.findOne(id);
        return ResponseUtil.wrapOrNotFound(usersGroupDTO);
    }

    /**
     * DELETE  /users-groups/:id : delete the "id" usersGroup.
     *
     * @param id the id of the usersGroupDTO to delete
     * @return the ResponseEntity with status 200 (OK)
     */
    @DeleteMapping("/users-groups/{id}")
    @Timed
    public ResponseEntity<Void> deleteUsersGroup(@PathVariable Long id) {
        log.debug("REST request to delete UsersGroup : {}", id);
        usersGroupService.delete(id);
        return ResponseEntity.ok().headers(HeaderUtil.createEntityDeletionAlert(ENTITY_NAME, id.toString())).build();
    }
}
