import React, { useState } from "react";
import "./App.css";

function App() {
  const [tasks, setTasks] = useState([]);
  const [editing, setEditing] = useState({ id: null, editedValue: "" });

  const deletHandler = (id) => {
    setTasks((prev) => prev.filter((item) => item.id !== id));
  };

  const doneTaskHandler = (id) => {
    setTasks((prev) =>
      prev.map((item) => {
        if (item.id === id) {
          return { ...item, done: !item.done };
        } else {
          return item;
        }
      })
    );
  };

  const editHandler = (id, value) => {
    if (editing.id === id) {
      setTasks((prev) =>
        prev.map((item) => {
          if (item.id === id) {
            return { ...item, label: editing.editedValue };
          } else {
            return item;
          }
        })
      );
      setEditing({ id: null, editedValue: "" });
    } else {
      setEditing({ id: id, editedValue: value });
    }
  };

  return (
    <div className="App">
      <h1>TODO List</h1>
      <input
        style={{ padding: "10px", marginBottom: "50px", width: "300px" }}
        placeholder="type a text and press Enter"
        type="text"
        onKeyDown={(e) => {
          if (e.key === "Enter") {
            const value = e.target.value;
            setTasks((prev) => [
              ...prev,
              { id: tasks.length, done: false, label: value },
            ]);
            e.target.value = "";
          }
        }}
      />
      <div>
        {tasks.map((item, index) => (
          <div
            key={item.id}
            style={{ display: "flex", alignItems: "center", gap: "10px" }}
          >
            {editing.id === item.id ? (
              <input
                value={editing.editedValue}
                type="text"
                onChange={(e) =>
                  setEditing((prev) => ({
                    ...prev,
                    editedValue: e.target.value,
                  }))
                }
              />
            ) : (
              <p
                style={{ textDecoration: item.done ? "line-through" : "none" }}
              >
                {index + 1 + ". " + item.label}
              </p>
            )}
            <button onClick={() => doneTaskHandler(item.id)}>
              {item.done ? "Mark as Pending" : "Mark as Done"}
            </button>
            <button onClick={() => editHandler(item.id, item.label)}>
              {editing.id === item.id ? "Save" : "Edit"}
            </button>
            <button onClick={() => deletHandler(item.id)}>Delete</button>
          </div>
        ))}
      </div>
    </div>
  );
}

export default App;
