package com.kkpa.jbh.web.rest;

import com.codahale.metrics.annotation.Timed;
import com.kkpa.jbh.service.MembersGroupService;
import com.kkpa.jbh.web.rest.errors.BadRequestAlertException;
import com.kkpa.jbh.web.rest.util.HeaderUtil;
import com.kkpa.jbh.service.dto.MembersGroupDTO;
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
 * REST controller for managing MembersGroup.
 */
@RestController
@RequestMapping("/api")
public class MembersGroupResource {

    private final Logger log = LoggerFactory.getLogger(MembersGroupResource.class);

    private static final String ENTITY_NAME = "membersGroup";

    private final MembersGroupService membersGroupService;

    public MembersGroupResource(MembersGroupService membersGroupService) {
        this.membersGroupService = membersGroupService;
    }

    /**
     * POST  /members-groups : Create a new membersGroup.
     *
     * @param membersGroupDTO the membersGroupDTO to create
     * @return the ResponseEntity with status 201 (Created) and with body the new membersGroupDTO, or with status 400 (Bad Request) if the membersGroup has already an ID
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PostMapping("/members-groups")
    @Timed
    public ResponseEntity<MembersGroupDTO> createMembersGroup(@RequestBody MembersGroupDTO membersGroupDTO) throws URISyntaxException {
        log.debug("REST request to save MembersGroup : {}", membersGroupDTO);
        if (membersGroupDTO.getId() != null) {
            throw new BadRequestAlertException("A new membersGroup cannot already have an ID", ENTITY_NAME, "idexists");
        }
        MembersGroupDTO result = membersGroupService.save(membersGroupDTO);
        return ResponseEntity.created(new URI("/api/members-groups/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * PUT  /members-groups : Updates an existing membersGroup.
     *
     * @param membersGroupDTO the membersGroupDTO to update
     * @return the ResponseEntity with status 200 (OK) and with body the updated membersGroupDTO,
     * or with status 400 (Bad Request) if the membersGroupDTO is not valid,
     * or with status 500 (Internal Server Error) if the membersGroupDTO couldn't be updated
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PutMapping("/members-groups")
    @Timed
    public ResponseEntity<MembersGroupDTO> updateMembersGroup(@RequestBody MembersGroupDTO membersGroupDTO) throws URISyntaxException {
        log.debug("REST request to update MembersGroup : {}", membersGroupDTO);
        if (membersGroupDTO.getId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        MembersGroupDTO result = membersGroupService.save(membersGroupDTO);
        return ResponseEntity.ok()
            .headers(HeaderUtil.createEntityUpdateAlert(ENTITY_NAME, membersGroupDTO.getId().toString()))
            .body(result);
    }

    /**
     * GET  /members-groups : get all the membersGroups.
     *
     * @return the ResponseEntity with status 200 (OK) and the list of membersGroups in body
     */
    @GetMapping("/members-groups")
    @Timed
    public List<MembersGroupDTO> getAllMembersGroups() {
        log.debug("REST request to get all MembersGroups");
        return membersGroupService.findAll();
    }

    /**
     * GET  /members-groups/:id : get the "id" membersGroup.
     *
     * @param id the id of the membersGroupDTO to retrieve
     * @return the ResponseEntity with status 200 (OK) and with body the membersGroupDTO, or with status 404 (Not Found)
     */
    @GetMapping("/members-groups/{id}")
    @Timed
    public ResponseEntity<MembersGroupDTO> getMembersGroup(@PathVariable Long id) {
        log.debug("REST request to get MembersGroup : {}", id);
        Optional<MembersGroupDTO> membersGroupDTO = membersGroupService.findOne(id);
        return ResponseUtil.wrapOrNotFound(membersGroupDTO);
    }

    /**
     * DELETE  /members-groups/:id : delete the "id" membersGroup.
     *
     * @param id the id of the membersGroupDTO to delete
     * @return the ResponseEntity with status 200 (OK)
     */
    @DeleteMapping("/members-groups/{id}")
    @Timed
    public ResponseEntity<Void> deleteMembersGroup(@PathVariable Long id) {
        log.debug("REST request to delete MembersGroup : {}", id);
        membersGroupService.delete(id);
        return ResponseEntity.ok().headers(HeaderUtil.createEntityDeletionAlert(ENTITY_NAME, id.toString())).build();
    }
}
