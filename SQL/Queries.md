1. **List all fire stations and their total staff and vehicles:**
   ```sql
   SELECT Station_ID, Name, Location, Total_Staff, Total_Vehicles FROM FireStation;
   ```

2. **Get all vehicles that underwent maintenance 3 months ago:**
   ```sql
   SELECT * FROM Vehicle 
   WHERE Last_Maintenance_Date <= NOW() - INTERVAL 3 MONTH;
   ```

3. **Retrieve all staff members working in a specific fire station (e.g., Station ID = 2):**
   ```sql
   SELECT * FROM Staff WHERE Station_ID = 2;
   ```

4. **Find all inventory items with quantity below 10:**
   ```sql
   SELECT * FROM Inventory WHERE Quantity < 10;
   ```

5. **Get the total number of reports filed in the last month:**
   ```sql
   SELECT COUNT(*) AS Total_Reports 
   FROM Report 
   WHERE Report_Date_Time >= NOW() - INTERVAL 1 MONTH;
   ```

6. **Find all vehicles that are currently not operational (assuming 'Status' can be 'Operational' or 'Not Operational'):**
   ```sql
   SELECT * FROM Vehicle WHERE Status = 'Not Operational';
   ```

7. **Find all reports that have not been acted upon yet:**
   ```sql
   SELECT * FROM Report WHERE Action_Taken IS NULL;
   ```

8. **Get all equipment usage logs for a specific staff member (e.g., Staff_ID = 5):**
   ```sql
   SELECT * FROM EquipmentUsage WHERE Staff_ID = 5;
   ```

9. **Find all users who have filed reports in the last 6 months:**
   ```sql
   SELECT DISTINCT User_ID, Name, Contact, Email 
   FROM User 
   WHERE User_ID IN (SELECT User_ID FROM Report WHERE Report_Date_Time >= NOW() - INTERVAL 6 MONTH);
   ```

10. **Find the most frequently reported severity level of incidents:**
    ```sql
    SELECT Severity_Level, COUNT(*) AS Occurrences 
    FROM Report 
    GROUP BY Severity_Level 
    ORDER BY Occurrences DESC 
    LIMIT 1;
    ```

11. **Find the fire station with the highest number of staff:**
    ```sql
    SELECT Name, Total_Staff 
    FROM FireStation 
    ORDER BY Total_Staff DESC 
    LIMIT 1;
    ```

12. **Find the total maintenance cost for each vehicle:**
    ```sql
    SELECT Vehicle_ID, SUM(Cost) AS Total_Maintenance_Cost 
    FROM Maintenance 
    GROUP BY Vehicle_ID;
    ```

13. **Get the total fuel consumption of each vehicle in the last year:**
    ```sql
    SELECT Vehicle_ID, SUM(Fuel_Amount) AS Total_Fuel_Used 
    FROM FuelLog 
    WHERE Date >= NOW() - INTERVAL 1 YEAR 
    GROUP BY Vehicle_ID;
    ```

14. **Find the fire station with the highest number of reports assigned to it (based on assigned staff or vehicle):**
    ```sql
    SELECT f.Station_ID, f.Name, COUNT(r.Report_ID) AS Total_Reports
    FROM Report r
    JOIN Staff s ON r.Assigned_Staff = s.Staff_ID
    JOIN FireStation f ON s.Station_ID = f.Station_ID
    GROUP BY f.Station_ID, f.Name
    ORDER BY Total_Reports DESC
    LIMIT 1;
    ```

15. **Find the total number of reports handled by each admin:**
    ```sql
    SELECT a.Admin_ID, a.Name, COUNT(r.Report_ID) AS Reports_Handled 
    FROM Admin a
    LEFT JOIN Report r ON a.Admin_ID = r.Admin_ID
    GROUP BY a.Admin_ID, a.Name;
    ```

16. **Get all vehicles that have been assigned to reports but are currently marked as 'Not Operational':**
    ```sql
    SELECT v.Vehicle_ID, v.Type, v.Status, r.Report_ID, r.Street_Address
    FROM Vehicle v
    JOIN Report r ON v.Vehicle_ID = r.Assigned_Vehicle
    WHERE v.Status = 'Not Operational';
    ```

