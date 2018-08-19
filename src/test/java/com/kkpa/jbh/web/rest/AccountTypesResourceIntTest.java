package com.kkpa.jbh.web.rest;

import com.kkpa.jbh.JbhApp;

import com.kkpa.jbh.domain.AccountTypes;
import com.kkpa.jbh.repository.AccountTypesRepository;
import com.kkpa.jbh.service.AccountTypesService;
import com.kkpa.jbh.service.dto.AccountTypesDTO;
import com.kkpa.jbh.service.mapper.AccountTypesMapper;
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
import java.util.List;


import static com.kkpa.jbh.web.rest.TestUtil.createFormattingConversionService;
import static org.assertj.core.api.Assertions.assertThat;
import static org.hamcrest.Matchers.hasItem;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

/**
 * Test class for the AccountTypesResource REST controller.
 *
 * @see AccountTypesResource
 */
@RunWith(SpringRunner.class)
@SpringBootTest(classes = JbhApp.class)
public class AccountTypesResourceIntTest {

    private static final String DEFAULT_DESCRIPTION = "AAAAAAAAAA";
    private static final String UPDATED_DESCRIPTION = "BBBBBBBBBB";

    private static final Boolean DEFAULT_DEFINED_BY_JBH = false;
    private static final Boolean UPDATED_DEFINED_BY_JBH = true;

    @Autowired
    private AccountTypesRepository accountTypesRepository;


    @Autowired
    private AccountTypesMapper accountTypesMapper;
    

    @Autowired
    private AccountTypesService accountTypesService;

    @Autowired
    private MappingJackson2HttpMessageConverter jacksonMessageConverter;

    @Autowired
    private PageableHandlerMethodArgumentResolver pageableArgumentResolver;

    @Autowired
    private ExceptionTranslator exceptionTranslator;

    @Autowired
    private EntityManager em;

    private MockMvc restAccountTypesMockMvc;

    private AccountTypes accountTypes;

    @Before
    public void setup() {
        MockitoAnnotations.initMocks(this);
        final AccountTypesResource accountTypesResource = new AccountTypesResource(accountTypesService);
        this.restAccountTypesMockMvc = MockMvcBuilders.standaloneSetup(accountTypesResource)
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
    public static AccountTypes createEntity(EntityManager em) {
        AccountTypes accountTypes = new AccountTypes()
            .description(DEFAULT_DESCRIPTION)
            .definedByJBH(DEFAULT_DEFINED_BY_JBH);
        return accountTypes;
    }

    @Before
    public void initTest() {
        accountTypes = createEntity(em);
    }

    @Test
    @Transactional
    public void createAccountTypes() throws Exception {
        int databaseSizeBeforeCreate = accountTypesRepository.findAll().size();

        // Create the AccountTypes
        AccountTypesDTO accountTypesDTO = accountTypesMapper.toDto(accountTypes);
        restAccountTypesMockMvc.perform(post("/api/account-types")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(accountTypesDTO)))
            .andExpect(status().isCreated());

        // Validate the AccountTypes in the database
        List<AccountTypes> accountTypesList = accountTypesRepository.findAll();
        assertThat(accountTypesList).hasSize(databaseSizeBeforeCreate + 1);
        AccountTypes testAccountTypes = accountTypesList.get(accountTypesList.size() - 1);
        assertThat(testAccountTypes.getDescription()).isEqualTo(DEFAULT_DESCRIPTION);
        assertThat(testAccountTypes.isDefinedByJBH()).isEqualTo(DEFAULT_DEFINED_BY_JBH);
    }

    @Test
    @Transactional
    public void createAccountTypesWithExistingId() throws Exception {
        int databaseSizeBeforeCreate = accountTypesRepository.findAll().size();

        // Create the AccountTypes with an existing ID
        accountTypes.setId(1L);
        AccountTypesDTO accountTypesDTO = accountTypesMapper.toDto(accountTypes);

        // An entity with an existing ID cannot be created, so this API call must fail
        restAccountTypesMockMvc.perform(post("/api/account-types")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(accountTypesDTO)))
            .andExpect(status().isBadRequest());

