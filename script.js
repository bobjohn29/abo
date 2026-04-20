const poll = document.querySelector("#family-poll");
const result = document.querySelector("#poll-result");
const modal = document.querySelector("#report-modal");
const reportCards = document.querySelectorAll("[data-report-id]");
const accountGate = document.querySelector("#account-gate");
const accountForm = document.querySelector("#account-form");
const accountError = document.querySelector("#account-error");
const accountStatus = document.querySelector("#account-status");
const accountStorageKey = "kalAccount";
const commentForm = document.querySelector("#comment-form");
const commentInput = document.querySelector("#comment-input");
const commentError = document.querySelector("#comment-error");
const commentsList = document.querySelector("#comments-list");
const commentsStorageKey = "kalComments";
const adminUsername = "Lukas";
let activeReportId = null;

const reportData = {
  "schule-start": {
    kicker: "Schulstart-Alarm",
    title: "Für Lukas fängt heute die Schule wieder an!",
    subtitle: "Neue Woche, neuer Stundenplan und die ganz große Frage: Wie lange bleibt die Motivation sichtbar?",
    location: "KAL-Schulredaktion",
    time: "20.04.2026 - 08:19 Uhr",
    visual: "Live-Bild vom Frühstücks- und Schulranzen-Einsatz",
    body: [
      "Heute beginnt für Lukas wieder der normale Schulalltag. Nach dem Wochenende laufen in der Familie bereits die ersten Vorbereitungen auf Hochtouren.",
      "Rucksack, Hefte und Stimmungslage wurden am Morgen geprüft. Beobachter melden eine Mischung aus Pflichtbewusstsein, leichter Unlust und routiniertem Chaos.",
      "Die Familienredaktion erwartet im Laufe des Tages weitere Entwicklungen rund um Hausaufgaben, Tischgespräche und die allgemeine Laune nach Schulschluss."
    ]
  },
  franzoesisch: {
    kicker: "Schul-Zoff",
    title: "Lukas schreibt vielleicht morgen Französisch nach, ohne zu lernen",
    subtitle: "Zwischen Hoffnung, Mut und fast gar keiner Vorbereitung spitzt sich die Lage weiter zu.",
    location: "Analyse aus dem Kinderzimmer",
    time: "20.04.2026 - 09:05 Uhr",
    visual: "Aktenlage: Französisch-Heft noch ungeöffnet",
    body: [
      "Innerhalb der Familie wird intensiv diskutiert, ob Lukas tatsächlich morgen ohne große Vorbereitung in eine Nachschreib-Situation geht.",
      "Während die Chancen laut Eigenbewertung angeblich stabil wirken, sehen neutrale Beobachter deutliche Lücken im Lernfortschritt.",
      "Ob am Abend noch ein spontanes Lernfenster eingelegt wird, ist offen. Der Ausgang der Lage bleibt damit eines der wichtigsten Bildungsthemen des Tages."
    ]
  },
  iphone: {
    kicker: "Technik-Entscheidung",
    title: "Papa bekommt das iPhone 17 Pro Max",
    subtitle: "Die Debatte über Sinn und Notwendigkeit ist intern praktisch beendet.",
    location: "Technikressort KAL",
    time: "20.04.2026 - 10:10 Uhr",
    visual: "Produktgrafik und Familienreaktionen in Vorbereitung",
    body: [
      "In der Familie sorgt die Nachricht über ein neues Spitzenmodell für die erwartbaren Reaktionen zwischen Begeisterung und skeptischen Rückfragen.",
      "Vor allem die Frage, ob das Upgrade wirklich nötig war, wurde zwar gestellt, aber nur sehr kurz behandelt.",
      "Fest steht: Sobald das Gerät im Haus ist, wird es zum dominierenden Technikthema der Woche."
    ]
  },
  kriegsgebiet: {
    kicker: "Haus-Lage",
    title: "Haus sieht aus wie im KRIEGSGEBIET",
    subtitle: "Mehrere Zimmer melden akuten Ausnahmezustand, geordnete Verhältnisse sind aktuell nicht sichtbar.",
    location: "Innenreport aus dem Haus",
    time: "20.04.2026 - 07:05 Uhr",
    visual: "Lagezentrum wertet verstreute Gegenstände aus",
    body: [
      "Am frühen Morgen haben mehrere Augenzeugen bestätigt, dass sich im Haus erneut eine größere Unordnung ausgebreitet hat.",
      "Betroffen sind insbesondere Oberflächen, Wege und strategisch wichtige Ablageorte, die zurzeit kaum als solche erkennbar sind.",
      "Ob eine koordinierte Aufräumaktion folgt oder die Lage weiter eskaliert, soll im weiteren Tagesverlauf entschieden werden."
    ]
  },
  tischregeln: {
    kicker: "Benimm-Frage",
    title: "Fängt Lukas an Regeln am Tisch zu befolgen?",
    subtitle: "Die Familie wartet weiter auf klare Anzeichen für eine nachhaltige Wende beim Essen.",
    location: "Beobachtung am Esstisch",
    time: "20.04.2026 - 10:20 Uhr",
    visual: "Tischkamera meldet gemischte Signale",
    body: [
      "Immer wieder steht dieselbe Frage im Raum: Kommt es endlich zu einem dauerhaften Durchbruch bei den Tischregeln?",
      "Bisher wechseln sich gute Phasen mit spontanen Rückfällen ab, was die Prognose für den heutigen Tag erschwert.",
      "Die Redaktionslinie bleibt klar: Jedes regelkonforme Verhalten wird registriert, jede neue Diskussion ebenso."
    ]
  },
  "kal-release": {
    kicker: "Digital-News",
    title: "Release der KAL Seite",
    subtitle: "Das Familienportal ist online und macht private Schlagzeilen jetzt offiziell sichtbar.",
    location: "Digitale Familienzentrale",
    time: "20.04.2026 - 12:45 Uhr",
    visual: "KAL-System meldet erfolgreichen Start",
    body: [
      "Mit dem Release der KAL Seite bekommt die Familie ihr eigenes digitales Nachrichtenportal im markanten Boulevard-Stil.",
      "Ab sofort können interne Geschichten, spontane Ereignisse und größere Familienmeldungen zentral präsentiert werden.",
      "Damit ist nicht nur die erste Ausgabe live, sondern auch die Grundlage für weitere Schlagzeilen, Abstimmungen und neue Formate gelegt."
    ]
  },
  "chaos-woche": {
    kicker: "Wochenstart",
    title: "Neue Woche sowie Neues Chaos beginnt",
    subtitle: "Der Montag setzt sofort den Ton: viel Bewegung, viele Themen und wenig Ruhe.",
    location: "KAL-Wochenüberblick",
    time: "20.04.2026 - 14:00 Uhr",
    visual: "Montagslage mit hohem Unruhepotenzial",
    body: [
      "Schon kurz nach Wochenbeginn zeigt sich, dass die kommenden Tage wieder reichlich Stoff für Schlagzeilen liefern werden.",
      "Schule, Organisation, Diskussionen und spontane Zwischenfälle zeichnen sich bereits in mehreren Bereichen ab.",
      "Die Redaktion rechnet deshalb mit einer ereignisreichen Woche und hält weitere Sondermeldungen für wahrscheinlich."
    ]
  },
  familientreffen: {
    kicker: "Familienanalyse",
    title: "Familientreffen war LANGWEILIG?",
    subtitle: "Interne Stimmen beklagen zu wenig Spannung und zu viele Gespräche ohne Nachrichtenwert.",
    location: "Nachbesprechung im Familienkreis",
    time: "20.04.2026 - 15:20 Uhr",
    visual: "Rückblick auf ein Treffen mit wenig Spektakel",
    body: [
      "Nach dem jüngsten Familientreffen mehren sich Stimmen, die das Ereignis rückblickend als eher ruhig und wenig aufregend einstufen.",
      "Kritiker verweisen vor allem auf lange Gesprächsphasen ohne große Wendungen oder unerwartete Momente.",
      "Andere wiederum loben genau diese Ruhe. Ein abschließendes Urteil konnte innerhalb der Familie noch nicht erzielt werden."
    ]
  },
  "lea-ipad": {
    kicker: "Verdachtsfall",
    title: "Versteckt Lea ein weiteres iPad?",
    subtitle: "Hinweise verdichten sich, doch ein endgültiger Beweis steht weiterhin aus.",
    location: "Ermittlungsgruppe Technik",
    time: "20.04.2026 - 16:05 Uhr",
    visual: "Diskrete Durchsuchung ohne offizielles Ergebnis",
    body: [
      "Die Frage nach einem möglicherweise weiteren iPad beschäftigt derzeit das investigative Ressort der Familie.",
      "Mehrere kleine Hinweise sorgen für Aufmerksamkeit, konkrete Funde wurden bislang jedoch nicht präsentiert.",
      "Damit bleibt der Fall offen und eignet sich bereits jetzt als einer der spannendsten Technik-Verdachtsmomente der Woche."
    ]
  },
  "m-niveau": {
    kicker: "Schulchance",
    title: "Schafft Lea es doch ins M-Niveau?",
    subtitle: "Zwischen Hoffnung und Rechnerei plant die Familie bereits vorsichtig für den Erfolgsfall.",
    location: "Schul- und Bildungsdesk",
    time: "20.04.2026 - 16:40 Uhr",
    visual: "Bildungsprognose mit vorsichtigem Optimismus",
    body: [
      "Die Diskussion um das mögliche M-Niveau hat innerhalb der Familie deutlich an Dynamik gewonnen.",
      "Während die Ausgangslage weiterhin ernst bewertet wird, mehren sich auch die Stimmen, die an einen erfolgreichen Weg glauben.",
      "Sollte es klappen, sind erste Ideen für Feierlichkeiten bereits im Umlauf. Noch ist es aber ein Thema mit offenem Ende."
    ]
  }
};

