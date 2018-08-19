package com.kkpa.jbh.domain;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import org.hibernate.annotations.Cache;
import org.hibernate.annotations.CacheConcurrencyStrategy;

import javax.persistence.*;
import javax.validation.constraints.*;

import java.io.Serializable;
import java.time.LocalDate;
import java.util.Objects;

/**
 * A SubCategories.
 */
@Entity
@Table(name = "sub_categories")
@Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
public class SubCategories implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "sequenceGenerator")
    @SequenceGenerator(name = "sequenceGenerator")
    private Long id;

    @NotNull
    @Size(max = 100)
    @Column(name = "name", length = 100, nullable = false)
    private String name;

    @Column(name = "defined_by_jbh")
    private Boolean definedByJBH;

    @Column(name = "creation_date")
    private LocalDate creationDate;

    @ManyToOne
    @JsonIgnoreProperties("subCategories")
    private Categories categories;

    // jhipster-needle-entity-add-field - JHipster will add fields here, do not remove
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getName() {
        return name;
    }

    public SubCategories name(String name) {
        this.name = name;
        return this;
    }

    public void setName(String name) {
        this.name = name;
    }

    public Boolean isDefinedByJBH() {
        return definedByJBH;
    }

    public SubCategories definedByJBH(Boolean definedByJBH) {
        this.definedByJBH = definedByJBH;
        return this;
    }

    public void setDefinedByJBH(Boolean definedByJBH) {
        this.definedByJBH = definedByJBH;
    }

    public LocalDate getCreationDate() {
        return creationDate;
    }

    public SubCategories creationDate(LocalDate creationDate) {
        this.creationDate = creationDate;
        return this;
    }

    public void setCreationDate(LocalDate creationDate) {
        this.creationDate = creationDate;
    }

    public Categories getCategories() {
        return categories;
    }

    public SubCategories categories(Categories categories) {
        this.categories = categories;
        return this;
    }

    public void setCategories(Categories categories) {
        this.categories = categories;
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
        SubCategories subCategories = (SubCategories) o;
        if (subCategories.getId() == null || getId() == null) {
            return false;
        }
        return Objects.equals(getId(), subCategories.getId());
    }

    @Override
    public int hashCode() {
        return Objects.hashCode(getId());
    }

    @Override
    public String toString() {
        return "SubCategories{" +
            "id=" + getId() +
            ", name='" + getName() + "'" +
            ", definedByJBH='" + isDefinedByJBH() + "'" +
            ", creationDate='" + getCreationDate() + "'" +
            "}";
    }
}
