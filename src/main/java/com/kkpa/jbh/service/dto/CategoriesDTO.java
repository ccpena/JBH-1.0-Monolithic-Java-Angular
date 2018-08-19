package com.kkpa.jbh.service.dto;

import java.time.LocalDate;
import javax.validation.constraints.*;
import java.io.Serializable;
import java.util.Objects;

/**
 * A DTO for the Categories entity.
 */
public class CategoriesDTO implements Serializable {

    private Long id;

    @NotNull
    @Size(max = 100)
    private String name;

    private Boolean definedByJBH;

    private LocalDate creationDate;

    private Long userGroupCategoriesId;

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public Boolean isDefinedByJBH() {
        return definedByJBH;
    }

    public void setDefinedByJBH(Boolean definedByJBH) {
        this.definedByJBH = definedByJBH;
    }

    public LocalDate getCreationDate() {
        return creationDate;
    }

    public void setCreationDate(LocalDate creationDate) {
        this.creationDate = creationDate;
    }

    public Long getUserGroupCategoriesId() {
        return userGroupCategoriesId;
    }

    public void setUserGroupCategoriesId(Long userGroupCategoriesId) {
        this.userGroupCategoriesId = userGroupCategoriesId;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (o == null || getClass() != o.getClass()) {
            return false;
        }

        CategoriesDTO categoriesDTO = (CategoriesDTO) o;
        if (categoriesDTO.getId() == null || getId() == null) {
            return false;
        }
        return Objects.equals(getId(), categoriesDTO.getId());
    }

    @Override
    public int hashCode() {
        return Objects.hashCode(getId());
    }

    @Override
    public String toString() {
        return "CategoriesDTO{" +
            "id=" + getId() +
            ", name='" + getName() + "'" +
            ", definedByJBH='" + isDefinedByJBH() + "'" +
            ", creationDate='" + getCreationDate() + "'" +
            ", userGroupCategories=" + getUserGroupCategoriesId() +
            "}";
    }
}
