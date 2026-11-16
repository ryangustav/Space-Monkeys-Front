// SI-assisted: written with Claude (Anthropic), reviewed by the Space Monkeys team. See README.
// API health and data-source status from /health, /status and /history/meta.
import { API_BASE_URL, systemApi } from "../../../app/api";
import { useApi } from "../../../shared/api/useApi";
import { Dot, Icon, PanelTitle } from "../../../shared/ui/ui";
import { PanelState } from "../../history/components/HistoryParts";
import { longDate, type Meta } from "../../history/model/history-view";

/** Sidebar footer: is the API reachable, and is the real-time worker running? */
export function ApiStatusBadge() {
  const status = useApi((signal) => systemApi.getStatus({ signal }), []);
  const ok = status.status === "success";
  const worker = status.data?.worker;
  return (
    <div className="system-status" title={status.error?.message}>
      <Dot color={ok ? (worker?.running ? "green" : "yellow") : "red"} />
      <span>
        {ok ? "API connected" : status.status === "error" ? "API unreachable" : "Connecting…"}
        <small>
          {ok
            ? worker?.running
              ? `Real-time worker running · ${status.data.live.fires ?? 0} live fires`
              : "Real-time worker stopped"
            : API_BASE_URL}
        </small>
      </span>
      <Icon name="info" size={13} />
    </div>
  );
}

const fmtTime = (iso?: string | null) =>
  iso ? `${iso.replace("T", " ").slice(0, 16)} UTC` : "never";

export function SourceStatus({ meta }: { meta: Meta | null }) {
  const status = useApi((signal) => systemApi.getStatus({ signal }), []);
  return (
    <section className="panel">
      <PanelTitle
        title="Data sources in use"
        subtitle="What the API is reading now: the historical record built from the NASA FIRMS archive, and the real-time worker."
      >
        <button className="hw-button" onClick={status.reload}>
          Refresh
        </button>
      </PanelTitle>
      <div className="hw-table-wrap">
        <table className="hw-table">
          <thead>
            <tr>
              <th>Source</th>
              <th>Used for</th>
              <th>Coverage / last success</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody>
            {meta?.coverage.satellites?.map((s) => (
              <tr key={s.name}>
                <td>
                  {s.sensor} · {s.name}
                </td>
                <td>
                  Historical record (FIRMS archive{s.sensor === "VIIRS" ? ", 375 m" : ", 1 km"})
                </td>
                <td>
                  {longDate(s.start)} – {s.end ? longDate(s.end) : "today"}
                </td>
                <td>{s.end ? "ended" : "active"}</td>
              </tr>
            ))}
            {status.status === "success" &&
              Object.entries(status.data.sources).map(([name, s]) => (
                <tr key={name}>
                  <td>{name}</td>
                  <td>
                    {name.startsWith("GOES")
                      ? "Real-time fires (GOES ABI)"
                      : name === "FORECAST"
                        ? "7-day forecast input (VIIRS NRT)"
                        : "Real-time fires (FIRMS NRT)"}
                  </td>
                  <td>
                    {fmtTime(s.last_success)}
                    {s.last_count != null ? ` · ${s.last_count} records` : ""}
                  </td>
                  <td className={s.last_error ? "hw-bad" : "hw-good"}>{s.last_error ?? "ok"}</td>
                </tr>
              ))}
          </tbody>
        </table>
      </div>
      {status.status !== "success" && <PanelState error={status.error ?? undefined} />}
      {meta && (
        <ul className="hw-facts">
          <li>
            MODIS standard archive until {longDate(meta.coverage.modis?.standard_until ?? "")},
            VIIRS until {longDate(meta.coverage.viirs?.standard_until ?? "")}; later days come from
            NRT and are marked provisional.
          </li>
          <li>
            Harmonization: {meta.harmonization.status}
            {meta.harmonization.method ? ` — ${meta.harmonization.method}` : ""}
          </li>
          <li>{meta.known_gaps.length} known data gaps reported by the API.</li>
          {status.data && (
            <li>
              Real-time worker: {status.data.worker.running ? "running" : "stopped"}, last run{" "}
              {fmtTime(status.data.worker.last_run)}, {status.data.live.detections ?? 0} detections
              and {status.data.live.fires ?? 0} fused fires held.
            </li>
          )}
        </ul>
      )}
    </section>
  );
}
