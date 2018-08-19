package com.kkpa.jbh.service.mapper;

import com.kkpa.jbh.domain.*;
import com.kkpa.jbh.service.dto.ActiveDebtsDTO;

import org.mapstruct.*;

/**
 * Mapper for the entity ActiveDebts and its DTO ActiveDebtsDTO.
 */
@Mapper(componentModel = "spring", uses = {UsersGroupMapper.class, SubCategoriesMapper.class, MovementesOutgoingsMapper.class})
public interface ActiveDebtsMapper extends EntityMapper<ActiveDebtsDTO, ActiveDebts> {

    @Mapping(source = "idDebtor.id", target = "idDebtorId")
    @Mapping(source = "idCreditor.id", target = "idCreditorId")
    @Mapping(source = "idSubCategory.id", target = "idSubCategoryId")
    @Mapping(source = "idMovementOutgoing.id", target = "idMovementOutgoingId")
    ActiveDebtsDTO toDto(ActiveDebts activeDebts);

    @Mapping(source = "idDebtorId", target = "idDebtor")
    @Mapping(source = "idCreditorId", target = "idCreditor")
    @Mapping(source = "idSubCategoryId", target = "idSubCategory")
    @Mapping(source = "idMovementOutgoingId", target = "idMovementOutgoing")
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
