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

    private BigDecimal value;

    private LocalDate createDate;

    private Long idDebtorId;

    private Long idCreditorId;

    private Long idSubCategoryId;

    private Long idMovementOutgoingId;

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public BigDecimal getValue() {
        return value;
    }

    public void setValue(BigDecimal value) {
        this.value = value;
    }

    public LocalDate getCreateDate() {
        return createDate;
    }

    public void setCreateDate(LocalDate createDate) {
        this.createDate = createDate;
    }

    public Long getIdDebtorId() {
        return idDebtorId;
    }

    public void setIdDebtorId(Long usersGroupId) {
        this.idDebtorId = usersGroupId;
    }

    public Long getIdCreditorId() {
        return idCreditorId;
    }

    public void setIdCreditorId(Long usersGroupId) {
        this.idCreditorId = usersGroupId;
    }

    public Long getIdSubCategoryId() {
        return idSubCategoryId;
    }

    public void setIdSubCategoryId(Long subCategoriesId) {
        this.idSubCategoryId = subCategoriesId;
    }

    public Long getIdMovementOutgoingId() {
        return idMovementOutgoingId;
    }

    public void setIdMovementOutgoingId(Long movementesOutgoingsId) {
        this.idMovementOutgoingId = movementesOutgoingsId;
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
            ", value=" + getValue() +
            ", createDate='" + getCreateDate() + "'" +
            ", idDebtor=" + getIdDebtorId() +
            ", idCreditor=" + getIdCreditorId() +
            ", idSubCategory=" + getIdSubCategoryId() +
            ", idMovementOutgoing=" + getIdMovementOutgoingId() +
            "}";
    }
}
