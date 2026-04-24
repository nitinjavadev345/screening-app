package com.example.screening.service;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.example.screening.dto.EligibilityResult;
import com.example.screening.dto.MemberDTO;
import com.example.screening.model.ScreeningData;
import com.example.screening.repository.ScreeningRepository;
import com.fasterxml.jackson.databind.ObjectMapper;

@Service
public class ScreeningService {

  @Autowired
  private AiService aiService;

  @Autowired
  private ScreeningRepository repo;

  @Autowired 
  private ObjectMapper mapper;


  public Long save(String json) {
    ScreeningData s = new ScreeningData();
    s.setJsonData(json);
    return repo.save(s).getId();
  }

  public String get(Long id) {
    
    return repo.findById(id).orElseThrow().getJsonData();
  }

   public Map<String, Object> evaluateEligibility(Long id) throws Exception {

    String json = get(id);
    System.out.println("*********************************json:"+json);
    List<MemberDTO> members =
      mapper.readValue(json,
        mapper.getTypeFactory().constructCollectionType(List.class, MemberDTO.class));

    Map<String, EligibilityResult> res = new HashMap<>();

    // Assuming all income values are MONTHLY
    double totalMonthlyIncome = members.stream().mapToDouble(m -> m.income)
    .sum();

    System.out.println("*********************************totalMonthlyIncome:"+totalMonthlyIncome);

    int size = members.size();
    double avg = totalMonthlyIncome / size;

    // Food Program
    if (totalMonthlyIncome <= 40000) {
        res.put("Food", new EligibilityResult(true,
            "Your total household income is within the allowed limit."));
    } else {
        res.put("Food", new EligibilityResult(false,
            "Your total household income exceeds the limit of 40,000."));
    }

    // Healthcare Program
    if (avg <= 15000) {
        res.put("Healthcare", new EligibilityResult(true,
            "Your average income per household member meets the criteria."));
    } else {
        res.put("Healthcare", new EligibilityResult(false,
            "Average income per person exceeds 15,000."));
    } 

    // Pension Program
    boolean hasSenior = members.stream().anyMatch(m -> m.age >= 60);

    if (hasSenior) {
        res.put("Pension", new EligibilityResult(true,
            "At least one household member is aged 60 or above."));
    } else {
        res.put("Pension", new EligibilityResult(false,
            "No household member meets the age requirement (60+)."));
    }



    Map<String, Object> finalResponse = new HashMap<>();
    
    String jsonText = mapper.writeValueAsString(res);
    System.out.println("*********************************jsonText:"+jsonText);

    String aiText = aiService.explainEligibility(jsonText);
    //String aiText = aiService.explainEligibility("Food eligible. Pension denied.");
    //System.out.println(aiText);

    
    System.out.println("*********************************aiText:"+aiText);

    finalResponse.put("results", res);
    finalResponse.put("aiExplanation", aiText);

    System.out.println("*********************************finalResponse:"+finalResponse);
    return finalResponse;
    
  }
}