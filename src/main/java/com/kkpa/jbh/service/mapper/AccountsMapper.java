package com.kkpa.jbh.service.mapper;

import com.kkpa.jbh.domain.*;
import com.kkpa.jbh.service.dto.AccountsDTO;

import org.mapstruct.*;

/**
 * Mapper for the entity Accounts and its DTO AccountsDTO.
 */
@Mapper(componentModel = "spring", uses = {AccountTypesMapper.class, UsersGroupMapper.class})
public interface AccountsMapper extends EntityMapper<AccountsDTO, Accounts> {

    @Mapping(source = "type.id", target = "typeId")
    @Mapping(source = "idUsrGroup.id", target = "idUsrGroupId")
    AccountsDTO toDto(Accounts accounts);

    @Mapping(source = "typeId", target = "type")
    @Mapping(source = "idUsrGroupId", target = "idUsrGroup")
    Accounts toEntity(AccountsDTO accountsDTO);

    default Accounts fromId(Long id) {
        if (id == null) {
            return null;
        }
        Accounts accounts = new Accounts();
        accounts.setId(id);
        return accounts;
    }
}
