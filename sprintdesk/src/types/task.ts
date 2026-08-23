export type TaskStatus = "backlog" | "in-progress" | "review" | "done";

export type TaskPriority = "low" | "medium" | "high";

export interface Task {
    id: number;
    title: string;
    description: string;
    status: TaskStatus;
    priority: TaskPriority;
    assigneeId: number;
    dueDate: string;
    sprintId: number;
    order: number;
    createdAt: string;
    updatedAt: string;
    completedAt: string | null;
}

export interface Comment {
    id: number;
    taskId: number;
    authorId: string;
    message: string;
    createdAt: string;
}