package com.shakiroye.projectmanager.model;

import com.fasterxml.jackson.annotation.JsonProperty;
import com.sun.istack.Nullable;

import javax.persistence.*;
import java.util.ArrayList;
import java.util.Collections;
import java.util.List;

@Entity
@Table
public class Company {
    @Id
    @Column(name = "id_company",nullable = false)
    @GeneratedValue(
            strategy = GenerationType.IDENTITY
    )
    private Integer idCompany;
    @Column(
            name = "company_name",
            nullable = false
    )
    private String companyName;
    @OneToMany(cascade = CascadeType.ALL, mappedBy = "company")
    private List<Project> projects;

    public Company() {
    }

    public Company(Integer idCompany, String companyName) {
        this.idCompany = idCompany;
        this.companyName = companyName;
    }

    public Integer getIdCompany() {
        return idCompany;
    }

    public void setIdCompany(Integer idCompany) {
        this.idCompany = idCompany;
    }

    public String getCompanyName() {
        return companyName;
    }

    public void setCompanyName(String companyName) {
        this.companyName = companyName;
    }

    public ArrayList<Project> getProjects(){
        ArrayList<Project> allProjects = new ArrayList<Project>();
            for (Project project : projects){
                    allProjects.add(project) ;
            }
        return allProjects;
    }

    public void setProjects(List<Project> projects) {
        this.projects = projects;
    }

    @Override
    public String toString() {
        return "Company{" +
                "idCompany=" + idCompany +
                ", companyName='" + companyName + '\'' +
                '}';
    }
}
