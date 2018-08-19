package com.kkpa.jbh.domain;

import org.hibernate.annotations.Cache;
import org.hibernate.annotations.CacheConcurrencyStrategy;

import javax.persistence.*;

import java.io.Serializable;
import java.util.Objects;

/**
 * A AccountTypes.
 */
@Entity
@Table(name = "account_types")
@Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
public class AccountTypes implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "sequenceGenerator")
    @SequenceGenerator(name = "sequenceGenerator")
    private Long id;

    @Column(name = "description")
    private String description;

    @Column(name = "defined_by_jbh")
    private Boolean definedByJBH;

    // jhipster-needle-entity-add-field - JHipster will add fields here, do not remove
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getDescription() {
        return description;
    }

    public AccountTypes description(String description) {
        this.description = description;
        return this;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public Boolean isDefinedByJBH() {
        return definedByJBH;
    }

    public AccountTypes definedByJBH(Boolean definedByJBH) {
        this.definedByJBH = definedByJBH;
        return this;
    }

    public void setDefinedByJBH(Boolean definedByJBH) {
        this.definedByJBH = definedByJBH;
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
        AccountTypes accountTypes = (AccountTypes) o;
        if (accountTypes.getId() == null || getId() == null) {
            return false;
        }
        return Objects.equals(getId(), accountTypes.getId());
    }

    @Override
    public int hashCode() {
        return Objects.hashCode(getId());
    }

    @Override
    public String toString() {
        return "AccountTypes{" +
            "id=" + getId() +
            ", description='" + getDescription() + "'" +
            ", definedByJBH='" + isDefinedByJBH() + "'" +
            "}";
    }
}
