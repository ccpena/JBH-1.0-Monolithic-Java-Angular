package com.kkpa.jbh.domain;

import org.hibernate.annotations.Cache;
import org.hibernate.annotations.CacheConcurrencyStrategy;

import javax.persistence.*;

import java.io.Serializable;
import java.math.BigDecimal;
import java.time.LocalDate;
import java.util.Objects;

/**
 * A ActiveDebts.
 */
@Entity
@Table(name = "active_debts")
@Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
public class ActiveDebts implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "sequenceGenerator")
    @SequenceGenerator(name = "sequenceGenerator")
    private Long id;

    @Column(name = "total_value", precision = 10, scale = 2)
    private BigDecimal totalValue;

    @Column(name = "created_at")
    private LocalDate createdAt;

    @OneToOne
    @JoinColumn(unique = true)
    private UsersGroup debtor;

    @OneToOne
    @JoinColumn(unique = true)
    private UsersGroup creditor;

    @OneToOne
    @JoinColumn(unique = true)
    private SubCategories subCategory;

    @OneToOne
    @JoinColumn(unique = true)
    private MovementesOutgoings movementOutgoing;

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

    public ActiveDebts totalValue(BigDecimal totalValue) {
        this.totalValue = totalValue;
        return this;
    }

    public void setTotalValue(BigDecimal totalValue) {
        this.totalValue = totalValue;
    }

    public LocalDate getCreatedAt() {
        return createdAt;
    }

    public ActiveDebts createdAt(LocalDate createdAt) {
        this.createdAt = createdAt;
        return this;
    }

    public void setCreatedAt(LocalDate createdAt) {
        this.createdAt = createdAt;
    }

    public UsersGroup getDebtor() {
        return debtor;
    }

    public ActiveDebts debtor(UsersGroup usersGroup) {
        this.debtor = usersGroup;
        return this;
    }

    public void setDebtor(UsersGroup usersGroup) {
        this.debtor = usersGroup;
    }

    public UsersGroup getCreditor() {
        return creditor;
    }

    public ActiveDebts creditor(UsersGroup usersGroup) {
        this.creditor = usersGroup;
        return this;
    }

    public void setCreditor(UsersGroup usersGroup) {
        this.creditor = usersGroup;
    }

    public SubCategories getSubCategory() {
        return subCategory;
    }

    public ActiveDebts subCategory(SubCategories subCategories) {
        this.subCategory = subCategories;
        return this;
    }

    public void setSubCategory(SubCategories subCategories) {
        this.subCategory = subCategories;
    }

    public MovementesOutgoings getMovementOutgoing() {
        return movementOutgoing;
    }

    public ActiveDebts movementOutgoing(MovementesOutgoings movementesOutgoings) {
        this.movementOutgoing = movementesOutgoings;
        return this;
    }

    public void setMovementOutgoing(MovementesOutgoings movementesOutgoings) {
        this.movementOutgoing = movementesOutgoings;
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
        ActiveDebts activeDebts = (ActiveDebts) o;
        if (activeDebts.getId() == null || getId() == null) {
            return false;
        }
        return Objects.equals(getId(), activeDebts.getId());
    }

    @Override
    public int hashCode() {
        return Objects.hashCode(getId());
    }

    @Override
    public String toString() {
        return "ActiveDebts{" +
            "id=" + getId() +
            ", totalValue=" + getTotalValue() +
            ", createdAt='" + getCreatedAt() + "'" +
            "}";
    }
}
