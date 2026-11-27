import { useState } from "react";
import { useScrollReveal } from "../../hooks/useScrollReveal";

type PreviewTab = "classrooms" | "subjects" | "students";

const PREVIEW_TABS: { id: PreviewTab; label: string }[] = [
  { id: "classrooms", label: "Classrooms" },
  { id: "subjects", label: "Subjects" },
  { id: "students", label: "Students" },
];

const SAMPLE_CLASSROOMS = [
  {
    name: "Grade 10 — Diamond",
    code: "CLS-10D",
    level: "Grade 10",
    term: "SY 2026–2027 · 1st Sem",
  },
  {
    name: "Grade 11 — STEM A",
    code: "CLS-11A",
    level: "Grade 11",
    term: "SY 2026–2027 · 1st Sem",
  },
  {
    name: "Grade 12 — ABM B",
    code: "CLS-12B",
    level: "Grade 12",
    term: "SY 2026–2027 · 1st Sem",
  },
] as const;

const SAMPLE_SUBJECTS = [
  {
    code: "MATH101",
    name: "General Mathematics",
    department: "Mathematics",
    units: "3.0",
  },
  {
    code: "SCI202",
    name: "Earth & Life Science",
    department: "Science",
    units: "3.0",
  },
  {
    code: "CS104",
    name: "Computer Programming 1",
    department: "ICT",
    units: "4.0",
  },
] as const;

const SAMPLE_STUDENTS = [
  {
    name: "Santos, Elena M.",
    lrn: "136542090112",
    gradeLevel: "Grade 10",
    section: "Diamond",
  },
  {
    name: "Reyes, Mateo L.",
    lrn: "136542090248",
    gradeLevel: "Grade 11",
    section: "STEM A",
  },
  {
    name: "Cruz, Sofia R.",
    lrn: "136542090395",
    gradeLevel: "Grade 12",
    section: "ABM B",
  },
] as const;

