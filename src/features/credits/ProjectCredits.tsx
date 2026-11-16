// SI-assisted: written with Claude (Anthropic), reviewed by the Space Monkeys team. See README.
// Every dataset, reference, library and tool behind Solis, with its license, plus how Super
// Intelligence (SI) was used. Space Apps requires all of it to be listed; keep it in sync with
// the backend README (Data sources, Software) and package.json.
import { PanelTitle } from "../../shared/ui/ui";
import "./credits.css";

type Item = { name: string; detail: string; href?: string; license?: string };

const NASA_DATA: Item[] = [
  {
    name: "MODIS Collection 6.1 active fire locations, standard (MCD14ML)",
    detail:
      "Terra from 2000-11-01, Aqua from 2002-07-04, 1 km. The reference series of the historical record. Processed by the University of Maryland, distributed by NASA FIRMS.",
    href: "https://firms.modaps.eosdis.nasa.gov/download/",
    license: "EOSDIS Data Use Policy (open)",
  },
  {
    name: "VIIRS 375 m active fire, Collection 2, standard",
    detail:
      "S-NPP (VNP14IMGTML) from 2012-01-20, NOAA-20 from 2018-04-01, NOAA-21 from 2023-03-01. Input of the harmonization (VIIRS to MODIS units) and of the forecast model.",
    href: "https://firms.modaps.eosdis.nasa.gov/download/",
    license: "EOSDIS Data Use Policy (open)",
  },
  {
    name: "FIRMS near real-time (NRT) active fire",
    detail:
      "MODIS MCD14DL, VIIRS S-NPP VNP14IMGTDL_NRT, NOAA-20 VJ114IMGTDL_NRT, NOAA-21 VJ214IMGTDL_NRT. Recent days not yet in the standard archive (flagged NRT), Fires now, and the forecast input.",
    href: "https://doi.org/10.5067/FIRMS/VIIRS/VNP14IMGT_NRT.002",
    license: "EOSDIS Data Use Policy (open)",
  },
  {
    name: "FIRMS yearly country archive",
    detail:
      "VIIRS S-NPP 2012–2025 and MODIS C6.1 2000–2016 for Brazil (forecast training), and Australia 2000–2025 (second-country test of the harmonization).",
    href: "https://firms.modaps.eosdis.nasa.gov/country/",
    license: "EOSDIS Data Use Policy (open)",
  },
  {
    name: "NASA POWER Data v10 (GPM IMERG precipitation, MERRA-2 meteorology)",
    detail:
      "Daily rain, temperature, humidity, wind and soil wetness, tested as forecast-model inputs. NASA Langley Research Center, read from AWS Open Data.",
    href: "https://power.larc.nasa.gov/",
    license: "CC BY 4.0",
  },
];

const OTHER_DATA: Item[] = [
  {
    name: "NOAA GOES-19 ABI L2+ Fire/Hot Spot Characterization (ABI-L2-FDCF)",
    detail:
      "Full disk every 10 min, about 2 km. Real-time anchor of the 7-day forecast. NOAA / GOES-R Series Program, via NOAA Open Data Dissemination on AWS.",
    href: "https://registry.opendata.aws/noaa-goes/",
    license: "Open, no restrictions",
  },
  {
    name: "IBGE Biomas do Brasil 2019, 1:250,000",
    detail:
      "Instituto Brasileiro de Geografia e Estatística. Labels every 0.1° cell with its biome; biome areas, per-biome calibration and anomalies.",
    href: "https://geoftp.ibge.gov.br/informacoes_ambientais/estudos_ambientais/biomas/vetores/",
    license: "Public data, IBGE",
  },
  {
    name: "Natural Earth country boundaries (datasets/geo-countries)",
    detail: "The world basemap of every map in this app, simplified, equirectangular.",
    href: "https://github.com/datasets/geo-countries",
    license: "Public domain (ODC-PDDL)",
  },
  {
    name: "Natural Earth 1:50m Admin 1 – States, Provinces",
    detail: "Calibration regions for Australia, in place of biomes.",
    href: "https://www.naturalearthdata.com/downloads/50m-cultural-vectors/",
    license: "Public domain",
  },
  {
    name: "OpenStreetMap standard tiles",
    detail:
      "Basemap of the internal development viewer only, not of this app. © OpenStreetMap contributors.",
    href: "https://www.openstreetmap.org/copyright",
    license: "ODbL",
  },
];

