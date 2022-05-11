package com.shakiroye.projectmanager.service;

import com.shakiroye.projectmanager.model.Company;
import com.shakiroye.projectmanager.model.Project;
import com.shakiroye.projectmanager.model.User;
import com.shakiroye.projectmanager.repository.CompanyRepo;
import com.shakiroye.projectmanager.repository.UserRepo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

@Service
public class CompanyService {
    private final CompanyRepo companyRepo;
    private final UserRepo userRepo;
    @Autowired
    public CompanyService(CompanyRepo companyRepo, UserRepo userRepo) {
        this.companyRepo = companyRepo;
        this.userRepo = userRepo;
    }

    public List<Company> findAllCompanies(){
        return companyRepo.findAll();
    }

    public Company findCompanyById(Integer companyId){
        return companyRepo.findById(companyId)
                .orElseThrow(() -> new IllegalStateException("La compagnie avec l'id "+companyId+" n'existe pas"));
    }

    public Company addCompany(Company company, String actionUsername){
        Optional<User> userOptional = userRepo.findById(actionUsername);
        List<Project> projects = new ArrayList<>();

        if (!userOptional.get().isAdmin()){
            throw new IllegalStateException("Vous n'avez pas les droits d'admin");
        }else{
            company.setProjects(projects);
            companyRepo.save(company);
        }
        return company;
    }

    public void removeCompany(Integer companyId, String actionUsername){
        Optional<User> userOptional = userRepo.findById(actionUsername);
        Optional<Company> companyOptional = companyRepo.findById(companyId);

        if (!userOptional.get().isAdmin()){
            throw new IllegalStateException("Vous n'avez pas les droits d'admin");
        }
        boolean exists = companyRepo.existsById(companyId);
        if(!exists){
            throw new IllegalStateException("La compagnie avec l'id " + companyId + " n'existe pas");
        }else{
            if (companyOptional.get().getProjects().isEmpty()
                    || companyOptional.get().getProjects() == null){
                companyRepo.deleteById(companyId);
            }else{
                throw new IllegalStateException("La compagnie a des projets. Elle ne peut pas être supprimée");
            }
        }

    }

    public Company updateCompany(Company company, String actionUsername){
        Optional<User> userOptional = userRepo.findById(actionUsername);
        Optional<Company> companyOptional = companyRepo.findById(company.getIdCompany());

        if (!userOptional.get().isAdmin()){
            throw new IllegalStateException("Vous n'avez pas les droits d'admin");
        }else{
            company.setProjects(companyOptional.get().getProjects());
            companyRepo.save(company);
        }
        return company;
    }


}
