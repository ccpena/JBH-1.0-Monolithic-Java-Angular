package com.kkpa.jbh.web.rest;

import com.kkpa.jbh.JbhApp;

import com.kkpa.jbh.domain.MovementesOutgoings;
import com.kkpa.jbh.repository.MovementesOutgoingsRepository;
import com.kkpa.jbh.service.MovementesOutgoingsService;
import com.kkpa.jbh.service.dto.MovementesOutgoingsDTO;
import com.kkpa.jbh.service.mapper.MovementesOutgoingsMapper;
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
 * Test class for the MovementesOutgoingsResource REST controller.
 *
 * @see MovementesOutgoingsResource
 */
@RunWith(SpringRunner.class)
@SpringBootTest(classes = JbhApp.class)
public class MovementesOutgoingsResourceIntTest {

    private static final BigDecimal DEFAULT_TOTAL_VALUE = new BigDecimal(1);
    private static final BigDecimal UPDATED_TOTAL_VALUE = new BigDecimal(2);

    private static final LocalDate DEFAULT_CREATE_DATE = LocalDate.ofEpochDay(0L);
    private static final LocalDate UPDATED_CREATE_DATE = LocalDate.now(ZoneId.systemDefault());

    @Autowired
    private MovementesOutgoingsRepository movementesOutgoingsRepository;


    @Autowired
    private MovementesOutgoingsMapper movementesOutgoingsMapper;
    

    @Autowired
    private MovementesOutgoingsService movementesOutgoingsService;

    @Autowired
    private MappingJackson2HttpMessageConverter jacksonMessageConverter;

    @Autowired
    private PageableHandlerMethodArgumentResolver pageableArgumentResolver;

    @Autowired
    private ExceptionTranslator exceptionTranslator;

    @Autowired
    private EntityManager em;

    private MockMvc restMovementesOutgoingsMockMvc;

    private MovementesOutgoings movementesOutgoings;

    @Before
    public void setup() {
        MockitoAnnotations.initMocks(this);
        final MovementesOutgoingsResource movementesOutgoingsResource = new MovementesOutgoingsResource(movementesOutgoingsService);
        this.restMovementesOutgoingsMockMvc = MockMvcBuilders.standaloneSetup(movementesOutgoingsResource)
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
    public static MovementesOutgoings createEntity(EntityManager em) {
        MovementesOutgoings movementesOutgoings = new MovementesOutgoings()
            .totalValue(DEFAULT_TOTAL_VALUE)
            .createDate(DEFAULT_CREATE_DATE);
        return movementesOutgoings;
    }

    @Before
    public void initTest() {
        movementesOutgoings = createEntity(em);
    }

    @Test
    @Transactional
    public void createMovementesOutgoings() throws Exception {
        int databaseSizeBeforeCreate = movementesOutgoingsRepository.findAll().size();

        // Create the MovementesOutgoings
        MovementesOutgoingsDTO movementesOutgoingsDTO = movementesOutgoingsMapper.toDto(movementesOutgoings);
        restMovementesOutgoingsMockMvc.perform(post("/api/movementes-outgoings")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(movementesOutgoingsDTO)))
            .andExpect(status().isCreated());

        // Validate the MovementesOutgoings in the database
        List<MovementesOutgoings> movementesOutgoingsList = movementesOutgoingsRepository.findAll();
        assertThat(movementesOutgoingsList).hasSize(databaseSizeBeforeCreate + 1);
        MovementesOutgoings testMovementesOutgoings = movementesOutgoingsList.get(movementesOutgoingsList.size() - 1);
        assertThat(testMovementesOutgoings.getTotalValue()).isEqualTo(DEFAULT_TOTAL_VALUE);
        assertThat(testMovementesOutgoings.getCreateDate()).isEqualTo(DEFAULT_CREATE_DATE);
    }

