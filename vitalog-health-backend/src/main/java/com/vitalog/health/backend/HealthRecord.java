package com.vitalog.health.backend;

import com.fasterxml.jackson.annotation.JsonProperty;

public class HealthRecord {
    @JsonProperty("운동명")
    private String exerciseName;

    @JsonProperty("단위체중당에너지소비량")
    private double energyConsumption;

    // Getter 및 Setter 메서드
    public String getExerciseName() {
        return exerciseName;
    }

    public void setExerciseName(String exerciseName) {
        this.exerciseName = exerciseName;
    }

    public double getEnergyConsumption() {
        return energyConsumption;
    }

    public void setEnergyConsumption(double energyConsumption) {
        this.energyConsumption = energyConsumption;
    }
}