const modalTitle = document.querySelector("#report-modal-title");
const modalKicker = document.querySelector("#report-modal-kicker");
const modalSubtitle = document.querySelector("#report-modal-subtitle");
const modalVisual = document.querySelector("#report-modal-visual");
const modalVisualLabel = document.querySelector("#report-modal-visual-label");
const modalLocation = document.querySelector("#report-modal-location");
const modalTime = document.querySelector("#report-modal-time");
const modalBody = document.querySelector("#report-modal-body");

const reportVisualClasses = {
  "schule-start": "report-thumb--schule",
  franzoesisch: "report-thumb--franzoesisch",
  iphone: "report-thumb--iphone",
  kriegsgebiet: "report-thumb--kriegsgebiet",
  tischregeln: "report-thumb--tischregeln",
  "kal-release": "report-thumb--kal-release",
  "chaos-woche": "report-thumb--chaos-woche",
  familientreffen: "report-thumb--familientreffen",
  "lea-ipad": "report-thumb--lea-ipad",
  "m-niveau": "report-thumb--m-niveau"
};

const getCommentThreadKey = (reportId) => {
  const report = reportData[reportId];
  if (!report) {
    return "";
  }

  return `${reportId}::${report.title}`;
};

const readComments = () => {
  try {
    const rawValue = window.localStorage.getItem(commentsStorageKey);
    return rawValue ? JSON.parse(rawValue) : {};
  } catch {
    return {};
  }
};

