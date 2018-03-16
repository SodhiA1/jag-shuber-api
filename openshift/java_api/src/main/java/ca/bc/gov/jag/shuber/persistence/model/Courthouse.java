package ca.bc.gov.jag.shuber.persistence.model;

import java.io.Serializable;
import java.util.ArrayList;
import java.util.Date;
import java.util.List;
import java.util.UUID;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.GeneratedValue;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.OneToMany;
import javax.persistence.OneToOne;
import javax.persistence.PrimaryKeyJoinColumn;
import javax.persistence.Table;
import javax.validation.constraints.NotEmpty;
import javax.validation.constraints.NotNull;
import javax.validation.constraints.Size;

import org.hibernate.annotations.GenericGenerator;
import org.hibernate.annotations.Parameter;

import ca.bc.gov.jag.shuber.persistence.AbstractAuditableVersionable;

/**
 * Courthouse generated by Hibernate Tools hbm2java.
 *
 * <p>Domain model for database table courthouse.
 *
 * @author hbm2java
 * @version 352
 */
@Entity
@Table(name = "courthouse"
    // ,schema="shersched"
)
public class Courthouse extends AbstractAuditableVersionable implements Serializable {

    /** UID. */
    private static final long serialVersionUID = 1L;

    @GenericGenerator(
        name = "generator",
        strategy = "foreign",
        parameters = @Parameter(name = "property", value = "location")
    )
    @Id
    @GeneratedValue(generator = "generator")
    @Column(name = "location_id", nullable = false, updatable = false)
    private UUID locationId;

    @NotNull
    @OneToOne(fetch = FetchType.EAGER)
    @PrimaryKeyJoinColumn
    private Location location;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "region_location_id")
    private Region region;

    @NotEmpty
    @Size(min = 1, max = 255)
    @Column(name = "courthouse_type_code", nullable = false)
    private String courthouseTypeCode;

    @NotNull
    @Column(name = "org_unit_id", nullable = false)
    private UUID orgUnitId;

    @Column(name = "geometry")
    private UUID geometry;

    //@JsonIgnore
    @OneToMany(fetch = FetchType.LAZY, mappedBy = "courthouse")
    private List<Courtroom> courtrooms = new ArrayList<Courtroom>(0);

    //@JsonIgnore
    @OneToMany(fetch = FetchType.LAZY, mappedBy = "courthouse")
    private List<Shift> shifts = new ArrayList<Shift>(0);

    //@JsonIgnore
    @OneToMany(fetch = FetchType.LAZY, mappedBy = "courthouse")
    private List<Sheriff> sheriffs = new ArrayList<Sheriff>(0);

    //@JsonIgnore
    @OneToMany(fetch = FetchType.LAZY, mappedBy = "courthouse")
    private List<AssignmentStream> assignmentStreams = new ArrayList<AssignmentStream>(0);
    
    /** No args constructor. */
    public Courthouse() {}

    /** Required args constructor. */
    public Courthouse(
            Location location,
            String courthouseTypeCode,
            UUID orgUnitId,
            String createdBy,
            String updatedBy,
            Date createdDtm,
            Date updatedDtm,
            long revisionCount) {
        this.location = location;
        this.courthouseTypeCode = courthouseTypeCode;
        this.orgUnitId = orgUnitId;
        this.createdBy = createdBy;
        this.updatedBy = updatedBy;
        this.createdDtm = createdDtm;
        this.updatedDtm = updatedDtm;
        this.revisionCount = revisionCount;
    }

    /** All args constructor. */
    public Courthouse(
            Location location,
            Region region,
            String courthouseTypeCode,
            UUID orgUnitId,
            UUID geometry,
            String createdBy,
            String updatedBy,
            Date createdDtm,
            Date updatedDtm,
            long revisionCount,
            List<Courtroom> courtrooms,
            List<Shift> shifts,
            List<Sheriff> sheriffs,
            List<AssignmentStream> assignmentStreams) {
        this.location = location;
        this.region = region;
        this.courthouseTypeCode = courthouseTypeCode;
        this.orgUnitId = orgUnitId;
        this.geometry = geometry;
        this.createdBy = createdBy;
        this.updatedBy = updatedBy;
        this.createdDtm = createdDtm;
        this.updatedDtm = updatedDtm;
        this.revisionCount = revisionCount;
        this.courtrooms = courtrooms;
        this.shifts = shifts;
        this.sheriffs = sheriffs;
        this.assignmentStreams = assignmentStreams;
    }

    public UUID getLocationId() {
        return this.locationId;
    }

    public void setLocationId(UUID locationId) {
        this.locationId = locationId;
    }

    public Location getLocation() {
        return this.location;
    }

    public void setLocation(Location location) {
        this.location = location;
    }

    public Region getRegion() {
        return this.region;
    }

    public void setRegion(Region region) {
        this.region = region;
    }

    public String getCourthouseTypeCode() {
        return this.courthouseTypeCode;
    }

    public void setCourthouseTypeCode(String courthouseTypeCode) {
        this.courthouseTypeCode = courthouseTypeCode;
    }

    public UUID getOrgUnitId() {
        return this.orgUnitId;
    }

    public void setOrgUnitId(UUID orgUnitId) {
        this.orgUnitId = orgUnitId;
    }

    public UUID getGeometry() {
        return this.geometry;
    }

    public void setGeometry(UUID geometry) {
        this.geometry = geometry;
    }

    public List<Courtroom> getCourtrooms() {
        return this.courtrooms;
    }

    public void setCourtrooms(List<Courtroom> courtrooms) {
        this.courtrooms = courtrooms;
    }

    public List<Shift> getShifts() {
        return this.shifts;
    }

    public void setShifts(List<Shift> shifts) {
        this.shifts = shifts;
    }

    public List<Sheriff> getSheriffs() {
        return this.sheriffs;
    }

    public void setSheriffs(List<Sheriff> sheriffs) {
        this.sheriffs = sheriffs;
    }

    public List<AssignmentStream> getAssignmentStreams() {
        return this.assignmentStreams;
    }

    public void setAssignmentStreams(List<AssignmentStream> assignmentStreams) {
        this.assignmentStreams = assignmentStreams;
    }
}
