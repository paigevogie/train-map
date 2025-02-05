export type Legend =
  | "BL"
  | "YL"
  | "BR"
  | "GR"
  | "OR"
  | "RD"
  | "PR"
  | "PK"
  | "ML";

export type CtaLines = {
  lines: string;
  description: string;
  legend: Legend;
  shape_len: string;
  the_geom: {
    coordinates: [longitude: number, latitude: number][][];
  };
}[];

export type Lines = (
  | "Blue"
  | "Brown"
  | "Green"
  | "Orange"
  | "Pink"
  | "Purple"
  | "Red"
  | "Yellow"
  | "Evanston Express"
)[];

export type CtaStations = {
  name: string;
  ada: string;
  address: string;
  point_x: number;
  point_y: number;
  lines: Lines;
  station_id: number;
  station_name: string;
  coordinates: number[];
}[];

export const getStrokeColor = (legend: Legend) => {
  const legendColorMap = {
    BL: "rgba(13, 172, 231, 0.5)",
    BR: "rgba(163, 98, 79, 0.5)",
    GR: "rgba(22, 177, 49, 0.5)",
    ML: "rgba(0, 0, 0, 0.5)",
    OR: "rgba(255, 121, 56, 0.5)",
    PK: "rgba(251, 128, 166, 0.5)",
    PR: "rgba(134, 73, 188, 0.5)",
    RD: "rgba(255, 60, 58, 0.5)",
    YL: "rgba(244, 202, 0, 0.5)",
  };

  return legendColorMap[legend];
};

export const getLegend = (lines: Lines): Legend => {
  // TODO: make this work for multiple lines
  if (lines.length > 1) return "ML";

  if (lines.includes("Blue")) return "BL";
  if (lines.includes("Brown")) return "BR";
  if (lines.includes("Green")) return "GR";
  if (lines.includes("Orange")) return "OR";
  if (lines.includes("Pink")) return "PK";
  if (lines.includes("Purple")) return "PR";
  if (lines.includes("Red")) return "RD";
  if (lines.includes("Yellow")) return "YL";

  return "ML";
};
