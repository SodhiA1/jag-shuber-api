package ca.bc.gov.jag.shuber.persistence.model;

import ca.bc.gov.jag.shuber.persistence.AbstractAuditableVersionable;
import java.io.Serializable;
import java.util.Date;
import javax.persistence.AttributeOverride;
import javax.persistence.AttributeOverrides;
import javax.persistence.Column;
import javax.persistence.EmbeddedId;
import javax.persistence.Entity;
import javax.persistence.Table;
import javax.persistence.Temporal;
import javax.persistence.TemporalType;
import javax.validation.constraints.NotEmpty;
import javax.validation.constraints.NotNull;
import javax.validation.constraints.Size;

/**
 * DaysBitmapCode generated by Hibernate Tools hbm2java.
 *
 * <p>Domain model for database table days_bitmap_code.
 *
 * @author hbm2java
 * @version 344
 */
@Entity
@Table(name = "days_bitmap_code"
    // ,schema="shersched"
)
public class DaysBitmapCode extends AbstractAuditableVersionable implements Serializable {

    /** UID. */
    private static final long serialVersionUID = 1L;

    @EmbeddedId
    @AttributeOverrides({
        @AttributeOverride(
            name = "bitmapSet",
            column = @Column(name = "bitmap_set", nullable = false, updatable = false, length = 50)
        ),
        @AttributeOverride(
            name = "daySequence",
            column = @Column(name = "day_sequence", nullable = false, updatable = false)
        )
    })
    private DaysBitmapCodeId id;

    @NotEmpty
    @Size(min = 1, max = 50)
    @Column(name = "day_label", nullable = false, length = 50)
    private String dayLabel;

    @NotNull
    @Column(name = "bitmap_value", nullable = false)
    private long bitmapValue;

    @NotEmpty
    @Size(min = 1, max = 200)
    @Column(name = "description", nullable = false, length = 200)
    private String description;

    @NotNull
    @Temporal(TemporalType.DATE)
    @Column(name = "effective_date", nullable = false, length = 13)
    private Date effectiveDate;

    @Temporal(TemporalType.DATE)
    @Column(name = "expiry_date", length = 13)
    private Date expiryDate;
    /** No args constructor. */
    public DaysBitmapCode() {}

    /** Required args constructor. */
    public DaysBitmapCode(
            DaysBitmapCodeId id,
            String dayLabel,
            long bitmapValue,
            String description,
            Date effectiveDate,
            String createdBy,
            String updatedBy,
            Date createdDtm,
            Date updatedDtm,
            long revisionCount) {
        this.id = id;
        this.dayLabel = dayLabel;
        this.bitmapValue = bitmapValue;
        this.description = description;
        this.effectiveDate = effectiveDate;
        this.createdBy = createdBy;
        this.updatedBy = updatedBy;
        this.createdDtm = createdDtm;
        this.updatedDtm = updatedDtm;
        this.revisionCount = revisionCount;
    }

    /** All args constructor. */
    public DaysBitmapCode(
            DaysBitmapCodeId id,
            String dayLabel,
            long bitmapValue,
            String description,
            Date effectiveDate,
            Date expiryDate,
            String createdBy,
            String updatedBy,
            Date createdDtm,
            Date updatedDtm,
            long revisionCount) {
        this.id = id;
        this.dayLabel = dayLabel;
        this.bitmapValue = bitmapValue;
        this.description = description;
        this.effectiveDate = effectiveDate;
        this.expiryDate = expiryDate;
        this.createdBy = createdBy;
        this.updatedBy = updatedBy;
        this.createdDtm = createdDtm;
        this.updatedDtm = updatedDtm;
        this.revisionCount = revisionCount;
    }

    public DaysBitmapCodeId getId() {
        return this.id;
    }

    public void setId(DaysBitmapCodeId id) {
        this.id = id;
    }

    public String getDayLabel() {
        return this.dayLabel;
    }

    public void setDayLabel(String dayLabel) {
        this.dayLabel = dayLabel;
    }

    public long getBitmapValue() {
        return this.bitmapValue;
    }

    public void setBitmapValue(long bitmapValue) {
        this.bitmapValue = bitmapValue;
    }

    public String getDescription() {
        return this.description;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public Date getEffectiveDate() {
        return this.effectiveDate;
    }

    public void setEffectiveDate(Date effectiveDate) {
        this.effectiveDate = effectiveDate;
    }

    public Date getExpiryDate() {
        return this.expiryDate;
    }

    public void setExpiryDate(Date expiryDate) {
        this.expiryDate = expiryDate;
    }
}
