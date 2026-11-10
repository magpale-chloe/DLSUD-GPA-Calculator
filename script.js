// DLSUD-GPA-Calculator

// [grade, minimum %]. Anything below 60% is 0.00.
const SCALE_TABLE = [
    [4.00, 98], [3.75, 95], [3.50, 92], [3.25, 89], [3.00, 86], [2.75, 83], [2.50, 80],
    [2.25, 77], [2.00, 74], [1.75, 71], [1.50, 68], [1.25, 64], [1.00, 60], [0.00, 0],
];

const SCALE = SCALE_TABLE.map(([grade, min], i) => {
    const upper = i === 0 ? 100 : SCALE_TABLE[i - 1][1] - 0.01;
    const range = grade === 0 ? "Below 60" : `${min}–${i === 0 ? 100 : upper.toFixed(2)}`;
    const t = i / (SCALE_TABLE.length - 2);
    const color = grade === 0 ? "#cf3b2f" : `hsl(148 ${Math.round(100 - t * 45)}% ${Math.round(16 + t * 40)}%)`;
    return { min: grade === 0 ? -Infinity : min, grade, range, color };
});

const HONORS = [
    { min: 3.76, label: "Summa Cum Laude" },
    { min: 3.51, label: "Magna Cum Laude" },
    { min: 3.26, label: "Cum Laude" },
];

