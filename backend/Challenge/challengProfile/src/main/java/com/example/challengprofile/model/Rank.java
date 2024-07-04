package com.example.challengprofile.model;

public enum Rank {
    BEGINNER,
    NOVICE_EXPLORER,
    SEASONED_TRAVELER,
    ADVENTURER,
    EXPERT_NAVIGATOR,
    MASTER_PATHFINDER,
    LEGENDARY_WANDERER,
    ULTIMATE_VOYAGER,
    SUPREME_WAYFARER,
    GRAND_TRAILBLAZER,
    EPIC_CONQUEROR,
    INSPIRATIONAL_TRAILBLAZER,
    MYTHICAL_JOURNEYMAN,
    SUPERNATURAL_SEEKER,
    IMMORTAL_VENTURER,
    ;

    public Rank getNextRank() {
        int ordinal = this.ordinal();
        Rank[] ranks = Rank.values();
        if (ordinal < ranks.length - 1) {
            return ranks[ordinal + 1];
        }
        return this;
    }
}