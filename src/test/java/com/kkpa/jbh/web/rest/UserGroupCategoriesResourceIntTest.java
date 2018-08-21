package com.kkpa.jbh.web.rest;

import com.kkpa.jbh.JbhApp;

import com.kkpa.jbh.domain.UserGroupCategories;
import com.kkpa.jbh.repository.UserGroupCategoriesRepository;
import com.kkpa.jbh.service.UserGroupCategoriesService;
import com.kkpa.jbh.service.dto.UserGroupCategoriesDTO;
import com.kkpa.jbh.service.mapper.UserGroupCategoriesMapper;
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
 * Test class for the UserGroupCategoriesResource REST controller.
 *
 * @see UserGroupCategoriesResource
 */
@RunWith(SpringRunner.class)
@SpringBootTest(classes = JbhApp.class)
public class UserGroupCategoriesResourceIntTest {

    private static final String DEFAULT_NAME = "AAAAAAAAAA";
    private static final String UPDATED_NAME = "BBBBBBBBBB";

    private static final LocalDate DEFAULT_CREATED_AT = LocalDate.ofEpochDay(0L);
    private static final LocalDate UPDATED_CREATED_AT = LocalDate.now(ZoneId.systemDefault());

    private static final LocalDate DEFAULT_UPDATED_AT = LocalDate.ofEpochDay(0L);
    private static final LocalDate UPDATED_UPDATED_AT = LocalDate.now(ZoneId.systemDefault());

    @Autowired
    private UserGroupCategoriesRepository userGroupCategoriesRepository;


    @Autowired
    private UserGroupCategoriesMapper userGroupCategoriesMapper;
    

    @Autowired
    private UserGroupCategoriesService userGroupCategoriesService;

    @Autowired
    private MappingJackson2HttpMessageConverter jacksonMessageConverter;

    @Autowired
    private PageableHandlerMethodArgumentResolver pageableArgumentResolver;

    @Autowired
    private ExceptionTranslator exceptionTranslator;

    @Autowired
    private EntityManager em;

    private MockMvc restUserGroupCategoriesMockMvc;

    private UserGroupCategories userGroupCategories;

    @Before
    public void setup() {
        MockitoAnnotations.initMocks(this);
        final UserGroupCategoriesResource userGroupCategoriesResource = new UserGroupCategoriesResource(userGroupCategoriesService);
        this.restUserGroupCategoriesMockMvc = MockMvcBuilders.standaloneSetup(userGroupCategoriesResource)
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
    public static UserGroupCategories createEntity(EntityManager em) {
        UserGroupCategories userGroupCategories = new UserGroupCategories()
            .name(DEFAULT_NAME)
            .createdAt(DEFAULT_CREATED_AT)
            .updatedAt(DEFAULT_UPDATED_AT);
        return userGroupCategories;
    }

    @Before
    public void initTest() {
        userGroupCategories = createEntity(em);
    }

    @Test
    @Transactional
    public void createUserGroupCategories() throws Exception {
        int databaseSizeBeforeCreate = userGroupCategoriesRepository.findAll().size();

        // Create the UserGroupCategories
        UserGroupCategoriesDTO userGroupCategoriesDTO = userGroupCategoriesMapper.toDto(userGroupCategories);
        restUserGroupCategoriesMockMvc.perform(post("/api/user-group-categories")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(userGroupCategoriesDTO)))
            .andExpect(status().isCreated());

        // Validate the UserGroupCategories in the database
        List<UserGroupCategories> userGroupCategoriesList = userGroupCategoriesRepository.findAll();
        assertThat(userGroupCategoriesList).hasSize(databaseSizeBeforeCreate + 1);
        UserGroupCategories testUserGroupCategories = userGroupCategoriesList.get(userGroupCategoriesList.size() - 1);
        assertThat(testUserGroupCategories.getName()).isEqualTo(DEFAULT_NAME);
        assertThat(testUserGroupCategories.getCreatedAt()).isEqualTo(DEFAULT_CREATED_AT);
        assertThat(testUserGroupCategories.getUpdatedAt()).isEqualTo(DEFAULT_UPDATED_AT);
    }

