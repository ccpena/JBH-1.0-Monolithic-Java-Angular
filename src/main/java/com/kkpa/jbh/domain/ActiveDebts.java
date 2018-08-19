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

    @Column(name = "jhi_value", precision = 10, scale = 2)
    private BigDecimal value;

    @Column(name = "create_date")
    private LocalDate createDate;

    @OneToOne
    @JoinColumn(unique = true)
    private UsersGroup idDebtor;

    @OneToOne
    @JoinColumn(unique = true)
    private UsersGroup idCreditor;

    @OneToOne
    @JoinColumn(unique = true)
    private SubCategories idSubCategory;

    @OneToOne
    @JoinColumn(unique = true)
    private MovementesOutgoings idMovementOutgoing;

    // jhipster-needle-entity-add-field - JHipster will add fields here, do not remove
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public BigDecimal getValue() {
        return value;
    }

    public ActiveDebts value(BigDecimal value) {
        this.value = value;
        return this;
    }

    public void setValue(BigDecimal value) {
        this.value = value;
    }

    public LocalDate getCreateDate() {
        return createDate;
    }

    public ActiveDebts createDate(LocalDate createDate) {
        this.createDate = createDate;
        return this;
    }

    public void setCreateDate(LocalDate createDate) {
        this.createDate = createDate;
    }

    public UsersGroup getIdDebtor() {
        return idDebtor;
    }

    public ActiveDebts idDebtor(UsersGroup usersGroup) {
        this.idDebtor = usersGroup;
        return this;
    }

    public void setIdDebtor(UsersGroup usersGroup) {
        this.idDebtor = usersGroup;
    }

    public UsersGroup getIdCreditor() {
        return idCreditor;
    }

    public ActiveDebts idCreditor(UsersGroup usersGroup) {
        this.idCreditor = usersGroup;
        return this;
    }

    public void setIdCreditor(UsersGroup usersGroup) {
        this.idCreditor = usersGroup;
    }

    public SubCategories getIdSubCategory() {
        return idSubCategory;
    }

    public ActiveDebts idSubCategory(SubCategories subCategories) {
        this.idSubCategory = subCategories;
        return this;
    }

    public void setIdSubCategory(SubCategories subCategories) {
        this.idSubCategory = subCategories;
    }

    public MovementesOutgoings getIdMovementOutgoing() {
        return idMovementOutgoing;
    }

    public ActiveDebts idMovementOutgoing(MovementesOutgoings movementesOutgoings) {
        this.idMovementOutgoing = movementesOutgoings;
        return this;
    }

    public void setIdMovementOutgoing(MovementesOutgoings movementesOutgoings) {
        this.idMovementOutgoing = movementesOutgoings;
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
            ", value=" + getValue() +
            ", createDate='" + getCreateDate() + "'" +
            "}";
    }
}
