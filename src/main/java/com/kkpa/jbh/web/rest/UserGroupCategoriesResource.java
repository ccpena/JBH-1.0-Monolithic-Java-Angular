package com.kkpa.jbh.web.rest;

import com.codahale.metrics.annotation.Timed;
import com.kkpa.jbh.service.UserGroupCategoriesService;
import com.kkpa.jbh.web.rest.errors.BadRequestAlertException;
import com.kkpa.jbh.web.rest.util.HeaderUtil;
import com.kkpa.jbh.service.dto.UserGroupCategoriesDTO;
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
 * REST controller for managing UserGroupCategories.
 */
@RestController
@RequestMapping("/api")
public class UserGroupCategoriesResource {

    private final Logger log = LoggerFactory.getLogger(UserGroupCategoriesResource.class);

    private static final String ENTITY_NAME = "userGroupCategories";

    private final UserGroupCategoriesService userGroupCategoriesService;

    public UserGroupCategoriesResource(UserGroupCategoriesService userGroupCategoriesService) {
        this.userGroupCategoriesService = userGroupCategoriesService;
    }

    /**
     * POST  /user-group-categories : Create a new userGroupCategories.
     *
     * @param userGroupCategoriesDTO the userGroupCategoriesDTO to create
     * @return the ResponseEntity with status 201 (Created) and with body the new userGroupCategoriesDTO, or with status 400 (Bad Request) if the userGroupCategories has already an ID
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PostMapping("/user-group-categories")
    @Timed
    public ResponseEntity<UserGroupCategoriesDTO> createUserGroupCategories(@RequestBody UserGroupCategoriesDTO userGroupCategoriesDTO) throws URISyntaxException {
        log.debug("REST request to save UserGroupCategories : {}", userGroupCategoriesDTO);
        if (userGroupCategoriesDTO.getId() != null) {
            throw new BadRequestAlertException("A new userGroupCategories cannot already have an ID", ENTITY_NAME, "idexists");
        }
        UserGroupCategoriesDTO result = userGroupCategoriesService.save(userGroupCategoriesDTO);
        return ResponseEntity.created(new URI("/api/user-group-categories/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * PUT  /user-group-categories : Updates an existing userGroupCategories.
     *
     * @param userGroupCategoriesDTO the userGroupCategoriesDTO to update
     * @return the ResponseEntity with status 200 (OK) and with body the updated userGroupCategoriesDTO,
     * or with status 400 (Bad Request) if the userGroupCategoriesDTO is not valid,
     * or with status 500 (Internal Server Error) if the userGroupCategoriesDTO couldn't be updated
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PutMapping("/user-group-categories")
    @Timed
    public ResponseEntity<UserGroupCategoriesDTO> updateUserGroupCategories(@RequestBody UserGroupCategoriesDTO userGroupCategoriesDTO) throws URISyntaxException {
        log.debug("REST request to update UserGroupCategories : {}", userGroupCategoriesDTO);
        if (userGroupCategoriesDTO.getId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        UserGroupCategoriesDTO result = userGroupCategoriesService.save(userGroupCategoriesDTO);
        return ResponseEntity.ok()
            .headers(HeaderUtil.createEntityUpdateAlert(ENTITY_NAME, userGroupCategoriesDTO.getId().toString()))
            .body(result);
    }

    /**
     * GET  /user-group-categories : get all the userGroupCategories.
     *
     * @return the ResponseEntity with status 200 (OK) and the list of userGroupCategories in body
     */
    @GetMapping("/user-group-categories")
    @Timed
    public List<UserGroupCategoriesDTO> getAllUserGroupCategories() {
        log.debug("REST request to get all UserGroupCategories");
        return userGroupCategoriesService.findAll();
    }

    /**
     * GET  /user-group-categories/:id : get the "id" userGroupCategories.
     *
     * @param id the id of the userGroupCategoriesDTO to retrieve
     * @return the ResponseEntity with status 200 (OK) and with body the userGroupCategoriesDTO, or with status 404 (Not Found)
     */
    @GetMapping("/user-group-categories/{id}")
    @Timed
    public ResponseEntity<UserGroupCategoriesDTO> getUserGroupCategories(@PathVariable Long id) {
        log.debug("REST request to get UserGroupCategories : {}", id);
        Optional<UserGroupCategoriesDTO> userGroupCategoriesDTO = userGroupCategoriesService.findOne(id);
        return ResponseUtil.wrapOrNotFound(userGroupCategoriesDTO);
    }

    /**
     * DELETE  /user-group-categories/:id : delete the "id" userGroupCategories.
     *
     * @param id the id of the userGroupCategoriesDTO to delete
     * @return the ResponseEntity with status 200 (OK)
     */
    @DeleteMapping("/user-group-categories/{id}")
    @Timed
    public ResponseEntity<Void> deleteUserGroupCategories(@PathVariable Long id) {
        log.debug("REST request to delete UserGroupCategories : {}", id);
        userGroupCategoriesService.delete(id);
        return ResponseEntity.ok().headers(HeaderUtil.createEntityDeletionAlert(ENTITY_NAME, id.toString())).build();
    }
}
