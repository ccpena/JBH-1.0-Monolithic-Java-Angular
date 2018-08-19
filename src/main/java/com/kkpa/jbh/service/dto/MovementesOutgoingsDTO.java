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

    private LocalDate createDate;

    private Long idUserGroupId;

    private Long idSubCategoryId;

    private Long paymentMethodId;

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

    public LocalDate getCreateDate() {
        return createDate;
    }

    public void setCreateDate(LocalDate createDate) {
        this.createDate = createDate;
    }

    public Long getIdUserGroupId() {
        return idUserGroupId;
    }

    public void setIdUserGroupId(Long usersGroupId) {
        this.idUserGroupId = usersGroupId;
    }

    public Long getIdSubCategoryId() {
        return idSubCategoryId;
    }

    public void setIdSubCategoryId(Long subCategoriesId) {
        this.idSubCategoryId = subCategoriesId;
    }

    public Long getPaymentMethodId() {
        return paymentMethodId;
    }

    public void setPaymentMethodId(Long accountsId) {
        this.paymentMethodId = accountsId;
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
            ", createDate='" + getCreateDate() + "'" +
            ", idUserGroup=" + getIdUserGroupId() +
            ", idSubCategory=" + getIdSubCategoryId() +
            ", paymentMethod=" + getPaymentMethodId() +
            "}";
    }
}
