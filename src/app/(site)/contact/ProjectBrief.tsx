"use client";

import { useEffect, useId, useRef, useState, useSyncExternalStore } from "react";
import { ArrowRightIcon } from "@phosphor-icons/react/dist/ssr/ArrowRight";
import styles from "./page.module.css";

export type ProjectType = "website" | "automation" | "both";

type BriefFields = {
  type: ProjectType | "";
  name: string;
  email: string;
  tools: string;
  task: string;
  budget: string;
  timing: string;
};

type RequiredField = "type" | "name" | "email" | "task";
type FieldErrors = Partial<Record<RequiredField, string>>;
type EmailDraft = { subject: string; body: string; href: string };

const contactEmail = "contact@phinehasadams.com";
const projectTypes: { value: ProjectType; label: string; description: string }[] = [
  { value: "website", label: "Website", description: "A new site or an existing one." },
  { value: "automation", label: "Automation", description: "A task or workflow." },
  { value: "both", label: "Both", description: "Work that connects the two." },
];

const subscribeToHydration = () => () => {};
const clientSnapshot = () => true;
const serverSnapshot = () => false;

function emptyFields(initialType?: ProjectType): BriefFields {
  return {
    type: initialType ?? "",
    name: "",
    email: "",
    tools: "",
    task: "",
    budget: "",
    timing: "",
  };
}

function validate(fields: BriefFields): FieldErrors {
  const errors: FieldErrors = {};
  if (!fields.type) errors.type = "Choose Website, Automation, or Both.";
  if (!fields.name.trim()) errors.name = "Enter your name.";
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(fields.email.trim())) {
    errors.email = "Enter an email address such as name@example.com.";
  }
  if (!fields.task.trim()) errors.task = "Tell me what you want to build or change.";
  return errors;
}

function makeDraft(fields: BriefFields): EmailDraft {
  const typeLabel = fields.type === "both"
    ? "Website and automation"
    : projectTypes.find((type) => type.value === fields.type)?.label ?? "Project";
  const name = fields.name.trim().replace(/\s+/g, " ");
  const subject = `${typeLabel} project — ${name}`;
  const body = [
    "Hi Phinehas,",
    `Project type: ${typeLabel}`,
    `Name: ${name}\nReply email: ${fields.email.trim()}`,
    ...(fields.tools.trim() ? [`Current website or tools:\n${fields.tools.trim()}`] : []),
    `What I want to build or change:\n${fields.task.trim()}`,
    ...(fields.budget.trim() ? [`Budget or range: ${fields.budget.trim()}`] : []),
    ...(fields.timing.trim() ? [`Timing: ${fields.timing.trim()}`] : []),
    `Thanks,\n${name}`,
  ].join("\n\n");

  return {
    subject,
    body,
    href: `mailto:${contactEmail}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`,
  };
}

