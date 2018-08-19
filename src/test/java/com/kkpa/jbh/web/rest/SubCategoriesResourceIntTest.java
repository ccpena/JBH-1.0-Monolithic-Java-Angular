package com.kkpa.jbh.web.rest;

import com.kkpa.jbh.JbhApp;

import com.kkpa.jbh.domain.SubCategories;
import com.kkpa.jbh.repository.SubCategoriesRepository;
import com.kkpa.jbh.service.SubCategoriesService;
import com.kkpa.jbh.service.dto.SubCategoriesDTO;
import com.kkpa.jbh.service.mapper.SubCategoriesMapper;
import com.kkpa.jbh.web.rest.errors.ExceptionTranslator;

import org.junit.Before;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.mockito.MockitoAnnotations;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.data.web.PageableHandlerMethodArgumentResolver;
import org.springframework.http.MediaType;
import org.springframework.http.converter.json.MappingJackson2HttpMessageConverter;
import org.springframework.test.context.junit4.SpringRunner;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.setup.MockMvcBuilders;
import org.springframework.transaction.annotation.Transactional;

import javax.persistence.EntityManager;
import java.time.LocalDate;
import java.time.ZoneId;
import java.util.List;


import static com.kkpa.jbh.web.rest.TestUtil.createFormattingConversionService;
import static org.assertj.core.api.Assertions.assertThat;
import static org.hamcrest.Matchers.hasItem;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

/**
 * Test class for the SubCategoriesResource REST controller.
 *
 * @see SubCategoriesResource
 */
@RunWith(SpringRunner.class)
@SpringBootTest(classes = JbhApp.class)
public class SubCategoriesResourceIntTest {

    private static final String DEFAULT_NAME = "AAAAAAAAAA";
    private static final String UPDATED_NAME = "BBBBBBBBBB";

    private static final Boolean DEFAULT_DEFINED_BY_JBH = false;
    private static final Boolean UPDATED_DEFINED_BY_JBH = true;

    private static final LocalDate DEFAULT_CREATION_DATE = LocalDate.ofEpochDay(0L);
    private static final LocalDate UPDATED_CREATION_DATE = LocalDate.now(ZoneId.systemDefault());

    @Autowired
    private SubCategoriesRepository subCategoriesRepository;


    @Autowired
    private SubCategoriesMapper subCategoriesMapper;
    

    @Autowired
    private SubCategoriesService subCategoriesService;

    @Autowired
    private MappingJackson2HttpMessageConverter jacksonMessageConverter;

    @Autowired
    private PageableHandlerMethodArgumentResolver pageableArgumentResolver;

    @Autowired
    private ExceptionTranslator exceptionTranslator;

    @Autowired
    private EntityManager em;

    private MockMvc restSubCategoriesMockMvc;

    private SubCategories subCategories;

    @Before
    public void setup() {
        MockitoAnnotations.initMocks(this);
        final SubCategoriesResource subCategoriesResource = new SubCategoriesResource(subCategoriesService);
        this.restSubCategoriesMockMvc = MockMvcBuilders.standaloneSetup(subCategoriesResource)
            .setCustomArgumentResolvers(pageableArgumentResolver)
            .setControllerAdvice(exceptionTranslator)
            .setConversionService(createFormattingConversionService())
            .setMessageConverters(jacksonMessageConverter).build();
    }