const REFERENCES: Item[] = [
  {
    name: "Schroeder, W., Oliva, P., Giglio, L., Csiszar, I. A. (2014)",
    detail:
      "The New VIIRS 375 m active fire detection data product: Algorithm description and initial assessment. Remote Sensing of Environment, 143, 85–96.",
    href: "https://doi.org/10.1016/j.rse.2013.12.008",
  },
  {
    name: "Giglio, L., Schroeder, W., Justice, C. O. (2016)",
    detail:
      "The collection 6 MODIS active fire detection algorithm and fire products. Remote Sensing of Environment, 178, 31–41.",
    href: "https://doi.org/10.1016/j.rse.2016.02.054",
  },
  {
    name: "Giglio, L., Descloitres, J., Justice, C. O., Kaufman, Y. J. (2003)",
    detail:
      "An enhanced contextual fire detection algorithm for MODIS. Remote Sensing of Environment, 87, 273–282.",
    href: "https://doi.org/10.1016/S0034-4257(03)00184-6",
  },
  {
    name: "GOES-R Product User's Guide, Vol. 5, and ABI Fire/Hot Spot ATBD",
    detail: "Fire mask codes and the fixed-grid projection of the GOES fire product.",
    href: "https://www.goes-r.gov/resources/docs.html",
  },
  {
    name: "NASA FIRMS documentation",
    detail: "Archive Readme (product names, known MODIS gaps), attribute fields and FAQ.",
    href: "https://www.earthdata.nasa.gov/data/tools/firms",
  },
];

const SOFTWARE: { group: string; items: [string, string][] }[] = [
  {
    group: "Web app",
    items: [
      ["React, React DOM", "MIT"],
      ["TypeScript", "Apache-2.0"],
      ["Vite, @vitejs/plugin-react", "MIT"],
      ["Tailwind CSS, @tailwindcss/vite", "MIT"],
      ["openapi-typescript", "MIT"],
      ["oxfmt", "MIT"],
      ["Node.js", "MIT"],
      ["Archivo, Public Sans, IBM Plex Mono (Google Fonts)", "SIL OFL 1.1"],
    ],
  },
  {
    group: "API",
    items: [
      ["Python", "PSF License"],
      ["FastAPI, Pydantic, pydantic-settings, ONNX Runtime, PyYAML", "MIT"],
      ["Uvicorn, httpx, NumPy, pandas, SciPy, h5netcdf, h5py", "BSD-3-Clause"],
      ["xarray", "Apache-2.0"],
      ["DuckDB", "MIT"],
    ],
  },
  {
    group: "Science pipeline and models",
    items: [
      ["LightGBM (harmonization model)", "MIT"],
      ["PyTorch (U-Net models), scikit-learn", "BSD-3-Clause"],
      ["ONNX, onnxscript, PyArrow, Requests", "Apache-2.0"],
      ["Zarr", "MIT"],
      ["s3fs, fsspec, Shapely", "BSD-3-Clause"],
      ["pyshp (reads the IBGE shapefile)", "MIT"],
      ["Matplotlib", "Matplotlib License (PSF-based)"],
      ["Leaflet 1.9.4 (development viewer)", "BSD-2-Clause"],
    ],
  },
  {
    group: "Tests and tooling",
    items: [
      ["pytest, Ruff, jsonschema", "MIT"],
      ["pytest-asyncio, openapi-spec-validator", "Apache-2.0"],
    ],
  },
  {
    group: "Services",
    items: [
      ["Google Colab (forecast model training)", "Hosted service"],
      ["Discloud (API hosting)", "Hosted service"],
      ["Figma Make (SI interface generator, preview)", "Hosted service"],
      ["GitHub (source code)", "Hosted service"],
    ],
  },
];

