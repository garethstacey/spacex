interface Launch {
  flight_number: number;
  mission_name: string;
  launch_date_utc: Date;
  details: string;
  rocket: {
    rocket_name: string;
    rocket_type: string;
    first_stage: {
      cores: {
        core_serial: string;
        flight: number;
        block: number;
        gridfins: boolean;
        legs: boolean;
        reused: boolean;
        land_success: boolean;
        landing_intent: boolean;
        landing_type: string;
        landing_vehicle: string;
      }[];
    };
    second_stage: {
      block: number;
      payloads: {
        cap_serial: "string";
        reused: boolean;
        customers: string[];
        nationality: string;
        manufacturer: string;
        payload_type: string;
        payload_mass_kg: number;
        payload_mass_lbs: number;
        orbit: "string";
        orbit_params: {
          reference_system: string;
          regime: string;
          longitude: number;
          semi_major_axis_km: number;
          eccentricity: number;
          periapsis_km: number;
          apoapsis_km: number;
          inclination_deg: number;
          period_min: number;
          lifespan_years: number;
          epoch: number;
          mean_motion: number;
          raan: number;
          arg_of_pericenter: number;
          mean_anomaly: number;
        };
        mass_returned_kg: number;
        mass_returned_lbs: number;
        flight_time_sec: number;
        cargo_manifest: number;
      }[];
    };
    fairings: number;
  };
}
