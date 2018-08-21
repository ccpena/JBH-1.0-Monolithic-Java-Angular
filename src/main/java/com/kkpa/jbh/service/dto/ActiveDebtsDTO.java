package com.kkpa.jbh.service.dto;

import java.time.LocalDate;
import java.io.Serializable;
import java.math.BigDecimal;
import java.util.Objects;

/**
 * A DTO for the ActiveDebts entity.
 */
public class ActiveDebtsDTO implements Serializable {

    private Long id;

    private BigDecimal totalValue;

    private LocalDate createdAt;

    private Long debtorId;

    private Long creditorId;

    private Long subCategoryId;

    private Long movementOutgoingId;

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

    public Long getDebtorId() {
        return debtorId;
    }

    public void setDebtorId(Long usersGroupId) {
        this.debtorId = usersGroupId;
    }

    public Long getCreditorId() {
        return creditorId;
    }

    public void setCreditorId(Long usersGroupId) {
        this.creditorId = usersGroupId;
    }

    public Long getSubCategoryId() {
        return subCategoryId;
    }

    public void setSubCategoryId(Long subCategoriesId) {
        this.subCategoryId = subCategoriesId;
    }

    public Long getMovementOutgoingId() {
        return movementOutgoingId;
    }

    public void setMovementOutgoingId(Long movementesOutgoingsId) {
        this.movementOutgoingId = movementesOutgoingsId;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (o == null || getClass() != o.getClass()) {
            return false;
        }

        ActiveDebtsDTO activeDebtsDTO = (ActiveDebtsDTO) o;
        if (activeDebtsDTO.getId() == null || getId() == null) {
            return false;
        }
        return Objects.equals(getId(), activeDebtsDTO.getId());
    }

    @Override
    public int hashCode() {
        return Objects.hashCode(getId());
    }

    @Override
    public String toString() {
        return "ActiveDebtsDTO{" +
            "id=" + getId() +
            ", totalValue=" + getTotalValue() +
            ", createdAt='" + getCreatedAt() + "'" +
            ", debtor=" + getDebtorId() +
            ", creditor=" + getCreditorId() +
            ", subCategory=" + getSubCategoryId() +
            ", movementOutgoing=" + getMovementOutgoingId() +
            "}";
    }
}
