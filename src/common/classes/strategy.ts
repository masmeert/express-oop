import { Strategy as LocalStrategy } from "passport-local";
import { Strategy as GoogleStrategy } from "passport-google-oauth20";

type StrategyType = LocalStrategy | GoogleStrategy;

export default abstract class Strategy {
  constructor(public name: string, public strategy: StrategyType) {
    this.name = name;
    this.strategy = strategy;
  }
}
