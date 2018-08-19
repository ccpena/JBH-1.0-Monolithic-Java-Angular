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

    @Column(name = "create_date")
    private LocalDate createDate;

    @OneToOne
    @JoinColumn(unique = true)
    private UsersGroup idUserGroup;

    @OneToOne
    @JoinColumn(unique = true)
    private SubCategories idSubCategory;

    @OneToOne
    @JoinColumn(unique = true)
    private Accounts paymentMethod;

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

    public LocalDate getCreateDate() {
        return createDate;
    }

    public MovementesOutgoings createDate(LocalDate createDate) {
        this.createDate = createDate;
        return this;
    }

    public void setCreateDate(LocalDate createDate) {
        this.createDate = createDate;
    }

    public UsersGroup getIdUserGroup() {
        return idUserGroup;
    }

    public MovementesOutgoings idUserGroup(UsersGroup usersGroup) {
        this.idUserGroup = usersGroup;
        return this;
    }

    public void setIdUserGroup(UsersGroup usersGroup) {
        this.idUserGroup = usersGroup;
    }

    public SubCategories getIdSubCategory() {
        return idSubCategory;
    }

    public MovementesOutgoings idSubCategory(SubCategories subCategories) {
        this.idSubCategory = subCategories;
        return this;
    }

    public void setIdSubCategory(SubCategories subCategories) {
        this.idSubCategory = subCategories;
    }

    public Accounts getPaymentMethod() {
        return paymentMethod;
    }

    public MovementesOutgoings paymentMethod(Accounts accounts) {
        this.paymentMethod = accounts;
        return this;
    }

    public void setPaymentMethod(Accounts accounts) {
        this.paymentMethod = accounts;
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
            ", createDate='" + getCreateDate() + "'" +
            "}";
    }
}
