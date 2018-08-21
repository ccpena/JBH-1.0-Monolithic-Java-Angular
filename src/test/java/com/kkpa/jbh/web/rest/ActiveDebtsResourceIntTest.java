package com.kkpa.jbh.web.rest;

import com.kkpa.jbh.JbhApp;

import com.kkpa.jbh.domain.ActiveDebts;
import com.kkpa.jbh.repository.ActiveDebtsRepository;
import com.kkpa.jbh.service.ActiveDebtsService;
import com.kkpa.jbh.service.dto.ActiveDebtsDTO;
import com.kkpa.jbh.service.mapper.ActiveDebtsMapper;
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
import java.math.BigDecimal;
import java.time.LocalDate;
import java.time.ZoneId;
import java.util.List;


import static com.kkpa.jbh.web.rest.TestUtil.createFormattingConversionService;
import static org.assertj.core.api.Assertions.assertThat;
import static org.hamcrest.Matchers.hasItem;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

/**
 * Test class for the ActiveDebtsResource REST controller.
 *
 * @see ActiveDebtsResource
 */
@RunWith(SpringRunner.class)
@SpringBootTest(classes = JbhApp.class)
public class ActiveDebtsResourceIntTest {

    private static final BigDecimal DEFAULT_TOTAL_VALUE = new BigDecimal(1);
    private static final BigDecimal UPDATED_TOTAL_VALUE = new BigDecimal(2);

    private static final LocalDate DEFAULT_CREATED_AT = LocalDate.ofEpochDay(0L);
    private static final LocalDate UPDATED_CREATED_AT = LocalDate.now(ZoneId.systemDefault());

    @Autowired
    private ActiveDebtsRepository activeDebtsRepository;


    @Autowired
    private ActiveDebtsMapper activeDebtsMapper;
    

    @Autowired
    private ActiveDebtsService activeDebtsService;

    @Autowired
    private MappingJackson2HttpMessageConverter jacksonMessageConverter;

    @Autowired
    private PageableHandlerMethodArgumentResolver pageableArgumentResolver;

    @Autowired
    private ExceptionTranslator exceptionTranslator;

    @Autowired
    private EntityManager em;

    private MockMvc restActiveDebtsMockMvc;

    private ActiveDebts activeDebts;

    @Before
    public void setup() {
        MockitoAnnotations.initMocks(this);
        final ActiveDebtsResource activeDebtsResource = new ActiveDebtsResource(activeDebtsService);
        this.restActiveDebtsMockMvc = MockMvcBuilders.standaloneSetup(activeDebtsResource)
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
    public static ActiveDebts createEntity(EntityManager em) {
        ActiveDebts activeDebts = new ActiveDebts()
            .totalValue(DEFAULT_TOTAL_VALUE)
            .createdAt(DEFAULT_CREATED_AT);
        return activeDebts;
    }

    @Before
    public void initTest() {
        activeDebts = createEntity(em);
    }

    @Test
    @Transactional
    public void createActiveDebts() throws Exception {
        int databaseSizeBeforeCreate = activeDebtsRepository.findAll().size();

        // Create the ActiveDebts
        ActiveDebtsDTO activeDebtsDTO = activeDebtsMapper.toDto(activeDebts);
        restActiveDebtsMockMvc.perform(post("/api/active-debts")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(activeDebtsDTO)))
            .andExpect(status().isCreated());

        // Validate the ActiveDebts in the database
        List<ActiveDebts> activeDebtsList = activeDebtsRepository.findAll();
        assertThat(activeDebtsList).hasSize(databaseSizeBeforeCreate + 1);
        ActiveDebts testActiveDebts = activeDebtsList.get(activeDebtsList.size() - 1);
        assertThat(testActiveDebts.getTotalValue()).isEqualTo(DEFAULT_TOTAL_VALUE);
        assertThat(testActiveDebts.getCreatedAt()).isEqualTo(DEFAULT_CREATED_AT);
    }

    @Test
    @Transactional
    public void createActiveDebtsWithExistingId() throws Exception {
        int databaseSizeBeforeCreate = activeDebtsRepository.findAll().size();

        // Create the ActiveDebts with an existing ID
        activeDebts.setId(1L);
        ActiveDebtsDTO activeDebtsDTO = activeDebtsMapper.toDto(activeDebts);

        // An entity with an existing ID cannot be created, so this API call must fail
        restActiveDebtsMockMvc.perform(post("/api/active-debts")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(activeDebtsDTO)))
            .andExpect(status().isBadRequest());

