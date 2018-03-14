package ca.bc.gov.jag.shuber.persistence.model;

import java.io.Serializable;

import javax.persistence.Column;
import javax.persistence.Embeddable;
import javax.validation.constraints.NotEmpty;
import javax.validation.constraints.NotNull;
import javax.validation.constraints.Size;

/**
 * DaysBitmapCodeId generated by Hibernate Tools hbm2java.
 *
 * <p>Domain model for database table days_bitmap_code.</p>
 *
 * @author hbm2java
 * @version 352
 */
@Embeddable
public class DaysBitmapCodeId implements Serializable {

    /** UID. */
    private static final long serialVersionUID = 1L;

    @NotEmpty
    @Size(min = 1, max = 50)
    @Column(name = "bitmap_set", nullable = false, updatable = false, length = 50)
    private String bitmapSet;

    @NotNull
    @Column(name = "day_sequence", nullable = false, updatable = false)
    private int daySequence;
    
    /** No args constructor. */
    public DaysBitmapCodeId() {}

    /** All args constructor. */
    public DaysBitmapCodeId(String bitmapSet, int daySequence) {
        this.bitmapSet = bitmapSet;
        this.daySequence = daySequence;
    }

    public String getBitmapSet() {
        return this.bitmapSet;
    }

    public void setBitmapSet(String bitmapSet) {
        this.bitmapSet = bitmapSet;
    }

    public int getDaySequence() {
        return this.daySequence;
    }

    public void setDaySequence(int daySequence) {
        this.daySequence = daySequence;
    }
    
    @Override
    public String toString() {
    		return bitmapSet + "_" + daySequence;
    }
    
}
