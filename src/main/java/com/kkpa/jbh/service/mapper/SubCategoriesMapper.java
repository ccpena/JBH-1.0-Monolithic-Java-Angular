package com.kkpa.jbh.service.mapper;

import com.kkpa.jbh.domain.*;
import com.kkpa.jbh.service.dto.SubCategoriesDTO;

import org.mapstruct.*;

/**
 * Mapper for the entity SubCategories and its DTO SubCategoriesDTO.
 */
@Mapper(componentModel = "spring", uses = {CategoriesMapper.class})
public interface SubCategoriesMapper extends EntityMapper<SubCategoriesDTO, SubCategories> {

    @Mapping(source = "category.id", target = "categoryId")
    SubCategoriesDTO toDto(SubCategories subCategories);

    @Mapping(source = "categoryId", target = "category")
    SubCategories toEntity(SubCategoriesDTO subCategoriesDTO);

    default SubCategories fromId(Long id) {
        if (id == null) {
            return null;
        }
        SubCategories subCategories = new SubCategories();
        subCategories.setId(id);
        return subCategories;
    }
}