// Built-in curricula (subjects and units only, no grades).
// To add a program, add another entry:
// { name, terms: [{ short, label, subjects: [[code, title, units], ...] }] }
const PROGRAMS = [
    {
        name: "BSIT · Web Development",
        terms: [
            {
                short: "1·1", label: "1st Year · 1st Sem",
                subjects: [
                    ["G-SOCS001", "Babasahin Hinggil sa Kasaysayan ng Pilipinas", 3],
                    ["S-ITCS112LA", "Fundamentals of Programming Lab", 1],
                    ["S-ITCS112", "Fundamentals of Programming Lec", 2],
                    ["S-ITCS111LA", "Introduction to Computing Lab", 1],
                    ["S-ITCS111", "Introduction to Computing Lec", 2],
                    ["G-MATH100", "Mathematics in the Modern World", 3],
                    ["D-REED001", "Our Christian Faith and Lasallian Identity", 3],
                    ["G-PATHFIT1", "Physical Activities Towards Health and Fitness 1 (PATHFIT1): Movement Competency Training", 2],
                    ["D-SEPR000", "Student Engagement Program", 0],
                    ["G-NSTP001", "Towards One Goal: Social Transformation", 3],
                    ["G-PSYC101", "Understanding the Self", 3],
                ],
            },
            {
                short: "1·2", label: "1st Year · 2nd Sem",
                subjects: [
                    ["D-REED002", "Christian Discipleship in the Modern World", 3],
                    ["G-NSTP002", "Community Service by Focus Programs: Health, Education, Livelihood, Pastoral and Self Governance", 3],
                    ["G-FILI101", "Diskurso sa Filipino", 3],
                    ["G-ENGL101", "English for Purposive Communication", 3],
                    ["S-SCEN001TP", "Environmental Science", 3],
                    ["S-ITPC121LA", "Fundamentals of Database Systems Lab", 1],
                    ["S-ITPC121", "Fundamentals of Database Systems Lec", 2],
                    ["S-ITCS123LA", "Intermediate Programming Lab", 1],
                    ["S-ITCS123", "Intermediate Programming Lec", 2],
                    ["G-PATHFIT3", "Physical Activities Toward Health and Fitness 3 (PATHFIT3) Individual-Dual Sports/Dance", 2],
                ],
            },
            {
                short: "2·1", label: "2nd Year · 1st Sem",
                subjects: [
                    ["G-HUMA003", "Art Appreciation", 3],
                    ["D-REED003", "Christian Commitment in Contemporary Society", 3],
                    ["S-ITCS214LA", "Data Structures and Algorithms Lab", 1],
                    ["S-ITCS214", "Data Structures and Algorithms Lec", 2],
                    ["S-ITPC212", "Discrete Mathematics", 3],
                    ["B-ENTR000", "Entrepreneurial Mindset", 3],
                    ["S-ITCS215LA", "Human Computer Interaction Lab", 1],
                    ["S-ITCS215", "Human Computer Interaction Lec", 2],
                    ["S-ITPE001LA", "IT Professional Elective Lab", 1],
                    ["S-ITPE001", "IT Professional Elective Lec", 2],
                    ["G-PATHFIT2", "Physical Activities Toward Health and Fitness 2 (PATHFIT2) Exercise-Based Fitness Activities", 2],
                ],
            },
            {
                short: "2·2", label: "2nd Year · 2nd Sem",
                subjects: [
                    ["S-ITCS227LA", "Application Development and Emerging Technologies Lab", 1],
                    ["S-ITCS227", "Application Development and Emerging Technologies Lec", 2],
                    ["G-HUMA002", "Ethics", 3],
                    ["S-ITCS226LA", "Information Management Lab", 1],
                    ["S-ITCS226", "Information Management Lec", 2],
                    ["S-ITPC224LA", "Networking 1 Lab", 1],
                    ["S-ITPC224", "Networking 1 Lec", 2],
                    ["G-PATHFIT4", "Physical Activities Toward Health and Fitness 4 (PATHFIT4) Team Sports", 2],
                    ["S-ITPC223", "Quantitative Methods", 3],
                    ["G-SCTS001", "Science, Technology and Society", 3],
                    ["D-REED004", "The Catholic Social Teaching and Our Social Responsibility", 3],
                ],
            },
            {
                short: "3·1", label: "3rd Year · 1st Sem",
                subjects: [
                    ["S-ITCS318LA", "Information Assurance and Security 1 Lab", 1],
                    ["S-ITCS318", "Information Assurance and Security 1 Lec", 2],
                    ["S-ITPC316LA", "Integrative Programming Technologies 1 Lab", 1],
                    ["S-ITPC316", "Integrative Programming Technologies 1 Lec", 2],
                    ["S-ITPE002", "IT Professional Elective Lec", 2],
                    ["S-ITPE002LA", "IT Professional Elective Lab", 1],
                    ["S-ITWB312LA", "Mobile Enterprise Systems Lab", 1],
                    ["S-ITWB312", "Mobile Enterprise Systems Lec", 2],
                    ["S-ITPC315LA", "Networking 2 Lab", 1],
                    ["S-ITPC315", "Networking 2 Lec", 2],
                    ["G-SOCS003", "The Contemporary World", 3],
                    ["S-ITWB311LA", "Web Development Lab", 1],
                    ["S-ITWB311", "Web Development Lec", 2],
                ],
            },
            {
                short: "3·2", label: "3rd Year · 2nd Sem",
                subjects: [
                    ["G-SOCS002", "Ang Buhay at mga Akda ni Rizal", 3],
                    ["S-ITCP322", "Capstone Project 1", 3],
                    ["D-ENGL003", "English in the Workplace", 3],
                    ["S-ITPC327LA", "Information Assurance and Security 2 Lab", 1],
                    ["S-ITPC327", "Information Assurance and Security 2 Lec", 2],
                    ["S-ITWB323LA", "Multimedia Systems Lab", 1],
                    ["S-ITWB323", "Multimedia Systems Lec", 2],
                    ["S-ITCS329", "Social Issues and Professional Practice", 3],
                    ["S-ITPC328LA", "Systems Integration and Architecture 1 Lab", 1],
                    ["S-ITPC328", "Systems Integration and Architecture 1 Lec", 2],
                ],
            },
            {
                short: "ST", label: "Special Term",
                subjects: [
                    ["S-ITWB344LA", "Internet Languages and Tools 1 Lab", 1],
                    ["S-ITWB344", "Internet Languages and Tools 1 Lec", 2],
                    ["S-ITPE003LA", "IT Professional Elective Lab", 1],
                    ["S-ITPE003", "IT Professional Elective Lec", 2],
                ],
            },
            {
                short: "4·1", label: "4th Year · 1st Sem",
                subjects: [
                    ["S-ITCP412", "Capstone Project 2", 3],
                    ["S-ITWB416LA", "Graphic Design Lab", 1],
                    ["S-ITWB416", "Graphic Design Lec", 2],
                    ["S-ITWB415LA", "Internet Languages and Tools 2 Lab", 1],
                    ["S-ITWB415", "Internet Languages and Tools 2 Lec", 2],
                    ["S-ITPE006LA", "IT Professional Elective Lab", 1],
                    ["S-ITPE006", "IT Professional Elective Lec", 2],
                    ["S-ITPC419LA", "Systems Administration and Maintenance Lab", 1],
                    ["S-ITPC419", "Systems Administration and Maintenance Lec", 2],
                ],
            },
        ],
    },
];

/** A term's subjects as [displayName, units] pairs for the sheet. */
const termSubjects = term => term.subjects.map(([code, title, units]) => [`${code} · ${title}`, units]);

