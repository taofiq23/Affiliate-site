import type { ReviewRecord } from "@/lib/review-data";

type Props = {
  review: ReviewRecord;
};

export function FeatureSnapshotTable({ review }: Props) {
  return (
    <section className="mt-10 border-t border-black/10 pt-8">
      <div className="mb-6 border border-black/10 bg-[#faf9f5] p-5">
        <div className="grid gap-6 lg:grid-cols-[minmax(0,1fr)_360px]">
          <div>
            <p className="text-sm uppercase tracking-[0.2em] text-black/80">Quick Specs</p>
            <p className="mt-3 max-w-2xl text-sm leading-relaxed text-black/68">
              A quick read on pricing, setup, buyer fit, and the most useful product details.
            </p>
          </div>

          <div>
            <p className="text-[11px] uppercase tracking-[0.18em] text-black/55">Highlights</p>
            <ul className="mt-3 space-y-2 text-sm leading-relaxed text-black/70">
              {review.keyFeatures.map((feature) => (
                <li key={feature} className="flex gap-3">
                  <span className="mt-[7px] h-1.5 w-1.5 rounded-full bg-black/55" aria-hidden="true" />
                  <span>{feature}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>

      <div className="overflow-x-auto border border-black/10">
        <table className="min-w-full border-collapse text-left text-sm">
          <tbody>
            {review.featureSnapshot.map((row) => (
              <tr key={`${row.label}-${row.value}`}>
                <th className="w-[220px] border-b border-black/10 bg-[#faf9f5] px-4 py-4 text-[11px] uppercase tracking-[0.18em] text-black/55">
                  {row.label}
                </th>
                <td className="border-b border-black/10 px-4 py-4 text-sm leading-relaxed text-black/72">{row.value}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </section>
  );
}