export default function ProjectBrief({ initialType }: { initialType?: ProjectType }) {
  const id = useId();
  const interactive = useSyncExternalStore(subscribeToHydration, clientSnapshot, serverSnapshot);
  const [fields, setFields] = useState<BriefFields>(() => emptyFields(initialType));
  const [errors, setErrors] = useState<FieldErrors>({});
  const [draft, setDraft] = useState<EmailDraft | null>(null);
  const [draftIsCurrent, setDraftIsCurrent] = useState(false);
  const [status, setStatus] = useState("");
  const typeRef = useRef<HTMLInputElement>(null);
  const nameRef = useRef<HTMLInputElement>(null);
  const emailRef = useRef<HTMLInputElement>(null);
  const taskRef = useRef<HTMLTextAreaElement>(null);
  const previewHeadingRef = useRef<HTMLHeadingElement>(null);

  useEffect(() => {
    if (draft) previewHeadingRef.current?.focus();
  }, [draft]);

  function updateField<K extends keyof BriefFields>(field: K, value: BriefFields[K]) {
    setFields((previous) => ({ ...previous, [field]: value }));
    if (draft) {
      setDraftIsCurrent(false);
      setStatus("The brief changed. Prepare the email again to include your changes.");
    }
    if (field in errors) {
      setErrors((previous) => {
        const next = { ...previous };
        delete next[field as RequiredField];
        return next;
      });
    }
  }

  function prepareDraft(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const nextErrors = validate(fields);
    setErrors(nextErrors);
    const firstError = Object.keys(nextErrors)[0] as RequiredField | undefined;

    if (firstError) {
      setDraftIsCurrent(false);
      setStatus("Please check the marked fields before preparing your draft.");
      const refs = { type: typeRef, name: nameRef, email: emailRef, task: taskRef };
      refs[firstError].current?.focus();
      return;
    }

    setDraft(makeDraft(fields));
    setDraftIsCurrent(true);
    setStatus("Email draft ready to review. Nothing has been sent.");
  }

  function clearBrief(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setFields(emptyFields(initialType));
    setErrors({});
    setDraft(null);
    setDraftIsCurrent(false);
    setStatus("Brief cleared.");
    typeRef.current?.focus();
  }

  const fieldId = (field: keyof BriefFields) => `${id}-${field}`;
  const errorId = (field: RequiredField) => `${id}-${field}-error`;

  return (
    <div className={styles.briefBuilder}>
      <p id={`${id}-required-note`} className={styles.requiredNote}>
        Project type, name, email, and the task description are required.
      </p>
      <noscript>
        <p className={styles.noScriptNote}>
          The brief builder needs JavaScript. You can email me directly at{" "}
          <a href={`mailto:${contactEmail}`}>{contactEmail}</a>.
        </p>
      </noscript>

      <form
        className={styles.form}
        noValidate
        aria-describedby={`${id}-required-note`}
        onSubmit={prepareDraft}
        onReset={clearBrief}
      >
        <fieldset className={styles.formFields} disabled={!interactive}>
          <legend className="sr-only">Prepare a project brief</legend>
          <fieldset
            className={styles.typeFieldset}
            aria-describedby={errors.type ? errorId("type") : undefined}
          >
            <legend>I need help with (required)</legend>
            <div className={styles.typeOptions}>
              {projectTypes.map((type, index) => (
                <label key={type.value} className={styles.typeOption}>
                  <span className={styles.typeOptionHeading}>
                    <input
                      ref={index === 0 ? typeRef : undefined}
                      type="radio"
                      name="project-type"
                      value={type.value}
                      checked={fields.type === type.value}
                      required
                      aria-describedby={errors.type ? errorId("type") : undefined}
                      onChange={() => updateField("type", type.value)}
                    />
                    <span>{type.label}</span>
                  </span>
                  <span className={styles.typeDescription}>{type.description}</span>
                </label>
              ))}
            </div>
            {errors.type && <p id={errorId("type")} className={styles.fieldError}>{errors.type}</p>}
          </fieldset>

          <div className={styles.fieldPair}>
            <div className={styles.field}>
              <label htmlFor={fieldId("name")}>Your name (required)</label>
              <input
                ref={nameRef}
                id={fieldId("name")}
                name="name"
                type="text"
                autoComplete="name"
                maxLength={120}
                required
                value={fields.name}
                aria-invalid={errors.name ? true : undefined}
                aria-describedby={errors.name ? errorId("name") : undefined}
                onChange={(event) => updateField("name", event.target.value)}
              />
              {errors.name && <p id={errorId("name")} className={styles.fieldError}>{errors.name}</p>}
            </div>
            <div className={styles.field}>
              <label htmlFor={fieldId("email")}>Your email (required)</label>
              <input
                ref={emailRef}
                id={fieldId("email")}
                name="email"
                type="email"
                autoComplete="email"
                maxLength={254}
                required
                value={fields.email}
                aria-invalid={errors.email ? true : undefined}
                aria-describedby={errors.email ? errorId("email") : undefined}
                onChange={(event) => updateField("email", event.target.value)}
              />
              {errors.email && <p id={errorId("email")} className={styles.fieldError}>{errors.email}</p>}
            </div>
          </div>

          <div className={styles.field}>
            <label htmlFor={fieldId("tools")}>Current website or tools (optional)</label>
            <input
              id={fieldId("tools")}
              name="tools"
              type="text"
              maxLength={800}
              value={fields.tools}
              aria-describedby={`${id}-tools-hint`}
              onChange={(event) => updateField("tools", event.target.value)}
            />
            <p id={`${id}-tools-hint`} className={styles.fieldHint}>
              A website address, the software you use, or both.
            </p>
          </div>

          <div className={styles.field}>
            <label htmlFor={fieldId("task")}>What do you want to build or change? (required)</label>
            <textarea
              ref={taskRef}
              id={fieldId("task")}
              name="task"
              rows={6}
              maxLength={4000}
              required
              value={fields.task}
              aria-invalid={errors.task ? true : undefined}
              aria-describedby={`${id}-task-hint${errors.task ? ` ${errorId("task")}` : ""}`}
              onChange={(event) => updateField("task", event.target.value)}
            />
            <p id={`${id}-task-hint`} className={styles.fieldHint}>
              Describe what happens now and what you would like to happen instead.
            </p>
            {errors.task && <p id={errorId("task")} className={styles.fieldError}>{errors.task}</p>}
          </div>

          <div className={styles.fieldPair}>
            <div className={styles.field}>
              <label htmlFor={fieldId("budget")}>Budget or range (optional)</label>
              <input
                id={fieldId("budget")}
                name="budget"
                type="text"
                maxLength={150}
                value={fields.budget}
                onChange={(event) => updateField("budget", event.target.value)}
              />
            </div>
            <div className={styles.field}>
              <label htmlFor={fieldId("timing")}>Timing (optional)</label>
              <input
                id={fieldId("timing")}
                name="timing"
                type="text"
                maxLength={150}
                value={fields.timing}
                aria-describedby={`${id}-timing-hint`}
                onChange={(event) => updateField("timing", event.target.value)}
              />
              <p id={`${id}-timing-hint`} className={styles.fieldHint}>
                A deadline, a rough window, or &ldquo;not sure yet.&rdquo;
              </p>
            </div>
          </div>

          <div className={styles.formActions}>
            <button type="submit" className={styles.primaryButton}>
              Prepare email draft
              <ArrowRightIcon size={24} weight="light" aria-hidden="true" />
            </button>
            <button type="reset" className={styles.clearButton}>Clear brief</button>
          </div>
        </fieldset>
      </form>

      <p className={styles.formStatus} role="status" aria-live="polite" aria-atomic="true">
        {status}
      </p>
      <p className={styles.localNote}>
        Your entries are used to prepare this draft in your browser. This form
        doesn&rsquo;t save them.
      </p>

      {draft && (
        <section className={styles.preview} aria-labelledby={`${id}-preview-title`}>
          <h3 id={`${id}-preview-title`} ref={previewHeadingRef} tabIndex={-1}>
            {draftIsCurrent ? "Your email draft." : "Your previous draft."}
          </h3>
          {!draftIsCurrent && (
            <p className={styles.previewChangeNote}>
              Your answers changed. Prepare the email draft again to include them.
            </p>
          )}
          <dl className={styles.emailDetails}>
            <div><dt>To</dt><dd>{contactEmail}</dd></div>
            <div><dt>Subject</dt><dd>{draft.subject}</dd></div>
          </dl>
          <label className={styles.previewLabel} htmlFor={`${id}-email-body`}>Email body</label>
          <textarea
            id={`${id}-email-body`}
            className={styles.draftBody}
            value={draft.body}
            readOnly
            rows={14}
            aria-describedby={`${id}-email-help`}
          />
          {draftIsCurrent && (
            <a className={styles.primaryButton} href={draft.href}>
              Open draft in your email app
              <ArrowRightIcon size={24} weight="light" aria-hidden="true" />
            </a>
          )}
          <p id={`${id}-email-help`} className={styles.emailHelp}>
            {draftIsCurrent ? (
              <>
                Your email app opens with this draft for you to review and send. If it
                doesn&rsquo;t open, copy the text above into an email to{" "}
                <a href={`mailto:${contactEmail}`}>{contactEmail}</a>.
              </>
            ) : (
              "This is the previous draft. Use Prepare email draft to update it before opening your email app."
            )}
          </p>
        </section>
      )}
    </div>
  );
}
