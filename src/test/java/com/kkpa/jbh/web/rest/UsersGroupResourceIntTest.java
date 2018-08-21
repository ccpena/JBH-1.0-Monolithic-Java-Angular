package com.kkpa.jbh.web.rest;

import com.kkpa.jbh.JbhApp;

import com.kkpa.jbh.domain.UsersGroup;
import com.kkpa.jbh.repository.UsersGroupRepository;
import com.kkpa.jbh.service.UsersGroupService;
import com.kkpa.jbh.service.dto.UsersGroupDTO;
import com.kkpa.jbh.service.mapper.UsersGroupMapper;
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
 * Test class for the UsersGroupResource REST controller.
 *
 * @see UsersGroupResource
 */
@RunWith(SpringRunner.class)
@SpringBootTest(classes = JbhApp.class)
public class UsersGroupResourceIntTest {

    private static final String DEFAULT_NAME = "AAAAAAAAAA";
    private static final String UPDATED_NAME = "BBBBBBBBBB";

    private static final LocalDate DEFAULT_CREATED_AT = LocalDate.ofEpochDay(0L);
    private static final LocalDate UPDATED_CREATED_AT = LocalDate.now(ZoneId.systemDefault());

    private static final LocalDate DEFAULT_UPDATED_AT = LocalDate.ofEpochDay(0L);
    private static final LocalDate UPDATED_UPDATED_AT = LocalDate.now(ZoneId.systemDefault());

    @Autowired
    private UsersGroupRepository usersGroupRepository;


    @Autowired
    private UsersGroupMapper usersGroupMapper;
    

    @Autowired
    private UsersGroupService usersGroupService;

    @Autowired
    private MappingJackson2HttpMessageConverter jacksonMessageConverter;

    @Autowired
    private PageableHandlerMethodArgumentResolver pageableArgumentResolver;

    @Autowired
    private ExceptionTranslator exceptionTranslator;

    @Autowired
    private EntityManager em;

    private MockMvc restUsersGroupMockMvc;

    private UsersGroup usersGroup;

    @Before
    public void setup() {
        MockitoAnnotations.initMocks(this);
        final UsersGroupResource usersGroupResource = new UsersGroupResource(usersGroupService);
        this.restUsersGroupMockMvc = MockMvcBuilders.standaloneSetup(usersGroupResource)
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
    public static UsersGroup createEntity(EntityManager em) {
        UsersGroup usersGroup = new UsersGroup()
            .name(DEFAULT_NAME)
            .createdAt(DEFAULT_CREATED_AT)
            .updatedAt(DEFAULT_UPDATED_AT);
        return usersGroup;
    }

    @Before
    public void initTest() {
        usersGroup = createEntity(em);
    }

    @Test
    @Transactional
    public void createUsersGroup() throws Exception {
        int databaseSizeBeforeCreate = usersGroupRepository.findAll().size();

        // Create the UsersGroup
        UsersGroupDTO usersGroupDTO = usersGroupMapper.toDto(usersGroup);
        restUsersGroupMockMvc.perform(post("/api/users-groups")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(usersGroupDTO)))
            .andExpect(status().isCreated());

        // Validate the UsersGroup in the database
        List<UsersGroup> usersGroupList = usersGroupRepository.findAll();
        assertThat(usersGroupList).hasSize(databaseSizeBeforeCreate + 1);
        UsersGroup testUsersGroup = usersGroupList.get(usersGroupList.size() - 1);
        assertThat(testUsersGroup.getName()).isEqualTo(DEFAULT_NAME);
        assertThat(testUsersGroup.getCreatedAt()).isEqualTo(DEFAULT_CREATED_AT);
        assertThat(testUsersGroup.getUpdatedAt()).isEqualTo(DEFAULT_UPDATED_AT);
    }

    @Test
    @Transactional
    public void createUsersGroupWithExistingId() throws Exception {
        int databaseSizeBeforeCreate = usersGroupRepository.findAll().size();

        // Create the UsersGroup with an existing ID
        usersGroup.setId(1L);
        UsersGroupDTO usersGroupDTO = usersGroupMapper.toDto(usersGroup);

        // An entity with an existing ID cannot be created, so this API call must fail
        restUsersGroupMockMvc.perform(post("/api/users-groups")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(usersGroupDTO)))
            .andExpect(status().isBadRequest());

