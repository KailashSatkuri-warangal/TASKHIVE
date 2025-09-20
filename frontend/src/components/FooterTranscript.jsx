import React from "react";

export default function FooterTranscript({ boards, tasks }) {
  return (
    <div className="footer-transcript" style={{ marginTop: "40px", padding: "20px", background: "#111", color: "#fff", borderRadius: "10px" }}>
      <h3>📌 Task Transcript</h3>
      <ul>
        {boards.map(board => (
          <li key={board._id}>
            <strong>{board.title}</strong>
            <ul>
              {tasks.filter(t => t.boardId === board._id).map(task => (
                <li key={task._id}>
                  {task.title} — Deadline: {new Date(task.deadline).toLocaleString()} — Status: {task.status}
                </li>
              ))}
            </ul>
          </li>
        ))}
      </ul>
    </div>
  );
}
