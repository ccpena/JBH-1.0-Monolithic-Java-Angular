package com.kkpa.jbh.service.mapper;

import com.kkpa.jbh.domain.*;
import com.kkpa.jbh.service.dto.AccountTypesDTO;

import org.mapstruct.*;

/**
 * Mapper for the entity AccountTypes and its DTO AccountTypesDTO.
 */
@Mapper(componentModel = "spring", uses = {})
public interface AccountTypesMapper extends EntityMapper<AccountTypesDTO, AccountTypes> {



    default AccountTypes fromId(Long id) {
        if (id == null) {
            return null;
        }
        AccountTypes accountTypes = new AccountTypes();
        accountTypes.setId(id);
        return accountTypes;
    }
}
