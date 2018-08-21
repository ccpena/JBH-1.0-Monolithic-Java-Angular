package com.kkpa.jbh.service.dto;

import java.time.LocalDate;
import java.io.Serializable;
import java.math.BigDecimal;
import java.util.Objects;

/**
 * A DTO for the MovementesOutgoings entity.
 */
public class MovementesOutgoingsDTO implements Serializable {

    private Long id;

    private BigDecimal totalValue;

    private LocalDate createdAt;

    private LocalDate updatedAt;

    private Long userGroupAccountId;

    private Long subCategoryId;

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public BigDecimal getTotalValue() {
        return totalValue;
    }

    public void setTotalValue(BigDecimal totalValue) {
        this.totalValue = totalValue;
    }

    public LocalDate getCreatedAt() {
        return createdAt;
    }

    public void setCreatedAt(LocalDate createdAt) {
        this.createdAt = createdAt;
    }

    public LocalDate getUpdatedAt() {
        return updatedAt;
    }

    public void setUpdatedAt(LocalDate updatedAt) {
        this.updatedAt = updatedAt;
    }

    public Long getUserGroupAccountId() {
        return userGroupAccountId;
    }

    public void setUserGroupAccountId(Long userGroupAccountId) {
        this.userGroupAccountId = userGroupAccountId;
    }

    public Long getSubCategoryId() {
        return subCategoryId;
    }

    public void setSubCategoryId(Long subCategoriesId) {
        this.subCategoryId = subCategoriesId;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (o == null || getClass() != o.getClass()) {
            return false;
        }

        MovementesOutgoingsDTO movementesOutgoingsDTO = (MovementesOutgoingsDTO) o;
        if (movementesOutgoingsDTO.getId() == null || getId() == null) {
            return false;
        }
        return Objects.equals(getId(), movementesOutgoingsDTO.getId());
    }

    @Override
    public int hashCode() {
        return Objects.hashCode(getId());
    }

    @Override
    public String toString() {
        return "MovementesOutgoingsDTO{" +
            "id=" + getId() +
            ", totalValue=" + getTotalValue() +
            ", createdAt='" + getCreatedAt() + "'" +
            ", updatedAt='" + getUpdatedAt() + "'" +
            ", userGroupAccount=" + getUserGroupAccountId() +
            ", subCategory=" + getSubCategoryId() +
            "}";
    }
}
