import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  Box,
} from "@mui/material";
import NameValue from "./NameValue";
import Section from "./Section";
import SectionHeading from "./SectionHeading";
import SubSection from "./SubSection";
import SubSectionHeading from "./SubSectionHeading";

const RocketDetails = ({
  launch,
  onClose,
  open,
}: {
  launch?: Launch;
  onClose: () => void;
  open: boolean;
}) => {
  const rocket = launch?.rocket;
  return (
    <Dialog
      open={open}
      onClose={onClose}
      aria-labelledby="alert-dialog-title"
      aria-describedby="alert-dialog-description"
    >
      <DialogTitle id="alert-dialog-title" sx={{ fontWeight: 900 }}>
        {`${launch?.mission_name} Rocket Details`}
      </DialogTitle>
      <DialogContent>
        <Section>
          <NameValue name="Name" value={rocket?.rocket_name} />
          <NameValue name="Type" value={rocket?.rocket_type} />
        </Section>
        {rocket?.first_stage.cores.length ? (
          <SectionHeading title="First Stage Cores">
            {rocket.first_stage.cores.map((core) => (
              <SubSection>
                <NameValue name="Serial" value={core.core_serial} />
                <NameValue name="Block" value={core.block} />
                <NameValue name="Flight" value={core.flight} />
                <NameValue name="Landing Type" value={core.landing_type} />
                <NameValue name="Gridfins" value={core.gridfins} />
                <NameValue name="Legs" value={core.legs} />
                <NameValue name="Reused" value={core.reused} />
                <NameValue name="Land Success" value={core.land_success} />
                <NameValue name="Landing Intent" value={core.landing_intent} />
              </SubSection>
            ))}
          </SectionHeading>
        ) : null}
        <SectionHeading title="Second Stage">
          <Box sx={{ marginLeft: "1rem" }}>
            <NameValue name="Block" value={rocket?.second_stage.block} />
            {rocket?.second_stage.payloads.length ? (
              <SectionHeading title="Payloads">
                {rocket.second_stage.payloads.map((payload) => (
                  <SubSection>
                    <NameValue name="Cap Serial" value={payload.cap_serial} />
                    <NameValue name="Reused" value={payload.reused} />
                    <NameValue name="Customers" value={payload.customers} />
                    <NameValue name="Nationality" value={payload.nationality} />
                    <NameValue
                      name="Manufacturer"
                      value={payload.manufacturer}
                    />
                    <NameValue name="Type" value={payload.payload_type} />
                    <NameValue
                      name="Mass (kg)"
                      value={payload.payload_mass_kg}
                    />
                    <NameValue
                      name="Mass (lbs)"
                      value={payload.payload_mass_lbs}
                    />
                    <NameValue name="orbit" value={payload.orbit} />
                    <NameValue
                      name="Mass Returned (kg)"
                      value={payload.mass_returned_kg}
                    />
                    <NameValue
                      name="Mass Returned (lbs)"
                      value={payload.mass_returned_lbs}
                    />
                    <NameValue
                      name="Flight Time (seconds)"
                      value={payload.flight_time_sec}
                    />
                    <NameValue
                      name="Cargo Manifest"
                      value={payload.cargo_manifest}
                    />
                    <SubSectionHeading title="Orbit Params">
                      <NameValue
                        name="Reference System"
                        value={payload.orbit_params.reference_system}
                      />
                      <NameValue
                        name="Regime"
                        value={payload.orbit_params.regime}
                      />
                      <NameValue
                        name="Longitude"
                        value={payload.orbit_params.longitude}
                      />
                      <NameValue
                        name="Semi Major Axis (km)"
                        value={payload.orbit_params.semi_major_axis_km}
                      />
                      <NameValue
                        name="Eccentricity"
                        value={payload.orbit_params.eccentricity}
                      />
                      <NameValue
                        name="Periapsis (km)"
                        value={payload.orbit_params.periapsis_km}
                      />
                      <NameValue
                        name="Apoapsis (km)"
                        value={payload.orbit_params.apoapsis_km}
                      />
                      <NameValue
                        name="Inclination (degrees)"
                        value={payload.orbit_params.inclination_deg}
                      />
                      <NameValue
                        name="Period (minutes)"
                        value={payload.orbit_params.period_min}
                      />
                      <NameValue
                        name="Lifespan (years)"
                        value={payload.orbit_params.lifespan_years}
                      />
                      <NameValue
                        name="Epoch"
                        value={payload.orbit_params.epoch}
                      />
                      <NameValue
                        name="Mean Motion"
                        value={payload.orbit_params.mean_motion}
                      />
                      <NameValue
                        name="RAAN"
                        value={payload.orbit_params.raan}
                      />
                      <NameValue
                        name="Arg of Pericenter"
                        value={payload.orbit_params.arg_of_pericenter}
                      />
                      <NameValue
                        name="Mean Anomaly"
                        value={payload.orbit_params.mean_anomaly}
                      />
                    </SubSectionHeading>
                  </SubSection>
                ))}
              </SectionHeading>
            ) : null}
          </Box>
        </SectionHeading>
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose}>Close</Button>
      </DialogActions>
    </Dialog>
  );
};

export default RocketDetails;
