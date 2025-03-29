/**
 * Task Management System
 * This file contains the Task class for managing tasks in a simple task management application.
 */

/**
 * Task class represents a single task in the task management system
 * It includes properties for task details and methods to manage the task
 */
class Task {
  /**
   * Constructor for creating a new Task
   * @param {string} id - Unique identifier for the task
   * @param {string} title - Title of the task
   * @param {string} description - Detailed description of the task
   * @param {string} dueDate - Due date for the task
   * @param {string} category - Category the task belongs to
   * @param {boolean} completed - Whether the task is completed (default: false)
   */
  constructor(id, title, description, dueDate, category, completed = false) {
    this.id = id;
    this.title = title;
    this.description = description;
    this.dueDate = dueDate;
    this.category = category;
    this.completed = completed;
    this.createdAt = new Date();
    this.updatedAt = new Date();
  }

  /**
   * Marks the task as completed
   * @returns {Task} - Returns the updated task
   */
  markAsCompleted() {
    this.completed = true;
    this.updatedAt = new Date();
    return this;
  }

  /**
   * Marks the task as not completed
   * @returns {Task} - Returns the updated task
   */
  markAsIncomplete() {
    this.completed = false;
    this.updatedAt = new Date();
    return this;
  }

  /**
   * Updates the task details
   * @param {Object} updates - Object containing the properties to update
   * @returns {Task} - Returns the updated task
   */
  updateTask(updates) {
    // Only update valid properties
    const validProperties = ['title', 'description', 'dueDate', 'category'];
    
    for (const prop in updates) {
      if (validProperties.includes(prop)) {
        this[prop] = updates[prop];
      }
    }
    
    this.updatedAt = new Date();
    return this;
  }

  /**
   * Converts the task to a simple object for storage or transmission
   * @returns {Object} - Plain object representation of the task
   */
  toJSON() {
    return {
      id: this.id,
      title: this.title,
      description: this.description,
      dueDate: this.dueDate,
      category: this.category,
      completed: this.completed,
      createdAt: this.createdAt,
      updatedAt: this.updatedAt
    };
  }

  /**
   * Creates a string representation of the task
   * @returns {string} - String representation of the task
   */
  toString() {
    return `Task ${this.id}: ${this.title} (${this.completed ? 'Completed' : 'Pending'})`;
  }

  /**
   * Calculates if the task is overdue
   * @returns {boolean} - True if the task is overdue
   */
  isOverdue() {
    if (!this.completed) {
      const today = new Date();
      const dueDate = new Date(this.dueDate);
      return dueDate < today;
    }
    return false;
  }
}

/**
 * TaskManager class handles collections of tasks
 * It provides methods to add, remove, and filter tasks
 */
class TaskManager {
  /**
   * Constructor for creating a new TaskManager
   */
  constructor() {
    this.tasks = [];
  }

  /**
   * Adds a new task to the collection
   * @param {Task} task - The task to add
   * @returns {TaskManager} - Returns this TaskManager for chaining
   */
  addTask(task) {
    if (task instanceof Task) {
      this.tasks.push(task);
    }
    return this;
  }

  /**
   * Removes a task from the collection by its ID
   * @param {string} taskId - The ID of the task to remove
   * @returns {Task|null} - The removed task or null if not found
   */
  removeTask(taskId) {
    const index = this.tasks.findIndex(task => task.id === taskId);
    if (index !== -1) {
      return this.tasks.splice(index, 1)[0];
    }
    return null;
  }

  /**
   * Gets a task by its ID
   * @param {string} taskId - The ID of the task to get
   * @returns {Task|undefined} - The task or undefined if not found
   */
  getTaskById(taskId) {
    return this.tasks.find(task => task.id === taskId);
  }

  /**
   * Gets all tasks in the collection
   * @returns {Task[]} - Array of all tasks
   */
  getAllTasks() {
    return this.tasks;
  }

  /**
   * Gets all completed tasks
   * @returns {Task[]} - Array of completed tasks
   */
  getCompletedTasks() {
    return this.tasks.filter(task => task.completed);
  }

  /**
   * Gets all pending (not completed) tasks
   * @returns {Task[]} - Array of pending tasks
   */
  getPendingTasks() {
    return this.tasks.filter(task => !task.completed);
  }

  /**
   * Gets tasks by category
   * @param {string} category - The category to filter by
   * @returns {Task[]} - Array of tasks in the specified category
   */
  getTasksByCategory(category) {
    return this.tasks.filter(task => task.category === category);
  }

  /**
   * Gets overdue tasks
   * @returns {Task[]} - Array of overdue tasks
   */
  getOverdueTasks() {
    const today = new Date();
    return this.tasks.filter(task => {
      const dueDate = new Date(task.dueDate);
      return !task.completed && dueDate < today;
    });
  }
}