const saveComments = (comments) => {
  window.localStorage.setItem(commentsStorageKey, JSON.stringify(comments));
};

const getAvatarClass = (gender) => {
  if (gender === "Männlich") {
    return "comment-card__avatar comment-card__avatar--male";
  }

  if (gender === "Weiblich") {
    return "comment-card__avatar comment-card__avatar--female";
  }

  return "comment-card__avatar comment-card__avatar--default";
};

const isAdminAccount = (account) => account?.username === adminUsername;

const renderComments = (reportId) => {
  if (!commentsList) {
    return;
  }

  const threadKey = getCommentThreadKey(reportId);
  const allComments = readComments();
  const comments = Array.isArray(allComments[threadKey]) ? allComments[threadKey] : [];
  const currentAccount = readAccount();
  const adminView = isAdminAccount(currentAccount);

  if (!comments.length) {
    commentsList.innerHTML = `<div class="comments-empty">Noch keine Kommentare. Schreib den ersten KAL-Kommentar zu dieser Schlagzeile.</div>`;
    return;
  }

  commentsList.innerHTML = comments
    .map((comment) => {
      const initial = comment.username?.trim()?.charAt(0)?.toUpperCase() || "?";
      const adminBadge = comment.username === adminUsername ? `<span class="comment-card__badge">Admin</span>` : "";
      const deleteButton = adminView
        ? `<div class="comment-card__actions"><button class="comment-card__delete" type="button" data-delete-comment="${comment.id}">Kommentar löschen</button></div>`
        : "";
      return `
        <article class="comment-card">
          <div class="${getAvatarClass(comment.gender)}" aria-hidden="true">${initial}</div>
          <div class="comment-card__content">
            <div class="comment-card__header">
              <span class="comment-card__name">${comment.username}</span>
              ${adminBadge}
              <span class="comment-card__meta">${comment.gender} · ${comment.createdAt}</span>
            </div>
            <p class="comment-card__text">${comment.text}</p>
            ${deleteButton}
          </div>
        </article>
      `;
    })
    .join("");
};