        // Validate the AccountTypes in the database
        List<AccountTypes> accountTypesList = accountTypesRepository.findAll();
        assertThat(accountTypesList).hasSize(databaseSizeBeforeCreate);
    }

    @Test
    @Transactional
    public void getAllAccountTypes() throws Exception {
        // Initialize the database
        accountTypesRepository.saveAndFlush(accountTypes);

        // Get all the accountTypesList
        restAccountTypesMockMvc.perform(get("/api/account-types?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(accountTypes.getId().intValue())))
            .andExpect(jsonPath("$.[*].description").value(hasItem(DEFAULT_DESCRIPTION.toString())))
            .andExpect(jsonPath("$.[*].definedByJBH").value(hasItem(DEFAULT_DEFINED_BY_JBH.booleanValue())));
    }
    

    @Test
    @Transactional
    public void getAccountTypes() throws Exception {
        // Initialize the database
        accountTypesRepository.saveAndFlush(accountTypes);

        // Get the accountTypes
        restAccountTypesMockMvc.perform(get("/api/account-types/{id}", accountTypes.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.id").value(accountTypes.getId().intValue()))
            .andExpect(jsonPath("$.description").value(DEFAULT_DESCRIPTION.toString()))
            .andExpect(jsonPath("$.definedByJBH").value(DEFAULT_DEFINED_BY_JBH.booleanValue()));
    }
    @Test
    @Transactional
    public void getNonExistingAccountTypes() throws Exception {
        // Get the accountTypes
        restAccountTypesMockMvc.perform(get("/api/account-types/{id}", Long.MAX_VALUE))
            .andExpect(status().isNotFound());
    }

    @Test
    @Transactional
    public void updateAccountTypes() throws Exception {
        // Initialize the database
        accountTypesRepository.saveAndFlush(accountTypes);

        int databaseSizeBeforeUpdate = accountTypesRepository.findAll().size();

        // Update the accountTypes
        AccountTypes updatedAccountTypes = accountTypesRepository.findById(accountTypes.getId()).get();
        // Disconnect from session so that the updates on updatedAccountTypes are not directly saved in db
        em.detach(updatedAccountTypes);
        updatedAccountTypes
            .description(UPDATED_DESCRIPTION)
            .definedByJBH(UPDATED_DEFINED_BY_JBH);
        AccountTypesDTO accountTypesDTO = accountTypesMapper.toDto(updatedAccountTypes);

        restAccountTypesMockMvc.perform(put("/api/account-types")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(accountTypesDTO)))
            .andExpect(status().isOk());

        // Validate the AccountTypes in the database
        List<AccountTypes> accountTypesList = accountTypesRepository.findAll();
        assertThat(accountTypesList).hasSize(databaseSizeBeforeUpdate);
        AccountTypes testAccountTypes = accountTypesList.get(accountTypesList.size() - 1);
        assertThat(testAccountTypes.getDescription()).isEqualTo(UPDATED_DESCRIPTION);
        assertThat(testAccountTypes.isDefinedByJBH()).isEqualTo(UPDATED_DEFINED_BY_JBH);
    }

    @Test
    @Transactional
    public void updateNonExistingAccountTypes() throws Exception {
        int databaseSizeBeforeUpdate = accountTypesRepository.findAll().size();

        // Create the AccountTypes
        AccountTypesDTO accountTypesDTO = accountTypesMapper.toDto(accountTypes);

        // If the entity doesn't have an ID, it will throw BadRequestAlertException 
        restAccountTypesMockMvc.perform(put("/api/account-types")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(accountTypesDTO)))
            .andExpect(status().isBadRequest());

        // Validate the AccountTypes in the database
        List<AccountTypes> accountTypesList = accountTypesRepository.findAll();
        assertThat(accountTypesList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    public void deleteAccountTypes() throws Exception {
        // Initialize the database
        accountTypesRepository.saveAndFlush(accountTypes);

        int databaseSizeBeforeDelete = accountTypesRepository.findAll().size();

        // Get the accountTypes
        restAccountTypesMockMvc.perform(delete("/api/account-types/{id}", accountTypes.getId())
            .accept(TestUtil.APPLICATION_JSON_UTF8))
            .andExpect(status().isOk());

        // Validate the database is empty
        List<AccountTypes> accountTypesList = accountTypesRepository.findAll();
        assertThat(accountTypesList).hasSize(databaseSizeBeforeDelete - 1);
    }

    @Test
    @Transactional
    public void equalsVerifier() throws Exception {
        TestUtil.equalsVerifier(AccountTypes.class);
        AccountTypes accountTypes1 = new AccountTypes();
        accountTypes1.setId(1L);
        AccountTypes accountTypes2 = new AccountTypes();
        accountTypes2.setId(accountTypes1.getId());
        assertThat(accountTypes1).isEqualTo(accountTypes2);
        accountTypes2.setId(2L);
        assertThat(accountTypes1).isNotEqualTo(accountTypes2);
        accountTypes1.setId(null);
        assertThat(accountTypes1).isNotEqualTo(accountTypes2);
    }

    @Test
    @Transactional
    public void dtoEqualsVerifier() throws Exception {
        TestUtil.equalsVerifier(AccountTypesDTO.class);
        AccountTypesDTO accountTypesDTO1 = new AccountTypesDTO();
        accountTypesDTO1.setId(1L);
        AccountTypesDTO accountTypesDTO2 = new AccountTypesDTO();
        assertThat(accountTypesDTO1).isNotEqualTo(accountTypesDTO2);
        accountTypesDTO2.setId(accountTypesDTO1.getId());
        assertThat(accountTypesDTO1).isEqualTo(accountTypesDTO2);
        accountTypesDTO2.setId(2L);
        assertThat(accountTypesDTO1).isNotEqualTo(accountTypesDTO2);
        accountTypesDTO1.setId(null);
        assertThat(accountTypesDTO1).isNotEqualTo(accountTypesDTO2);
    }

    @Test
    @Transactional
    public void testEntityFromId() {
        assertThat(accountTypesMapper.fromId(42L).getId()).isEqualTo(42);
        assertThat(accountTypesMapper.fromId(null)).isNull();
    }
}