const STORAGE_KEY = "dlsud-gpa-calculator:v3";
const RING_C = 2 * Math.PI * 58;
const $ = s => document.querySelector(s);
const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

/* ---------------- Helpers ---------------- */

const getEquivalent = pct => SCALE.find(s => pct >= s.min);

function getHonors(gpa) {
    const r = Math.round(gpa * 100) / 100;
    return HONORS.find(h => r >= h.min) || null;
}

function num(v) {
    if (v === "" || v == null) return null;
    const n = Number(v);
    return Number.isFinite(n) ? n : NaN;
}

const badPct = v => v !== null && (Number.isNaN(v) || v < 0 || v > 100);
const fmtUnits = n => (Number.isInteger(n) ? String(n) : n.toFixed(1));

function courseGrade(c) {
    if (state.mode === "grade") {
        const s = SCALE.find(x => x.grade.toFixed(2) === c.grade);
        return s ? { grade: s.grade } : null;
    }
    const mid = num(c.mid), fin = num(c.fin);
    if (badPct(mid) || badPct(fin)) return null;
    const vals = [mid, fin].filter(v => v !== null);
    if (!vals.length) return null;
    const pct = vals.reduce((a, b) => a + b, 0) / vals.length;
    return { grade: getEquivalent(pct).grade, pct };
}

/* ---------------- State ---------------- */

let uid = 0;
const newCourse = (name = "", units = 3) => ({ id: ++uid, name, units: String(units), grade: "", mid: "", fin: "" });

let state = {
    theme: "light",
    mode: "grade",
    courses: [newCourse()],
    plan: { cgpa: "", units: "", target: "", remaining: "" },
    saved: [], // [{ name, subjects: [[name, units], ...] }]
};

function load() {
    try {
        const s = JSON.parse(localStorage.getItem(STORAGE_KEY));
        if (!s || !Array.isArray(s.courses)) return;
        state.theme = s.theme === "dark" ? "dark" : "light";
        state.mode = s.mode === "percent" ? "percent" : "grade";
        state.plan = { ...state.plan, ...s.plan };
        if (Array.isArray(s.saved)) {
            state.saved = s.saved.filter(l => l && typeof l.name === "string" && Array.isArray(l.subjects));
        }
        state.courses = s.courses.map(c => ({ ...newCourse(), ...c, id: ++uid }));
        if (!state.courses.length) state.courses = [newCourse()];
    } catch (_) { /* ignore */ }
}

let saveTimer;
function save() {
    clearTimeout(saveTimer);
    saveTimer = setTimeout(() => {
        try {
            localStorage.setItem(STORAGE_KEY, JSON.stringify({
                ...state,
                courses: state.courses.map(({ id, ...c }) => c),
            }));
        } catch (_) { /* storage unavailable */ }
    }, 150);
}

/* ---------------- Rows ---------------- */

const sheet = $("#sheet");
const rows = $("#rows");
const byId = id => state.courses.find(c => c.id === Number(id));

const GRADE_OPTIONS =
    `<option value="">Select…</option>` +
    SCALE.map(s => `<option value="${s.grade.toFixed(2)}">${s.grade.toFixed(2)}  (${s.range}%)</option>`).join("");

function buildRow(c, animate) {
    const el = document.createElement("div");
    el.className = "sheet-row row" + (animate ? " entering" : "");
    el.dataset.id = c.id;
    el.innerHTML = `
        <span class="c-idx"></span>
        <div class="c-name"><input class="name" type="text" placeholder="Subject name or code" aria-label="Subject"></div>
        <div class="c-units" data-label="Units"><input class="f-units" type="number" min="0" step="0.5" aria-label="Units"></div>
        <div class="c-grade" data-label="Grade"><select class="f-grade" aria-label="Grade">${GRADE_OPTIONS}</select></div>
        <div class="c-mid" data-label="Midterm %"><input class="f-mid" type="number" min="0" max="100" step="0.01" placeholder="—" aria-label="Midterm percentage"></div>
        <div class="c-fin" data-label="Final %"><input class="f-fin" type="number" min="0" max="100" step="0.01" placeholder="—" aria-label="Final percentage"></div>
        <div class="c-eq" data-label="Grade"><span class="eq-badge">—</span></div>
        <div class="c-pts" data-label="Points">—</div>
        <div class="c-rm">
            <button type="button" class="remove" aria-label="Remove subject" title="Remove subject">
                <svg viewBox="0 0 24 24"><path d="M3 6h18M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6M8 6V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"/></svg>
            </button>
        </div>`;
    el.querySelector(".name").value = c.name;
    el.querySelector(".f-units").value = c.units;
    const sel = el.querySelector(".f-grade");
    sel.value = c.grade;
    sel.classList.toggle("empty", sel.value === "");
    el.querySelector(".f-mid").value = c.mid;
    el.querySelector(".f-fin").value = c.fin;
    el.addEventListener("animationend", () => el.classList.remove("entering"), { once: true });
    return el;
}