export function ShowcaseSection() {
  const [activeTab, setActiveTab] = useState<PreviewTab>("classrooms");
  const { ref, isVisible } = useScrollReveal();

  return (
    <section
      id="preview"
      className="border-y border-[#DDE9F0] bg-[#EBF6FB] px-6 py-20 md:py-24"
    >
      <div
        ref={ref}
        className={`reveal mx-auto max-w-6xl ${isVisible ? "is-visible" : ""}`}
      >
        <div className="grid grid-cols-1 items-center gap-12 lg:grid-cols-12">
          <div className="space-y-5 lg:col-span-5">
            <p className="text-xs font-semibold uppercase tracking-widest text-[#3A66B2]">
              Workspace Preview
            </p>
            <h2 className="text-3xl font-bold tracking-tight text-[#3C4044] sm:text-4xl">
              Clear Records Across Every Academic Module
            </h2>
            <p className="text-base leading-relaxed text-[#5C6670]">
              Switch between classrooms, subjects, and student directories
              without losing context. Every view surfaces structured fields like
              class codes, course units, and LRN identifiers cleanly.
            </p>

            <ul className="space-y-3 pt-2 text-sm text-[#3C4044]">
              <li className="flex items-start gap-3">
                <span
                  aria-hidden="true"
                  className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-[#5D8DD4] text-xs font-bold text-white"
                >
                  ✓
                </span>
                <span>
                  Consistent snake-to-camelCase API data models across every
                  table
                </span>
              </li>
              <li className="flex items-start gap-3">
                <span
                  aria-hidden="true"
                  className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-[#5D8DD4] text-xs font-bold text-white"
                >
                  ✓
                </span>
                <span>
                  Direct lookups by primary ID, linked User ID, Code, or Student
                  LRN
                </span>
              </li>
              <li className="flex items-start gap-3">
                <span
                  aria-hidden="true"
                  className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-[#5D8DD4] text-xs font-bold text-white"
                >
                  ✓
                </span>
                <span>
                  Clean tabular layout designed for fast scanning and updates
                </span>
              </li>
            </ul>
          </div>

          <div className="lg:col-span-7">
            <div className="rounded-2xl border border-[#DDE9F0] bg-[#FBFDFD] p-5 shadow-md sm:p-6">
              <div className="flex flex-wrap items-center justify-between gap-4 border-b border-[#DDE9F0] pb-4">
                <div>
                  <p className="text-sm font-semibold text-[#3C4044]">
                    Klaseta Directory Preview
                  </p>
                  <p className="text-xs text-[#A1AEB8]">
                    Illustrative sample data
                  </p>
                </div>

                <div
                  role="tablist"
                  aria-label="Preview modules"
                  className="inline-flex rounded-xl border border-[#DDE9F0] bg-[#EBF6FB] p-1"
                >
                  {PREVIEW_TABS.map((tab) => {
                    const selected = activeTab === tab.id;
                    return (
                      <button
                        key={tab.id}
                        type="button"
                        role="tab"
                        id={`tab-${tab.id}`}
                        aria-selected={selected}
                        aria-controls={`panel-${tab.id}`}
                        onClick={() => setActiveTab(tab.id)}
                        className={`rounded-lg px-3.5 py-1.5 text-xs font-semibold transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#3A66B2] ${
                          selected
                            ? "bg-[#5D8DD4] text-white shadow-xs"
                            : "text-[#3C4044] hover:text-[#3A66B2]"
                        }`}
                      >
                        {tab.label}
                      </button>
                    );
                  })}
                </div>
              </div>

              <div
                id={`panel-${activeTab}`}
                role="tabpanel"
                aria-labelledby={`tab-${activeTab}`}
                className="mt-4 overflow-x-auto"
              >
                {activeTab === "classrooms" && (
                  <table className="w-full min-w-[460px] text-left text-sm">
                    <caption className="sr-only">
                      Sample classrooms table
                    </caption>
                    <thead>
                      <tr className="border-b border-[#DDE9F0] text-xs font-semibold uppercase tracking-wider text-[#A1AEB8]">
                        <th scope="col" className="pb-3 pr-4">
                          Classroom
                        </th>
                        <th scope="col" className="pb-3 pr-4">
                          Code
                        </th>
                        <th scope="col" className="pb-3 pr-4">
                          Level
                        </th>
                        <th scope="col" className="pb-3">
                          Academic Term
                        </th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-[#DDE9F0]">
                      {SAMPLE_CLASSROOMS.map((room) => (
                        <tr key={room.code} className="text-[#3C4044]">
                          <td className="py-3.5 pr-4 font-medium">
                            {room.name}
                          </td>
                          <td className="py-3.5 pr-4">
                            <span className="rounded-md bg-[#EBF6FB] px-2 py-0.5 text-xs font-semibold text-[#3A66B2]">
                              {room.code}
                            </span>
                          </td>
                          <td className="py-3.5 pr-4 text-[#5C6670]">
                            {room.level}
                          </td>
                          <td className="py-3.5 text-[#5C6670]">{room.term}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                )}

                {activeTab === "subjects" && (
                  <table className="w-full min-w-[460px] text-left text-sm">
                    <caption className="sr-only">
                      Sample subjects table
                    </caption>
                    <thead>
                      <tr className="border-b border-[#DDE9F0] text-xs font-semibold uppercase tracking-wider text-[#A1AEB8]">
                        <th scope="col" className="pb-3 pr-4">
                          Code
                        </th>
                        <th scope="col" className="pb-3 pr-4">
                          Subject Name
                        </th>
                        <th scope="col" className="pb-3 pr-4">
                          Department
                        </th>
                        <th scope="col" className="pb-3">
                          Units
                        </th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-[#DDE9F0]">
                      {SAMPLE_SUBJECTS.map((subj) => (
                        <tr key={subj.code} className="text-[#3C4044]">
                          <td className="py-3.5 pr-4">
                            <span className="rounded-md bg-[#EBF6FB] px-2 py-0.5 text-xs font-semibold text-[#3A66B2]">
                              {subj.code}
                            </span>
                          </td>
                          <td className="py-3.5 pr-4 font-medium">
                            {subj.name}
                          </td>
                          <td className="py-3.5 pr-4 text-[#5C6670]">
                            {subj.department}
                          </td>
                          <td className="py-3.5 text-[#5C6670]">
                            {subj.units}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                )}

                {activeTab === "students" && (
                  <table className="w-full min-w-[460px] text-left text-sm">
                    <caption className="sr-only">
                      Sample students table
                    </caption>
                    <thead>
                      <tr className="border-b border-[#DDE9F0] text-xs font-semibold uppercase tracking-wider text-[#A1AEB8]">
                        <th scope="col" className="pb-3 pr-4">
                          Student Name
                        </th>
                        <th scope="col" className="pb-3 pr-4">
                          LRN
                        </th>
                        <th scope="col" className="pb-3 pr-4">
                          Grade Level
                        </th>
                        <th scope="col" className="pb-3">
                          Section
                        </th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-[#DDE9F0]">
                      {SAMPLE_STUDENTS.map((student) => (
                        <tr key={student.lrn} className="text-[#3C4044]">
                          <td className="py-3.5 pr-4 font-medium">
                            {student.name}
                          </td>
                          <td className="py-3.5 pr-4 font-mono text-xs text-[#3A66B2]">
                            {student.lrn}
                          </td>
                          <td className="py-3.5 pr-4 text-[#5C6670]">
                            {student.gradeLevel}
                          </td>
                          <td className="py-3.5 text-[#5C6670]">
                            {student.section}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
