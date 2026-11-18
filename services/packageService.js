import {
  cvPackages,
  additionalCvPackages,
  jobPackages,
  additionalJobPackages,
  featuredServices,
  cvServices,
} from "@/data/packages";
import { fromSource } from "./apiClient";

export async function getPackages(type = "job") {
  return fromSource(`/packages?type=${type}`, () => (type === "cv" ? cvPackages : jobPackages));
}

export async function getAdditionalPackages(type = "job") {
  return fromSource(`/packages/additional?type=${type}`, () =>
    type === "cv" ? additionalCvPackages : additionalJobPackages
  );
}

export async function getFeaturedServices() {
  return featuredServices;
}

export async function getCvServices() {
  return cvServices;
}
