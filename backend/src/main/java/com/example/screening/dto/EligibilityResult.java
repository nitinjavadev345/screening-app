package com.example.screening.dto;

public class EligibilityResult {

    private boolean eligible;
    private String reason;

    public EligibilityResult(boolean eligible, String reason) {
        this.eligible = eligible;
        this.reason = reason;
    }

    public boolean isEligible() { return eligible; }
    public String getReason() { return reason; }
}