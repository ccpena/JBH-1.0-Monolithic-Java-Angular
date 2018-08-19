package com.kkpa.jbh.web.rest;

import com.kkpa.jbh.JbhApp;

import com.kkpa.jbh.domain.MembersGroup;
import com.kkpa.jbh.repository.MembersGroupRepository;
import com.kkpa.jbh.service.MembersGroupService;
import com.kkpa.jbh.service.dto.MembersGroupDTO;
import com.kkpa.jbh.service.mapper.MembersGroupMapper;
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
 * Test class for the MembersGroupResource REST controller.
 *
 * @see MembersGroupResource
 */
@RunWith(SpringRunner.class)
@SpringBootTest(classes = JbhApp.class)
public class MembersGroupResourceIntTest {

    private static final Boolean DEFAULT_INVITATION_ACCEPTED = false;
    private static final Boolean UPDATED_INVITATION_ACCEPTED = true;

    @Autowired
    private MembersGroupRepository membersGroupRepository;


    @Autowired
    private MembersGroupMapper membersGroupMapper;
    

    @Autowired
    private MembersGroupService membersGroupService;

    @Autowired
    private MappingJackson2HttpMessageConverter jacksonMessageConverter;

    @Autowired
    private PageableHandlerMethodArgumentResolver pageableArgumentResolver;

    @Autowired
    private ExceptionTranslator exceptionTranslator;

    @Autowired
    private EntityManager em;

    private MockMvc restMembersGroupMockMvc;

    private MembersGroup membersGroup;

    @Before
    public void setup() {
        MockitoAnnotations.initMocks(this);
        final MembersGroupResource membersGroupResource = new MembersGroupResource(membersGroupService);
        this.restMembersGroupMockMvc = MockMvcBuilders.standaloneSetup(membersGroupResource)
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
    public static MembersGroup createEntity(EntityManager em) {
        MembersGroup membersGroup = new MembersGroup()
            .invitationAccepted(DEFAULT_INVITATION_ACCEPTED);
        return membersGroup;
    }

    @Before
    public void initTest() {
        membersGroup = createEntity(em);
    }

    @Test
    @Transactional
    public void createMembersGroup() throws Exception {
        int databaseSizeBeforeCreate = membersGroupRepository.findAll().size();

        // Create the MembersGroup
        MembersGroupDTO membersGroupDTO = membersGroupMapper.toDto(membersGroup);
        restMembersGroupMockMvc.perform(post("/api/members-groups")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(membersGroupDTO)))
            .andExpect(status().isCreated());

        // Validate the MembersGroup in the database
        List<MembersGroup> membersGroupList = membersGroupRepository.findAll();
        assertThat(membersGroupList).hasSize(databaseSizeBeforeCreate + 1);
        MembersGroup testMembersGroup = membersGroupList.get(membersGroupList.size() - 1);
        assertThat(testMembersGroup.isInvitationAccepted()).isEqualTo(DEFAULT_INVITATION_ACCEPTED);
    }

    @Test
    @Transactional
    public void createMembersGroupWithExistingId() throws Exception {
        int databaseSizeBeforeCreate = membersGroupRepository.findAll().size();

        // Create the MembersGroup with an existing ID
        membersGroup.setId(1L);
        MembersGroupDTO membersGroupDTO = membersGroupMapper.toDto(membersGroup);

        // An entity with an existing ID cannot be created, so this API call must fail
        restMembersGroupMockMvc.perform(post("/api/members-groups")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(membersGroupDTO)))
            .andExpect(status().isBadRequest());

