package com.kkpa.jbh.service.mapper;

import com.kkpa.jbh.domain.*;
import com.kkpa.jbh.service.dto.CategoriesDTO;

import org.mapstruct.*;

/**
 * Mapper for the entity Categories and its DTO CategoriesDTO.
 */
@Mapper(componentModel = "spring", uses = {})
public interface CategoriesMapper extends EntityMapper<CategoriesDTO, Categories> {


    @Mapping(target = "subCategories", ignore = true)
    Categories toEntity(CategoriesDTO categoriesDTO);

    default Categories fromId(Long id) {
        if (id == null) {
            return null;
        }
        Categories categories = new Categories();
        categories.setId(id);
        return categories;
    }
}
