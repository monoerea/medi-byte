import {query} from '../../lib/db';
export const getCompanyFreq = async () => {
    try{
        const result = await query({
            query: `WITH PatientCounts AS (
                        SELECT i.InsuranceCompanyName, i.PatientRelationshipToInsured, COUNT(pi.PatientID) AS Frequency
                        FROM insurance i
                        JOIN patientinsurance pi ON i.InsuranceID = pi.InsuranceID
                        WHERE i.PatientRelationshipToInsured <> 'Other'
                        GROUP BY i.InsuranceCompanyName, i.PatientRelationshipToInsured
                    ),
                    Percentiles AS (
                        SELECT DISTINCT Frequency,
                            PERCENT_RANK() OVER (ORDER BY Frequency) AS PercentileRank
                        FROM PatientCounts
                    )
                    SELECT pc.InsuranceCompanyName, pc.PatientRelationshipToInsured, pc.Frequency
                    FROM PatientCounts pc
                    JOIN Percentiles p ON pc.Frequency = p.Frequency
                    WHERE p.PercentileRank >= 0.75
                    ORDER BY pc.Frequency DESC;`,
          });
        return result;
    }catch(e){
        console.error('Database query error:', e);
    }
    
}

export const getAgeDistributionbyGender = async() =>{
    try {
        const result = await query({
            query: `SELECT AVG(YEAR(CURDATE())-YEAR(DateofBirth)) as value, 
                    Gender as label
                    FROM patient
                    GROUP BY Gender;`,
          })
        //   console.log('SQL',result);
          return result;
    } catch (error) {
        console.error('Database query error:', error);
        return { error: 'Internal server error' };
    }
}

export const getAgeDistributionCount = async() =>{
    try{
        const result = await query({
            query:` SELECT COUNT(p.PatientID) as value, YEAR(CURDATE()) - YEAR(p.DateofBirth) as label
                    FROM patient p
                    JOIN patientinsurance pi ON p.PatientID = pi.PatientID
                    JOIN insurance i ON i.InsuranceID = pi.InsuranceID
                    WHERE YEAR(i.DateofBirth) > 1947
                    GROUP BY label
                    HAVING value > 3
                    ORDER BY value DESC;`
        })
        return result;
    } catch (error){
        console.error('Database query error:', error);
        return { error: 'Internal server error' };
    }
}

export const getGenderDistribution = async() =>{
    try{
        const result = await query({
            query:` SELECT COUNT(*)as value, Gender as label
                    FROM patient
                    GROUP BY label;`
        })
        return result;
    } catch (error){
        console.error('Database query error:', error);
        return { error: 'Internal server error' };
    }
}

export const getSelfInsured = async() => {
    try{
        const result = await query({
            query: `SELECT COUNT(PatientID) as value, SameAsPatient as label
                    FROM patientinsurance pi
                    JOIN insurance i ON i.insuranceid = pi.insuranceid
                    GROUP BY SameAsPatient;
            `
        });
        // console.log('SQL',result);
        return result
    } catch (error){
        console.error('Database query error:', error);
        return { error: 'Internal server error' };
     }
    }