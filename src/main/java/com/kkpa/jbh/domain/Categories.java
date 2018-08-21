package com.kkpa.jbh.domain;

import com.fasterxml.jackson.annotation.JsonIgnore;
import org.hibernate.annotations.Cache;
import org.hibernate.annotations.CacheConcurrencyStrategy;

import javax.persistence.*;
import javax.validation.constraints.*;

import java.io.Serializable;
import java.time.LocalDate;
import java.util.HashSet;
import java.util.Set;
import java.util.Objects;

/**
 * A Categories.
 */
@Entity
@Table(name = "categories")
@Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
public class Categories implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "sequenceGenerator")
    @SequenceGenerator(name = "sequenceGenerator")
    private Long id;

    @NotNull
    @Size(max = 100)
    @Column(name = "name", length = 100, nullable = false)
    private String name;

    @Column(name = "by_default")
    private Boolean byDefault;

    @Column(name = "created_at")
    private LocalDate createdAt;

    @Column(name = "updated_at")
    private LocalDate updatedAt;

    @OneToMany(mappedBy = "category")
    @Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
    private Set<SubCategories> subCategories = new HashSet<>();

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

    public Categories name(String name) {
        this.name = name;
        return this;
    }

    public void setName(String name) {
        this.name = name;
    }

    public Boolean isByDefault() {
        return byDefault;
    }

    public Categories byDefault(Boolean byDefault) {
        this.byDefault = byDefault;
        return this;
    }

    public void setByDefault(Boolean byDefault) {
        this.byDefault = byDefault;
    }

    public LocalDate getCreatedAt() {
        return createdAt;
    }

    public Categories createdAt(LocalDate createdAt) {
        this.createdAt = createdAt;
        return this;
    }

    public void setCreatedAt(LocalDate createdAt) {
        this.createdAt = createdAt;
    }

    public LocalDate getUpdatedAt() {
        return updatedAt;
    }

    public Categories updatedAt(LocalDate updatedAt) {
        this.updatedAt = updatedAt;
        return this;
    }

    public void setUpdatedAt(LocalDate updatedAt) {
        this.updatedAt = updatedAt;
    }

    public Set<SubCategories> getSubCategories() {
        return subCategories;
    }

    public Categories subCategories(Set<SubCategories> subCategories) {
        this.subCategories = subCategories;
        return this;
    }

    public Categories addSubCategories(SubCategories subCategories) {
        this.subCategories.add(subCategories);
        subCategories.setCategory(this);
        return this;
    }

    public Categories removeSubCategories(SubCategories subCategories) {
        this.subCategories.remove(subCategories);
        subCategories.setCategory(null);
        return this;
    }

    public void setSubCategories(Set<SubCategories> subCategories) {
        this.subCategories = subCategories;
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
        Categories categories = (Categories) o;
        if (categories.getId() == null || getId() == null) {
            return false;
        }
        return Objects.equals(getId(), categories.getId());
    }

    @Override
    public int hashCode() {
        return Objects.hashCode(getId());
    }

    @Override
    public String toString() {
        return "Categories{" +
            "id=" + getId() +
            ", name='" + getName() + "'" +
            ", byDefault='" + isByDefault() + "'" +
            ", createdAt='" + getCreatedAt() + "'" +
            ", updatedAt='" + getUpdatedAt() + "'" +
            "}";
    }
}