17. **Find the top 3 most used equipment items based on EquipmentUsage:**
    ```sql
    SELECT i.Item_Name, SUM(e.Used_Quantity) AS Total_Used
    FROM EquipmentUsage e
    JOIN Inventory i ON e.Inventory_ID = i.Inventory_ID
    GROUP BY i.Item_Name
    ORDER BY Total_Used DESC
    LIMIT 3;
    ```

18. **Get the average time taken to act on reports:**
    ```sql
    SELECT AVG(TIMESTAMPDIFF(HOUR, Report_Date_Time, Action_Date_Time)) AS Avg_Hours_To_Action 
    FROM Report 
    WHERE Action_Date_Time IS NOT NULL;
    ```

19. **Find all reports with no assigned staff or vehicle yet:**
    ```sql
    SELECT * FROM Report WHERE Assigned_Staff IS NULL OR Assigned_Vehicle IS NULL;
    ```

20. **List all suppliers and the total quantity of items they have supplied:**
    ```sql
    SELECT s.Name, SUM(i.Quantity) AS Total_Supplied
    FROM Supplier s
    JOIN Inventory i ON s.Supplier_ID = i.Supplier_ID
    GROUP BY s.Name;
    ```

21. **Find the total number of incidents reported in each city:**  
   ```sql
   SELECT City, COUNT(*) AS Total_Reports 
   FROM Report 
   GROUP BY City 
   ORDER BY Total_Reports DESC;
   ```

22. **Get the details of staff members who have used equipment in the last 3 months:**  
   ```sql
   SELECT s.Staff_ID, s.Name, s.Designation, e.Purpose, e.Date_Used 
   FROM Staff s
   JOIN EquipmentUsage e ON s.Staff_ID = e.Staff_ID
   WHERE e.Date_Used >= NOW() - INTERVAL 3 MONTH;
   ```

23. **Find the fire stations that have reported at least one incident but have no assigned staff for any of them:**  
   ```sql
   SELECT DISTINCT f.Station_ID, f.Name, f.Location
   FROM FireStation f
   JOIN Report r ON f.Station_ID = (SELECT Station_ID FROM Staff WHERE Staff_ID = r.Assigned_Staff)
   WHERE r.Assigned_Staff IS NULL;
   ```

24. **List all vehicles along with the total fuel cost for each:**  
   ```sql
   SELECT v.Vehicle_ID, v.Type, SUM(f.Cost) AS Total_Fuel_Cost 
   FROM Vehicle v
   JOIN FuelLog f ON v.Vehicle_ID = f.Vehicle_ID
   GROUP BY v.Vehicle_ID, v.Type
   ORDER BY Total_Fuel_Cost DESC;
   ```

25. **Find the top 5 most active users (users who have reported the most incidents):**  
   ```sql
   SELECT u.User_ID, u.Name, COUNT(r.Report_ID) AS Total_Reports 
   FROM User u
   JOIN Report r ON u.User_ID = r.User_ID
   GROUP BY u.User_ID, u.Name
   ORDER BY Total_Reports DESC
   LIMIT 5;
   ```

26. **Get a list of reports where the severity level is "High" but no action has been taken yet:**  
   ```sql
   SELECT * FROM Report 
   WHERE Severity_Level = 'High' AND Action_Taken IS NULL;
   ```

27. **Find the vehicles that have never undergone maintenance:**  
   ```sql
   SELECT * FROM Vehicle 
   WHERE Vehicle_ID NOT IN (SELECT DISTINCT Vehicle_ID FROM Maintenance);
   ```

28. **Get the details of equipment that has been used more than 50 times in the last year:**  
   ```sql
   SELECT i.Item_Name, SUM(e.Used_Quantity) AS Total_Used 
   FROM EquipmentUsage e
   JOIN Inventory i ON e.Inventory_ID = i.Inventory_ID
   WHERE e.Date_Used >= NOW() - INTERVAL 1 YEAR
   GROUP BY i.Item_Name
   HAVING Total_Used > 50;
   ```

