import { Injectable } from "@nestjs/common";
import { Prisma, Todo } from "@prisma/client";
import { PrismaService } from "src/prisma/prisma.service";

@Injectable()
export class TodoService {
  constructor(private prisma: PrismaService) {}

  async todo(where: Prisma.TodoWhereUniqueInput): Promise<Todo | null> {
    return this.prisma.todo.findUnique({ where });
  }

  async todos(args: {
    skip?: number;
    take?: number;
    cursor?: Prisma.TodoWhereUniqueInput;
    where?: Prisma.TodoWhereInput;
    orderBy?: Prisma.TodoOrderByWithRelationInput;
  }): Promise<Todo[]> {
    const { skip, take, cursor, where, orderBy } = args;
    return this.prisma.todo.findMany({
      skip,
      take,
      cursor,
      where,
      orderBy,
    });
  }

  async createTodo(data: Prisma.TodoCreateInput): Promise<Todo> {
    return this.prisma.todo.create({ data });
  }

  async updateTodo(args: {
    where: Prisma.TodoWhereUniqueInput;
    data: Prisma.TodoUpdateInput;
  }): Promise<Todo> {
    const { where, data } = args;
    return this.prisma.todo.update({ where, data });
  }

  async deleteTodo(where: Prisma.TodoWhereUniqueInput): Promise<Todo> {
    return this.prisma.todo.delete({ where });
  }
}