function ItemList({ items }: { items: Item[] }) {
  return (
    <ul className="credits-list">
      {items.map((item) => (
        <li key={item.name}>
          <strong>
            {item.href ? (
              <a href={item.href} target="_blank" rel="noreferrer">
                {item.name}
              </a>
            ) : (
              item.name
            )}
          </strong>
          <span>{item.detail}</span>
          {item.license && <em>{item.license}</em>}
        </li>
      ))}
    </ul>
  );
}

export default function ProjectCredits() {
  return (
    <section className="panel credits-panel" aria-labelledby="credits-title">
      <PanelTitle
        title="Credits, licenses and use of SI"
        subtitle="Every dataset, reference, library and tool behind Solis."
      />
      <div className="credits-body">
        <section>
          <h3>NASA data</h3>
          <ItemList items={NASA_DATA} />
          <p className="credits-note">
            We acknowledge the use of data and imagery from LANCE FIRMS operated by NASA's Earth
            Science Data and Information System (ESDIS), with funding provided by NASA Headquarters.
            NASA Earth science data are openly shared under the{" "}
            <a
              href="https://www.earthdata.nasa.gov/engage/open-data-services-software-policies/data-use-guidance"
              target="_blank"
              rel="noreferrer"
            >
              EOSDIS Data Use Policy
            </a>
            .
          </p>
        </section>

        <section>
          <h3>Other data</h3>
          <ItemList items={OTHER_DATA} />
        </section>

        <section>
          <h3>Scientific references</h3>
          <ItemList items={REFERENCES} />
        </section>

        <section>
          <h3>Software</h3>
          <p className="credits-note">All libraries are open source.</p>
          <div className="credits-software">
            {SOFTWARE.map((block) => (
              <div key={block.group}>
                <h4>{block.group}</h4>
                <table>
                  <tbody>
                    {block.items.map(([name, license]) => (
                      <tr key={name}>
                        <td>{name}</td>
                        <td>{license}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            ))}
          </div>
        </section>

        <section>
          <h3>Use of Super Intelligence (SI)</h3>
          <ul className="credits-list">
            <li>
              <strong>Idea and method: the team</strong>
              <span>
                The harmonization method, the burning calendar and every product decision were
                designed by the Space Monkeys team.
              </span>
            </li>
            <li>
              <strong>Code and documentation: Claude (Anthropic), via Claude Code</strong>
              <span>
                Wrote most of the code of the API, the science pipeline, this web app, the tests and
                the documentation from the team's design and instructions. Every SI-assisted source
                file starts with an "SI-assisted" line, and every one was reviewed and run by the
                team.
              </span>
            </li>
            <li>
              <strong>First web interface: Figma Make</strong>
              <span>
                Figma Make generated the first version of this web app's interface from the team's
                prompts; the team and Claude reworked it since.
              </span>
            </li>
            <li>
              <strong>Logo: SI-generated</strong>
              <span>
                The logo concept image was made with ChatGPT (OpenAI), and Claude redrew it as a
                vector. The "SI" badge on the logo is its watermark.
              </span>
            </li>
            <li>
              <strong>Machine learning models: part of the solution</strong>
              <span>
                LightGBM converts VIIRS into MODIS units; a U-Net forecasts fire for the next 7
                days. Both were trained by the team on the NASA data above.
              </span>
            </li>
            <li>
              <strong>Never used for data values</strong>
              <span>
                Every detection comes straight from the NASA and NOAA sources above. Nothing is
                generated or simulated.
              </span>
            </li>
          </ul>
        </section>

        <section>
          <h3>License and disclaimer</h3>
          <p className="credits-note">
            Our code is released under the Apache License 2.0. Solis is an independent NASA Space
            Apps Challenge 2026 project by the Space Monkeys team. It is not affiliated with or
            endorsed by NASA, NOAA or IBGE, and uses no NASA logos or branding. It is a research
            prototype, not a tool for emergency decisions.
          </p>
        </section>
      </div>
    </section>
  );
}
