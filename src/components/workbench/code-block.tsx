"use client";

import { CopyButton } from "./shell";
import styles from "./workbench.module.css";

/**
 * A read-only code panel with copy and, optionally, download.
 *
 * The download href is a `data:` URL computed during render rather than an
 * object URL created in an effect: it needs no cleanup, works identically on
 * the server render, and keeps the button present in the first paint.
 */
export function CodeBlock({
  code,
  filename,
  downloadable,
}: {
  code: string;
  filename: string;
  downloadable?: boolean;
}) {
  const href = `data:text/css;charset=utf-8,${encodeURIComponent(code)}`;

  return (
    <div className={styles.codeWrap}>
      <div className={styles.codeHead}>
        <span className={styles.codeName}>{filename}</span>
        {downloadable ? (
          <a className={styles.codeButton} href={href} download={filename}>
            Download
          </a>
        ) : null}
        <CopyButton value={code} />
      </div>
      <pre className={styles.codeBody}>{code}</pre>
    </div>
  );
}