function renderRows(animate = false) {
    rows.innerHTML = "";
    state.courses.forEach((c, i) => {
        const el = buildRow(c, animate);
        if (animate) el.style.animationDelay = `${Math.min(i, 12) * 25}ms`;
        rows.appendChild(el);
    });
    applyMode();
    renumber();
    calculate();
}

function applyMode() {
    sheet.classList.toggle("percent", state.mode === "percent");
    $("#mode-hint").textContent = state.mode === "grade"
        ? "Choose a grade for each subject."
        : "Type your midterm and final percentages. They're averaged, then converted.";
}

function renumber() {
    rows.querySelectorAll(".row:not(.leaving) .c-idx").forEach((el, i) => (el.textContent = i + 1));
}

rows.addEventListener("input", e => {
    const row = e.target.closest(".row");
    const c = row && byId(row.dataset.id);
    if (!c) return;
    const t = e.target;
    if (t.classList.contains("name")) c.name = t.value;
    else if (t.classList.contains("f-units")) c.units = t.value;
    else if (t.classList.contains("f-mid")) c.mid = t.value;
    else if (t.classList.contains("f-fin")) c.fin = t.value;
    else if (t.classList.contains("f-grade")) {
        c.grade = t.value;
        t.classList.toggle("empty", t.value === "");
    }
    calculate();
});

rows.addEventListener("click", e => {
    const btn = e.target.closest(".remove");
    if (btn) removeRow(btn.closest(".row"));
});

// Enter in the last subject name adds a new row.
rows.addEventListener("keydown", e => {
    if (e.key !== "Enter" || !e.target.classList.contains("name")) return;
    e.preventDefault();
    const row = e.target.closest(".row");
    if (row === rows.querySelector(".row:not(.leaving):last-child")) addCourse(true);
    else row.nextElementSibling?.querySelector(".name").focus();
});

function removeRow(row) {
    state.courses = state.courses.filter(c => c.id !== Number(row.dataset.id));
    const done = () => {
        row.remove();
        if (!state.courses.length) addCourse();
        renumber();
    };
    row.classList.add("leaving");
    if (reduceMotion) done();
    else row.addEventListener("animationend", done, { once: true });
    renumber();
    calculate();
}

function addCourse(focus = false) {
    const c = newCourse();
    state.courses.push(c);
    const el = buildRow(c, true);
    rows.appendChild(el);
    renumber();
    if (focus) el.querySelector(".name").focus();
    calculate();
}

$("#add-course").addEventListener("click", () => addCourse(true));

/* ---------------- Load subjects modal ---------------- */

