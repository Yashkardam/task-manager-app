import { useEffect, useState, useCallback } from "react";
import API from "../services/api";
import Navbar from "../components/Navbar";


function Dashboard() {
    const [tasks, setTasks] = useState([]);
    const [form, setForm] = useState({
        title: "",
        description: "",
    });

    const [search, setSearch] = useState("");
    const [status, setStatus] = useState("");
    const [page, setPage] = useState(1);
    const [loading, setLoading] = useState(false);

    // 🔄 Fetch tasks
    const fetchTasks = useCallback(async () => {
        try {
            setLoading(true);

            const res = await API.get(
                `/tasks?page=${page}&limit=5&search=${search}&status=${status}`
            );

            setTasks(res.data);
        } catch (err) {
            console.log("Error fetching tasks:", err);
        } finally {
            setLoading(false);
        }
    }, [page, search, status]);

    useEffect(() => {
        fetchTasks();
    }, [fetchTasks]);

    // ➕ Create task
    const createTask = async (e) => {
        e.preventDefault();

        if (!form.title.trim()) {
            alert("Title is required");
            return;
        }

        try {
            await API.post("/tasks", form);

            setForm({ title: "", description: "" });
            fetchTasks();
        } catch (err) {
            console.log("Error creating task:", err);
        }
    };

    // ❌ Delete task
    const deleteTask = async (id) => {
        try {
            await API.delete(`/tasks/${id}`);
            fetchTasks();
        } catch (err) {
            console.log("Error deleting task:", err);
        }
    };

    // 🔄 Toggle status
    const toggleStatus = async (task) => {
        try {
            await API.put(`/tasks/${task._id}`, {
                status: task.status === "pending" ? "completed" : "pending",
            });
            fetchTasks();
        } catch (err) {
            console.log("Error updating task:", err);
        }
    };

    return (
        <>
            <Navbar />

            <div className="container">
                <h2>Dashboard</h2>

                {/* ➕ Create Task */}
                <form onSubmit={createTask} style={{ marginBottom: 20 }}>
                    <input
                        placeholder="Title"
                        value={form.title}
                        onChange={(e) =>
                            setForm({ ...form, title: e.target.value })
                        }
                        style={{ marginRight: 10 }}
                    />

                    <input
                        placeholder="Description"
                        value={form.description}
                        onChange={(e) =>
                            setForm({ ...form, description: e.target.value })
                        }
                        style={{ marginRight: 10 }}
                    />

                    <button style={{ background: "green", color: "white" }}>
                        Add Task
                    </button>
                </form>

                {/* 🔍 Search + Filter */}
                <div style={{ marginBottom: 15 }}>
                    <input
                        placeholder="Search tasks..."
                        value={search}
                        onChange={(e) => setSearch(e.target.value)}
                        style={{ marginRight: 10 }}
                    />

                    <select
                        value={status}
                        onChange={(e) => setStatus(e.target.value)}
                    >
                        <option value="">All</option>
                        <option value="pending">Pending</option>
                        <option value="completed">Completed</option>
                    </select>

                    <button onClick={fetchTasks} style={{ marginLeft: 10 }}>
                        Apply
                    </button>
                </div>

                {/* ⏳ Loading */}
                {loading && <p>Loading tasks...</p>}

                {/* 📋 Task List */}
                {!loading && tasks.length === 0 && (
                    <p>No tasks found 😴</p>
                )}

                {!loading &&
                    tasks.map((task) => (
                        <div className="card" key={task._id}>
                            <h3>{task.title}</h3>
                            <p>{task.description}</p>

                            <p>
                                Status:{" "}
                                <strong
                                    style={{
                                        color:
                                            task.status === "completed"
                                                ? "green"
                                                : "orange",
                                    }}
                                >
                                    {task.status}
                                </strong>
                            </p>

                            <p style={{ fontSize: 12, color: "gray" }}>
                                Created:{" "}
                                {new Date(task.createdAt).toLocaleString()}
                            </p>

                            <button onClick={() => toggleStatus(task)}>
                                Toggle
                            </button>

                            <button
                                style={{
                                    background: "red",
                                    color: "white",
                                }}
                                onClick={() => deleteTask(task._id)}
                            >
                                Delete
                            </button>
                        </div>
                    ))}

                {/* 📄 Pagination */}
                <div style={{ marginTop: 20 }}>
                    <button
                        onClick={() => setPage(page - 1)}
                        disabled={page === 1}
                    >
                        Prev
                    </button>

                    <span style={{ margin: "0 10px" }}>
                        Page {page}
                    </span>

                    <button onClick={() => setPage(page + 1)}>
                        Next
                    </button>
                </div>
            </div>
        </>
    );
}

export default Dashboard;