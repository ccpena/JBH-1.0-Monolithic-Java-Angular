package com.kkpa.jbh.service.mapper;

import com.kkpa.jbh.domain.*;
import com.kkpa.jbh.service.dto.MembersGroupDTO;

import org.mapstruct.*;

/**
 * Mapper for the entity MembersGroup and its DTO MembersGroupDTO.
 */
@Mapper(componentModel = "spring", uses = {UsersGroupMapper.class, UserMapper.class})
public interface MembersGroupMapper extends EntityMapper<MembersGroupDTO, MembersGroup> {

    @Mapping(source = "idUserGroup.id", target = "idUserGroupId")
    @Mapping(source = "idUserOwner.id", target = "idUserOwnerId")
    @Mapping(source = "idUserInvited.id", target = "idUserInvitedId")
    MembersGroupDTO toDto(MembersGroup membersGroup);

    @Mapping(source = "idUserGroupId", target = "idUserGroup")
    @Mapping(source = "idUserOwnerId", target = "idUserOwner")
    @Mapping(source = "idUserInvitedId", target = "idUserInvited")
    MembersGroup toEntity(MembersGroupDTO membersGroupDTO);

    default MembersGroup fromId(Long id) {
        if (id == null) {
            return null;
        }
        MembersGroup membersGroup = new MembersGroup();
        membersGroup.setId(id);
        return membersGroup;
    }
}