    @Test
    @Transactional
    public void createMovementesOutgoingsWithExistingId() throws Exception {
        int databaseSizeBeforeCreate = movementesOutgoingsRepository.findAll().size();

        // Create the MovementesOutgoings with an existing ID
        movementesOutgoings.setId(1L);
        MovementesOutgoingsDTO movementesOutgoingsDTO = movementesOutgoingsMapper.toDto(movementesOutgoings);

        // An entity with an existing ID cannot be created, so this API call must fail
        restMovementesOutgoingsMockMvc.perform(post("/api/movementes-outgoings")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(movementesOutgoingsDTO)))
            .andExpect(status().isBadRequest());

        // Validate the MovementesOutgoings in the database
        List<MovementesOutgoings> movementesOutgoingsList = movementesOutgoingsRepository.findAll();
        assertThat(movementesOutgoingsList).hasSize(databaseSizeBeforeCreate);
    }

    @Test
    @Transactional
    public void getAllMovementesOutgoings() throws Exception {
        // Initialize the database
        movementesOutgoingsRepository.saveAndFlush(movementesOutgoings);

        // Get all the movementesOutgoingsList
        restMovementesOutgoingsMockMvc.perform(get("/api/movementes-outgoings?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(movementesOutgoings.getId().intValue())))
            .andExpect(jsonPath("$.[*].totalValue").value(hasItem(DEFAULT_TOTAL_VALUE.intValue())))
            .andExpect(jsonPath("$.[*].createDate").value(hasItem(DEFAULT_CREATE_DATE.toString())));
    }
    

    @Test
    @Transactional
    public void getMovementesOutgoings() throws Exception {
        // Initialize the database
        movementesOutgoingsRepository.saveAndFlush(movementesOutgoings);

        // Get the movementesOutgoings
        restMovementesOutgoingsMockMvc.perform(get("/api/movementes-outgoings/{id}", movementesOutgoings.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.id").value(movementesOutgoings.getId().intValue()))
            .andExpect(jsonPath("$.totalValue").value(DEFAULT_TOTAL_VALUE.intValue()))
            .andExpect(jsonPath("$.createDate").value(DEFAULT_CREATE_DATE.toString()));
    }
    @Test
    @Transactional
    public void getNonExistingMovementesOutgoings() throws Exception {
        // Get the movementesOutgoings
        restMovementesOutgoingsMockMvc.perform(get("/api/movementes-outgoings/{id}", Long.MAX_VALUE))
            .andExpect(status().isNotFound());
    }

    @Test
    @Transactional
    public void updateMovementesOutgoings() throws Exception {
        // Initialize the database
        movementesOutgoingsRepository.saveAndFlush(movementesOutgoings);

        int databaseSizeBeforeUpdate = movementesOutgoingsRepository.findAll().size();

        // Update the movementesOutgoings
        MovementesOutgoings updatedMovementesOutgoings = movementesOutgoingsRepository.findById(movementesOutgoings.getId()).get();
        // Disconnect from session so that the updates on updatedMovementesOutgoings are not directly saved in db
        em.detach(updatedMovementesOutgoings);
        updatedMovementesOutgoings
            .totalValue(UPDATED_TOTAL_VALUE)
            .createDate(UPDATED_CREATE_DATE);
        MovementesOutgoingsDTO movementesOutgoingsDTO = movementesOutgoingsMapper.toDto(updatedMovementesOutgoings);

        restMovementesOutgoingsMockMvc.perform(put("/api/movementes-outgoings")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(movementesOutgoingsDTO)))
            .andExpect(status().isOk());

        // Validate the MovementesOutgoings in the database
        List<MovementesOutgoings> movementesOutgoingsList = movementesOutgoingsRepository.findAll();
        assertThat(movementesOutgoingsList).hasSize(databaseSizeBeforeUpdate);
        MovementesOutgoings testMovementesOutgoings = movementesOutgoingsList.get(movementesOutgoingsList.size() - 1);
        assertThat(testMovementesOutgoings.getTotalValue()).isEqualTo(UPDATED_TOTAL_VALUE);
        assertThat(testMovementesOutgoings.getCreateDate()).isEqualTo(UPDATED_CREATE_DATE);
    }

    @Test
    @Transactional
    public void updateNonExistingMovementesOutgoings() throws Exception {
        int databaseSizeBeforeUpdate = movementesOutgoingsRepository.findAll().size();

        // Create the MovementesOutgoings
        MovementesOutgoingsDTO movementesOutgoingsDTO = movementesOutgoingsMapper.toDto(movementesOutgoings);

        // If the entity doesn't have an ID, it will be created instead of just being updated
        restMovementesOutgoingsMockMvc.perform(put("/api/movementes-outgoings")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(movementesOutgoingsDTO)))
            .andExpect(status().isBadRequest());

        // Validate the MovementesOutgoings in the database
        List<MovementesOutgoings> movementesOutgoingsList = movementesOutgoingsRepository.findAll();
        assertThat(movementesOutgoingsList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    public void deleteMovementesOutgoings() throws Exception {
        // Initialize the database
        movementesOutgoingsRepository.saveAndFlush(movementesOutgoings);

        int databaseSizeBeforeDelete = movementesOutgoingsRepository.findAll().size();

        // Get the movementesOutgoings
        restMovementesOutgoingsMockMvc.perform(delete("/api/movementes-outgoings/{id}", movementesOutgoings.getId())
            .accept(TestUtil.APPLICATION_JSON_UTF8))
            .andExpect(status().isOk());

        // Validate the database is empty
        List<MovementesOutgoings> movementesOutgoingsList = movementesOutgoingsRepository.findAll();
        assertThat(movementesOutgoingsList).hasSize(databaseSizeBeforeDelete - 1);
    }

    @Test
    @Transactional
    public void equalsVerifier() throws Exception {
        TestUtil.equalsVerifier(MovementesOutgoings.class);
        MovementesOutgoings movementesOutgoings1 = new MovementesOutgoings();
        movementesOutgoings1.setId(1L);
        MovementesOutgoings movementesOutgoings2 = new MovementesOutgoings();
        movementesOutgoings2.setId(movementesOutgoings1.getId());
        assertThat(movementesOutgoings1).isEqualTo(movementesOutgoings2);
        movementesOutgoings2.setId(2L);
        assertThat(movementesOutgoings1).isNotEqualTo(movementesOutgoings2);
        movementesOutgoings1.setId(null);
        assertThat(movementesOutgoings1).isNotEqualTo(movementesOutgoings2);
    }

    @Test
    @Transactional
    public void dtoEqualsVerifier() throws Exception {
        TestUtil.equalsVerifier(MovementesOutgoingsDTO.class);
        MovementesOutgoingsDTO movementesOutgoingsDTO1 = new MovementesOutgoingsDTO();
        movementesOutgoingsDTO1.setId(1L);
        MovementesOutgoingsDTO movementesOutgoingsDTO2 = new MovementesOutgoingsDTO();
        assertThat(movementesOutgoingsDTO1).isNotEqualTo(movementesOutgoingsDTO2);
        movementesOutgoingsDTO2.setId(movementesOutgoingsDTO1.getId());
        assertThat(movementesOutgoingsDTO1).isEqualTo(movementesOutgoingsDTO2);
        movementesOutgoingsDTO2.setId(2L);
        assertThat(movementesOutgoingsDTO1).isNotEqualTo(movementesOutgoingsDTO2);
        movementesOutgoingsDTO1.setId(null);
        assertThat(movementesOutgoingsDTO1).isNotEqualTo(movementesOutgoingsDTO2);
    }

    @Test
    @Transactional
    public void testEntityFromId() {
        assertThat(movementesOutgoingsMapper.fromId(42L).getId()).isEqualTo(42);
        assertThat(movementesOutgoingsMapper.fromId(null)).isNull();
    }
}
