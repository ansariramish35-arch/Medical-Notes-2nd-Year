import { vivaQuestions, topics, systems } from "@/lib/static-data";
import { Reveal } from "@/components/Reveal";

export default function VivaPage() {
  const vivas = vivaQuestions;
  const allTopics = topics;
  const allSystems = systems;
  const topicById = new Map(allTopics.map((t) => [t.id, t]));
  const systemById = new Map(allSystems.map((s) => [s.id, s]));

  return (
    <div className="rise space-y-6">
      <header>
        <p className="text-[11px] font-extrabold uppercase tracking-[0.18em] text-crimson">
          Oral examination preparation
        </p>
        <h1 className="mt-1.5 font-display text-[30px] font-semibold leading-tight">Viva Guide</h1>
        <p className="mt-2 max-w-3xl text-[14px] leading-relaxed text-ink-soft">
          Identification, definition, mechanism, difference and "why?" questions across every unit.
          Answer aloud in one or two precise sentences, then reveal the model answer.
        </p>
      </header>

      <div className="grid gap-3 lg:grid-cols-2">
        {vivas.map((v) => {
          const topic = v.topicId ? topicById.get(v.topicId) : null;
          const sys = topic ? systemById.get(topic.systemId) : null;
          return (
            <div key={v.id} className="panel flex flex-col p-4">
              <p className="text-[10.5px] font-extrabold uppercase tracking-[0.12em] text-ink-faint">
                {sys?.name ?? "General"}
              </p>
              <p className="mt-1.5 flex-1 text-[14px] font-semibold leading-relaxed">{v.question}</p>
              <div className="mt-3">
                <Reveal label="Show answer">
                  <p className="rounded-lg border border-line bg-paper px-3.5 py-2.5 text-[13px] leading-relaxed">
                    {v.answer}
                  </p>
                </Reveal>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