    /**
     * Create an entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static SubCategories createEntity(EntityManager em) {
        SubCategories subCategories = new SubCategories()
            .name(DEFAULT_NAME)
            .definedByJBH(DEFAULT_DEFINED_BY_JBH)
            .creationDate(DEFAULT_CREATION_DATE);
        return subCategories;
    }

    @Before
    public void initTest() {
        subCategories = createEntity(em);
    }

    @Test
    @Transactional
    public void createSubCategories() throws Exception {
        int databaseSizeBeforeCreate = subCategoriesRepository.findAll().size();

        // Create the SubCategories
        SubCategoriesDTO subCategoriesDTO = subCategoriesMapper.toDto(subCategories);
        restSubCategoriesMockMvc.perform(post("/api/sub-categories")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(subCategoriesDTO)))
            .andExpect(status().isCreated());

        // Validate the SubCategories in the database
        List<SubCategories> subCategoriesList = subCategoriesRepository.findAll();
        assertThat(subCategoriesList).hasSize(databaseSizeBeforeCreate + 1);
        SubCategories testSubCategories = subCategoriesList.get(subCategoriesList.size() - 1);
        assertThat(testSubCategories.getName()).isEqualTo(DEFAULT_NAME);
        assertThat(testSubCategories.isDefinedByJBH()).isEqualTo(DEFAULT_DEFINED_BY_JBH);
        assertThat(testSubCategories.getCreationDate()).isEqualTo(DEFAULT_CREATION_DATE);
    }

    @Test
    @Transactional
    public void createSubCategoriesWithExistingId() throws Exception {
        int databaseSizeBeforeCreate = subCategoriesRepository.findAll().size();

        // Create the SubCategories with an existing ID
        subCategories.setId(1L);
        SubCategoriesDTO subCategoriesDTO = subCategoriesMapper.toDto(subCategories);

        // An entity with an existing ID cannot be created, so this API call must fail
        restSubCategoriesMockMvc.perform(post("/api/sub-categories")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(subCategoriesDTO)))
            .andExpect(status().isBadRequest());

        // Validate the SubCategories in the database
        List<SubCategories> subCategoriesList = subCategoriesRepository.findAll();
        assertThat(subCategoriesList).hasSize(databaseSizeBeforeCreate);
    }

    @Test
    @Transactional
    public void checkNameIsRequired() throws Exception {
        int databaseSizeBeforeTest = subCategoriesRepository.findAll().size();
        // set the field null
        subCategories.setName(null);

        // Create the SubCategories, which fails.
        SubCategoriesDTO subCategoriesDTO = subCategoriesMapper.toDto(subCategories);

        restSubCategoriesMockMvc.perform(post("/api/sub-categories")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(subCategoriesDTO)))
            .andExpect(status().isBadRequest());

        List<SubCategories> subCategoriesList = subCategoriesRepository.findAll();
        assertThat(subCategoriesList).hasSize(databaseSizeBeforeTest);
    }

    @Test
    @Transactional
    public void getAllSubCategories() throws Exception {
        // Initialize the database
        subCategoriesRepository.saveAndFlush(subCategories);

        // Get all the subCategoriesList
        restSubCategoriesMockMvc.perform(get("/api/sub-categories?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(subCategories.getId().intValue())))
            .andExpect(jsonPath("$.[*].name").value(hasItem(DEFAULT_NAME.toString())))
            .andExpect(jsonPath("$.[*].definedByJBH").value(hasItem(DEFAULT_DEFINED_BY_JBH.booleanValue())))
            .andExpect(jsonPath("$.[*].creationDate").value(hasItem(DEFAULT_CREATION_DATE.toString())));
    }
    

    @Test
    @Transactional
    public void getSubCategories() throws Exception {
        // Initialize the database
        subCategoriesRepository.saveAndFlush(subCategories);

        // Get the subCategories
        restSubCategoriesMockMvc.perform(get("/api/sub-categories/{id}", subCategories.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.id").value(subCategories.getId().intValue()))
            .andExpect(jsonPath("$.name").value(DEFAULT_NAME.toString()))
            .andExpect(jsonPath("$.definedByJBH").value(DEFAULT_DEFINED_BY_JBH.booleanValue()))
            .andExpect(jsonPath("$.creationDate").value(DEFAULT_CREATION_DATE.toString()));
    }
    @Test
    @Transactional
    public void getNonExistingSubCategories() throws Exception {
        // Get the subCategories
        restSubCategoriesMockMvc.perform(get("/api/sub-categories/{id}", Long.MAX_VALUE))
            .andExpect(status().isNotFound());
    }

    @Test
    @Transactional
    public void updateSubCategories() throws Exception {
        // Initialize the database
        subCategoriesRepository.saveAndFlush(subCategories);

        int databaseSizeBeforeUpdate = subCategoriesRepository.findAll().size();

        // Update the subCategories
        SubCategories updatedSubCategories = subCategoriesRepository.findById(subCategories.getId()).get();
        // Disconnect from session so that the updates on updatedSubCategories are not directly saved in db
        em.detach(updatedSubCategories);
        updatedSubCategories
            .name(UPDATED_NAME)
            .definedByJBH(UPDATED_DEFINED_BY_JBH)
            .creationDate(UPDATED_CREATION_DATE);
        SubCategoriesDTO subCategoriesDTO = subCategoriesMapper.toDto(updatedSubCategories);

        restSubCategoriesMockMvc.perform(put("/api/sub-categories")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(subCategoriesDTO)))
            .andExpect(status().isOk());

        // Validate the SubCategories in the database
        List<SubCategories> subCategoriesList = subCategoriesRepository.findAll();
        assertThat(subCategoriesList).hasSize(databaseSizeBeforeUpdate);
        SubCategories testSubCategories = subCategoriesList.get(subCategoriesList.size() - 1);
        assertThat(testSubCategories.getName()).isEqualTo(UPDATED_NAME);
        assertThat(testSubCategories.isDefinedByJBH()).isEqualTo(UPDATED_DEFINED_BY_JBH);
        assertThat(testSubCategories.getCreationDate()).isEqualTo(UPDATED_CREATION_DATE);
    }

    @Test
    @Transactional
    public void updateNonExistingSubCategories() throws Exception {
        int databaseSizeBeforeUpdate = subCategoriesRepository.findAll().size();

        // Create the SubCategories
        SubCategoriesDTO subCategoriesDTO = subCategoriesMapper.toDto(subCategories);

        // If the entity doesn't have an ID, it will be created instead of just being updated
        restSubCategoriesMockMvc.perform(put("/api/sub-categories")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(subCategoriesDTO)))
            .andExpect(status().isBadRequest());

        // Validate the SubCategories in the database
        List<SubCategories> subCategoriesList = subCategoriesRepository.findAll();
        assertThat(subCategoriesList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    public void deleteSubCategories() throws Exception {
        // Initialize the database
        subCategoriesRepository.saveAndFlush(subCategories);

        int databaseSizeBeforeDelete = subCategoriesRepository.findAll().size();

        // Get the subCategories
        restSubCategoriesMockMvc.perform(delete("/api/sub-categories/{id}", subCategories.getId())
            .accept(TestUtil.APPLICATION_JSON_UTF8))
            .andExpect(status().isOk());

        // Validate the database is empty
        List<SubCategories> subCategoriesList = subCategoriesRepository.findAll();
        assertThat(subCategoriesList).hasSize(databaseSizeBeforeDelete - 1);
    }

    @Test
    @Transactional
    public void equalsVerifier() throws Exception {
        TestUtil.equalsVerifier(SubCategories.class);
        SubCategories subCategories1 = new SubCategories();
        subCategories1.setId(1L);
        SubCategories subCategories2 = new SubCategories();
        subCategories2.setId(subCategories1.getId());
        assertThat(subCategories1).isEqualTo(subCategories2);
        subCategories2.setId(2L);
        assertThat(subCategories1).isNotEqualTo(subCategories2);
        subCategories1.setId(null);
        assertThat(subCategories1).isNotEqualTo(subCategories2);
    }

    @Test
    @Transactional
    public void dtoEqualsVerifier() throws Exception {
        TestUtil.equalsVerifier(SubCategoriesDTO.class);
        SubCategoriesDTO subCategoriesDTO1 = new SubCategoriesDTO();
        subCategoriesDTO1.setId(1L);
        SubCategoriesDTO subCategoriesDTO2 = new SubCategoriesDTO();
        assertThat(subCategoriesDTO1).isNotEqualTo(subCategoriesDTO2);
        subCategoriesDTO2.setId(subCategoriesDTO1.getId());
        assertThat(subCategoriesDTO1).isEqualTo(subCategoriesDTO2);
        subCategoriesDTO2.setId(2L);
        assertThat(subCategoriesDTO1).isNotEqualTo(subCategoriesDTO2);
        subCategoriesDTO1.setId(null);
        assertThat(subCategoriesDTO1).isNotEqualTo(subCategoriesDTO2);
    }

    @Test
    @Transactional
    public void testEntityFromId() {
        assertThat(subCategoriesMapper.fromId(42L).getId()).isEqualTo(42);
        assertThat(subCategoriesMapper.fromId(null)).isNull();
    }
}
