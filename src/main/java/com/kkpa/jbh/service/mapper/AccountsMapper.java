package com.kkpa.jbh.service.mapper;

import com.kkpa.jbh.domain.*;
import com.kkpa.jbh.service.dto.AccountsDTO;

import org.mapstruct.*;

/**
 * Mapper for the entity Accounts and its DTO AccountsDTO.
 */
@Mapper(componentModel = "spring", uses = {UsersGroupMapper.class})
public interface AccountsMapper extends EntityMapper<AccountsDTO, Accounts> {

    @Mapping(source = "usrGroup.id", target = "usrGroupId")
    AccountsDTO toDto(Accounts accounts);

    @Mapping(source = "usrGroupId", target = "usrGroup")
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