const openModal = (reportId) => {
  const report = reportData[reportId];

  if (!modal || !report) {
    return;
  }

  modalKicker.textContent = report.kicker;
  modalTitle.textContent = report.title;
  modalSubtitle.textContent = report.subtitle;
  modalLocation.textContent = report.location;
  modalTime.textContent = report.time;
  modalVisual.className = "report-modal__hero";
  const visualClass = reportVisualClasses[reportId];
  if (visualClass) {
    modalVisual.classList.add(visualClass);
  }
  modalVisualLabel.textContent = report.visual;
  modalBody.innerHTML = report.body.map((paragraph) => `<p>${paragraph}</p>`).join("");
  activeReportId = reportId;
  renderComments(reportId);
  if (commentError) {
    commentError.textContent = "";
  }
  if (commentInput) {
    commentInput.value = "";
  }

  modal.classList.add("is-open");
  modal.setAttribute("aria-hidden", "false");
  document.body.classList.add("modal-open");
};

const closeModal = () => {
  if (!modal) {
    return;
  }

  modal.classList.remove("is-open");
  modal.setAttribute("aria-hidden", "true");
  document.body.classList.remove("modal-open");
  activeReportId = null;
};

const applyAccount = (account) => {
  if (!accountStatus || !account?.username || !account?.gender) {
    return;
  }

  accountStatus.textContent = `${account.username} / ${account.gender}`;
};

const readAccount = () => {
  try {
    const rawValue = window.localStorage.getItem(accountStorageKey);
    return rawValue ? JSON.parse(rawValue) : null;
  } catch {
    return null;
  }
};

const showAccountGate = () => {
  if (!accountGate) {
    return;
  }

  accountGate.classList.add("is-open");
  accountGate.setAttribute("aria-hidden", "false");
  document.body.classList.add("account-gate-open");
};

const hideAccountGate = () => {
  if (!accountGate) {
    return;
  }

  accountGate.classList.remove("is-open");
  accountGate.setAttribute("aria-hidden", "true");
  document.body.classList.remove("account-gate-open");
};

const existingAccount = readAccount();

if (existingAccount?.username && existingAccount?.gender) {
  applyAccount(existingAccount);
} else {
  showAccountGate();
}

