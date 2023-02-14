import { unstable_ClassNameGenerator as ClassNameGenerator } from "@mui/material/className";

ClassNameGenerator.configure(
	(componentName) =>
		`shibaFighter-${componentName.replaceAll("Mui", "").toLowerCase()}`
);
