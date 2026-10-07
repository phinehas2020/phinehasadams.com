"use client";

import { useEffect, useId, useRef, useState } from "react";
import { ArrowRight } from "@phosphor-icons/react/dist/ssr/ArrowRight";
import styles from "./AutomationExample.module.css";

const steps = ["Read the request", "Check the details", "Review the draft"];

function createDraftReply(model: string, address: string) {
  const filterModel = model.trim().replace(/\s+/g, " ");
  const deliveryAddress = address.trim().replace(/\s+/g, " ");
  const details = [
    filterModel ? `I have the filter model as ${filterModel}.` : "",
    deliveryAddress ? `I have the new delivery address as ${deliveryAddress}.` : "",
  ].filter(Boolean);
  const missingDetails = [
    !filterModel ? "the filter model" : "",
    !deliveryAddress ? "your new delivery address" : "",
  ].filter(Boolean);

  const question = missingDetails.length
    ? `Could you confirm ${missingDetails.join(" and ")}?`
    : "Please confirm that these details are correct.";

  return [
    "Thanks for your request for 12 filters.",
    [...details, question].join(" "),
    "The price still needs to be checked before I can confirm a total.",
  ].join("\n\n");
}

export default function AutomationExample() {
  const instanceId = useId();
  const [isOpen, setIsOpen] = useState(false);
  const [step, setStep] = useState(0);
  const [model, setModel] = useState("");
  const [address, setAddress] = useState("");
  const [announcement, setAnnouncement] = useState("");
  const triggerRef = useRef<HTMLButtonElement>(null);
  const stepHeadingRef = useRef<HTMLHeadingElement>(null);

  const panelId = `${instanceId}-walkthrough`;
  const stepHeadingId = `${instanceId}-step-heading`;
  const modelId = `${instanceId}-model`;
  const addressId = `${instanceId}-address`;
  const inputHintId = `${instanceId}-input-hint`;

  useEffect(() => {
    if (isOpen) stepHeadingRef.current?.focus();
  }, [isOpen, step]);

  function changeStep(nextStep: number) {
    setStep(nextStep);
    setAnnouncement(`Step ${nextStep + 1} of 3: ${steps[nextStep]}.`);
  }

  function toggleWalkthrough() {
    if (isOpen) {
      setIsOpen(false);
      setAnnouncement("Walkthrough closed.");
      triggerRef.current?.focus();
      return;
    }

    setIsOpen(true);
    setAnnouncement(`Step ${step + 1} of 3: ${steps[step]}.`);
  }

  function resetExample() {
    setModel("");
    setAddress("");
    setStep(0);
    setAnnouncement("Example reset. Step 1 of 3: Read the request.");
    if (step === 0) stepHeadingRef.current?.focus();
  }

  return (
    <section id="examples" className={styles.section} aria-labelledby={`${instanceId}-title`}>
      <div className={styles.inner}>
        <h2 id={`${instanceId}-title`} className={styles.heading}>
          See how I think through a task.
        </h2>

        <div className={styles.overview}>
          <div className={styles.request}>
            <p className={styles.label}>Fictional example</p>
            <blockquote className={styles.quote}>
              &ldquo;Can you send 12 of the same filters we bought last time?
              We&rsquo;ve moved shops. What&rsquo;s the total?&rdquo;
            </blockquote>
          </div>

          <div className={styles.readout}>
            <span className={styles.quantity}>12</span>
            <h3 className={styles.readoutHeading}>Quantity is clear.</h3>
            <p className={styles.summary}>
              The model, address, and price still need checking.
            </p>
            <button
              ref={triggerRef}
              type="button"
              className={styles.openButton}
              aria-expanded={isOpen}
              aria-controls={panelId}
              onClick={toggleWalkthrough}
            >
              {isOpen ? "Hide the walkthrough" : "Walk through the example"}
              <ArrowRight className={styles.linkIcon} weight="light" aria-hidden="true" />
            </button>
          </div>
        </div>

        <div
          id={panelId}
          className={styles.walkthrough}
          hidden={!isOpen}
          role="region"
          aria-labelledby={stepHeadingId}
        >
          <p className={styles.simulationNote}>
            An interactive example. Use made-up details.
          </p>

          <ol className={styles.steps} aria-label="Walkthrough steps">
            {steps.map((title, index) => (
              <li
                key={title}
                className={index === step ? styles.currentStep : undefined}
                aria-current={index === step ? "step" : undefined}
              >
                <span className={styles.stepNumber} aria-hidden="true">
                  {String(index + 1).padStart(2, "0")}
                </span>
                {title}
              </li>
            ))}
          </ol>

          <div className={styles.stepContent}>
            <h3
              id={stepHeadingId}
              ref={stepHeadingRef}
              tabIndex={-1}
              className={styles.stepHeading}
            >
              {steps[step]}
            </h3>

            {step === 0 && (
              <div className={styles.explanationGrid}>
                <p className={styles.explanation}>
                  &ldquo;12&rdquo; gives us a quantity. &ldquo;The same filters&rdquo;
                  doesn&rsquo;t give us a model, and the new shop address isn&rsquo;t
                  included. Those gaps need checking before an order moves forward.
                </p>
                <dl className={styles.facts}>
                  <div>
                    <dt>Quantity</dt>
                    <dd>12 filters, stated in the request</dd>
                  </div>
                  <div>
                    <dt>Filter model</dt>
                    <dd>Not given</dd>
                  </div>
                  <div>
                    <dt>New address</dt>
                    <dd>Not given</dd>
                  </div>
                  <div>
                    <dt>Price</dt>
                    <dd>Not given; cannot calculate a total</dd>
                  </div>
                </dl>
              </div>
            )}

            {step === 1 && (
              <div className={styles.explanationGrid}>
                <div>
                  <p className={styles.explanation}>
                    Add a fictional model or address to see how the reply changes.
                    Leave either blank and the draft will ask for it.
                  </p>
                  <p id={inputHintId} className={styles.detailNote}>
                    Both fields are optional. Use made-up details. The price
                    stays unknown because this example has no pricing source.
                  </p>
                </div>
                <div className={styles.fields}>
                  <div className={styles.field}>
                    <label htmlFor={modelId}>Filter model (optional)</label>
                    <input
                      id={modelId}
                      type="text"
                      value={model}
                      maxLength={120}
                      autoComplete="off"
                      aria-describedby={inputHintId}
                      onChange={(event) => setModel(event.target.value)}
                    />
                  </div>
                  <div className={styles.field}>
                    <label htmlFor={addressId}>New delivery address (optional)</label>
                    <input
                      id={addressId}
                      type="text"
                      value={address}
                      maxLength={180}
                      autoComplete="off"
                      aria-describedby={inputHintId}
                      onChange={(event) => setAddress(event.target.value)}
                    />
                  </div>
                </div>
              </div>
            )}

            {step === 2 && (
              <div className={styles.explanationGrid}>
                <div>
                  <p className={styles.explanation}>
                    A person checks the reply before using it. Any details you
                    entered are included for confirmation; missing details are
                    requested, and the price is never guessed.
                  </p>
                  <p className={styles.detailNote}>
                    This is a draft only. You can go back to change the details.
                    Nothing has been ordered or emailed.
                  </p>
                </div>
                <div className={styles.draftBox}>
                  <p className={styles.draftLabel}>Draft reply · for review</p>
                  <p className={styles.draft}>{createDraftReply(model, address)}</p>
                </div>
              </div>
            )}
          </div>

          <div className={styles.controls}>
            <div className={styles.stepControls}>
              <button
                type="button"
                className={styles.secondaryButton}
                disabled={step === 0}
                onClick={() => changeStep(step - 1)}
              >
                Back
              </button>
              {step < 2 && (
                <button
                  type="button"
                  className={styles.nextButton}
                  onClick={() => changeStep(step + 1)}
                >
                  {step === 0 ? "Check missing details" : "Prepare a draft"}
                </button>
              )}
            </div>
            <button type="button" className={styles.resetButton} onClick={resetExample}>
              Reset example
            </button>
          </div>
        </div>

        <p className={styles.srOnly} role="status" aria-live="polite" aria-atomic="true">
          {announcement}
        </p>
      </div>
    </section>
  );
}
