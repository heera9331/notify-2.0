import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";

interface Task {
  id: number;
  title: string;
  description: string;
  priority: "HIGH" | "MEDIUM" | "LOW";
  dueDate: string;
  status: "TODO" | "IN_PROGRESS" | "DONE";
}

interface TaskListProps {
  tasks: Task[];
}

export function TaskList({ tasks }: TaskListProps) {
  return (
    <Card className="p-6">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-lg font-semibold">Recent Tasks</h2>
        <Button variant="outline">View All</Button>
      </div>
      <div className="divide-y divide-gray-100 dark:divide-gray-700">
        {tasks.map((task) => (
          <div key={task.id} className="py-4 flex items-center justify-between">
            <div>
              <h3 className="font-medium">{task.title}</h3>
              <div className="flex gap-2 mt-1">
                <span className="text-sm text-gray-500">
                  Due: {new Date(task.dueDate).toLocaleDateString()}
                </span>
                <span className="text-sm text-gray-500">•</span>
                <span className="text-sm text-gray-500">{task.status.replace("_", " ")}</span>
              </div>
            </div>
            <div className={`px-3 py-1 rounded-full text-xs
              ${task.priority === "HIGH" 
                ? "bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-300"
                : task.priority === "MEDIUM"
                ? "bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-300"
                : "bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-300"
              }`}>
              {task.priority}
            </div>
          </div>
        ))}
      </div>
    </Card>
  );
}