    @Test
    @Transactional
    public void createUserGroupCategoriesWithExistingId() throws Exception {
        int databaseSizeBeforeCreate = userGroupCategoriesRepository.findAll().size();

        // Create the UserGroupCategories with an existing ID
        userGroupCategories.setId(1L);
        UserGroupCategoriesDTO userGroupCategoriesDTO = userGroupCategoriesMapper.toDto(userGroupCategories);

        // An entity with an existing ID cannot be created, so this API call must fail
        restUserGroupCategoriesMockMvc.perform(post("/api/user-group-categories")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(userGroupCategoriesDTO)))
            .andExpect(status().isBadRequest());

        // Validate the UserGroupCategories in the database
        List<UserGroupCategories> userGroupCategoriesList = userGroupCategoriesRepository.findAll();
        assertThat(userGroupCategoriesList).hasSize(databaseSizeBeforeCreate);
    }

    @Test
    @Transactional
    public void getAllUserGroupCategories() throws Exception {
        // Initialize the database
        userGroupCategoriesRepository.saveAndFlush(userGroupCategories);

        // Get all the userGroupCategoriesList
        restUserGroupCategoriesMockMvc.perform(get("/api/user-group-categories?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(userGroupCategories.getId().intValue())))
            .andExpect(jsonPath("$.[*].name").value(hasItem(DEFAULT_NAME.toString())))
            .andExpect(jsonPath("$.[*].createdAt").value(hasItem(DEFAULT_CREATED_AT.toString())))
            .andExpect(jsonPath("$.[*].updatedAt").value(hasItem(DEFAULT_UPDATED_AT.toString())));
    }
    

    @Test
    @Transactional
    public void getUserGroupCategories() throws Exception {
        // Initialize the database
        userGroupCategoriesRepository.saveAndFlush(userGroupCategories);

        // Get the userGroupCategories
        restUserGroupCategoriesMockMvc.perform(get("/api/user-group-categories/{id}", userGroupCategories.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.id").value(userGroupCategories.getId().intValue()))
            .andExpect(jsonPath("$.name").value(DEFAULT_NAME.toString()))
            .andExpect(jsonPath("$.createdAt").value(DEFAULT_CREATED_AT.toString()))
            .andExpect(jsonPath("$.updatedAt").value(DEFAULT_UPDATED_AT.toString()));
    }
    @Test
    @Transactional
    public void getNonExistingUserGroupCategories() throws Exception {
        // Get the userGroupCategories
        restUserGroupCategoriesMockMvc.perform(get("/api/user-group-categories/{id}", Long.MAX_VALUE))
            .andExpect(status().isNotFound());
    }

    @Test
    @Transactional
    public void updateUserGroupCategories() throws Exception {
        // Initialize the database
        userGroupCategoriesRepository.saveAndFlush(userGroupCategories);

        int databaseSizeBeforeUpdate = userGroupCategoriesRepository.findAll().size();

        // Update the userGroupCategories
        UserGroupCategories updatedUserGroupCategories = userGroupCategoriesRepository.findById(userGroupCategories.getId()).get();
        // Disconnect from session so that the updates on updatedUserGroupCategories are not directly saved in db
        em.detach(updatedUserGroupCategories);
        updatedUserGroupCategories
            .name(UPDATED_NAME)
            .createdAt(UPDATED_CREATED_AT)
            .updatedAt(UPDATED_UPDATED_AT);
        UserGroupCategoriesDTO userGroupCategoriesDTO = userGroupCategoriesMapper.toDto(updatedUserGroupCategories);

        restUserGroupCategoriesMockMvc.perform(put("/api/user-group-categories")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(userGroupCategoriesDTO)))
            .andExpect(status().isOk());

        // Validate the UserGroupCategories in the database
        List<UserGroupCategories> userGroupCategoriesList = userGroupCategoriesRepository.findAll();
        assertThat(userGroupCategoriesList).hasSize(databaseSizeBeforeUpdate);
        UserGroupCategories testUserGroupCategories = userGroupCategoriesList.get(userGroupCategoriesList.size() - 1);
        assertThat(testUserGroupCategories.getName()).isEqualTo(UPDATED_NAME);
        assertThat(testUserGroupCategories.getCreatedAt()).isEqualTo(UPDATED_CREATED_AT);
        assertThat(testUserGroupCategories.getUpdatedAt()).isEqualTo(UPDATED_UPDATED_AT);
    }

    @Test
    @Transactional
    public void updateNonExistingUserGroupCategories() throws Exception {
        int databaseSizeBeforeUpdate = userGroupCategoriesRepository.findAll().size();

        // Create the UserGroupCategories
        UserGroupCategoriesDTO userGroupCategoriesDTO = userGroupCategoriesMapper.toDto(userGroupCategories);

        // If the entity doesn't have an ID, it will be created instead of just being updated
        restUserGroupCategoriesMockMvc.perform(put("/api/user-group-categories")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(userGroupCategoriesDTO)))
            .andExpect(status().isBadRequest());

        // Validate the UserGroupCategories in the database
        List<UserGroupCategories> userGroupCategoriesList = userGroupCategoriesRepository.findAll();
        assertThat(userGroupCategoriesList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    public void deleteUserGroupCategories() throws Exception {
        // Initialize the database
        userGroupCategoriesRepository.saveAndFlush(userGroupCategories);

        int databaseSizeBeforeDelete = userGroupCategoriesRepository.findAll().size();

        // Get the userGroupCategories
        restUserGroupCategoriesMockMvc.perform(delete("/api/user-group-categories/{id}", userGroupCategories.getId())
            .accept(TestUtil.APPLICATION_JSON_UTF8))
            .andExpect(status().isOk());

        // Validate the database is empty
        List<UserGroupCategories> userGroupCategoriesList = userGroupCategoriesRepository.findAll();
        assertThat(userGroupCategoriesList).hasSize(databaseSizeBeforeDelete - 1);
    }

    @Test
    @Transactional
    public void equalsVerifier() throws Exception {
        TestUtil.equalsVerifier(UserGroupCategories.class);
        UserGroupCategories userGroupCategories1 = new UserGroupCategories();
        userGroupCategories1.setId(1L);
        UserGroupCategories userGroupCategories2 = new UserGroupCategories();
        userGroupCategories2.setId(userGroupCategories1.getId());
        assertThat(userGroupCategories1).isEqualTo(userGroupCategories2);
        userGroupCategories2.setId(2L);
        assertThat(userGroupCategories1).isNotEqualTo(userGroupCategories2);
        userGroupCategories1.setId(null);
        assertThat(userGroupCategories1).isNotEqualTo(userGroupCategories2);
    }

    @Test
    @Transactional
    public void dtoEqualsVerifier() throws Exception {
        TestUtil.equalsVerifier(UserGroupCategoriesDTO.class);
        UserGroupCategoriesDTO userGroupCategoriesDTO1 = new UserGroupCategoriesDTO();
        userGroupCategoriesDTO1.setId(1L);
        UserGroupCategoriesDTO userGroupCategoriesDTO2 = new UserGroupCategoriesDTO();
        assertThat(userGroupCategoriesDTO1).isNotEqualTo(userGroupCategoriesDTO2);
        userGroupCategoriesDTO2.setId(userGroupCategoriesDTO1.getId());
        assertThat(userGroupCategoriesDTO1).isEqualTo(userGroupCategoriesDTO2);
        userGroupCategoriesDTO2.setId(2L);
        assertThat(userGroupCategoriesDTO1).isNotEqualTo(userGroupCategoriesDTO2);
        userGroupCategoriesDTO1.setId(null);
        assertThat(userGroupCategoriesDTO1).isNotEqualTo(userGroupCategoriesDTO2);
    }

    @Test
    @Transactional
    public void testEntityFromId() {
        assertThat(userGroupCategoriesMapper.fromId(42L).getId()).isEqualTo(42);
        assertThat(userGroupCategoriesMapper.fromId(null)).isNull();
    }
}
