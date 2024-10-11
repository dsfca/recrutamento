import {
	createHandler,
	Get,
	Post,
	Put,
	Delete,
	Body,
	Param,
} from "next-api-decorators";
import { PrismaClient, Todo } from "@prisma/client";

const prisma = new PrismaClient();

class TodoController {

	@Get("/")
	async getTodos() {
		return await prisma.todo.findMany();
	}

	@Post("/")
	async addTodo(@Body() todo: Omit<Todo, "id">) {
		return await prisma.todo.create({ data: todo });
	}

	@Put("/:id")
	async updateTodo(
		@Param("id") id: number,
		@Body() updatedTodo: Partial<Omit<Todo, "id">>
	) {

		const todoId = parseInt(id as unknown as string, 10);
		
		return await prisma.todo.update({
			where: { id: todoId },
			data: updatedTodo,
		});
	}

	@Delete("/:id")
	async deleteTodo(@Param("id") id: number) {
		const todoId = parseInt(id as unknown as string, 10);
		await prisma.todo.delete({ where: { id: todoId } });
		return { success: true };
	}
}

export default createHandler(TodoController);