29. **Find the fire stations where the number of vehicles is less than 5:**  
   ```sql
   SELECT * FROM FireStation 
   WHERE Total_Vehicles < 5;
   ```

30. **Get the last maintenance date for each vehicle along with the vehicle type and model number:**  
   ```sql
   SELECT v.Vehicle_ID, v.Type, v.Model_No, MAX(m.Date_Performed) AS Last_Maintenance_Date 
   FROM Vehicle v
   LEFT JOIN Maintenance m ON v.Vehicle_ID = m.Vehicle_ID
   GROUP BY v.Vehicle_ID, v.Type, v.Model_No;
   ```

31. **Get all vehicles assigned to incidents in the last 30 days:**  
   ```sql
   SELECT v.Vehicle_ID, v.Type, v.Model_No, r.Report_ID, r.Report_Date_Time 
   FROM Vehicle v
   JOIN Report r ON v.Vehicle_ID = r.Assigned_Vehicle
   WHERE r.Report_Date_Time >= NOW() - INTERVAL 30 DAY;
   ```

32. **Find suppliers who have supplied more than 100 items in total:**  
   ```sql
   SELECT s.Supplier_ID, s.Name, SUM(i.Quantity) AS Total_Supplied 
   FROM Supplier s
   JOIN Inventory i ON s.Supplier_ID = i.Supplier_ID
   GROUP BY s.Supplier_ID, s.Name
   HAVING Total_Supplied > 100;
   ```

33. **Get the list of staff members who have never been assigned to any report:**  
   ```sql
   SELECT * FROM Staff 
   WHERE Staff_ID NOT IN (SELECT DISTINCT Assigned_Staff FROM Report WHERE Assigned_Staff IS NOT NULL);
   ```

34. **Find reports where no vehicle has been assigned yet:**  
   ```sql
   SELECT * FROM Report WHERE Assigned_Vehicle IS NULL;
   ```

35. **Find all fire stations where the staff-to-vehicle ratio is greater than 3:**  
   ```sql
   SELECT * FROM FireStation 
   WHERE Total_Staff / Total_Vehicles > 3;
   ```

36. **Retrieve all fuel logs for a specific vehicle (e.g., Vehicle_ID = 7) in the last 6 months:**  
   ```sql
   SELECT * FROM FuelLog 
   WHERE Vehicle_ID = 7 AND Date >= NOW() - INTERVAL 6 MONTH;
   ```

37. **Find the fire station that has the most inventory items stocked:**  
   ```sql
   SELECT f.Station_ID, f.Name, SUM(i.Quantity) AS Total_Inventory 
   FROM FireStation f
   JOIN Inventory i ON f.Station_ID = i.Station_ID
   GROUP BY f.Station_ID, f.Name
   ORDER BY Total_Inventory DESC 
   LIMIT 1;
   ```

38. **List all reports handled by a specific admin (e.g., Admin_ID = 3):**  
   ```sql
   SELECT * FROM Report WHERE Admin_ID = 3;
   ```

39. **Find the most frequently reported street address for incidents:**  
   ```sql
   SELECT Street_Address, COUNT(*) AS Occurrences 
   FROM Report 
   GROUP BY Street_Address 
   ORDER BY Occurrences DESC 
   LIMIT 1;
   ```

40. **Get the total cost of fuel and maintenance for each vehicle in the past year:**  
   ```sql
   SELECT v.Vehicle_ID, v.Type, 
          COALESCE(SUM(f.Cost), 0) AS Total_Fuel_Cost, 
          COALESCE(SUM(m.Cost), 0) AS Total_Maintenance_Cost 
   FROM Vehicle v
   LEFT JOIN FuelLog f ON v.Vehicle_ID = f.Vehicle_ID AND f.Date >= NOW() - INTERVAL 1 YEAR
   LEFT JOIN Maintenance m ON v.Vehicle_ID = m.Vehicle_ID AND m.Date_Performed >= NOW() - INTERVAL 1 YEAR
   GROUP BY v.Vehicle_ID, v.Type;
   ```