if (poll && result) {
  poll.addEventListener("submit", (event) => {
    event.preventDefault();

    const choice = new FormData(poll).get("vote");

    result.textContent = choice
      ? `Aktueller Favorit: ${choice}. Das Familienparlament hat deine Stimme registriert.`
      : "Bitte wähle erst eine Option aus, bevor du abstimmst.";
  });
}

if (accountForm) {
  accountForm.addEventListener("submit", (event) => {
    event.preventDefault();

    const formData = new FormData(accountForm);
    const username = `${formData.get("username") || ""}`.trim();
    const gender = `${formData.get("gender") || ""}`.trim();

    if (!username) {
      if (accountError) {
        accountError.textContent = "Bitte gib zuerst einen Benutzernamen ein.";
      }
      return;
    }

    if (!gender) {
      if (accountError) {
        accountError.textContent = "Bitte wähle ein Geschlecht aus.";
      }
      return;
    }

    const account = { username, gender };

    try {
      window.localStorage.setItem(accountStorageKey, JSON.stringify(account));
    } catch {
      if (accountError) {
        accountError.textContent = "Der Account konnte auf diesem Gerät nicht gespeichert werden.";
      }
      return;
    }

    if (accountError) {
      accountError.textContent = "";
    }

    applyAccount(account);
    hideAccountGate();
  });
}

if (commentForm) {
  commentForm.addEventListener("submit", (event) => {
    event.preventDefault();

    const account = readAccount();
    const text = `${new FormData(commentForm).get("comment") || ""}`.trim();

    if (!activeReportId) {
      return;
    }

    if (!account?.username || !account?.gender) {
      if (commentError) {
        commentError.textContent = "Bitte richte zuerst deinen Account ein.";
      }
      showAccountGate();
      return;
    }

    if (!text) {
      if (commentError) {
        commentError.textContent = "Bitte schreib erst einen Kommentar.";
      }
      return;
    }

    const threadKey = getCommentThreadKey(activeReportId);
    const allComments = readComments();
    const currentComments = Array.isArray(allComments[threadKey]) ? allComments[threadKey] : [];
    const createdAt = new Date().toLocaleString("de-DE", {
      day: "2-digit",
      month: "2-digit",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit"
    });

    currentComments.push({
      id: `${Date.now()}-${Math.random().toString(16).slice(2)}`,
      username: account.username,
      gender: account.gender,
      text,
      createdAt
    });

    allComments[threadKey] = currentComments;
    saveComments(allComments);

    if (commentInput) {
      commentInput.value = "";
      commentInput.focus();
    }

    if (commentError) {
      commentError.textContent = "";
    }

    renderComments(activeReportId);
  });
}

reportCards.forEach((card) => {
  card.addEventListener("click", () => {
    openModal(card.dataset.reportId);
  });

  card.addEventListener("keydown", (event) => {
    if (event.key === "Enter" || event.key === " ") {
      event.preventDefault();
      openModal(card.dataset.reportId);
    }
  });
});

modal?.addEventListener("click", (event) => {
  const target = event.target;

  if (!(target instanceof HTMLElement)) {
    return;
  }

  if (target.hasAttribute("data-close-modal")) {
    closeModal();
  }
});

document.addEventListener("keydown", (event) => {
  if (event.key === "Escape") {
    closeModal();
  }
});

commentsList?.addEventListener("click", (event) => {
  const target = event.target;

  if (!(target instanceof HTMLElement)) {
    return;
  }

  const commentId = target.getAttribute("data-delete-comment");

  if (!commentId || !activeReportId) {
    return;
  }

  const account = readAccount();
  if (!isAdminAccount(account)) {
    return;
  }

  const threadKey = getCommentThreadKey(activeReportId);
  const allComments = readComments();
  const currentComments = Array.isArray(allComments[threadKey]) ? allComments[threadKey] : [];
  allComments[threadKey] = currentComments.filter((comment) => comment.id !== commentId);
  saveComments(allComments);
  renderComments(activeReportId);
});
