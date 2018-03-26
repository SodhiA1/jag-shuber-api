package ca.bc.gov.jag.shuber.service;

import java.util.ArrayList;
import java.util.List;
import java.util.UUID;

import org.junit.jupiter.api.AfterEach;
import org.junit.jupiter.api.Assertions;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.junit.platform.runner.JUnitPlatform;
import org.junit.runner.RunWith;
import org.mockito.Mockito;
import org.springframework.test.context.junit.jupiter.SpringExtension;

import ca.bc.gov.jag.shuber.AbstractTest;
import ca.bc.gov.jag.shuber.persistence.dao.ShiftDAO;
import ca.bc.gov.jag.shuber.persistence.model.ModelUtil;
import ca.bc.gov.jag.shuber.persistence.model.Shift;

/**
 * <p>To test our service layer we mock the persistence layer, since we don't
 * care how it works.</p>
 * 
 * @author michael.gabelmann
 */
@RunWith(JUnitPlatform.class)
@ExtendWith(SpringExtension.class)
public class ShiftServiceTest extends AbstractTest {
	private ShiftDAO shiftDao;
	private ShiftService shiftService;
	
	private Shift shift1;
	private UUID locationId1;
	private UUID locationId2;
	
	
	@BeforeEach
	@Override
	protected void beforeTest() {
		shift1 = ModelUtil.getShift(null);
		locationId1 = UUID.randomUUID();
		locationId2 = UUID.randomUUID();
		
		shiftDao = Mockito.mock(ShiftDAO.class);
		shiftService = new JpaShiftService(shiftDao);
		
		List<Shift> shifts = new ArrayList<Shift>();
		shifts.add(shift1);
		
		
		Mockito.when(shiftDao.getShifts("2018-01-01", "2018-01-02", locationId1)).thenReturn(shifts);
		Mockito.when(shiftDao.getShifts("2018-01-01", "2018-01-02", locationId2)).thenReturn(new ArrayList<Shift>());
	}
	
	@AfterEach
	@Override
	protected void afterTest() {
		
	}
	
	@Test
	@DisplayName("Get shifts for a date range and courthouse that exists")
	public void test1_getShifts() {
		List<Shift> records = shiftService.getShiftsByDateRangeAndCourthouse("2018-01-01", "2018-01-02", locationId1);
		Assertions.assertNotNull(records);
		Assertions.assertTrue(records.size() == 1);
	}
	
	@Test
	@DisplayName("Get shifts for a date range and courthouse that does not exist")
	public void test2_getShifts() {
		List<Shift> records = shiftService.getShiftsByDateRangeAndCourthouse("2018-01-01", "2018-01-02", locationId2);
		Assertions.assertNotNull(records);
		Assertions.assertTrue(records.size() == 0);
	}
	
}
