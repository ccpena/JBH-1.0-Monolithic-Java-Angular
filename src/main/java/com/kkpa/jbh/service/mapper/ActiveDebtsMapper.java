package com.kkpa.jbh.service.mapper;

import com.kkpa.jbh.domain.*;
import com.kkpa.jbh.service.dto.ActiveDebtsDTO;

import org.mapstruct.*;

/**
 * Mapper for the entity ActiveDebts and its DTO ActiveDebtsDTO.
 */
@Mapper(componentModel = "spring", uses = {UsersGroupMapper.class, SubCategoriesMapper.class, MovementesOutgoingsMapper.class})
public interface ActiveDebtsMapper extends EntityMapper<ActiveDebtsDTO, ActiveDebts> {

    @Mapping(source = "debtor.id", target = "debtorId")
    @Mapping(source = "creditor.id", target = "creditorId")
    @Mapping(source = "subCategory.id", target = "subCategoryId")
    @Mapping(source = "movementOutgoing.id", target = "movementOutgoingId")
    ActiveDebtsDTO toDto(ActiveDebts activeDebts);

    @Mapping(source = "debtorId", target = "debtor")
    @Mapping(source = "creditorId", target = "creditor")
    @Mapping(source = "subCategoryId", target = "subCategory")
    @Mapping(source = "movementOutgoingId", target = "movementOutgoing")
    ActiveDebts toEntity(ActiveDebtsDTO activeDebtsDTO);

    default ActiveDebts fromId(Long id) {
        if (id == null) {
            return null;
        }
        ActiveDebts activeDebts = new ActiveDebts();
        activeDebts.setId(id);
        return activeDebts;
    }
}