        // Validate the ActiveDebts in the database
        List<ActiveDebts> activeDebtsList = activeDebtsRepository.findAll();
        assertThat(activeDebtsList).hasSize(databaseSizeBeforeCreate);
    }

    @Test
    @Transactional
    public void getAllActiveDebts() throws Exception {
        // Initialize the database
        activeDebtsRepository.saveAndFlush(activeDebts);

        // Get all the activeDebtsList
        restActiveDebtsMockMvc.perform(get("/api/active-debts?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(activeDebts.getId().intValue())))
            .andExpect(jsonPath("$.[*].totalValue").value(hasItem(DEFAULT_TOTAL_VALUE.intValue())))
            .andExpect(jsonPath("$.[*].createdAt").value(hasItem(DEFAULT_CREATED_AT.toString())));
    }
    

    @Test
    @Transactional
    public void getActiveDebts() throws Exception {
        // Initialize the database
        activeDebtsRepository.saveAndFlush(activeDebts);

        // Get the activeDebts
        restActiveDebtsMockMvc.perform(get("/api/active-debts/{id}", activeDebts.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.id").value(activeDebts.getId().intValue()))
            .andExpect(jsonPath("$.totalValue").value(DEFAULT_TOTAL_VALUE.intValue()))
            .andExpect(jsonPath("$.createdAt").value(DEFAULT_CREATED_AT.toString()));
    }
    @Test
    @Transactional
    public void getNonExistingActiveDebts() throws Exception {
        // Get the activeDebts
        restActiveDebtsMockMvc.perform(get("/api/active-debts/{id}", Long.MAX_VALUE))
            .andExpect(status().isNotFound());
    }

    @Test
    @Transactional
    public void updateActiveDebts() throws Exception {
        // Initialize the database
        activeDebtsRepository.saveAndFlush(activeDebts);

        int databaseSizeBeforeUpdate = activeDebtsRepository.findAll().size();

        // Update the activeDebts
        ActiveDebts updatedActiveDebts = activeDebtsRepository.findById(activeDebts.getId()).get();
        // Disconnect from session so that the updates on updatedActiveDebts are not directly saved in db
        em.detach(updatedActiveDebts);
        updatedActiveDebts
            .totalValue(UPDATED_TOTAL_VALUE)
            .createdAt(UPDATED_CREATED_AT);
        ActiveDebtsDTO activeDebtsDTO = activeDebtsMapper.toDto(updatedActiveDebts);

        restActiveDebtsMockMvc.perform(put("/api/active-debts")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(activeDebtsDTO)))
            .andExpect(status().isOk());

        // Validate the ActiveDebts in the database
        List<ActiveDebts> activeDebtsList = activeDebtsRepository.findAll();
        assertThat(activeDebtsList).hasSize(databaseSizeBeforeUpdate);
        ActiveDebts testActiveDebts = activeDebtsList.get(activeDebtsList.size() - 1);
        assertThat(testActiveDebts.getTotalValue()).isEqualTo(UPDATED_TOTAL_VALUE);
        assertThat(testActiveDebts.getCreatedAt()).isEqualTo(UPDATED_CREATED_AT);
    }

    @Test
    @Transactional
    public void updateNonExistingActiveDebts() throws Exception {
        int databaseSizeBeforeUpdate = activeDebtsRepository.findAll().size();

        // Create the ActiveDebts
        ActiveDebtsDTO activeDebtsDTO = activeDebtsMapper.toDto(activeDebts);

        // If the entity doesn't have an ID, it will be created instead of just being updated
        restActiveDebtsMockMvc.perform(put("/api/active-debts")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(activeDebtsDTO)))
            .andExpect(status().isBadRequest());

        // Validate the ActiveDebts in the database
        List<ActiveDebts> activeDebtsList = activeDebtsRepository.findAll();
        assertThat(activeDebtsList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    public void deleteActiveDebts() throws Exception {
        // Initialize the database
        activeDebtsRepository.saveAndFlush(activeDebts);

        int databaseSizeBeforeDelete = activeDebtsRepository.findAll().size();

        // Get the activeDebts
        restActiveDebtsMockMvc.perform(delete("/api/active-debts/{id}", activeDebts.getId())
            .accept(TestUtil.APPLICATION_JSON_UTF8))
            .andExpect(status().isOk());

        // Validate the database is empty
        List<ActiveDebts> activeDebtsList = activeDebtsRepository.findAll();
        assertThat(activeDebtsList).hasSize(databaseSizeBeforeDelete - 1);
    }

    @Test
    @Transactional
    public void equalsVerifier() throws Exception {
        TestUtil.equalsVerifier(ActiveDebts.class);
        ActiveDebts activeDebts1 = new ActiveDebts();
        activeDebts1.setId(1L);
        ActiveDebts activeDebts2 = new ActiveDebts();
        activeDebts2.setId(activeDebts1.getId());
        assertThat(activeDebts1).isEqualTo(activeDebts2);
        activeDebts2.setId(2L);
        assertThat(activeDebts1).isNotEqualTo(activeDebts2);
        activeDebts1.setId(null);
        assertThat(activeDebts1).isNotEqualTo(activeDebts2);
    }

    @Test
    @Transactional
    public void dtoEqualsVerifier() throws Exception {
        TestUtil.equalsVerifier(ActiveDebtsDTO.class);
        ActiveDebtsDTO activeDebtsDTO1 = new ActiveDebtsDTO();
        activeDebtsDTO1.setId(1L);
        ActiveDebtsDTO activeDebtsDTO2 = new ActiveDebtsDTO();
        assertThat(activeDebtsDTO1).isNotEqualTo(activeDebtsDTO2);
        activeDebtsDTO2.setId(activeDebtsDTO1.getId());
        assertThat(activeDebtsDTO1).isEqualTo(activeDebtsDTO2);
        activeDebtsDTO2.setId(2L);
        assertThat(activeDebtsDTO1).isNotEqualTo(activeDebtsDTO2);
        activeDebtsDTO1.setId(null);
        assertThat(activeDebtsDTO1).isNotEqualTo(activeDebtsDTO2);
    }

    @Test
    @Transactional
    public void testEntityFromId() {
        assertThat(activeDebtsMapper.fromId(42L).getId()).isEqualTo(42);
        assertThat(activeDebtsMapper.fromId(null)).isNull();
    }
}
