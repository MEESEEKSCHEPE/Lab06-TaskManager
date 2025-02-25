import React, { useState } from "react";
import {
  Container,
  TextField,
  Button,
  List,
  ListItem,
  ListItemText,
  IconButton,
  Select,
  MenuItem,
} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";

const TaskManager = () => {
  const [tasks, setTasks] = useState([]);
  const [task, setTask] = useState("");
  const [filter, setFilter] = useState("all");
  const [editingTask, setEditingTask] = useState(null);

  const addTask = () => {
    if (task.trim() === "") return;
    setTasks([...tasks, { id: Date.now(), text: task, completed: false }]);
    setTask("");
  };

  const deleteTask = (id) => {
    setTasks(tasks.filter((t) => t.id !== id));
  };

  const deleteAllTasks = () => {
    setTasks([]);
  };

  const listatareas = (id) => {
    setTasks(
      tasks.map((t) => (t.id === id ? { ...t, completed: !t.completed } : t))
    );
  };

  const empezandoeditar = (task) => {
    setEditingTask(task);
    setTask(task.text);
  };

  const updateTask = () => {
    setTasks(
      tasks.map((t) => (t.id === editingTask.id ? { ...t, text: task } : t))
    );
    setEditingTask(null);
    setTask("");
  };

  const filteredTasks = tasks.filter((t) => {
    if (filter === "completed") return t.completed;
    if (filter === "pending") return !t.completed;
    return true;
  });

  return (
    <Container>
      <h2>Recordatorio de Tareas</h2>
      <TextField
        label="Nueva tarea"
        value={task}
        onChange={(e) => setTask(e.target.value)}
        fullWidth
        margin="normal"
      />
      {editingTask ? (
        <Button variant="contained" color="secondary" onClick={updateTask}>
          Actualizar tarea
        </Button>
      ) : (
        <Button variant="contained" color="primary" onClick={addTask}>
          Agregar tarea
        </Button>
      )}
      <Button
        variant="contained"
        color="error"
        onClick={deleteAllTasks}
        style={{ marginLeft: "10px" }}
      >
        Eliminar todas
      </Button>
      <Select value={filter} onChange={(e) => setFilter(e.target.value)}>
        <MenuItem value="all">Todas</MenuItem>
        <MenuItem value="completed">Completadas</MenuItem>
        <MenuItem value="pending">Pendientes</MenuItem>
      </Select>
      <List>
        {filteredTasks.map((t) => (
          <ListItem key={t.id} button onClick={() => listatareas(t.id)}>
            <ListItemText
              primary={t.text}
              style={{ textDecoration: t.completed ? "line-through" : "none" }}
            />
            <IconButton onClick={() => empezandoeditar(t)}>
              <EditIcon />
            </IconButton>
            <IconButton
              onClick={(e) => {
                e.stopPropagation();
                deleteTask(t.id);
              }}
            >
              <DeleteIcon />
            </IconButton>
          </ListItem>
        ))}
      </List>
    </Container>
  );
};

export default TaskManager;