        // Validate the MembersGroup in the database
        List<MembersGroup> membersGroupList = membersGroupRepository.findAll();
        assertThat(membersGroupList).hasSize(databaseSizeBeforeCreate);
    }

    @Test
    @Transactional
    public void getAllMembersGroups() throws Exception {
        // Initialize the database
        membersGroupRepository.saveAndFlush(membersGroup);

        // Get all the membersGroupList
        restMembersGroupMockMvc.perform(get("/api/members-groups?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(membersGroup.getId().intValue())))
            .andExpect(jsonPath("$.[*].invitationAccepted").value(hasItem(DEFAULT_INVITATION_ACCEPTED.booleanValue())));
    }
    

    @Test
    @Transactional
    public void getMembersGroup() throws Exception {
        // Initialize the database
        membersGroupRepository.saveAndFlush(membersGroup);

        // Get the membersGroup
        restMembersGroupMockMvc.perform(get("/api/members-groups/{id}", membersGroup.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.id").value(membersGroup.getId().intValue()))
            .andExpect(jsonPath("$.invitationAccepted").value(DEFAULT_INVITATION_ACCEPTED.booleanValue()));
    }
    @Test
    @Transactional
    public void getNonExistingMembersGroup() throws Exception {
        // Get the membersGroup
        restMembersGroupMockMvc.perform(get("/api/members-groups/{id}", Long.MAX_VALUE))
            .andExpect(status().isNotFound());
    }

    @Test
    @Transactional
    public void updateMembersGroup() throws Exception {
        // Initialize the database
        membersGroupRepository.saveAndFlush(membersGroup);

        int databaseSizeBeforeUpdate = membersGroupRepository.findAll().size();

        // Update the membersGroup
        MembersGroup updatedMembersGroup = membersGroupRepository.findById(membersGroup.getId()).get();
        // Disconnect from session so that the updates on updatedMembersGroup are not directly saved in db
        em.detach(updatedMembersGroup);
        updatedMembersGroup
            .invitationAccepted(UPDATED_INVITATION_ACCEPTED);
        MembersGroupDTO membersGroupDTO = membersGroupMapper.toDto(updatedMembersGroup);

        restMembersGroupMockMvc.perform(put("/api/members-groups")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(membersGroupDTO)))
            .andExpect(status().isOk());

        // Validate the MembersGroup in the database
        List<MembersGroup> membersGroupList = membersGroupRepository.findAll();
        assertThat(membersGroupList).hasSize(databaseSizeBeforeUpdate);
        MembersGroup testMembersGroup = membersGroupList.get(membersGroupList.size() - 1);
        assertThat(testMembersGroup.isInvitationAccepted()).isEqualTo(UPDATED_INVITATION_ACCEPTED);
    }

    @Test
    @Transactional
    public void updateNonExistingMembersGroup() throws Exception {
        int databaseSizeBeforeUpdate = membersGroupRepository.findAll().size();

        // Create the MembersGroup
        MembersGroupDTO membersGroupDTO = membersGroupMapper.toDto(membersGroup);

        // If the entity doesn't have an ID, it will be created instead of just being updated
        restMembersGroupMockMvc.perform(put("/api/members-groups")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(membersGroupDTO)))
            .andExpect(status().isBadRequest());

        // Validate the MembersGroup in the database
        List<MembersGroup> membersGroupList = membersGroupRepository.findAll();
        assertThat(membersGroupList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    public void deleteMembersGroup() throws Exception {
        // Initialize the database
        membersGroupRepository.saveAndFlush(membersGroup);

        int databaseSizeBeforeDelete = membersGroupRepository.findAll().size();

        // Get the membersGroup
        restMembersGroupMockMvc.perform(delete("/api/members-groups/{id}", membersGroup.getId())
            .accept(TestUtil.APPLICATION_JSON_UTF8))
            .andExpect(status().isOk());

        // Validate the database is empty
        List<MembersGroup> membersGroupList = membersGroupRepository.findAll();
        assertThat(membersGroupList).hasSize(databaseSizeBeforeDelete - 1);
    }

    @Test
    @Transactional
    public void equalsVerifier() throws Exception {
        TestUtil.equalsVerifier(MembersGroup.class);
        MembersGroup membersGroup1 = new MembersGroup();
        membersGroup1.setId(1L);
        MembersGroup membersGroup2 = new MembersGroup();
        membersGroup2.setId(membersGroup1.getId());
        assertThat(membersGroup1).isEqualTo(membersGroup2);
        membersGroup2.setId(2L);
        assertThat(membersGroup1).isNotEqualTo(membersGroup2);
        membersGroup1.setId(null);
        assertThat(membersGroup1).isNotEqualTo(membersGroup2);
    }

    @Test
    @Transactional
    public void dtoEqualsVerifier() throws Exception {
        TestUtil.equalsVerifier(MembersGroupDTO.class);
        MembersGroupDTO membersGroupDTO1 = new MembersGroupDTO();
        membersGroupDTO1.setId(1L);
        MembersGroupDTO membersGroupDTO2 = new MembersGroupDTO();
        assertThat(membersGroupDTO1).isNotEqualTo(membersGroupDTO2);
        membersGroupDTO2.setId(membersGroupDTO1.getId());
        assertThat(membersGroupDTO1).isEqualTo(membersGroupDTO2);
        membersGroupDTO2.setId(2L);
        assertThat(membersGroupDTO1).isNotEqualTo(membersGroupDTO2);
        membersGroupDTO1.setId(null);
        assertThat(membersGroupDTO1).isNotEqualTo(membersGroupDTO2);
    }

    @Test
    @Transactional
    public void testEntityFromId() {
        assertThat(membersGroupMapper.fromId(42L).getId()).isEqualTo(42);
        assertThat(membersGroupMapper.fromId(null)).isNull();
    }
}
