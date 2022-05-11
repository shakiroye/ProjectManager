package com.shakiroye.projectmanager.model;

import com.sun.istack.NotNull;

import javax.persistence.*;
import java.util.Date;

@Entity
@Table
public class UserLog {
    private static final long serialVersionUID = 1L;
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Basic(optional = false)
    @Column(name = "id_user_log")
    private Integer idUserLog;
    @Basic(optional = false)
    @NotNull
    @Column(name = "username", length = 20)
    private String username;
    @Basic(optional = false)
    @NotNull
    @Column(name = "ip_address", length = 20)
    private String ipAddress;
    @Basic(optional = false)
    @NotNull
    @Column(name = "status")
    private Character status;
    @Column(name = "log_date")
    @Temporal(TemporalType.TIMESTAMP)
    private Date logDate;

    public UserLog() {
    }

    public UserLog(Integer idUserLog, String username, String ipAddress, Character status, Date logDate) {
        this.idUserLog = idUserLog;
        this.username = username;
        this.ipAddress = ipAddress;
        this.status = status;
        this.logDate = logDate;
    }

    public Integer getIdUserLog() {
        return idUserLog;
    }

    public void setIdUserLog(Integer idUserLog) {
        this.idUserLog = idUserLog;
    }

    public String getUsername() {
        return username;
    }

    public void setUsername(String username) {
        this.username = username;
    }

    public String getIpAddress() {
        return ipAddress;
    }

    public void setIpAddress(String ipAddress) {
        this.ipAddress = ipAddress;
    }

    public Character getStatus() {
        return status;
    }

    public void setStatus(Character status) {
        this.status = status;
    }

    public Date getLogDate() {
        return logDate;
    }

    public void setLogDate(Date logDate) {
        this.logDate = logDate;
    }

    @Override
    public String toString() {
        return "UserLog{" +
                "idUserLog=" + idUserLog +
                ", username='" + username + '\'' +
                ", ipAddress='" + ipAddress + '\'' +
                ", status=" + status +
                ", logDate=" + logDate +
                '}';
    }
}