const presetModal = $("#preset-modal");
const sumUnits = list => list.reduce((a, [, u]) => a + (Number(u) || 0), 0);
const esc = s => s.replace(/[&<>"']/g, ch => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[ch]));

const TRASH_ICON = `<svg viewBox="0 0 24 24"><path d="M3 6h18M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6M8 6V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"/></svg>`;

function pickItem({ badge, title, detail, action, index, deletable }) {
    return `<li class="pick">
        <button type="button" class="pick-main" data-action="${action}" data-index="${index}">
            <span class="pick-badge">${esc(badge)}</span>
            <span class="pick-text"><b>${esc(title)}</b><small>${esc(detail)}</small></span>
        </button>
        ${deletable ? `<button type="button" class="pick-del" data-action="delete" data-index="${index}" aria-label="Delete ${esc(title)}">${TRASH_ICON}</button>` : ""}
    </li>`;
}

function renderPickers() {
    $("#program-list").innerHTML = PROGRAMS.map((p, pi) =>
        `<li class="pick-group">${esc(p.name)}</li>` +
        p.terms.map((t, ti) => {
            const list = termSubjects(t);
            return pickItem({
                badge: t.short,
                title: t.label,
                detail: `${list.length} subjects · ${fmtUnits(sumUnits(list))} units`,
                action: "program",
                index: `${pi}:${ti}`,
            });
        }).join("")
    ).join("");

    $("#saved-list").innerHTML = state.saved.map((l, i) => pickItem({
        badge: l.name.trim().charAt(0).toUpperCase() || "★",
        title: l.name,
        detail: `${l.subjects.length} subjects · ${fmtUnits(sumUnits(l.subjects))} units`,
        action: "saved",
        index: i,
        deletable: true,
    })).join("");
    $("#saved-empty").hidden = state.saved.length > 0;
}

function setPresetTab(name) {
    presetModal.querySelector(".tabs3").dataset.active = name;
    presetModal.querySelectorAll("[data-ptab]").forEach(b => b.setAttribute("aria-selected", String(b.dataset.ptab === name)));
    presetModal.querySelectorAll("[data-panel]").forEach(p => (p.hidden = p.dataset.panel !== name));
}

/** Close a <dialog> with its exit animation; resolves once it's closed. */
function closeDialog(dlg) {
    return new Promise(resolve => {
        if (!dlg.open) return resolve();
        let finished = false;
        const done = () => {
            if (finished) return;
            finished = true;
            dlg.classList.remove("closing");
            dlg.close();
            resolve();
        };
        if (reduceMotion) return done();
        dlg.classList.add("closing");
        dlg.addEventListener("animationend", done, { once: true });
        setTimeout(done, 300); // fallback if animations don't run (e.g. background tab)
    });
}

$("#load-preset").addEventListener("click", () => {
    renderPickers();
    setPresetTab("programs");
    presetModal.showModal();
});

presetModal.addEventListener("click", e => {
    if (e.target === presetModal || e.target.closest("[data-close]")) return closeDialog(presetModal);
    const tab = e.target.closest("[data-ptab]");
    if (tab) return setPresetTab(tab.dataset.ptab);

    const act = e.target.closest("[data-action]");
    if (!act) return;
    const i = Number(act.dataset.index);
    if (act.dataset.action === "program") {
        const [pi, ti] = act.dataset.index.split(":").map(Number);
        const p = PROGRAMS[pi], t = p.terms[ti];
        applySubjects(termSubjects(t), `${p.name} (${t.label})`);
    } else if (act.dataset.action === "saved") applySubjects(state.saved[i].subjects, state.saved[i].name);
    else if (act.dataset.action === "delete") {
        const [removed] = state.saved.splice(i, 1);
        save();
        renderPickers();
        toast(`Deleted "${removed.name}"`);
    }
});

presetModal.addEventListener("cancel", e => { e.preventDefault(); closeDialog(presetModal); });

$("#save-form").addEventListener("submit", e => {
    e.preventDefault();
    const name = $("#save-name").value.trim();
    const subjects = state.courses
        .filter(c => c.name.trim())
        .map(c => [c.name.trim(), num(c.units) >= 0 ? num(c.units) : 3]);
    if (!name) return;
    if (!subjects.length) { toast("Add at least one named subject first"); return; }
    const existing = state.saved.findIndex(l => l.name.toLowerCase() === name.toLowerCase());
    if (existing >= 0) state.saved[existing].subjects = subjects;
    else state.saved.push({ name, subjects });
    $("#save-name").value = "";
    save();
    renderPickers();
    toast(`Saved "${name}" (${subjects.length} subjects)`);
});

/** Parse pasted lines like "CODE Title   2" or "Title, 3" into [name, units]. */
function parsePaste(text) {
    return text.split(/\r?\n/)
        .map(line => line.replace(/\t+/g, "  ").trim())
        .filter(Boolean)
        .map(line => {
            const m = line.match(/^(.*?)[\s,;|\t]+(\d+(?:\.\d+)?)\s*(?:units?)?$/i);
            const clean = s => s.replace(/[\s,;|]+$/, "").replace(/\s+/g, " ").trim();
            if (m && m[1].trim() && Number(m[2]) <= 12) return [clean(m[1]), Number(m[2])];
            return [clean(line), 3];
        });
}

$("#paste-box").addEventListener("input", () => {
    const list = parsePaste($("#paste-box").value);
    $("#paste-use").disabled = list.length === 0;
    $("#paste-preview").innerHTML = list.length
        ? `Found <b>${list.length}</b> subject${list.length === 1 ? "" : "s"} · <b>${fmtUnits(sumUnits(list))}</b> units`
        : "Lines without units will default to 3 units.";
});

$("#paste-use").addEventListener("click", () => {
    const list = parsePaste($("#paste-box").value);
    if (list.length) applySubjects(list, "your pasted list", () => { $("#paste-box").value = ""; });
});

async function applySubjects(list, label, after) {
    await closeDialog(presetModal);
    const hasData = state.courses.some(c => c.name || c.grade || c.mid || c.fin);
    if (hasData && !(await confirmModal({
        title: "Replace your subjects?",
        text: `Your current subjects and grades will be replaced with ${list.length} subjects from ${label}.`,
        confirm: "Replace",
    }))) return;
    state.courses = list.map(([n, u]) => newCourse(n, u));
    renderRows(true);
    after?.();
    toast(`Loaded ${list.length} subjects`);
}

$("#reset-all").addEventListener("click", async () => {
    if (!(await confirmModal({
        title: "Clear everything?",
        text: "All subjects, grades and planner values will be removed. This can't be undone.",
        confirm: "Clear all",
        danger: true,
    }))) return;
    state.courses = [newCourse()];
    state.plan = { cgpa: "", units: "", target: "", remaining: "" };
    Object.values(planInputs).forEach(i => (i.value = ""));
    renderRows(true);
    toast("Everything cleared");
});

document.querySelectorAll('input[name="mode"]').forEach(r =>
    r.addEventListener("change", () => {
        state.mode = r.value;
        applyMode();
        calculate();
    }));

/* ---------------- Calculation ---------------- */

let term = { gpa: null, units: 0, points: 0 };
let shown = 0;
let lastTier = -1;

function calculate() {
    let points = 0, units = 0, graded = 0;
    const live = rows.querySelectorAll(".row:not(.leaving)");

    live.forEach(row => {
        const c = byId(row.dataset.id);
        if (!c) return;
        const u = num(c.units);
        row.querySelector(".f-units").classList.toggle("invalid", u !== null && (Number.isNaN(u) || u < 0));
        row.querySelector(".f-mid").classList.toggle("invalid", badPct(num(c.mid)));
        row.querySelector(".f-fin").classList.toggle("invalid", badPct(num(c.fin)));

        const g = courseGrade(c);

        const badge = row.querySelector(".eq-badge");
        const text = g ? g.grade.toFixed(2) : "—";
        if (badge.textContent !== text) {
            badge.textContent = text;
            badge.className = "eq-badge" + (g ? (g.grade === 0 ? " fail" : " ok") : "");
            badge.title = g && g.pct !== undefined ? `Average ${g.pct.toFixed(2)}%` : "";
            if (g && !reduceMotion) { void badge.offsetWidth; badge.classList.add("pop"); }
        }

        const ptsEl = row.querySelector(".c-pts");
        const valid = g && u !== null && !Number.isNaN(u) && u > 0;
        ptsEl.lastChild.textContent = valid ? (g.grade * u).toFixed(2) : "—";
        ptsEl.classList.toggle("has", !!valid);

        if (!g) return;
        graded++;
        if (!valid) return;
        points += g.grade * u;
        units += u;
    });

    $("#total-units").textContent = fmtUnits(units);
    $("#total-points").textContent = points.toFixed(2);
    $("#graded-count").textContent = `${graded} of ${live.length} graded`;

    term = { gpa: units > 0 ? points / units : null, units, points };
    renderScore();
    renderPlan();
    save();
}

function renderScore() {
    const { gpa } = term;
    const value = gpa ?? 0;

    $("#ring").style.strokeDashoffset = RING_C * (1 - value / 4);
    countTo($("#gpa-value"), shown, value, gpa === null);
    shown = value;

    $("#gpa-exact").textContent = gpa === null
        ? "Pick grades to begin"
        : `Exact: ${gpa.toFixed(4)} · ${fmtUnits(term.units)} units`;

    const honor = gpa === null ? null : getHonors(gpa);
    const tier = honor ? HONORS.indexOf(honor) : HONORS.length; // 0 = Summa
    document.querySelectorAll(".ladder li").forEach((li, i) => {
        li.classList.toggle("reached", gpa !== null && i >= tier);
        li.classList.toggle("current", gpa !== null && i === tier);
    });

    if (honor && lastTier !== -1 && tier < lastTier) burst();
    lastTier = gpa === null ? -1 : tier;

    const hint = $("#next-hint");
    if (gpa === null) hint.textContent = "";
    else {
        const r = Math.round(gpa * 100) / 100;
        const next = [...HONORS].reverse().find(h => r < h.min);
        hint.textContent = next ? `${(next.min - r).toFixed(2)} away from ${next.label}` : "Highest honor reached 🎓";
    }
}

const raf = new WeakMap();
function countTo(el, from, to, empty) {
    cancelAnimationFrame(raf.get(el));
    if (empty) { el.textContent = "–.––"; return; }
    if (reduceMotion || from === to) { el.textContent = to.toFixed(2); return; }
    const t0 = performance.now(), dur = 700;
    const tick = now => {
        const t = Math.min(1, (now - t0) / dur);
        el.textContent = (from + (to - from) * (1 - Math.pow(1 - t, 4))).toFixed(2);
        if (t < 1) raf.set(el, requestAnimationFrame(tick));
    };
    raf.set(el, requestAnimationFrame(tick));
}

function burst() {
    if (reduceMotion) return;
    const box = $("#burst");
    box.innerHTML = "";
    const colors = ["#12a150", "#7ee2a1", "#00703c", "#b6f09c"];
    for (let i = 0; i < 24; i++) {
        const a = (Math.PI * 2 * i) / 24 + Math.random() * 0.3;
        const d = 80 + Math.random() * 50;
        const p = document.createElement("i");
        p.style.setProperty("--x", `${Math.cos(a) * d}px`);
        p.style.setProperty("--y", `${Math.sin(a) * d}px`);
        p.style.setProperty("--r", `${Math.random() * 540}deg`);
        p.style.setProperty("--c", colors[i % colors.length]);
        box.appendChild(p);
    }
    setTimeout(() => (box.innerHTML = ""), 1000);
}

/* ---------------- Planner ---------------- */

const planInputs = {
    cgpa: $("#plan-cgpa"),
    units: $("#plan-units"),
    target: $("#plan-target"),
    remaining: $("#plan-remaining"),
};

Object.entries(planInputs).forEach(([k, input]) =>
    input.addEventListener("input", () => { state.plan[k] = input.value; renderPlan(); save(); }));

document.querySelectorAll(".goal-chips button").forEach(b =>
    b.addEventListener("click", () => {
        planInputs.target.value = state.plan.target = b.dataset.target;
        renderPlan();
        save();
    }));

function renderPlan() {
    const p = state.plan;
    const cgpa = num(p.cgpa), earned = num(p.units), target = num(p.target), rem = num(p.remaining);
    const bad = (v, max) => v !== null && (Number.isNaN(v) || v < 0 || (max !== undefined && v > max));

    planInputs.cgpa.classList.toggle("invalid", bad(cgpa, 4));
    planInputs.units.classList.toggle("invalid", bad(earned));
    planInputs.target.classList.toggle("invalid", bad(target, 4));
    planInputs.remaining.classList.toggle("invalid", bad(rem));
    document.querySelectorAll(".goal-chips button").forEach(b =>
        b.classList.toggle("active", target !== null && Number(b.dataset.target) === target));

    const priorOk = cgpa !== null && earned !== null && !bad(cgpa, 4) && !bad(earned);
    const priorPts = priorOk ? cgpa * earned : 0;
    const priorU = priorOk ? earned : 0;
    const totalU = priorU + term.units;
    const totalPts = priorPts + term.points;

    const proj = $("#plan-projected"), projNote = $("#plan-projected-note");
    if (!priorOk) {
        proj.textContent = "—";
        projNote.textContent = "Fill in both fields above";
    } else if (totalU === 0) {
        proj.textContent = "—";
        projNote.textContent = "Add subjects with grades first";
    } else {
        const v = totalPts / totalU;
        proj.textContent = v.toFixed(2);
        const h = getHonors(v);
        projNote.textContent = `${h ? h.label : "Below honors range"} · ${fmtUnits(totalU)} units total`;
    }

    const box = $("#need-box"), need = $("#plan-needed"), note = $("#plan-needed-note");
    box.classList.remove("bad");
    if (target === null || rem === null || bad(target, 4) || bad(rem) || rem === 0) {
        need.textContent = "—";
        note.textContent = "Fill in both fields above";
        return;
    }
    const required = (target * (totalU + rem) - totalPts) / rem;
    if (required > 4) {
        box.classList.add("bad");
        need.textContent = required.toFixed(2);
        note.textContent = "Over 4.00, so this goal can't be reached";
    } else if (required <= 0) {
        need.textContent = "0.00";
        note.textContent = "You'll stay above this goal regardless";
    } else {
        need.textContent = required.toFixed(2);
        note.textContent = `Average needed over your next ${fmtUnits(rem)} units`;
    }
}

/* ---------------- Scale tables ---------------- */

const half = Math.ceil(SCALE.length / 2);
$("#scale-tables").innerHTML = [SCALE.slice(0, half), SCALE.slice(half)].map(part => `
    <table class="scale">
        <thead><tr><th>Grade</th><th>Percentage</th></tr></thead>
        <tbody>${part.map(s => `
            <tr${s.grade === 0 ? ' class="fail"' : ""}>
                <td><span class="swatch" style="background:${s.color}"></span>${s.grade.toFixed(2)}</td>
                <td>${s.range}%</td>
            </tr>`).join("")}
        </tbody>
    </table>`).join("");

/* ---------------- Theme ---------------- */

function applyTheme(t) {
    state.theme = t;
    if (t === "dark") document.documentElement.dataset.theme = "dark";
    else delete document.documentElement.dataset.theme;
    document.querySelector('meta[name="theme-color"]').content = t === "dark" ? "#0c1310" : "#00703c";
}

$("#theme-toggle").addEventListener("click", () => {
    applyTheme(state.theme === "dark" ? "light" : "dark");
    save();
});

/* ---------------- Confirm modal ---------------- */

const modal = $("#confirm-modal");

/** Site-styled replacement for window.confirm(). Resolves true/false. */
function confirmModal({ title, text, confirm = "Confirm", danger = false }) {
    $("#confirm-title").textContent = title;
    $("#confirm-text").textContent = text;
    const yes = $("#confirm-yes");
    yes.textContent = confirm;
    yes.className = `btn ${danger ? "btn-danger" : "btn-primary"}`;
    modal.classList.toggle("danger", danger);

    return new Promise(resolve => {
        let settled = false;
        const finish = answer => {
            if (settled) return;
            settled = true;
            modal.removeEventListener("click", onClick);
            modal.removeEventListener("cancel", onCancel);
            closeDialog(modal).then(() => resolve(answer));
        };
        const onClick = e => {
            const btn = e.target.closest("[data-answer]");
            if (btn) finish(btn.dataset.answer === "yes");
            else if (e.target === modal) finish(false); // backdrop click
        };
        const onCancel = e => { e.preventDefault(); finish(false); }; // Esc key

        modal.addEventListener("click", onClick);
        modal.addEventListener("cancel", onCancel);
        modal.showModal();
        modal.querySelector('[data-answer="no"]').focus();
    });
}

/* ---------------- Contact modal ---------------- */

const contactModal = $("#contact-modal");
const CHECK_ICON = `<svg viewBox="0 0 24 24"><path d="M20 6 9 17l-5-5"/></svg>`;

document.querySelectorAll("[data-open-contact]").forEach(b =>
    b.addEventListener("click", () => contactModal.showModal()));

contactModal.addEventListener("click", async e => {
    if (e.target === contactModal || e.target.closest("[data-close]")) return closeDialog(contactModal);

    const btn = e.target.closest("[data-copy]");
    if (!btn) return;
    const text = btn.dataset.copy;
    let ok = false;
    try {
        await navigator.clipboard.writeText(text);
        ok = true;
    } catch (_) {
        // Fallback for file:// pages or browsers without clipboard permission.
        const ta = document.createElement("textarea");
        ta.value = text;
        ta.style.position = "fixed";
        ta.style.opacity = "0";
        contactModal.appendChild(ta);
        ta.select();
        try { ok = document.execCommand("copy"); } catch (_) { ok = false; }
        ta.remove();
    }
    if (!ok) { toast("Couldn't copy. Select the address instead"); return; }
    const original = btn.innerHTML;
    btn.innerHTML = CHECK_ICON;
    btn.classList.add("copied");
    toast(`Copied ${text}`);
    setTimeout(() => { btn.innerHTML = original; btn.classList.remove("copied"); }, 1500);
});

contactModal.addEventListener("cancel", e => { e.preventDefault(); closeDialog(contactModal); });

/* ---------------- Toast ---------------- */

let toastT;
function toast(msg) {
    const el = $("#toast");
    // Open dialogs sit in the top layer, so host the toast inside one if needed.
    const host = document.querySelector("dialog[open]:not(.closing)") || document.body;
    if (el.parentElement !== host) host.appendChild(el);
    el.textContent = msg;
    el.classList.add("show");
    clearTimeout(toastT);
    toastT = setTimeout(() => el.classList.remove("show"), 2400);
}

/* ---------------- Init ---------------- */

load();
applyTheme(state.theme);
$(`#mode-${state.mode}`).checked = true;
Object.entries(planInputs).forEach(([k, i]) => (i.value = state.plan[k] ?? ""));
renderRows(false);
