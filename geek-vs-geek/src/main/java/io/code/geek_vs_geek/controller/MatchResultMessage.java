package io.code.geek_vs_geek.controller;

public class MatchResultMessage {
    private String username;
    private int passedTestCases;

    public MatchResultMessage(String username, int passedTestCases) {
        this.username = username;
        this.passedTestCases = passedTestCases;
    }

    // Getters and setters
    public String getUsername() {
        return username;
    }

    public void setUsername(String username) {
        this.username = username;
    }

    public int getPassedTestCases() {
        return passedTestCases;
    }

    public void setPassedTestCases(int passedTestCases) {
        this.passedTestCases = passedTestCases;
    }
}
