package com.shakiroye.projectmanager.controller;

import com.shakiroye.projectmanager.model.Company;
import com.shakiroye.projectmanager.model.User;
import com.shakiroye.projectmanager.service.CompanyService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping(path = "project-manager")
@CrossOrigin
public class CompanyController {
    private final CompanyService companyService;
    @Autowired
    public CompanyController(CompanyService companyService) {
        this.companyService = companyService;
    }

    @GetMapping("/company/all")
    public ResponseEntity<List<Company>> getCompanies(){
        List<Company> companies = companyService.findAllCompanies();
        return new ResponseEntity<>(companies, HttpStatus.OK);
    }

    @GetMapping("/company/find/{id}")
    public ResponseEntity<Company> getCompanyById(@PathVariable("id") Integer id){
        Company company = companyService.findCompanyById(id);
        return new ResponseEntity<>(company, HttpStatus.OK);
    }

    @PostMapping("/{username}/company/add")
    public ResponseEntity<Company> addCompany(@RequestBody Company company, @PathVariable("username") String username){
        Company newCompany = companyService.addCompany(company, username);
        return new ResponseEntity<>(newCompany, HttpStatus.CREATED);
    }

    @PutMapping("/{username}/company/update")
    public ResponseEntity<Company> updateCompany(@RequestBody Company company, @PathVariable("username") String username){
        Company updateCompany = companyService.updateCompany(company, username);
        return new ResponseEntity<>(updateCompany, HttpStatus.OK);
    }

    @DeleteMapping("/{username}/company/delete/{id}")
    public ResponseEntity<?> deleteEmployee(@PathVariable("username") String username,
                                            @PathVariable("id") Integer id){
        companyService.removeCompany(id, username);
        return new ResponseEntity<>(HttpStatus.OK);
    }
}