        // Validate the UsersGroup in the database
        List<UsersGroup> usersGroupList = usersGroupRepository.findAll();
        assertThat(usersGroupList).hasSize(databaseSizeBeforeCreate);
    }

    @Test
    @Transactional
    public void getAllUsersGroups() throws Exception {
        // Initialize the database
        usersGroupRepository.saveAndFlush(usersGroup);

        // Get all the usersGroupList
        restUsersGroupMockMvc.perform(get("/api/users-groups?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(usersGroup.getId().intValue())))
            .andExpect(jsonPath("$.[*].name").value(hasItem(DEFAULT_NAME.toString())))
            .andExpect(jsonPath("$.[*].createdAt").value(hasItem(DEFAULT_CREATED_AT.toString())))
            .andExpect(jsonPath("$.[*].updatedAt").value(hasItem(DEFAULT_UPDATED_AT.toString())));
    }
    

    @Test
    @Transactional
    public void getUsersGroup() throws Exception {
        // Initialize the database
        usersGroupRepository.saveAndFlush(usersGroup);

        // Get the usersGroup
        restUsersGroupMockMvc.perform(get("/api/users-groups/{id}", usersGroup.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.id").value(usersGroup.getId().intValue()))
            .andExpect(jsonPath("$.name").value(DEFAULT_NAME.toString()))
            .andExpect(jsonPath("$.createdAt").value(DEFAULT_CREATED_AT.toString()))
            .andExpect(jsonPath("$.updatedAt").value(DEFAULT_UPDATED_AT.toString()));
    }
    @Test
    @Transactional
    public void getNonExistingUsersGroup() throws Exception {
        // Get the usersGroup
        restUsersGroupMockMvc.perform(get("/api/users-groups/{id}", Long.MAX_VALUE))
            .andExpect(status().isNotFound());
    }

    @Test
    @Transactional
    public void updateUsersGroup() throws Exception {
        // Initialize the database
        usersGroupRepository.saveAndFlush(usersGroup);

        int databaseSizeBeforeUpdate = usersGroupRepository.findAll().size();

        // Update the usersGroup
        UsersGroup updatedUsersGroup = usersGroupRepository.findById(usersGroup.getId()).get();
        // Disconnect from session so that the updates on updatedUsersGroup are not directly saved in db
        em.detach(updatedUsersGroup);
        updatedUsersGroup
            .name(UPDATED_NAME)
            .createdAt(UPDATED_CREATED_AT)
            .updatedAt(UPDATED_UPDATED_AT);
        UsersGroupDTO usersGroupDTO = usersGroupMapper.toDto(updatedUsersGroup);

        restUsersGroupMockMvc.perform(put("/api/users-groups")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(usersGroupDTO)))
            .andExpect(status().isOk());

        // Validate the UsersGroup in the database
        List<UsersGroup> usersGroupList = usersGroupRepository.findAll();
        assertThat(usersGroupList).hasSize(databaseSizeBeforeUpdate);
        UsersGroup testUsersGroup = usersGroupList.get(usersGroupList.size() - 1);
        assertThat(testUsersGroup.getName()).isEqualTo(UPDATED_NAME);
        assertThat(testUsersGroup.getCreatedAt()).isEqualTo(UPDATED_CREATED_AT);
        assertThat(testUsersGroup.getUpdatedAt()).isEqualTo(UPDATED_UPDATED_AT);
    }

    @Test
    @Transactional
    public void updateNonExistingUsersGroup() throws Exception {
        int databaseSizeBeforeUpdate = usersGroupRepository.findAll().size();

        // Create the UsersGroup
        UsersGroupDTO usersGroupDTO = usersGroupMapper.toDto(usersGroup);

        // If the entity doesn't have an ID, it will be created instead of just being updated
        restUsersGroupMockMvc.perform(put("/api/users-groups")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(usersGroupDTO)))
            .andExpect(status().isBadRequest());

        // Validate the UsersGroup in the database
        List<UsersGroup> usersGroupList = usersGroupRepository.findAll();
        assertThat(usersGroupList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    public void deleteUsersGroup() throws Exception {
        // Initialize the database
        usersGroupRepository.saveAndFlush(usersGroup);

        int databaseSizeBeforeDelete = usersGroupRepository.findAll().size();

        // Get the usersGroup
        restUsersGroupMockMvc.perform(delete("/api/users-groups/{id}", usersGroup.getId())
            .accept(TestUtil.APPLICATION_JSON_UTF8))
            .andExpect(status().isOk());

        // Validate the database is empty
        List<UsersGroup> usersGroupList = usersGroupRepository.findAll();
        assertThat(usersGroupList).hasSize(databaseSizeBeforeDelete - 1);
    }

    @Test
    @Transactional
    public void equalsVerifier() throws Exception {
        TestUtil.equalsVerifier(UsersGroup.class);
        UsersGroup usersGroup1 = new UsersGroup();
        usersGroup1.setId(1L);
        UsersGroup usersGroup2 = new UsersGroup();
        usersGroup2.setId(usersGroup1.getId());
        assertThat(usersGroup1).isEqualTo(usersGroup2);
        usersGroup2.setId(2L);
        assertThat(usersGroup1).isNotEqualTo(usersGroup2);
        usersGroup1.setId(null);
        assertThat(usersGroup1).isNotEqualTo(usersGroup2);
    }

    @Test
    @Transactional
    public void dtoEqualsVerifier() throws Exception {
        TestUtil.equalsVerifier(UsersGroupDTO.class);
        UsersGroupDTO usersGroupDTO1 = new UsersGroupDTO();
        usersGroupDTO1.setId(1L);
        UsersGroupDTO usersGroupDTO2 = new UsersGroupDTO();
        assertThat(usersGroupDTO1).isNotEqualTo(usersGroupDTO2);
        usersGroupDTO2.setId(usersGroupDTO1.getId());
        assertThat(usersGroupDTO1).isEqualTo(usersGroupDTO2);
        usersGroupDTO2.setId(2L);
        assertThat(usersGroupDTO1).isNotEqualTo(usersGroupDTO2);
        usersGroupDTO1.setId(null);
        assertThat(usersGroupDTO1).isNotEqualTo(usersGroupDTO2);
    }

    @Test
    @Transactional
    public void testEntityFromId() {
        assertThat(usersGroupMapper.fromId(42L).getId()).isEqualTo(42);
        assertThat(usersGroupMapper.fromId(null)).isNull();
    }
}
