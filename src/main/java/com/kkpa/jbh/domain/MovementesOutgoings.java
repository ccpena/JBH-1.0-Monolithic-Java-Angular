package com.kkpa.jbh.domain;

import org.hibernate.annotations.Cache;
import org.hibernate.annotations.CacheConcurrencyStrategy;

import javax.persistence.*;

import java.io.Serializable;
import java.math.BigDecimal;
import java.time.LocalDate;
import java.util.Objects;

/**
 * A MovementesOutgoings.
 */
@Entity
@Table(name = "movementes_outgoings")
@Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
public class MovementesOutgoings implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "sequenceGenerator")
    @SequenceGenerator(name = "sequenceGenerator")
    private Long id;

    @Column(name = "total_value", precision = 10, scale = 2)
    private BigDecimal totalValue;

    @Column(name = "created_at")
    private LocalDate createdAt;

    @Column(name = "updated_at")
    private LocalDate updatedAt;

    @OneToOne
    @JoinColumn(unique = true)
    private UserGroupAccount userGroupAccount;

    @OneToOne
    @JoinColumn(unique = true)
    private SubCategories subCategory;

    // jhipster-needle-entity-add-field - JHipster will add fields here, do not remove
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public BigDecimal getTotalValue() {
        return totalValue;
    }

    public MovementesOutgoings totalValue(BigDecimal totalValue) {
        this.totalValue = totalValue;
        return this;
    }

    public void setTotalValue(BigDecimal totalValue) {
        this.totalValue = totalValue;
    }

    public LocalDate getCreatedAt() {
        return createdAt;
    }

    public MovementesOutgoings createdAt(LocalDate createdAt) {
        this.createdAt = createdAt;
        return this;
    }

    public void setCreatedAt(LocalDate createdAt) {
        this.createdAt = createdAt;
    }

    public LocalDate getUpdatedAt() {
        return updatedAt;
    }

    public MovementesOutgoings updatedAt(LocalDate updatedAt) {
        this.updatedAt = updatedAt;
        return this;
    }

    public void setUpdatedAt(LocalDate updatedAt) {
        this.updatedAt = updatedAt;
    }

    public UserGroupAccount getUserGroupAccount() {
        return userGroupAccount;
    }

    public MovementesOutgoings userGroupAccount(UserGroupAccount userGroupAccount) {
        this.userGroupAccount = userGroupAccount;
        return this;
    }

    public void setUserGroupAccount(UserGroupAccount userGroupAccount) {
        this.userGroupAccount = userGroupAccount;
    }

    public SubCategories getSubCategory() {
        return subCategory;
    }

    public MovementesOutgoings subCategory(SubCategories subCategories) {
        this.subCategory = subCategories;
        return this;
    }

    public void setSubCategory(SubCategories subCategories) {
        this.subCategory = subCategories;
    }
    // jhipster-needle-entity-add-getters-setters - JHipster will add getters and setters here, do not remove

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (o == null || getClass() != o.getClass()) {
            return false;
        }
        MovementesOutgoings movementesOutgoings = (MovementesOutgoings) o;
        if (movementesOutgoings.getId() == null || getId() == null) {
            return false;
        }
        return Objects.equals(getId(), movementesOutgoings.getId());
    }

    @Override
    public int hashCode() {
        return Objects.hashCode(getId());
    }

    @Override
    public String toString() {
        return "MovementesOutgoings{" +
            "id=" + getId() +
            ", totalValue=" + getTotalValue() +
            ", createdAt='" + getCreatedAt() + "'" +
            ", updatedAt='" + getUpdatedAt() + "'" +
            "}";
    }
}
