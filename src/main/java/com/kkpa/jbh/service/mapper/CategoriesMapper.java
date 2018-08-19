package com.kkpa.jbh.service.mapper;

import com.kkpa.jbh.domain.*;
import com.kkpa.jbh.service.dto.CategoriesDTO;

import org.mapstruct.*;

/**
 * Mapper for the entity Categories and its DTO CategoriesDTO.
 */
@Mapper(componentModel = "spring", uses = {UserGroupCategoriesMapper.class})
public interface CategoriesMapper extends EntityMapper<CategoriesDTO, Categories> {

    @Mapping(source = "userGroupCategories.id", target = "userGroupCategoriesId")
    CategoriesDTO toDto(Categories categories);

    @Mapping(target = "subCategories", ignore = true)
    @Mapping(source = "userGroupCategoriesId", target = "userGroupCategories")
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
