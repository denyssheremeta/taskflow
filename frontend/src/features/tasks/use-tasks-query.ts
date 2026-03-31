import { useQuery } from "@tanstack/react-query";
import { getTasksRequest } from "./tasks.api";
import { taskKeys } from "./task.keys";

export function useTasksQuery() {
  return useQuery({
    queryKey: taskKeys.all,
    queryFn: async () => {
      const response = await getTasksRequest();
      return response.data.tasks;
    },
  });
}
