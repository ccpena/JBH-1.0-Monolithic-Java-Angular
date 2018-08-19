package com.kkpa.jbh.domain;

import java.io.Serializable;
import java.time.LocalDate;
import java.util.HashSet;
import java.util.Objects;
import java.util.Set;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.ManyToOne;
import javax.persistence.OneToMany;
import javax.persistence.SequenceGenerator;
import javax.persistence.Table;
import javax.validation.constraints.NotNull;
import javax.validation.constraints.Size;
import org.hibernate.annotations.Cache;
import org.hibernate.annotations.CacheConcurrencyStrategy;
import com.fasterxml.jackson.annotation.JsonIgnoreProperties;

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

  @Column(name = "defined_by_jbh")
  private Boolean definedByJBH;

  @Column(name = "creation_date")
  private LocalDate creationDate;

  @OneToMany(mappedBy = "categories")
  @Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
  private Set<SubCategories> subCategories = new HashSet<>();

  @ManyToOne
  @JsonIgnoreProperties("idCategories")
  private UserGroupCategories userGroupCategories;

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

  public Boolean isDefinedByJBH() {
    return definedByJBH;
  }

  public Categories definedByJBH(Boolean definedByJBH) {
    this.definedByJBH = definedByJBH;
    return this;
  }

  public void setDefinedByJBH(Boolean definedByJBH) {
    this.definedByJBH = definedByJBH;
  }

  public LocalDate getCreationDate() {
    return creationDate;
  }

  public Categories creationDate(LocalDate creationDate) {
    this.creationDate = creationDate;
    return this;
  }

  public void setCreationDate(LocalDate creationDate) {
    this.creationDate = creationDate;
  }

  public Set<SubCategories> getSubCategories() {
    return subCategories;
  }

  public Categories subCategories(Set<SubCategories> subCategories) {
    this.subCategories = subCategories;
    return this;
  }

  public Categories addSubCategory(SubCategories subCategories) {
    this.subCategories.add(subCategories);
    subCategories.setCategories(this);
    return this;
  }

  public Categories removeSubCategory(SubCategories subCategories) {
    this.subCategories.remove(subCategories);
    subCategories.setCategories(null);
    return this;
  }

  public void setSubCategories(Set<SubCategories> subCategories) {
    this.subCategories = subCategories;
  }

  public UserGroupCategories getUserGroupCategories() {
    return userGroupCategories;
  }

  public Categories userGroupCategories(UserGroupCategories userGroupCategories) {
    this.userGroupCategories = userGroupCategories;
    return this;
  }

  public void setUserGroupCategories(UserGroupCategories userGroupCategories) {
    this.userGroupCategories = userGroupCategories;
  }
  // jhipster-needle-entity-add-getters-setters - JHipster will add getters and setters here, do not
  // remove

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
    return "Categories{" + "id=" + getId() + ", name='" + getName() + "'" + ", definedByJBH='"
        + isDefinedByJBH() + "'" + ", creationDate='" + getCreationDate() + "'" + "}";
  }
}
