package com.kkpa.jbh.web.rest;

import com.codahale.metrics.annotation.Timed;
import com.kkpa.jbh.service.SubCategoriesService;
import com.kkpa.jbh.web.rest.errors.BadRequestAlertException;
import com.kkpa.jbh.web.rest.util.HeaderUtil;
import com.kkpa.jbh.web.rest.util.PaginationUtil;
import com.kkpa.jbh.service.dto.SubCategoriesDTO;
import io.github.jhipster.web.util.ResponseUtil;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import java.net.URI;
import java.net.URISyntaxException;

import java.util.List;
import java.util.Optional;

/**
 * REST controller for managing SubCategories.
 */
@RestController
@RequestMapping("/api")
public class SubCategoriesResource {

    private final Logger log = LoggerFactory.getLogger(SubCategoriesResource.class);

    private static final String ENTITY_NAME = "subCategories";

    private final SubCategoriesService subCategoriesService;

    public SubCategoriesResource(SubCategoriesService subCategoriesService) {
        this.subCategoriesService = subCategoriesService;
    }

    /**
     * POST  /sub-categories : Create a new subCategories.
     *
     * @param subCategoriesDTO the subCategoriesDTO to create
     * @return the ResponseEntity with status 201 (Created) and with body the new subCategoriesDTO, or with status 400 (Bad Request) if the subCategories has already an ID
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PostMapping("/sub-categories")
    @Timed
    public ResponseEntity<SubCategoriesDTO> createSubCategories(@Valid @RequestBody SubCategoriesDTO subCategoriesDTO) throws URISyntaxException {
        log.debug("REST request to save SubCategories : {}", subCategoriesDTO);
        if (subCategoriesDTO.getId() != null) {
            throw new BadRequestAlertException("A new subCategories cannot already have an ID", ENTITY_NAME, "idexists");
        }
        SubCategoriesDTO result = subCategoriesService.save(subCategoriesDTO);
        return ResponseEntity.created(new URI("/api/sub-categories/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * PUT  /sub-categories : Updates an existing subCategories.
     *
     * @param subCategoriesDTO the subCategoriesDTO to update
     * @return the ResponseEntity with status 200 (OK) and with body the updated subCategoriesDTO,
     * or with status 400 (Bad Request) if the subCategoriesDTO is not valid,
     * or with status 500 (Internal Server Error) if the subCategoriesDTO couldn't be updated
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PutMapping("/sub-categories")
    @Timed
    public ResponseEntity<SubCategoriesDTO> updateSubCategories(@Valid @RequestBody SubCategoriesDTO subCategoriesDTO) throws URISyntaxException {
        log.debug("REST request to update SubCategories : {}", subCategoriesDTO);
        if (subCategoriesDTO.getId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        SubCategoriesDTO result = subCategoriesService.save(subCategoriesDTO);
        return ResponseEntity.ok()
            .headers(HeaderUtil.createEntityUpdateAlert(ENTITY_NAME, subCategoriesDTO.getId().toString()))
            .body(result);
    }

    /**
     * GET  /sub-categories : get all the subCategories.
     *
     * @param pageable the pagination information
     * @return the ResponseEntity with status 200 (OK) and the list of subCategories in body
     */
    @GetMapping("/sub-categories")
    @Timed
    public ResponseEntity<List<SubCategoriesDTO>> getAllSubCategories(Pageable pageable) {
        log.debug("REST request to get a page of SubCategories");
        Page<SubCategoriesDTO> page = subCategoriesService.findAll(pageable);
        HttpHeaders headers = PaginationUtil.generatePaginationHttpHeaders(page, "/api/sub-categories");
        return new ResponseEntity<>(page.getContent(), headers, HttpStatus.OK);
    }

    /**
     * GET  /sub-categories/:id : get the "id" subCategories.
     *
     * @param id the id of the subCategoriesDTO to retrieve
     * @return the ResponseEntity with status 200 (OK) and with body the subCategoriesDTO, or with status 404 (Not Found)
     */
    @GetMapping("/sub-categories/{id}")
    @Timed
    public ResponseEntity<SubCategoriesDTO> getSubCategories(@PathVariable Long id) {
        log.debug("REST request to get SubCategories : {}", id);
        Optional<SubCategoriesDTO> subCategoriesDTO = subCategoriesService.findOne(id);
        return ResponseUtil.wrapOrNotFound(subCategoriesDTO);
    }

    /**
     * DELETE  /sub-categories/:id : delete the "id" subCategories.
     *
     * @param id the id of the subCategoriesDTO to delete
     * @return the ResponseEntity with status 200 (OK)
     */
    @DeleteMapping("/sub-categories/{id}")
    @Timed
    public ResponseEntity<Void> deleteSubCategories(@PathVariable Long id) {
        log.debug("REST request to delete SubCategories : {}", id);
        subCategoriesService.delete(id);
        return ResponseEntity.ok().headers(HeaderUtil.createEntityDeletionAlert(ENTITY_NAME, id.toString())).build();
    }
}
