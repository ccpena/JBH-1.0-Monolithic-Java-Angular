package com.kkpa.jbh.service.mapper;

import com.kkpa.jbh.domain.*;
import com.kkpa.jbh.service.dto.UsersGroupDTO;

import org.mapstruct.*;

/**
 * Mapper for the entity UsersGroup and its DTO UsersGroupDTO.
 */
@Mapper(componentModel = "spring", uses = {UserMapper.class})
public interface UsersGroupMapper extends EntityMapper<UsersGroupDTO, UsersGroup> {

    @Mapping(source = "idUserOwner.id", target = "idUserOwnerId")
    @Mapping(source = "idUserInvited.id", target = "idUserInvitedId")
    UsersGroupDTO toDto(UsersGroup usersGroup);

    @Mapping(source = "idUserOwnerId", target = "idUserOwner")
    @Mapping(source = "idUserInvitedId", target = "idUserInvited")
    UsersGroup toEntity(UsersGroupDTO usersGroupDTO);

    default UsersGroup fromId(Long id) {
        if (id == null) {
            return null;
        }
        UsersGroup usersGroup = new UsersGroup();
        usersGroup.setId(id);
        return usersGroup;
    }
}
