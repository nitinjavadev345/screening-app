package com.example.screening.service;

import java.util.HashMap;
import java.util.Map;

import org.springframework.stereotype.Service;
import org.springframework.web.reactive.function.client.WebClient;

@Service
public class AiService {

    private final WebClient webClient;

    public AiService() {
        this.webClient = WebClient.builder()
                .baseUrl("http://localhost:11434")
                .build();
    }
    public String explainEligibility(String resultJson) {

        String prompt = """
        You are an eligibility assistant.

        Read the eligibility JSON and return ONLY clean bullet points.

        Format exactly like this:

        • Approved Programs:
        - Food
        - Pension

        • Denied Programs:
        - Healthcare

        • Reasons:
        - Food approved because income is within limit.
        - Healthcare denied because average income exceeded threshold.
        - Pension approved because household has member age 60+.

        • Recommended Next Steps:
        - Apply for approved programs.
        - Update income details if incorrect.
        - Contact caseworker if circumstances changed.

        Eligibility Data:
        """ + resultJson;

        Map<String, Object> request = new HashMap<>();
        request.put("model", "phi3");
        request.put("prompt", prompt);
        request.put("stream", false);

        Map response = webClient.post()
            .uri("/api/generate")
            .bodyValue(request)
            .retrieve()
            .bodyToMono(Map.class)
            .block();

        return response.get("response").toString();
    }
}